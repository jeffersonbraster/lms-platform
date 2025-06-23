import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ChartLine, Star, Users } from "lucide-react";


interface featureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  }

const features: featureProps[] = [
  {
    title: "Aulas interativas",
    description: "Aprenda com aulas interativas e vídeos de alta qualidade.",
    icon: <BookOpen />
  },
  {
    title: "Cursos completos",
    description: "Aprenda com cursos completos e atualizados.",
    icon: <Star />
  },
  {
    title: "Rastreio de progresso",
    description: "Acompanhe seu progresso em tempo real e alcance seus objetivos.",
    icon: <ChartLine />
  },
  {
    title: "Suporte da comunidade",
    description: "Obtenha suporte da comunidade e tire dúvidas com outros alunos.",
    icon: <Users />
  }
]

export default function Home() {
  return (
    <>
      <section className="relative py-20">
        <div className="flex flex-col items-center text-center space-y-8">
          <Badge variant={"outline"}>O futuro da educação online</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Eleve sua experiência de aprendizagem
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            O nosso sistema de gestão de aprendizagem moderno e interativo
            oferece uma nova forma de aprender. Acesse aulas de alta qualidade
            em qualquer hora e em qualquer lugar.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href={"/cursos"} className={buttonVariants({size: "lg"})}>Explorar aulas</Link>

            <Link href={"/entrar"} className={buttonVariants({size: "lg", variant: "outline"})}>Login</Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
        {features.map((feature, i) => (
          <Card key={i} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="">{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}
