import { cn } from "@/lib/utils";
import { CloudUploadIcon, ImageIcon, Loader2, XIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const RenderEmptyState = ({ isDragActive }: { isDragActive: boolean }) => {
  return (
    <div className="text-center">
      <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-muted mb-4">
        <CloudUploadIcon
          className={cn(
            "size-6 text-muted-foreground",
            isDragActive && "text-primary"
          )}
        />
      </div>
      <p className="text-base font-semibold text-foreground">
        Arraste e solte o arquivo aqui ou{" "}
        <span className="text-primary font-bold cursor-pointer hover:underline">
          clique aqui para fazer upload
        </span>
      </p>

      <Button className="mt-4 cursor-pointer" type="button">
        Selecione um arquivo
      </Button>
    </div>
  );
};

const RenderErrorState = () => {
  return (
    <div className="text-center">
      <div className="flex items-center mx-auto justify-center size-12 rounded-full mb-4 bg-destructive/30">
        <ImageIcon className="size-6 text-destructive" />
      </div>

      <p className="text-base font-semibold text-muted-foreground">
        Ocorreu um erro ao fazer upload do arquivo.
      </p>

      <Button className="mt-4 cursor-pointer" type="button">
        Tentar novamente
      </Button>
    </div>
  );
};

const RenderUploadedState = ({
  previewUrl,
  isDeleting,
  handleRemoveFile,
}: {
  previewUrl: string;
  isDeleting: boolean;
  handleRemoveFile: () => void;
}) => {
  return (
    <div>
      <Image
        src={previewUrl}
        alt="uploaded-file"
        fill
        className="object-contain p-2"
      />

      <Button
        variant={"destructive"}
        size={"icon"}
        className={cn("absolute top-4 right-4")}
        onClick={handleRemoveFile}
        disabled={isDeleting}
      >
        {isDeleting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <XIcon className="size-4" />
        )}
      </Button>
    </div>
  );
};

const RenderUploadingState = ({
  progress,
  file,
}: {
  progress: number;
  file: File;
}) => {
  return (
    <div className="text-center flex justify-center items-center flex-col">
      <p>{progress}</p>
      <p className="mt-2 text-sm font-medium text-muted-foreground">
        Uploading..
      </p>

      <p className="mt-1 text-xs text-muted-foreground truncate max-w-xs">
        {file.name}
      </p>
    </div>
  );
};

export {
  RenderEmptyState,
  RenderErrorState,
  RenderUploadedState,
  RenderUploadingState,
};
