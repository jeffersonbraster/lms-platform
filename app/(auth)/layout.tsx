import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center">
      <Link
        href={"/"}
        className={buttonVariants({
          variant: "outline",
          className: "absolute left-4 top-4",
        })}
      >
        <ArrowLeft className="size-4" />
        Voltar
      </Link>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          className="flex items-center gap-2 self-center font-medium"
          href={"/"}
        >
          {/* <Image width={32} height={32} src={"/logo.png"} alt="JejeLMS" /> */}
          JejeLMS.
        </Link>
        {children}

        <div className="text-balance text-center text-xs text-muted-foreground">
          Ao clicar em continue, você aceita nosso <span className="hover:text-primary hover:underline hover:cursor-pointer">Termos de uso</span> e{" "}
          <span className="hover:text-primary hover:underline hover:cursor-pointer">Política de privacidade</span>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
