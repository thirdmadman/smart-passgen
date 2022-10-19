export default class SmartPassGen {
  options = {
    length: 8,
    language: 'eng',
    isSmartSymbols: true,
    isUseLetters: true,
    isIncludeUppercase: false,
    isUseNumbers: true,
    isUseSpecialSymbols: false,
    isUseSpecialSymbolsAdvanced: false,
  };

  constructor(options) {
    if (options) {
      this.options = options;
    }
  }

  generate() {
    const numbers = Array(10)
      .fill(1)
      .map((el, i) => String(i));
    const alphabet = [...Array(26).keys()].map((i) => String.fromCharCode(i + 97));
    const alphabetUpper = alphabet.map((i) => i.toUpperCase());
    const sameSymbols = [...'ilo01'];
    const specialSymbols = [...'!@#$%^&-_=+[{]}'];
    const specialSymbolsAdvanced = [...'!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'];

    let resultCharacterSet = [];
    if (this.options.isUseNumbers) {
      resultCharacterSet = resultCharacterSet.concat(numbers);
    }

    if (this.options.isUseLetters) {
      resultCharacterSet = resultCharacterSet.concat(alphabet);
      if (this.options.isIncludeUppercase) {
        resultCharacterSet = resultCharacterSet.concat(alphabetUpper);
      }
    }

    if (this.options.isSmartSymbols) {
      resultCharacterSet = resultCharacterSet.filter((el) => !sameSymbols.includes(el));
    }

    if (this.options.isUseSpecialSymbols) {
      if (this.options.isUseSpecialSymbolsAdvanced) {
        resultCharacterSet = resultCharacterSet.concat(specialSymbolsAdvanced);
      } else {
        resultCharacterSet = resultCharacterSet.concat(specialSymbols);
      }
    }

    const getRandomIntInRange = (min, max) => {
      const minAggregated = Math.ceil(min);
      const maxAggregated = Math.floor(max);
      return Math.floor(Math.random() * (maxAggregated - minAggregated + 1)) + minAggregated;
    };

    let result = '';

    for (let i = 0; i < this.options.length; i += 1) {
      result += String(resultCharacterSet[getRandomIntInRange(0, resultCharacterSet.length - 1)]);
    }
    return result;
  }
}
