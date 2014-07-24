'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema, postSchema;

postSchema = new Schema({
  created: {
    type: Date,
    default: Date.now()
  },
  title: {
    type: String,
    default: '',
    trim: true
  },
  content: {
    type: String,
    default: '',
    trim: true
  }
});

// Instance Methods
postSchema.methods = {
  instanceMethod: function() {
    // return results
  }
};

// Static Methods
postSchema.statics = {
  staticMethod: function() {
    // return results
  }
};

// Virtuals
postSchema.virtual('getterSetterName').get(function() {
  // return formatted property
}).set(function() {
  // store decomposed virtual
});

// Validations
postSchema.path('title').validate(function() {
  // return validation result
}, 'error message');

mongoose.model('Post', postSchema);
