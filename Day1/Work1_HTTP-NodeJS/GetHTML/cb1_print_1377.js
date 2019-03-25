var getHTML = require('./http-functions');

var requestOptions = {
  host: 'sytantris.github.io',
  path: '/http-examples/step6/1337.html'
};

function print1337 (html) {
  /* Write your code here! */
  var output = "";
  var rule = {
    a : '4',
    e : '3',
    l : '1',
    o : '0',
    s : '5',
    t : '7',
    'ck' : 'x',
    'er' : '0r',
    'you' : 'j00'
  };
  var ruleKeys = Object.keys(rule);
  var ruleValues = Object.values(rule);
  var ruleSize = ruleKeys.length;
  for(var i = 0; i < html.length; i ++) {
    var chr = html[i];
    for(var j = 0; j < ruleSize; j ++) {
      if(chr === ruleKeys[j]) {
        chr = ruleValues[j];
      }
    }
    output += chr;
  }
  console.log(output);

}

getHTML(requestOptions, print1337);