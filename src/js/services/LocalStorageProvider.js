export default class LocalStorageProvider {
  static localStorageItemName = 'smart-passgen';

  static srcData = null;

  static getData() {
    const data = localStorage.getItem(LocalStorageProvider.localStorageItemName);

    if (LocalStorageProvider.isNotEmpty()) {
      const dataIConfigs = JSON.parse(data);
      const localStorageKeysNumber = Object.keys(dataIConfigs).length;
      return localStorageKeysNumber > 0 ? dataIConfigs : null;
    }

    const generatedData = LocalStorageProvider.generateData();
    LocalStorageProvider.setData(generatedData);
    return generatedData;
  }

  static destroy() {
    localStorage.removeItem(LocalStorageProvider.localStorageItemName);
  }

  static isNotEmpty() {
    const localStorageData = localStorage.getItem(LocalStorageProvider.localStorageItemName);
    return localStorageData && localStorageData[0] === '{';
  }

  static setData(data) {
    localStorage.setItem(LocalStorageProvider.localStorageItemName, JSON.stringify(data));
  }

  static generateData() {
    return {
      config: {
        generatorConfig: {
          length: 8,
          language: 'eng',
          isSmartSymbols: true,
          isUseLetters: true,
          isIncludeUppercase: false,
          isUseNumbers: true,
          isUseSpecialSymbols: false,
          isUseSpecialSymbolsAdvanced: false,
        },
        configCore: {
          isSavePasswords: false,
          lastTab: 0,
        },
      },
      lastPasswords: [
        // {
        //   date: '',
        //   url: '',
        //   password: '',
        // },
      ],
    };
  }
}
