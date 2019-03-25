function getAndPrintHTML (options) {

  /* Add your code here */
  var https = require('https');

  https.get(options, function (response) {

    // set encoding of received data to UTF-8
    response.setEncoding('utf8');

    // the callback is invoked when a `data` chunk is received
    var time = 0;
    response.on('data', function (data) {
      time ++;
      var steam = "Data " + time.toString() + " : ------------------------------------\n";
      steam += data + "\n";
      console.log(steam);
    });

    // the callback is invoked when all of the data has been received
    // (the `end` of the stream)
    response.on('end', function() {
      console.log('Response stream complete. Received Chunks: ' + time);
    });

  });

}

var requestOptions = {
  host: 'sytantris.github.io',
  path: '/http-examples/step3.html'
};

getAndPrintHTML(requestOptions);