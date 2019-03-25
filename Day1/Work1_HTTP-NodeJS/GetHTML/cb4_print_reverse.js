var getHTML = require('./http-functions');

var requestOptions = {
  host: 'sytantris.github.io',
  path: '/http-examples/step6/reverse.html'
};

function printReverse (html) {

  /* Write your code here! */
  var outputString = "";
  for(var i = html.length-1; i >= 0 ; i --) {
    var reverse = html[i];
    if(!reverse.isNaN) {
      outputString += reverse;
    }
  }

  console.log(outputString);
}

getHTML(requestOptions, printReverse);