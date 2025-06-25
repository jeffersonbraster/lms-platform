import { z } from "zod";

export const courseCategories = [
  "Desenvolvimento",
  "Design",
  "Marketing",
  "Negócios",
  "Inovação",
  "Liderança",
  "Outros"
] as const;

export const courseLevels = [
  "Beginner",
  "Intermediate",
  "Advanced"
] as const;

export const courseStatus = [
  "Draft",
  "Published",
  "Archived"
] as const;

// Mapeamentos para exibir em português
export const courseLevelsLabels: Record<string, string> = {
  "Beginner": "Iniciante",
  "Intermediate": "Intermediário",
  "Advanced": "Avançado"
};

export const courseStatusLabels: Record<string, string> = {
  "Draft": "Rascunho",
  "Published": "Publicado",
  "Archived": "Arquivado"
};

// Funções utilitárias
export const getLevelLabel = (level: string): string => {
  return courseLevelsLabels[level] || level;
};

export const getStatusLabel = (status: string): string => {
  return courseStatusLabels[status] || status;
};

export const courseSchema = z.object({
  title: z.string().min(1, { message: "Título é obrigatório" }).max(100, { message: "Título deve ter no máximo 100 caracteres" }),
  description: z.string().min(3, { message: "Descrição é obrigatória" }).max(2000, { message: "Descrição deve ter no máximo 2000 caracteres" }),
  fileKey: z.string().min(1, { message: "Arquivo é obrigatório" }),
  price: z.coerce.number().min(1, { message: "Preço é obrigatório" }),
  duration: z.coerce.number().min(1, { message: "Duração é obrigatória" }).max(500, { message: "Duração deve ter no máximo 500 horas" }),
  level: z.enum(courseLevels, { message: "Nível é obrigatório" }),
  category: z.enum(courseCategories, { message: "Categoria é obrigatória" }),
  smallDescription: z.string().min(1, { message: "Descrição pequena é obrigatória" }).max(200, { message: "Descrição pequena deve ter no máximo 200 caracteres" }),
  slug: z.string().min(3, { message: "Slug é obrigatório" }),
  status: z.enum(courseStatus, { message: "Status é obrigatório" }),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;