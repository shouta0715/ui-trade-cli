import { Request } from "express";
import { BaseSchema, Input, object, parse, safeParse, string } from "valibot";

const paramsSchema = object({
  slug: string(),
});

export function validate<T extends BaseSchema>(
  target: unknown,
  schema: T
): asserts target is Input<T> {
  parse(schema, target);
}

export const safeValidate = <T extends BaseSchema>(
  target: unknown,
  schema: T
) => {
  return safeParse<T>(schema, target);
};

export function validateParams(target: Request) {
  const { params } = target;

  validate(params, paramsSchema);

  return params;
}
