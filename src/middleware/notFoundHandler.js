export const notFoundHandler = () => {
  res.status(404).json({
    message: 'Route not found',
  });
};
