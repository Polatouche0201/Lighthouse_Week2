module.exports = function getHTML (options, callback) {
  /* Your code here */
  var https = require('https');

  https.get(options, function (response) {
    // 1. set encoding of received data to UTF-8
    response.setEncoding('utf8');
    // 2. get response status
    var status = response.statusCode;
    // 3. the callback is invoked when a `data` chunk is received
    var time = 0;
    var steam = "";
    response.on('data', function (data) {
      time ++;
      steam += "Data " + time.toString() + " : ------------------------------------\n";
      steam += data + "\n";
    });
    // 4. the callback is invoked when all of the data has been received
    // (the `end` of the stream)
    response.on('end', function() {
      steam += 'Response stream complete. Received Chunks: ' + time;
      callback(steam);
    });
  });

};