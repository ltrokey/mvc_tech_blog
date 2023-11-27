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
  compareDates: (date1, date2) => {
    const parsedDate1 = new Date(date1);
    const parsedDate2 = new Date(date2);

    if (!isNaN(parsedDate1) && !isNaN(parsedDate2)) {
      return parsedDate1 > parsedDate2;
    }

    return false;
  },
};
