const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `User is unauthorized!` });
    }
    next();
  };
};
export default restrictTo;
