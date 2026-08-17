import type { Context } from "hono";

export const successResponse = <T>(data: T) => {
  return {
    success: true,
    data,
  };
};

export const errorResponse = <T = undefined>(code: string, message: string, data?: T) => {
  return {
    success: false,
    error: {
      code,
      message,
    },
    ...(data !== undefined ? { data } : {}),
  };
};

export const databaseUnavailable = (c: Context) => {
  console.error("Anime details database unavailable.");
  return c.json(
    errorResponse(
      "DATABASE_UNAVAILABLE",
      "Database is temporarily unavailable",
    ),
    503,
  );
};
