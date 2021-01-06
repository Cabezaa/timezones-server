const { GeneralError } = require("../utils/generalError");

const handleErrors = (err, req, res, next) => {
  //TODO: add something like Winston to log errors in a file.
  if (err instanceof GeneralError) {
    return res.status(err.statusCode).json({
      status: "error",
      statusCode: err.statusCode,
      message: err.message,
    });
  } else {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

module.exports = handleErrors;
