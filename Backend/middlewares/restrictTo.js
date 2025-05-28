// restrict access based on user role
module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    // check if user is logged in
    if (!req.user) {
      return res.status(401).json({
        status: 'fail',
        message: 'You are not logged in.',
      });
    }

    // check if user's role is permitted
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to perform this action.',
      });
    }

    next(); // access granted
  };
};
