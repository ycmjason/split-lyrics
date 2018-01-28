module.exports = (fn) => (req, res, next) => {
  fn(req, res).then(() => next()).catch(next);
};
