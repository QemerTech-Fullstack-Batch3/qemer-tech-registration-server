const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack)
  let errorMessage = 'Internal Server Error';
  // if (process.env.NODE_ENV === 'development') {
  //   errorMessage = err.message; // Provide more details in development
  // }
  console.log('\n\n')
  console.log('Error handling from middleware')
  if (err.name === 'AuthenticationError') {
    console.log(`${err.name}: ${err.message}`)
    res.status(401).send('Unauthorized')
  } else if (err.name === 'ValidationError') {
    console.log(`${err.name}: ${err.message}`)
    res.status(400).send('Invalid')
  }
  else {
    console.error(`
      Error name: ${err.name}
      Error message: ${err.message}
      Error stack: ${err.stack}
      `)
    res.status(err.status || 500).send(errorMessage);
  }
}
module.exports = errorMiddleware