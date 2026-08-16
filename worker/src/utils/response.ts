import type { Context } from "hono";

export const successResponse = <T>(data: T) => {
  return {
    success: true,
    data,
  };
};

export const errorResponse = (code: string, message: string) => {
  return {
    success: false,
    error: {
      code,
      message,
    },
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
