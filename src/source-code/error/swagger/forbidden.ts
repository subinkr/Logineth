export const forbidden = (message: string) => {
  return {
    schema: {
      example: {
        message,
        error: 'Forbidden',
        statusCode: 403,
      },
    },
  };
};
