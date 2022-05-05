const formateDate = (date) => {
  const formatedDate = new Date(date);
  const options = {
    year: "numeric",
    month: "long",
    day: "2-digit"
  };
  return formatedDate.toLocaleDateString("es-ES", options);
};

module.exports = formateDate;
