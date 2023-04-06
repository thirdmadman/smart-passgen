import dch from './utils/dch';
import SmartPassGen from './services/SmartPassGen';
import ToggleElement from './components/ToggleElement';
import InputNumber from './components/InputNumber';
import LocalStorageProvider from './services/LocalStorageProvider';
import TabView from './components/TabView';
import TabsContainer from './components/TabsContainer';
import SavedPasswordsContainer from './components/SavedPasswordsContainer';

export default class App {
  constructor() {
    let configData = LocalStorageProvider.getData();

    const appTitle = dch('div', ['app-title'], 'Smart Password Generator');

    const configGroup = dch('div', ['config-group']);

    const smartPassGen = new SmartPassGen(configData.config.generatorConfig);

    this.mainEl = document.querySelector('.app');

    const buttonGeneratePassword = dch('button', ['button-generate'], 'Generate');
    const currentPasswordText = dch('div', ['password-text'], 'Here will be your password');
    currentPasswordText.contentEditable = true;

    const toggleOption = (optionName, event) => {
      smartPassGen.options[optionName] = event.target.checked;
      configData.config.generatorConfig[optionName] = event.target.checked;
      LocalStorageProvider.setData(configData);
      configData = LocalStorageProvider.getData();
    };

    const isSmartSymbolsToggle = new ToggleElement({
      textContent: 'Use smart generator',
      onclick: (e) => toggleOption('isSmartSymbols', e),
      currentState: smartPassGen.options.isSmartSymbols,
    });

    const isUseLettersToggle = new ToggleElement({
      textContent: 'Include letters',
      onclick: (e) => toggleOption('isUseLetters', e),
      currentState: smartPassGen.options.isUseLetters,
    });

    const isIncludeUppercaseToggle = new ToggleElement({
      textContent: 'Include uppercase letters',
      onclick: (e) => toggleOption('isIncludeUppercase', e),
      currentState: smartPassGen.options.isIncludeUppercase,
    });

    const isUseNumbersToggle = new ToggleElement({
      textContent: 'Include numbers',
      onclick: (e) => toggleOption('isUseNumbers', e),
      currentState: smartPassGen.options.isUseNumbers,
    });

    const isUseSpecialSymbols = new ToggleElement({
      textContent: 'Include special symbols',
      onclick: (e) => toggleOption('isUseSpecialSymbols', e),
      currentState: smartPassGen.options.isUseSpecialSymbols,
    });

    const isUseSpecialSymbolsAdvancedToggle = new ToggleElement({
      textContent: 'Include special symbols (advanced)',
      onclick: (e) => toggleOption('isUseSpecialSymbolsAdvanced', e),
      currentState: smartPassGen.options.isUseSpecialSymbolsAdvanced,
    });

    buttonGeneratePassword.onclick = () => {
      const passwordText = smartPassGen.generate();
      currentPasswordText.innerText = passwordText;

      if (configData.config.configCore.isSavePasswords) {
        configData.lastPasswords.push({
          date: new Date().toISOString(),
          url: '',
          password: passwordText,
        });

        LocalStorageProvider.setData(configData);
        configData = LocalStorageProvider.getData();
      }
    };

    const inputNumber = new InputNumber({
      textContent: 'Number of symbols',
      onchange: (e) => {
        smartPassGen.options.length = e.target.value;
        configData.config.generatorConfig.length = Number.parseInt(e.target.value, 10);
        LocalStorageProvider.setData(configData);
        configData = LocalStorageProvider.getData();
      },
      value: smartPassGen.options.length,
    });

    const isSavePasswords = new ToggleElement({
      textContent: 'Save passwords',
      onclick: (e) => {
        configData.config.configCore.isSavePasswords = e.target.checked;
        LocalStorageProvider.setData(configData);
        configData = LocalStorageProvider.getData();
      },
      currentState: configData.config.configCore.isSavePasswords,
    });

    configGroup.append(
      inputNumber.getElement(),
      isSmartSymbolsToggle.getElement(),
      isUseLettersToggle.getElement(),
      isIncludeUppercaseToggle.getElement(),
      isUseNumbersToggle.getElement(),
      isUseSpecialSymbols.getElement(),
      isUseSpecialSymbolsAdvancedToggle.getElement(),
    );

    const buttonRemoveAllPasswords = dch('button', ['button-generate'], 'Remove All Passwords');

    const mainTab = new TabView({
      id: 0,
      name: 'Main',
      elements: [buttonGeneratePassword, currentPasswordText, configGroup],
    });
    const savedPasswordsContainer = new SavedPasswordsContainer({ passwordsList: LocalStorageProvider.getData().lastPasswords });

    buttonRemoveAllPasswords.onclick = () => {
      configData.lastPasswords = [];
      LocalStorageProvider.setData(configData);
      configData = LocalStorageProvider.getData();

      savedPasswordsContainer.renderList(LocalStorageProvider.getData().lastPasswords);
    };

    const savedPasswordsTab = new TabView({
      id: 1,
      name: 'Passwords',
      elements: [savedPasswordsContainer.getElement(), buttonRemoveAllPasswords],
    });

    const configsTab = new TabView({
      id: 2,
      name: 'Configs',
      elements: [isSavePasswords.getElement()],
    });

    const switchAction = (id) => {
      savedPasswordsContainer.renderList(LocalStorageProvider.getData().lastPasswords);

      configData.config.configCore.lastTab = id;

      LocalStorageProvider.setData(configData);
      configData = LocalStorageProvider.getData();
    };

    const tabsContainer = new TabsContainer({
      tabs: [mainTab, savedPasswordsTab, configsTab],
      activeTabId: configData.config.configCore.lastTab || 0,
      switchAction,
    });

    this.mainEl.append(appTitle, tabsContainer.getElement());
  }
}
