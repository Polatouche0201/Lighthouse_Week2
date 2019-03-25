"use strict";

/* Question 05

Capital case is a specific method of capitalizing the characters of every word in a sentence in order
to make it usable as a title or headline. Construct the body of the function called titleCase() that
takes a string as the single parameter.

Examples:

- titleCase("this is an example") returns "This Is An Example"
- titleCase("test") returns "Test"
- titleCase("i r cool") returns "I R Cool"
- titleCase("WHAT HAPPENS HERE") returns "What Happens Here"
- titleCase("") returns ""
- titleCase("A") returns "A"

*/

function titleCase(text) {
  if(text) {
    let output = "";
    let stringArray = text.split(" ");
    for(let i = 0; i < stringArray.length; i ++) {
      for(let j = 0; j < stringArray[i].length; j ++) {
        let chr = stringArray[i][j];
        if(j === 0) {
          output += chr.toUpperCase();
        } else {
          output += chr.toLowerCase();
        }
      }
      if(i < stringArray.length - 1) {
        output += " ";
      }
    }
    return output;
  } else {
    return text;
  }
}
//console.log(titleCase("this is an example"));

// Don't change below:

module.exports = { titleCase };
