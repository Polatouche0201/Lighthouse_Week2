"use strict"
const crypto  = require("crypto");
const eslint  = require("eslint");
const fs      = require("fs");
const Mocha   = require("mocha");

const LINT_RULES = require("./lint-rules.json");

class TestRunner {
  constructor() {
    this.mocha = new Mocha();
  }

  run(questionNumber, cb) {
    const codeFile = this.getCodeFile(questionNumber);
    const code = fs.readFileSync(codeFile, "utf8");
    const examData = JSON.parse(fs.readFileSync(".exam-data", "utf8"));
    
    const results = {
      examId:         examData.examId,
      questionNumber: parseInt(questionNumber), 
      lintResults:    this.runLint(code),
      testResults:    null, // Mocha, next step
      testFileHash:   null,
      studentCode:    code,
      errors:         []
    };
    
    try {
      const testFile = this.getTestFile(questionNumber);
      results.testFileHash = this.getFileHash(testFile);
      
      this.runMocha(questionNumber)
        .then((mochaResults) => {
            results.testResults = mochaResults.stats;
            cb(null, results);
          },
          (err) => {
            results.errors.push(err);
            console.error(err.stack);
            cb(err, results);
          });
    } catch (e) {
      cb(e, results);
    }
  }

  runLint(code) {
    const lintOptions = { 
      rules: LINT_RULES,
      globals: { module: {} },
      env: {
        "es6": true,
        "node": true
      }
    };
    return eslint.linter.verify(code, lintOptions);
  }
  
  runMocha(questionNumber, cb) {
    const testFile = this.getTestFile(questionNumber);
    return new Promise((resolve, reject) => {
      this.mocha.addFile(testFile);
      this.mocha
        .run((failures) => {})
        .on("end", function() {
          resolve({ stats: this.stats }); // return test statistics
        });
    });
  }
  
  getCodeFile(questionNumber) {
    const paddedNumber = this.padNumber(questionNumber, 2);
    return `./answers/${paddedNumber}.js`;
  }
  
  getTestFile(questionNumber) {
    const paddedNumber = this.padNumber(questionNumber, 2);
    return `./tests/test_${paddedNumber}.js`;
  }
  
  padNumber(num, length) {
    let s = num+"";
    while (s.length < length) {
      s = "0" + s;
    }
    return s;
  }
  
  getFileHash(filePath) {
    const fileContents = fs.readFileSync(filePath, "utf8");
    return crypto.createHash("md5").update(fileContents).digest("hex");
  }
}

module.exports = TestRunner;
