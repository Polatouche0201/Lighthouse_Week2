"use strict";

/* Question 04
 *
 *  Implement the function as defined below
 *
 * Given an array of values, the minmax() function will return an array that contains the minimum and
 maximum values in the array, always with minimum at index 0 and maximum at index 1. For the purposes
 of this question, you are not allowed to use Math.max() or Math.min().

 The array can be a list of lower-cased strings instead of numbers. In this case, min is the string that
 would be sorted first alphabetically and max is the string that would be sorted last alphabetically
 ("a" < "b", while "ab" > "aa", and so on).

 Mixed-type (strings and numbers) arrays are not of concern to us.

 * Examples:

  - minmax([1, 2, 3, 4, 5]) returns [1, 5]
  - minmax([90, 89, 123, 3]) returns [3, 123]
  - minmax(["apple", "banana", "canada"]) returns ["banana", "canada"]
  - minmax([]) returns [undefined, undefined]
*/
// function stringReverse (input) {
//   var outputString = "";
//   for(var j = input.length-1; j >= 0; j --) {
//     outputString += input[j];
//   }
//   return outputString;
// }

function minmax(list) {
  let output = [];
  if(list.length > 0) {
    let min = list[0];
    let max = list[0];
    for(let value of list) {
      if(value < min) {
        min = value;
      }
      if(value > max) {
        max = value;
      }
    }
    output.push(min);
    output.push(max);
  } else {
    output = [undefined, undefined];
  }
  return output;
}
//console.log(minmax(["apple", "banana", "canada"]));


// Don't change below:

module.exports = { minmax: minmax };
