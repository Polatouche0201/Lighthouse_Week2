const chai    = require("chai");
const sinon   = require("sinon");
const assert  = chai.assert;

const minmax = require("../answers/04").minmax;

describe('minmax', () => {
  it("[1, 100, 2, 200, 300, 3] => [1, 300]", () => {
    let result = minmax([1, 100, 2, 200, 300, 3]);

    assert.deepEqual([1, 300], result);
  });

  it("[9, -9, 10, -10] => [-10, 10]", () => {
    let result = minmax([9, -9, 10, -10]);

    assert.deepEqual([-10, 10], result);
  });

  it("[0] => [0, 0]", () => {
    let result = minmax([0]);

    assert.deepEqual([0, 0], result);
  });

  it("['macbook', 'laptop', 'chromebook'] => ['chromebook', 'macbook']", () => {
    let result = minmax(["macbook", "laptop", "chromebook"]);

    assert.deepEqual(["chromebook", "macbook"], result);
  });

  it("[] => [undefined, undefined]", () => {
    let result = minmax([]);

    assert.deepEqual([undefined, undefined], result);
  });
});
