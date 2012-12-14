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
  console.log(credentials);
  var client = knox.createClient({
    key: credentials.accessKey,
    secret: credentials.secretKey,
    bucket: credentials.bucket
  });

  client.putFile( options.headers.filePath, options.headers.filename,
    function(err, res){
      console.log('putFile response:', err);
      if (200 == res.statusCode) {
        console.log('saved to %s', req.url);
      } else {
        console.log('error statusCode:' + res.statusCode);
      }
  });
};

module.exports = S3Service;
