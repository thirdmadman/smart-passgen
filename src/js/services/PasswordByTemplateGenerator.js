/* eslint-disable class-methods-use-this */
export default class PasswordByTemplateGenerator {
  generatePasswordVariationsFromPattern = (pattern) => {
    const inputPattern = pattern;

    const processRegExp = (exp) => {
      let isOptional = false;

      if (exp.indexOf('!') > -1) {
        isOptional = true;
      }

      let startIndex = 1;
      let endIndex = exp.length - 1;

      if (exp.indexOf('(') > -1) {
        startIndex = exp.indexOf('(') + 1;
        endIndex = exp.indexOf(')');
      }

      const symbols = exp.substring(startIndex, endIndex).split(',');
      if (isOptional) {
        symbols.push('');
      }

      return symbols;
    };

    const getPatternArray = (patternString) => {
      const patterns = [];
      let indexArray = 0;
      for (let i = 0; i < patternString.length; i += 1) {
        if (patternString[i] === '[' && patternString[i - 1] !== ']' && indexArray > 0) {
          indexArray += 1;
        }

        if (!patterns[indexArray]) {
          patterns[indexArray] = patternString[i];
        } else {
          patterns[indexArray] += patternString[i];
        }

        if (patternString[i] === ']') {
          indexArray += 1;
        }
      }

      return patterns;
    };

    const patternArray = getPatternArray(inputPattern);

    const getSymbols = (patternArrayIn) => {
      let index = 0;
      const symbols = [];
      patternArrayIn.forEach((el) => {
        if (el.indexOf('[') > -1) {
          symbols[index] = processRegExp(el);
          index += 1;
        } else {
          symbols.push(...el.split(''));
          index += el.split('').length;
        }
      });
      return symbols;
    };

    const symbolsArray = getSymbols(patternArray);

    const combinator = (sourceArray) => {
      const getOnlyCombinators = (source) => source.map((el, i) => ({ el, i })).filter((elIn) => elIn.el.length > 1);
      const solutionsNumber = getOnlyCombinators(sourceArray)
        .reverse()
        .reduce((prev, curr) => prev * curr.el.length, 1);

      const repeatArray = (arr, n) => Array(n).fill(arr).flat();

      const getDepth = (onlyCombinatorsArray, index) => {
        const res = onlyCombinatorsArray.findIndex((com) => com.i === index);
        if (res === -1) {
          return -1;
        }
        return res + 1;
      };

      const getSeqLengthOnDepth = (array, depth) => {
        let seqLength = array[depth - 1].el.length;
        if (depth < array.length) {
          seqLength = array.slice(depth - 1).reduce((prev, curr) => prev * curr.el.length, 1);
        }
        return seqLength;
      };

      const getSelfRepeatCount = (array, depth) => {
        if (depth === array.length) {
          return 1;
        }
        return array.slice(depth).reduce((prev, curr) => prev * curr.el.length, 1);
      };

      const repeatSymbols = (array, index) => {
        if (index === 2) {
          console.error('gg');
        }
        const onlyCombinators = getOnlyCombinators(array);
        const depth = getDepth(onlyCombinators, index);
        let selfRepeat = 1;
        let sequenceRepeat = solutionsNumber;

        if (depth > -1) {
          selfRepeat = getSelfRepeatCount(onlyCombinators, depth);
          const seqLength = getSeqLengthOnDepth(onlyCombinators, depth);
          sequenceRepeat = solutionsNumber / seqLength;

          return repeatArray(
            array[index].map((el) => Array(selfRepeat).fill(el)),
            sequenceRepeat,
          );
        }
        return repeatArray(Array(selfRepeat).fill(array[index]), sequenceRepeat);
      };

      // const depth = onlyCombinators();

      // const numberOfRepeats = solutionsNumber / sourceArray[sourceArray.length - 1].length;
      const solutions = sourceArray.map((el, i, array) => repeatSymbols(array, i).flat());
      const results = Array(solutionsNumber);
      for (let x = 0; x < solutions[0].length; x += 1) {
        for (let y = 0; y < solutions.length; y += 1) {
          if (y === 0) {
            results[x] = solutions[y][x];
          } else {
            results[x] += solutions[y][x];
          }
        }
      }
      return results;
    };

    console.error(patternArray);
    console.error(symbolsArray);
    console.error(combinator(symbolsArray));

    return combinator(symbolsArray);
  };

  // const srcArray = textGenerator('[6,7][Y,u]n[!(3,4)]ev[!(3,4)]erg[9,0]onnag[6,7,8]u[!(3,4)]ess[!(!,.)]').join('<br>');
  // const srcArray = textGenerator('[6,7][Y,u]n[!(3,4)]ev[!(3,4)]erg[9,0]onnag[6,7,8][!(3,4)]ess[!(8,9)]it[!(!,.)]');
  // const srcArray = textGenerator('[6,7][Н,н]т[!(3,4)]ум[!(3,4)]укп[9,0]щттфп[6,7,8]г[!(3,4)]уыы[!(!,.)]');
  // const srcArray = textGenerator('[6,7][Y,y]oun[3,4]everg[9,0]onnag[7,8]u[!(3,4)]ess[!(8,9)]it[!(!,.)]');
  // const srcArray = textGenerator('[6,7][Y,y]oun[3,4]everg[9,0]onnag[7,8]u[!(3,4)]ess[!(!,.)]');
  // const srcArray = textGenerator('[6,7][Н,г]щгт[3,4]умукп[9,0]щттфп[7,8]г[!(3,4)]уыы[!(!,.)]');
  // const newArray = srcArray
  //   .map((el) => [`keyboard.write('${el}')`, "keyboard.press_and_release('enter')", 'time.sleep(50 / 1000)'])
  //   .flat();
  // genText.innerHTML = newArray.join('<br>');
  // genText.innerHTML = textGenerator('[1,3,5][2,4,6,7,8,9]z[0,1][1,2,3,4]').join('<br>');
}
