import AppError from '../utils/error.js';

const authorizeAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return next(new AppError('Admin access required.', 403));
  }
  next();
};

export default authorizeAdmin;
