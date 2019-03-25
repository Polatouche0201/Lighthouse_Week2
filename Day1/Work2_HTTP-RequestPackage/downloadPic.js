var request = require('request');
var fs = require('fs');

var connect = request.get('https://sytantris.github.io/http-examples/future.jpg');

connect.on('error', function (err) {
  throw err;
});

connect.on('response', function (response) {
 console.log('Response Status Code: ', response.statusCode);
 console.log('Downloading image...');
});

connect.pipe(fs.createWriteStream('./future.jpg'));

connect.on('end', function() {
  console.log('Download complete.');
});