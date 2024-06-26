import createHttpError from 'http-errors';

export const validateBody = (schema) => {
  const func = async (req, _res, next) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      const responseError = createHttpError(400, error.message, {
        errors: error.details,
      });
      next(responseError);
    }
  };
  return func;
};
