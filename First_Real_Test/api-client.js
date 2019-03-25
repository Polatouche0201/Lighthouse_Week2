"use strict"      // TODO remove this with newer versions of Node.js

const request = require("request");

const BASE_URL        = "https://lighthouse-proctologist.herokuapp.com";
const SUBMISSION_URL  = `${BASE_URL}/submissions/`;
const EXAM_BASE_URL   = `${BASE_URL}/exams/`;

class APIClient {
  startExam(studentId, examId, cb) {
    const url = EXAM_BASE_URL + examId;
    request({
      url: url,
      method: "POST",
      json: {
        studentId: studentId
      }
    }, cb);
  }
  
  submit(testResultData, cb) {
    request({
      url: SUBMISSION_URL,
      method: "POST",
      json: testResultData
    }, cb);
  }
}

module.exports = APIClient;
