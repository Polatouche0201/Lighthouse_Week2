// Public Mudules Connection
var fs = require('fs');
var request = require('request');
const dotenv = require('dotenv').config();
var secrets = {
  token: process.env.GITHUB_TOKEN
}

// Global Varaiables
var owner = "";
var name = "";
var starObj = {};
var dataSize = 0;
var dataGetCount = 0;

/****** Major Funtions ******/
// Get Repo Contributors
function getRepoContributors(repoOwner, repoName, callBack) {
  // Options Object
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': "token " + secrets.token
    }
  };
  // Send The Request
  request(options, function(err, res, body) {
    var json = JSON.parse(body);
    if(res.statusCode === 404) {
      console.log("The provided repo: " + repoOwner + "/" + repoName + " does not exist");
    } else {
      callBack(err, json);
    }
  });
}
// Caulculate Stars
function starNumCompare() {

  console.log("Start Compare......");

  var starData = [];
  for(key in starObj) {
    var eachObj = {};
    eachObj["name"] = key;
    eachObj["star"] = starObj[key];
    starData.push(eachObj);
  }
  starData.sort(function(a, b) {
    return b.star - a.star;
  })
  for(var i = 0; i < 5; i ++) {
    console.log("[ " + starData[i].star + " stars ] " + starData[i].name);
  }
}

// Get each download content (Picture for this project)
function findContributorStarNum(url) {

  var options = {
    url: url,
    headers: {
      'User-Agent': 'request',
      'Authorization': "token " + secrets.token
    }
  };

 request(options, function(err, res, body) {
    var json = JSON.parse(body);
    if(res.statusCode === 404) {
      console.log("The provided repo: " + repoOwner + "/" + repoName + " does not exist");
    } else {
      dataGetCount ++;
      var json = JSON.parse(body);
      var size = json.length;
      if(size > 0) {
        console.log(url + " : " + size);
        for(var i = 0; i < size; i ++) {
          var repo = json[i].full_name;
          if(!starObj[repo]) {
            starObj[repo] = 1;
          } else {
            starObj[repo] ++;
          }
        }
        if(dataGetCount === dataSize) {
          starNumCompare();
        }
      }
    }
  });

  //Send The Request
//   var connect = request.get(options, url); // Fetch the download url

//   connect.on('error', function (err) {  // connect to the url
//     throw err;
//   }).on('response', function (response) { // get response from url
//     console.log(response.data);
//     if(response.statusCode === 404) {
//       console.log("The provided repo: " + repoOwner + "/" + repoName + " does not exist");
//     }
//   });
//   connect.on('data', function(){
//    ...
//})
//   connect.on('end', function() {                // connection end and download completed
//     console.log('Calculation complete.\n', starObj);
//   });
// }

// This App's Running Monitor
function downloadAvatarsMonitor () {
  // 1. Input Arguments Check
  var argvs = process.argv.slice(" ");
  if(argvs.length === 4) {
    owner = argvs[2];
    name = argvs[3];
  } else {
    return 1;
  }
  // // 2. Download Folder Check
  // if(!fs.existsSync('./avatars')) {
  //   return 2;
  // }
  // 3. Confige File .env Check
  if(!fs.existsSync('./.env')) {
    return 3;
  }
  if(!secrets.token) {
    return 4;
  }
  // 4. Run the Download Avatars
  console.log('Welcome to the Recommended Repo!');

  getRepoContributors(owner, name, function(err, result) {
    console.log("Errors:", err);
    dataSize = result.length;
    for(var i = 0; i < dataSize; i++) {
      var obj = {};
      obj = result[i];
      var avatarUrl = obj["starred_url"];
      findContributorStarNum(avatarUrl.split('{')[0]);
    }
  });
}

// Identify Error Type
function ErrorThrow (errorID) {
  var errorMsg = "";
  switch(errorID) {
    case 1: errorMsg = "Two Arguments Required: argv1 = owner, argv2 = name."; break;
    case 2: errorMsg = "Avatars Download fold required: ./avatars"; break;
    case 3: errorMsg = "Configure File .env required: ./.env"; break;
    case 4: errorMsg = "Token key info. in .env file required: GITHUB_TOKEN=..."; break;
    default : errorMsg = "Unknow Problem.";
  }
  console.log(errorMsg);
}

// Run The Monitor
var error = downloadAvatarsMonitor();
if(error > 0) {
  ErrorThrow(error);
}
