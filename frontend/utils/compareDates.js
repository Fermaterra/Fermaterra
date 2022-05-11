const compareDates = (date) => {
  const currentDate = new Date(Date.now());
  const dateToCompare = new Date(date);
  return currentDate < dateToCompare;
};

module.exports = compareDates;
