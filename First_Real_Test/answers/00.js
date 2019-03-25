"use strict";

/* Question 00

Write a converter that will change Celsius to Fahrenheit and back again.

Your function should take in a number, and a boolean. The number will be the temperature in degrees,
and the boolean will be whether to convert from C to F (true) or F to C (false).
Your answer should be rounded to one decimal place, and returned as a Number, not a string.

Examples:

- tempConverter(32, true) returns 89.6 as a result
- tempConverter(32, false) returns 0.0 as a result
- tempConverter(98.6, false) returns 37 as a result
- tempConverter("12", <anything>) returns NaN as a result

*/

// function craftNum(num) {
//   let result = 0;


//   return result;
// }

function tempConverter(value, cToF) {

  /* IMPLEMENT ME */
  if(typeof value === "string"){
    return NaN;
  }else{
    let result = 0;
    if(!cToF) {
      result = (value - 32) / 1.8;
    } else {
      result = value * 1.8 + 32;
    }
    return Math.floor(result * 10 + 0.5) / 10;
  }

}

//console.log(tempConverter(42, false));


// Don't change below:

module.exports = { tempConverter };
