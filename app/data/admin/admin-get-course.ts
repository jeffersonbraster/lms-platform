import "server-only"
import { notFound } from "next/navigation"
import { requireAdmin } from "./require-admin"
import { prisma } from "@/lib/db"

export async function adminGetCourse(courseId: string) {
  await requireAdmin()

  const data = await prisma.course.findUnique({
    where: {
      id: courseId
    },
    select: {
      id: true,
      title: true,
      description: true,
      fileKey: true,
      price: true,
      duration: true,
      level: true,
      status: true,
      slug: true,
      smallDescription: true,
      category: true
    }
  })

  if(!data) {
    return notFound()
  }

  return data
}

export type AdminCourseSingularType = Awaited<ReturnType<typeof adminGetCourse>>