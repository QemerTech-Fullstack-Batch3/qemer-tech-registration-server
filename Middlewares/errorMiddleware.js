const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack)
  let errorMessage = 'Internal Server Error';
  // if (process.env.NODE_ENV === 'development') {
  //   errorMessage = err.message; // Provide more details in development
  // }
  res.status(err.status || 500).send(errorMessage);
}
module.exports = errorMiddleware