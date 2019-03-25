const chai    = require("chai");
const sinon   = require("sinon");
const assert  = chai.assert;

const { titleCase } = require("../answers/05");

describe('titleCase', () => {
  it("AB => Ab", () => {
    let result = titleCase("AB");

    assert.equal("Ab", result);
  });

  it("HI YO => Hi Yo", () => {
    let result = titleCase("HI YO");

    assert.equal("Hi Yo", result);
  });

  it("hAndlE wEIrd vOwEl cAsE => Handle Weird Vowel Case", () => {
    let result = titleCase("hAndlE wEIrd vOwEl cAsE");

    assert.equal("Handle Weird Vowel Case", result);
  });

  it("ALL UPPER CASE WORDS => All Upper Case Words", () => {
    let result = titleCase("ALL UPPER CASE WORDS");

    assert.equal("All Upper Case Words", result);
  });

  it("all lower case words => All Lower Case Words", () => {
    let result = titleCase("all lower case words");

    assert.equal("All Lower Case Words", result);
  });

  it("can handle single letter words too! (i r cool => I R COOL)", () => {
    let result = titleCase("i r cool");

    assert.equal("I R Cool", result);
  });

  it("empty string => empty string", () => {
    let result = titleCase("");

    assert.equal("", result);
  });

});
