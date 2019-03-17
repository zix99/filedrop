module.exports = require('rc')('filedrop', {
  port: 8080,

  // Extra logging
  verbose: true,

  // Upload filesize limits
  // See: https://github.com/expressjs/multer#limits
  multerLimits: {
    fileSize: 10 * 1024 * 1024,
  },

  // If dev is on, watch view files for change
  dev: false,

  // Path to directory to put files and serve files from
  target: 'drops/',
});
