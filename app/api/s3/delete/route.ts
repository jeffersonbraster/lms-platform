import { env } from "@/lib/env";
import { S3 } from "@/lib/s3-client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    const key = body.key;

    if(!key) {
      return NextResponse.json({
        error: "Key is required or invalid",
      }, { status: 400 })
    }

    const command = new DeleteObjectCommand({
      Bucket: env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Key: key,
    })

    await S3.send(command);

    return NextResponse.json({
      message: "Imagem deletada com sucesso",
    }, { status: 200 })
  } catch {
    return NextResponse.json({
      error: "Erro ao deletar imagem, tente novamente mais tarde",
    }, { status: 500 })
  }
}