//Practice 1
var request = require('request');
var fs = require('fs');
// request('https://sytantris.github.io/http-examples/', function(err, response, body) {
//   if (err) throw err;
//   console.log('Response Status Code:', response.statusCode);
// });
var write = request.get('https://sytantris.github.io/http-examples');
write.on('error', function (err) {
  throw err;
})
write.on('response', function (res) {
  console.log('Status Code = ', res.statusCode);
  if(res.statusCode === 200) {
    write.pipe(fs.createWriteStream('./downloaded.html'));
  }
})
write.on('end', function() {
  console.log('File Write Finishied!');
})

// Practice 2
// require `request` and the Node `fs` (filesystem) module
// var request = require('request');
// var fs = require('fs');
// request.get('https://sytantris.github.io/http-examples')               // Note 1
//        .on('error', function (err) {                                   // Note 2
//          throw err;
//        })
//        .on('response', function (response) {                           // Note 3
//          console.log('Response Status Code: ', response.statusCode);
//        })
//        .pipe(fs.createWriteStream('./downloaded.html'));               // Note 4

// Notes:
// 1. `request.get` is equivalent to `request()`
// 2. `request.on('error', callback)` handles any error
// 3. `request.on('response, callback)` handles the response
// 4. What is happening here?