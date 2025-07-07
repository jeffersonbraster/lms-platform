"use server"

import { requireAdmin } from "@/app/data/admin/require-admin"
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet"
import { prisma } from "@/lib/db"
import { ApiResponse } from "@/lib/types"
import { courseSchema, CourseSchemaType } from "@/lib/zod-schemas"
import { request } from "@arcjet/next"

const aj = arcjet.withRule(
  detectBot({
    mode: 'LIVE',
    allow: [],
  })
).withRule(
  fixedWindow({
    mode: 'LIVE',
    window: "1m",
    max: 5,
  })
)

export async function editCourse(data: CourseSchemaType, courseId: string): Promise<ApiResponse> {
  const user = await requireAdmin()

  try {
    const req = await request()
    const decision = await aj.protect(req, {
      fingerprint: user.user.id,
    })

    if(decision.isDenied()) {
      if(decision.reason.isRateLimit()) {
        return {
          status: "error",
          message: "Você atingiu o limite de criar cursos, tente novamente mais tarde.",
        }
      }else {
        return {
          status: "error",
          message: "Parece que você está usando um bot. Por favor, contate o suporte.",
        }
      }
    }

    const result = courseSchema.safeParse(data)

    if(!result.success) {
      return {
        status: 'error',
        message: 'Dados inválidos para editar o curso'
      }
    }

    await prisma.course.update({
      where: {
        id: courseId,
        userId: user.user.id
      },
      data: {
        ...result.data,
      }
    })

    return {
      status: 'success',
      message: 'Curso editado com sucesso'
    }
    
  } catch {
    return {
      status: 'error',
      message: 'Ocorreu um erro inesperado ao editar o curso, tente novamente.'
    }
  }
}