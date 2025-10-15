import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { ZodError } from 'zod'

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { prisma, ROLES } from '@/constants'
import { formatZodValidationErrors } from '@/formatters'

const isDevelopmentEnvironment = process.env.NODE_ENV !== 'production'

type RequestProcessProps<T> = {
	functions: () => Promise<T>
	isProtectedRoute?: boolean
	isNecessarySession?: boolean
	successMessage?: string
}
export async function requestProcess<T>({
	functions,
	isProtectedRoute,
	isNecessarySession = true,
	successMessage,
}: RequestProcessProps<T>) {
	const session = await getServerSession(authOptions)

	if (isNecessarySession) {
		if (!session?.user) {
			return NextResponse.json(
				{
					error: 'Usuário não autenticado!',
					message: 'Usuário não autenticado!',
				},
				{ status: 401 }
			)
		}

		const isValidUser = await prisma.user.findUnique({
			where: {
				email: session.user.email as string,
			},
		})

		if (!isValidUser) {
			return NextResponse.json(
				{
					error: 'Erro de autenticação.',
					message: 'Usuário não encontrado!',
				},
				{
					status: 409,
				}
			)
		}

		if (isValidUser.deletedAt) {
			return NextResponse.json(
				{
					error: 'Erro de autenticação.',
					message: 'Usuário bloqueado!',
				},
				{
					status: 409,
				}
			)
		}
	}

	if (isProtectedRoute && session?.user?.role !== ROLES.ADMIN) {
		return NextResponse.json(
			{
				error: 'Usuário sem permissão!',
				message: 'Usuário sem permissão!',
			},
			{ status: 403 }
		)
	}

	try {
		const data = await functions()

		if (data instanceof Response) {
			return data
		}

		if (data instanceof NextResponse) {
			return data
		}

		return NextResponse.json({
			data,
			...(successMessage && { message: successMessage }),
		})
	} catch (error) {
		if (error instanceof ZodError) {
			const errorsFormatted = formatZodValidationErrors(error.issues)

			return NextResponse.json(
				{
					error: 'Erro de validação dos campos.',
					message: errorsFormatted,
				},
				{ status: 422 }
			)
		}

		return NextResponse.json(
			{
				error: 'Erro interno do servidor!',
				...(isDevelopmentEnvironment && {
					error_description: error,
				}),
			},
			{ status: 500 }
		)
	}
}
