'use client'
import { FileText, Upload, X } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { ZodError } from 'zod'

import { Label } from '../Label'
import { fileInputSchema } from './FileInput.schema'

export const FileInput = () => {
	const {
		control,
		watch,
		setValue,
		setError,
		formState: { errors },
	} = useFormContext()

	const inputRef = useRef<HTMLInputElement>(null)

	const handleRemoveFile = () => {
		setValue('file', undefined, { shouldValidate: true })
	}

	const file = watch('file')

	const verifyFile = async (file: File | undefined) => {
		if (!file) return
		try {
			await fileInputSchema.parseAsync(file)
			setValue('file', file, { shouldValidate: true })
			setError('file', { message: '' })
		} catch (error) {
			if (error instanceof ZodError) {
				setError('file', { message: error.issues[0].message })
			}
		}
	}

	return (
		<div className="flex flex-col space-y-2">
			<div className="flex flex-col">
				<Label className="mb-0" htmlFor="file">
					Imagem do evento
				</Label>
				<p className="text-xs">
					Para saber mais informações{' '}
					<Link className="underline underline-offset-2" href="/info.webp" target="_blank">
						clique aqui.
					</Link>
				</p>
			</div>
			{file ? (
				<div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-primary/10 p-4">
					<FileText className="size-8 shrink-0 text-primary" />
					<div className="min-w-0 flex-1">
						<p className="truncate text-black/80 text-sm">{file?.name}</p>
						<p className="text-gray-500 text-xs">{(file?.size / 1024).toFixed(0)} KB</p>
					</div>
					<button
						className="cursor-pointer text-gray-500 transition-colors hover:text-red-500"
						onClick={handleRemoveFile}
						type="button"
					>
						<X />
					</button>
				</div>
			) : (
				<Controller
					control={control}
					name="file"
					render={({ field }) => (
						<>
							<input
								accept=".png"
								className="hidden"
								id="file"
								multiple={false}
								onChange={(e) => {
									const selectedFile = e.target.files?.[0]
									verifyFile(selectedFile)
								}}
								ref={(e) => {
									field.ref(e)
									inputRef.current = e
								}}
								type="file"
							/>
							<button
								className='w-full cursor-pointer cursor-pointer" rounded-lg border-2 border-gray-200 border-dashed p-8 text-center transition-colors hover:border-primary/50 hover:bg-primary/10'
								onClick={() => inputRef.current?.click()}
								type="button"
							>
								<Upload className="mx-auto mb-3 size-10 text-gray-500" />
								<p className="text-black/80 text-sm">Clique para selecionar a imagem do evento</p>
								<p className="mt-1 text-gray-500 text-xs">Apenas PNG, máximo de 1MB</p>
							</button>
						</>
					)}
				/>
			)}
			{errors.file && <p className="text-red-500 text-xs">{errors?.file?.message as string}</p>}
		</div>
	)
}
