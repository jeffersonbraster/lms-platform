import { env } from "@/lib/env"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { NextResponse } from "next/server"
import { z } from "zod"
import { v4 as uuidv4 } from 'uuid'
import { S3 } from "@/lib/s3-client"

export const fileUploadSchema = z.object({
  fileName: z.string().min(1, "Nome do arquivo é obrigatório"),
  contentType: z.string().min(1, "Tipo de conteúdo é obrigatório"),
  size: z.number().min(1, "Tamanho do arquivo é obrigatório"),
  isImage: z.boolean(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const validation = fileUploadSchema.safeParse(body)

    if(!validation.success) {
      return NextResponse.json({
        error: 'Dados inválidos',
      }, { status: 400 })
    }

    const { fileName, contentType, size } = validation.data

    const uniqueKey = `${uuidv4()}-${fileName}`

    const command = new PutObjectCommand({
      Bucket: env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      ContentType: contentType,
      Key: uniqueKey,
      ContentLength: size,
    })

    const presignedUrl = await getSignedUrl(S3, command, {
      expiresIn: 360, // 6 minutes
    })

    const response = {
      presignedUrl,
      key: uniqueKey,
    }

    return NextResponse.json(response)
  } catch {
    return NextResponse.json({
      error: 'Erro ao fazer upload do arquivo, tente novamente mais tarde',
    }, { status: 500 })
  }
}