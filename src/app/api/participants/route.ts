import { NextRequest, NextResponse } from 'next/server'

const handlerPost = async (request: NextRequest) => {
	const body = await request.formData()

	console.log(body)

	return NextResponse.json({ message: 'Participante criado com sucesso!' })
}

export { handlerPost as POST }
