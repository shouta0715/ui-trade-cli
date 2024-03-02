import { UISchema } from "@/schema";

export type AsideUI = Pick<UISchema, "title" | "published"> & { slug: string };
