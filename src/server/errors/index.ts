/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */

import arg from "arg";
import { Response } from "express";
import { ValiError } from "valibot";
import { logger } from "@/server/log";

export const handlerParseArgsError = (error: unknown) => {
  if (error instanceof arg.ArgError && error.code === "ARG_UNKNOWN_OPTION") {
    logger().error("Unknown option").run();

    return null;
  }

  logger().error("An error occurred").run();

  return null;
};

/* eslint-disable max-classes-per-file */
export const errors = {
  400: { message: "Bad Request" },
  401: { message: "Unauthorized" },
  403: { message: "Forbidden" },
  404: { message: "Not Found" },
  500: { message: "Internal Server Error" },
} as const;

export type ErrorType = keyof typeof errors;
export type Errors = typeof errors;
export type ErrorsMessage = {
  [T in ErrorType]: Errors[T]["message"];
}[ErrorType];

export type Error = {
  status: ErrorType;
  message: ErrorsMessage;
};

export class HttpError extends Error {
  message: ErrorsMessage;

  constructor(public status: ErrorType) {
    super();
    this.message = errors[status].message;
    this.status = status;
  }

  throwMessage() {
    return { message: this.message, status: this.status };
  }
}

export class BadRequestError extends HttpError {
  constructor() {
    super(400);
  }
}

export class UnauthorizedError extends HttpError {
  constructor() {
    super(401);
  }
}

export class ForbiddenError extends HttpError {
  constructor() {
    super(403);
  }
}

export class NotFoundError extends HttpError {
  constructor() {
    super(404);
  }
}

export class InternalServerError extends HttpError {
  constructor() {
    super(500);
  }
}

export const throwHttpErrorFromStatus = (status: ErrorType | number): never => {
  switch (status) {
    case 400:
      throw new BadRequestError();
    case 401:
      throw new UnauthorizedError();
    case 403:
      throw new ForbiddenError();
    case 404:
      throw new NotFoundError();
    case 500:
      throw new InternalServerError();
    default:
      throw new InternalServerError();
  }
};

export const handleApiError = ({
  error,
  res,
}: {
  error: unknown;
  res: Response;
}) => {
  if ((error as any).code === "ENOENT") {
    const status = 404;
    const { message } = errors[status];

    return res.json({ message, status });
  }

  if (error instanceof ValiError) {
    const status = 400;
    const { message } = errors[status];

    return res.json({ message, status });
  }

  if (error instanceof UnauthorizedError) {
    const status = 401;
    const { message } = errors[status];

    return res.json({ message, status });
  }

  if (error instanceof ForbiddenError) {
    const status = 403;
    const { message } = errors[status];

    return res.json({ message, status });
  }

  if (error instanceof HttpError) {
    const { status, message } = error.throwMessage();

    return res.json({ message, status });
  }

  const status = 500;

  const { message } = errors[status];

  return res.json({ message, status });
};
