module.exports = {
  isValid(val) {
    if (val) {
      return /^\S+$/g.test(val);
    }
    return false;
  },
};
