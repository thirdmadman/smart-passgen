// Importing 'LocalStorageProvider' class
import LocalStorageProvider from './LocalStorageProvider';

// Test Suite for 'LocalStorageProvider' class
describe('LocalStorageProvider class', () => {
  // Test case to check if it generates data correctly
  test('should generate data correctly', () => {
    const data = LocalStorageProvider.generateData();
    const obj = {
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
      lastPasswords: [],
    };
    expect(data).toStrictEqual(obj);
  });

  // Test case to check if it sets and gets data from localStorage correctly
  test('should set and get data from localStorage correctly', () => {
    const data = { config: { generatorConfig: { length: 10 } } };

    // set data in local storage
    LocalStorageProvider.setData(data);

    // get data from local storage
    const storedData = LocalStorageProvider.getData();

    // assertion
    expect(storedData).toStrictEqual(data);
  });

  // Test case to check if it gets data from localStorage correctly, when it empty
  test('should set and get data from localStorage correctly, when it empty', () => {
    window.localStorage.setItem(LocalStorageProvider.localStorageItemName, '');

    const data = LocalStorageProvider.getData();

    // assertion
    expect(!data).toBeFalsy();
  });

  // Test case to check if it gets null from localStorage when it empty obj
  test('should set and get null from localStorage when it empty obj', () => {
    window.localStorage.setItem(LocalStorageProvider.localStorageItemName, '{}');

    const data = LocalStorageProvider.getData();

    // assertion
    expect(data).toBe(null);
  });

  // Test case to check if it removes data from localStorage correctly
  test('should remove data from localStorage correctly', () => {
    // set data in local storage
    LocalStorageProvider.destroy();

    // try to get data from local storage
    const storedData = window.localStorage.getItem(LocalStorageProvider.localStorageItemName);

    // assertion
    expect(storedData).toBeFalsy();
  });

  // Test case to check if it detects empty localStorage data correctly
  test('should detect empty localStorage data correctly', () => {
    window.localStorage.setItem(LocalStorageProvider.localStorageItemName, '');
    expect(!LocalStorageProvider.isNotEmpty()).toBeTruthy();
  });
});
