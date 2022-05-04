const serverError = (res) => {
  const message = "Something went wrong";
  return res.status(500).json({ message });
};

module.exports = serverError;
