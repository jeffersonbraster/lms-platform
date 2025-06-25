import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"

const CursosPage = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Seus Cursos</h1>

        <Link href="/admin/cursos/criar" className={buttonVariants()}>
          Criar Curso
        </Link>
      </div>

      <div>
        <h1>Aqui estão todos os seus cursos</h1>
      </div>
    </>
  )
}

export default CursosPage