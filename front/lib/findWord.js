function findWord(rules) {
  let output = "";

  let looseLetters = [];

  rules.forEach((rule) => {
    // console.log(rule);
    const res = processRule(rule, output, looseLetters);

    output = res[0];
    looseLetters = res[1];

    // console.log(output);
  });

  while (looseLetters.length) {
    for (let i = 0; i < looseLetters.length; i++) {
      [output, looseLetters] = processRule(
        looseLetters[i],
        output,
        looseLetters,
        true
      );
    }
  }

  console.log("FINAL", output);
}

function processRule(rule, output, looseLetters, removeFromLoose = false) {
  const [firstLetter, secondLetter] = rule.split(">");

  const hasFirstLetter = output.includes(firstLetter);
  const hasSecondLetter = output.includes(secondLetter);

  const outputArr = output.split("");

  if (hasFirstLetter && !hasSecondLetter) {
    const firstLetterIndex = output.indexOf(firstLetter);
    // console.log("first index", firstLetterIndex);

    outputArr.splice(firstLetterIndex + 1, 0, secondLetter);
    output = outputArr.join("");

    if (removeFromLoose) {
      looseLetters.splice(looseLetters.indexOf(rule), 1);
    }
  } else if (!hasFirstLetter && hasSecondLetter) {
    const secondLetterIndex = output.indexOf(secondLetter);

    outputArr.splice(secondLetterIndex, 0, firstLetter);
    output = outputArr.join("");

    if (removeFromLoose) {
      looseLetters.splice(looseLetters.indexOf(rule), 1);
    }
  } else if (!hasFirstLetter && !hasSecondLetter) {
    if (!output) {
      output = `${firstLetter}${secondLetter}`;
    } else {
      looseLetters.push(rule);
    }
  }

  return [output, looseLetters];
}

export default findWord;
