"use client"

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useSignOut() {
  const router = useRouter();

  const handleSingout = async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Deslogado com sucesso!");
          router.push("/");
        },
        onError: () => {
          toast.error("Erro ao deslogar, tente novamente.");
        },
      },
    });
  }

  return handleSingout;
}