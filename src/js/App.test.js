// Importing necessary modules and classes
import LocalStorageProvider from './services/LocalStorageProvider';
import SmartPassGen from './services/SmartPassGen';
import ToggleElement from './components/ToggleElement';
import App from './App';

// Test Suite for 'smart-pass-gen' app
describe('smart-pass-gen app', () => {
  // Test case to check if config data is being fetched from local storage provider
  test('should fetch config data from local storage provider', () => {
    jest.spyOn(LocalStorageProvider, 'getData');
    // eslint-disable-next-line no-unused-vars
    const app = new App();

    // assertion
    expect(LocalStorageProvider.getData).toHaveBeenCalled();

    // cleanup
    jest.restoreAllMocks();
  });

  // Test case to check if app title is rendered properly
  test('should render app title properly', () => {
    const app = new App().render();
    const appTitle = app.childNodes[0];

    // assertion
    expect(appTitle.classList.contains('app-title')).toBe(true);
    expect(appTitle.textContent).toEqual('Smart Password Generator');
  });

  // Test case to check if toggling 'isSmartSymbols' option updates the config data
  test('should update config data when isSmartSymbols toggle is changed', () => {
    const app = new App();
    jest.spyOn(LocalStorageProvider, 'setData');

    // setting up dummy event for testing purpose
    const evtObj = { target: { checked: true } };

    // triggering click event on toggle
    app.isSmartSymbolsToggle.toggle(evtObj);

    // assertion
    expect(LocalStorageProvider.setData).toHaveBeenCalled();

    // cleanup
    jest.restoreAllMocks();
  });

  // Test case to check if toggling 'isUseLetters' option updates the config data
  test('should update config data when isUseLetters toggle is changed', () => {
    const app = new App();
    jest.spyOn(LocalStorageProvider, 'setData');

    // setting up dummy event for testing purpose
    const evtObj = { target: { checked: true } };

    // triggering click event on toggle
    app.isUseLettersToggle.toggle(evtObj);

    // assertion
    expect(LocalStorageProvider.setData).toHaveBeenCalled();

    // cleanup
    jest.restoreAllMocks();
  });

  // Test case to check if toggling 'isIncludeUppercase' option updates the config data
  test('should update config data when isIncludeUppercase toggle is changed', () => {
    const app = new App();
    jest.spyOn(LocalStorageProvider, 'setData');

    // setting up dummy event for testing purpose
    const evtObj = { target: { checked: true } };

    // triggering click event on toggle
    app.isIncludeUppercaseToggle.toggle(evtObj);

    // assertion
    expect(LocalStorageProvider.setData).toHaveBeenCalled();

    // cleanup
    jest.restoreAllMocks();
  });
});
