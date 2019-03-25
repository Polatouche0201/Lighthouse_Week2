// Public Mudules Connection
var request = require('request');
var fs = require('fs');
const dotenv = require('dotenv').config();
var secrets = {
  token: process.env.GITHUB_TOKEN
}

// Global Varaiables
var owner = "";
var name = "";
var numCount = 0;

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
// Get each download content (Picture for this project)
function downloadImageByURL(url, filePath, picNum) {
  var connect = request.get(url); // Fetch the download url
  connect.on('error', function (err) {  // connect to the url
    throw err;
  }).on('response', function (response) { // get response from url
    if(response.statusCode === 200) {
      console.log('Downloading image...', url);
    } else {
      if(response.statusCode === 404) {
        console.log("Link" + url + " No Found!");
      } else {
        console.log("Error: Status Code = ", response.statusCode);
      }
    }
  });
  connect.pipe(fs.createWriteStream(filePath)); // pipe connection and write file
  connect.on('end', function() {                // connection end and download completed
    console.log(filePath + ' Downloaded.');
    numCount ++;
    if(numCount === picNum) {
      console.log('-------- All Download complete. --------');
    }
  });
}

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
  // 2. Download Folder Check
  if(!fs.existsSync('./avatars')) {
    return 2;
  }
  // 3. Confige File .env Check
  if(!fs.existsSync('./.env')) {
    return 3;
  }
  if(!secrets.token) {
    return 4;
  }
  // 4. Run the Download Avatars
  console.log('Welcome to the GitHub Avatar Downloader!');

  getRepoContributors(owner, name, function(err, result) {
    console.log("Errors:", err);
    var picNum = result.length;
    for(var i = 0; i < picNum; i++) {
      var obj = {};
      obj = result[i];
      var avatarUrl = obj["avatar_url"];
      var userName = "./avatars/" + obj["login"] + ".jpg";
      downloadImageByURL(avatarUrl, userName, picNum);
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