const serverError = (res) => {
  const message = "Something went wrong";
  return res.status(500).res.json({ message });
};

export default serverError;
