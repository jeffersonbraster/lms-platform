import { env } from "@/lib/env";

export function useConstructUrl(key: string): string {
  return `https://${env.NEXT_PUBLIC_AWS_BUCKET_NAME}.fly.storage.tigris.dev/${key}`
} 