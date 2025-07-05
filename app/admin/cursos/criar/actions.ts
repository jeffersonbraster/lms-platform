"use server";

import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { courseSchema, CourseSchemaType } from "@/lib/zod-schemas";
import { requireAdmin } from "@/app/data/admin/require-admin";
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { request } from "@arcjet/next";

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

export async function createCourse(course: CourseSchemaType): Promise<ApiResponse> {
  const session = await requireAdmin()
  
  try {
    const req = await request()
    const decision = await aj.protect(req, {
      fingerprint: session.user.id as string,
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

    const validation = courseSchema.safeParse(course);

    if (!validation.success) {
      return {
        status: "error",
        message: "Formulário inválido",
      }
    }

    await prisma.course.create({
      data: {
        ...validation.data,
        userId: session?.user?.id as string,
      }
    })

    return {
      status: "success",
      message: "Curso criado com sucesso",
    }
  } catch {
    return {
      status: "error",
      message: "Erro ao criar curso, tente novamente.",
    }
  }
}