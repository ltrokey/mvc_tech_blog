const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
};

const notFoundHandler = (req, res) => {
  res.status(404).send("Not Found");
};

module.exports = {
  errorHandler,
  notFoundHandler,
};
