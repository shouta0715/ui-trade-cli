import { createId as cuid } from "@paralleldrive/cuid2";

export const createCUID = () => {
  return cuid();
};
