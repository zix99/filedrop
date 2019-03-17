module.exports = require('rc')('filedrop', {
  port: 8080,
  verbose: true,
  multerLimits: {
    fileSize: 10 * 1024 * 1024,
  },
  dev: false,
});
