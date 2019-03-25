const chai    = require("chai");
const sinon   = require("sinon");
const assert  = chai.assert;

const { tempConverter } = require("../answers/00");

describe('tempConverter', () => {
  it('should return a number, not a string', () => {
     let result = tempConverter(100, true);

     assert.ok(typeof result === "number");
  });

  it('converts to Fahrenheit correctly (42C => 107.6F)', () => {
      let result = tempConverter(42, true);

      assert.equal(107.6, result);
  });

  it('converts to Celsius correctly (42F => 5.6C)', () => {
     let result = tempConverter(42, false);

      assert.equal(5.6, result);
  });

  it('returns NaN if it is not given a number ("42" => NaN)', () => {
    let result = tempConverter("42", true);

    assert.ok(isNaN(result));
  })
});
