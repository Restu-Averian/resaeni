export function successResponse(data: unknown) {
  return {
    success: true,
    data,
  };
}

export function errorResponse(code: string, message: string) {
  return {
    success: false,
    error: {
      code,
      message,
    },
  };
}
