"use strict"
const fs          = require("fs");

const APIClient   = require("./api-client");
const Messages    = require("./messages");
const TestRunner  = require("./test-runner");

const studentId = fs.readFileSync("./.student-id", "utf8");
if (!studentId) {
  console.log(Messages.StudentIdWarning);
  process.exit(1);
}

const questionNumber = process.argv[2];
if (!questionNumber) {
  console.log(Messages.UsageInstructions);
  process.exit(1);
}

const testRunner = new TestRunner();
const apiClient = new APIClient();

printTestStart(questionNumber);
testRunner.run(questionNumber, (err, results) => {
  results.studentId = studentId.trim();
  printLintResults(results.lintResults);
  apiClient.submit(results, (err, response, body) => {
    if (err) {
      printSubmissionError(err);
      return;
    }
    printSubmissionResponse(body);
  });
});

function printTestStart(questionNumber) {
  console.log(`Running Tests for Question ${questionNumber}`);
  console.log("------------");
}

function printLintResults(lintResults) {
  console.log("Lint Results");
  console.log("------------");
  if (lintResults.length == 0) {
    console.log("(Everything appears to OK)")
    console.log("\n");
    return;
  }
  for (let i=0; i<lintResults.length; i++) {
    let result = lintResults[i];
    console.log(`${i+1}) ${result.message} (Line ${result.line}, Column ${result.column})`);
    console.log(`   Source: "${result.source}"`);
  }
  console.log("\n");
}

function printSubmissionResponse(responseBody) {
  console.log("Overall Score");
  console.log("------------");
  for (let i=0; i<responseBody.scores.length; i++) {
    let question = responseBody.scores[i];
    console.log(`Q${question.questionNumber}. ${question.score}/${question.maxScore}`);
  }
  if (responseBody.remainingTime > 0) {
    const hours = Math.floor(responseBody.remainingTime/60);
    const minutes = Math.floor(responseBody.remainingTime%60);
    console.log(`\nTime Remaining: ${hours}h${minutes}m\n`);
  } else {
    console.log("\nTime Remaining: None (Submission still accepted)\n");
  }
}

function printSubmissionError(err) {
  console.error(`ERROR: (${err.code})\n`);
  console.info(err);
  console.warn("\nYour test results have NOT been submitted!\n");  
}
