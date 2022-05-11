const formateDate = (date, locale) => {
  const formatedDate = new Date(date);
  const options = {
    month: "long",
    weekday: "long",
    day: "numeric"
  };
  return formatedDate.toLocaleDateString(locale, options);
};

module.exports = formateDate;
