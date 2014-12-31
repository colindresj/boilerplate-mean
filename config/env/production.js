'use strict';

module.exports = {
  env: 'production',
  mongo: {
    uri: process.env.MONGOHQ_URL ||
         process.env.MONGOLAB_URI ||
         'mongodb://localhost/boilerplate-mean',
  },
  assets: {
    styles: [],
    scripts: [],
    test: [],
    vendor: {
      styles: [],
      scripts: []
    }
  },
  csp: {
    defaultSrc: ["'self'"]
  }
};
