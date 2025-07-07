import { adminGetCourse } from "@/app/data/admin/admin-get-course"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EditForm from "./_components/edit-form"
import CourseStructure from "./_components/course-structure"

type EditarPageProps = Promise<{courseId: string}>


const EditarPage = async ({ params }: { params: EditarPageProps }) => {
  const { courseId } = await params
  const data = await adminGetCourse(courseId)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Editando o Curso: <span className="text-primary underline">{data.title}</span></h1>

      <Tabs defaultValue="basic-info" className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="basic-info">Informações básicas</TabsTrigger>
          <TabsTrigger value="course-structure">Estrutura do curso</TabsTrigger>
        </TabsList>

        <TabsContent value="basic-info">
          <Card>
            <CardHeader>
              <CardTitle>Informações básicas</CardTitle>
              <CardDescription>
                Aqui você pode editar as informações básicas do curso.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <EditForm data={data} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="course-structure">
          <Card>
            <CardHeader>
              <CardTitle>Estrutura do curso</CardTitle>
              <CardDescription>
                Aqui você pode editar a estrutura do curso.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <CourseStructure data={data} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default EditarPage