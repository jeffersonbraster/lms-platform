import { adminGetCourses } from "@/app/data/admin/admin-get-courses"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import AdminCourseCard from "./_components/admin-course-card"

const CursosPage = async () => {
  const data = await adminGetCourses()

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Seus Cursos</h1>

        <Link href="/admin/cursos/criar" className={buttonVariants()}>
          Criar Curso
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg-grid-cols-2 gap-7">
        {data.map((course) => (
          <AdminCourseCard key={course.id} data={course} />
        ))}
      </div>
    </>
  )
}

export default CursosPage