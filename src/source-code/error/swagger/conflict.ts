export const conflict = (message: string) => {
  return {
    schema: {
      example: {
        message,
        error: 'Conflict',
        statusCode: 409,
      },
    },
  };
};
