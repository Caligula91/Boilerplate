/**
 * Handle errors from async functions in routes
 * @param fn
 */
const catchAsyncError = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
  catchAsyncError,
};
