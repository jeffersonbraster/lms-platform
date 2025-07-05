import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ShieldX } from "lucide-react";
import Link from "next/link";
import React from "react";

const NaoAutorizadoPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="bg-destructive/10 rounded-full p-4 w-fit mx-auto">
            <ShieldX className="size-16 text-destructive" />
          </div>

          <CardTitle className="text-2xl">Acesso não autorizado</CardTitle>
          <CardDescription className="max-w-sm mx-auto">
            Você não tem permissão para acessar esta página solicitada, por
            favor, contate o suporte.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Link href="/" className={buttonVariants({
            className: "w-full"
          })}>
            <ArrowLeft className="mr-1 size-4" />
            Voltar a home
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default NaoAutorizadoPage;
