'use strict';

module.exports = {
  register: function(checkAgainst, redirectPath) {
    return function (req, res, next) {
      if (req.originalUrl.indexOf(checkAgainst) === -1) {
        return res.redirect(redirectPath);
      }

      next();
    };
  }
};
