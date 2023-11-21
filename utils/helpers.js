module.exports = {
  errorHandler: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
  },

  notFoundHandler: (req, res) => {
    res.status(404).send("Not Found");
  },

  format_date: (date) => {
    if (date instanceof Date && !isNaN(date)) {
      return date.toLocaleDateString();
    } else {
      return "Invalid Date";
    }
  },
};
