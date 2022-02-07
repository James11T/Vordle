const randomChoice = (list) => {
  return list[Math.floor(Math.random() * list.length)];
};

const isAlphabeticalChar = (str) => {
  return /^[A-Z()]$/.test(str);
};

const arrayOfVal = (value, length = 0) => {
  return [...Array(length)].map(() => value);
};

const arrayOfObj = (value, length = 0) => {
  return [...Array(length)].map(() => ({ ...value }));
};

const backspaceString = (str) => {
  if (str.length === 0) return str;
  return str.substring(0, str.length - 1);
};

const matchString = (matchee, matcher) => {
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

/*

HELLO
LOLLS

*/
