"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, Loader2, Send } from "lucide-react";

const LoginForm = () => {
  const router = useRouter();
  const [githubPending, startGithubTransition] = useTransition();
  const [emailPending, startEmailTransition] = useTransition();
  const [email, setEmail] = useState("");

  async function singInWithGithub() {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Login realizado com sucesso!");
          },
          onError: (error) => {
            toast.error(
              "Erro ao fazer login com Github: " + error.error.message
            );
          },
        },
      });
    });
  }

  async function singInWithEmail() {
    startEmailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.success(
              "Código de verificação enviado com sucesso, verifique seu e-mail."
            );
            router.push(`/verificar-email?email=${email}`);
          },
          onError: (error) => {
            toast.error(
              "Erro ao enviar código de verificação: " + error.error.message
            );
          },
        },
      });
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Bem vindo de volta!</CardTitle>
        <CardDescription>Faça login para continuar</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <Button
          disabled={githubPending}
          onClick={singInWithGithub}
          className="w-full"
          variant="outline"
        >
          {githubPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Entrando com Github..</span>
            </>
          ) : (
            <>
              <Github className="size-4" />
              Entrar com Github
            </>
          )}
        </Button>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-card px-2 text-muted-foreground">
            Ou continue com
          </span>
        </div>

        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="exemplo@exemplo.com"
              id="email"
              required
            />
          </div>

          <Button onClick={singInWithEmail} disabled={emailPending}>
            {emailPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Enviando código de verificação..</span>
              </>
            ) : (
              <>
                <Send className="size-4" />
                <span>Continuar com e-mail</span>
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
