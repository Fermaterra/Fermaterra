const messageToCostumer = (message, setter) => {
  setter(message);
  setTimeout(() => {
    setter("");
  }, 1250);
};

export default messageToCostumer;
