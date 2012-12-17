/**
 * Module dependencies.
 */

var knox = require('knox');

/**
 * S3 service.
 *
 * Sends assets to S3
 *
 * @param {Object} Server configuration
 * @api public
 */
var S3Service = function(config) {
  this.config = config;
};

/**
 * Upload an image to S3
 * @param  {Object}   options  The options object.
 * @param  {Object}   res      express res object.
 * @param  {Function} callback  the callback.
 */
S3Service.prototype.send = function(options, res, callback) {

  var credentials = this.config.bucketTwo;
  var client = knox.createClient({
    key: credentials.accessKey,
    secret: credentials.secretKey,
    bucket: credentials.bucket
  });

  client.putFile( options.headers.filePath,
    options.headers.filename, this.onResponse.bind(this, callback));

};


/**
 * Handle S3 response object
 * @param  {Function} callback The cb.
 * @param  {Object|string} err The error object.
 * @param  {Object} res The res object from knox.
 */
S3Service.prototype.onResponse = function(callback, err, res) {
  console.log('putFile response:', err);
  // construct basic response object
  var response = {
    status: false,
    url: null,
    err: null
  };
  if (200 == res.statusCode) {
    console.log('saved to %s', res.url);
    response.url = res.url;
    response.status = true;
    callback(err, response);
  } else {
    console.log('error statusCode:' + res.statusCode);
    response.err = err;
    callback(err, response);
  }
};

module.exports = S3Service;
