const randomChoice = (list) => {
  // Get a random element from a given array
  return list[Math.floor(Math.random() * list.length)];
};

const isAlphabeticalChar = (str) => {
  // Returns true if str is an upper case alphabetic character
  return /^[A-Z()]$/.test(str);
};

const arrayOfVal = (value, length = 0) => {
  // Returns an array of a given length, populated with value
  return [...Array(length)].map(() => value);
};

const arrayOfObj = (value, length = 0) => {
  // Returns an array of a given length, populated with value which is an object to be cloned
  return [...Array(length)].map(() => ({ ...value }));
};

const backspaceString = (str) => {
  // Remove the last character from a string, if possible
  if (str.length === 0) return str;
  return str.substring(0, str.length - 1);
};

const matchString = (matchee, matcher) => {
  // Perfrom wordle match logic
  if (matchee === matcher) {
    return { result: arrayOfVal(2, matcher.length), isMatch: true };
  }
  // 0 for no match, 1 for wrong place, 2 for right place
  matchee = matchee.split("");
  matcher = matcher.split("");

  let results = arrayOfVal(0, matcher.length);

  // Pass for equal characters
  matchee.forEach((char, index) => {
    if (char === matcher[index]) {
      results[index] = 2;
      matcher[index] = "";
    }
  });

  // Pass for correct placae
  matchee.forEach((char, index) => {
    let charPos = matcher.indexOf(char);
    if (charPos >= 0) {
      results[index] = 1;
      matcher[charPos] = "";
    }
  });

  return { result: results, isMatch: false };
};

export {
  randomChoice,
  isAlphabeticalChar,
  arrayOfVal,
  arrayOfObj,
  backspaceString,
  matchString,
};
