const chai    = require("chai");
const sinon   = require("sinon");
const assert  = chai.assert;

const { findFriend } = require("../answers/06");

const inventors = [
  {
    name: "Brendan Eich",
    language: "JavaScript",
    worked_for: "Netscape",
    friends: ["Yukihiro Matsumoto", "Guido van Rossum"]
  },
  {
    name: "Guido van Rossum",
    language: "Python",
    worked_for: "CWI",
    friends: ["Brendan Eich", "Yukihiro Matsumoto"]
  },
  {
    name: "Yukihiro Matsumoto",
    language: "Ruby",
    worked_for: "netlab.jp",
    friends: ["Brendan Eich", "Guido van Rossum"]
  }
];

describe('findFriend', () => {
  it("looks up Brendan's language from Guido's record", () => {
    const result = findFriend(inventors, "Guido van Rossum", "language");

    assert.deepEqual({name: "Brendan Eich", language: "JavaScript"}, result);
  });

  it("looks up Matz' company(worked_for) from Brendan's record", () => {
    const result = findFriend(inventors, "Brendan Eich", "worked_for");

    assert.deepEqual({name: "Yukihiro Matsumoto", worked_for: "netlab.jp"}, result);
  });

  it("returns 'Not found' when looking up an unknown record", () => {
    const result = findFriend(inventors, "Khurram", "language");

    assert.equal("Not found", result);
  });

  it("returns 'Not found' when an invalid field is requested", () => {
    const result = findFriend(inventors, "Guido van Rossum", "coat_size");

    assert.equal("Not found", result);
  })
});
