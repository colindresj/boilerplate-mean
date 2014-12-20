'use strict';

exports.errorLogger = function(err, req, res, next) {
  console.error(err.stack);
  next(err);
};

exports.clientErrorHandler = function(err, req, res, next) {
  var error = {},
      prop;

  res.status(err.status || 500);

  if (req.xhr || req.accepts('json')) {
    for (prop in err) error[prop] = err[prop];
    res.setHeader('Content-Type', 'application/json');
    res.send(error);
  } else {
    next(err);
  }
};

exports.errorHandler = function(err, req, res, nxet) {
  res.status(err.status || 500);
  res.render('error', { error: err });
};
