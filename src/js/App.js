import dhc from './utils/dch';
import SmartPassGen from './services/SmartPassGen';
import ToggleElement from './components/ToggleElement';
import InputNumber from './components/InputNumber';
import LocalStorageProvider from './services/LocalStorageProvider';

export default class App {
  constructor() {
    let configData = LocalStorageProvider.getData();

    const appTitle = dhc('div', ['app-title'], 'Smart PassGen');

    const configGroup = dhc('div', ['config-group']);

    const smartPassGen = new SmartPassGen(configData.config.generatorConfig);

    this.mainEl = document.querySelector('.app');
    const buttonGeneratePassword = dhc('button', ['button-generate'], 'Generate');
    const currentPasswordText = dhc('div', ['password-text'], 'Here will be your password');
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

      configData.lastPasswords.push({
        date: new Date().toISOString(),
        url: '',
        password: passwordText,
      });

      LocalStorageProvider.setData(configData);
      configData = LocalStorageProvider.getData();
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

    this.mainEl.append(appTitle);
    this.mainEl.append(buttonGeneratePassword);
    this.mainEl.append(currentPasswordText);

    configGroup.append(inputNumber.getElement());
    configGroup.append(isSmartSymbolsToggle.getElement());
    configGroup.append(isUseLettersToggle.getElement());
    configGroup.append(isIncludeUppercaseToggle.getElement());
    configGroup.append(isUseNumbersToggle.getElement());
    configGroup.append(isUseSpecialSymbols.getElement());
    configGroup.append(isUseSpecialSymbolsAdvancedToggle.getElement());

    this.mainEl.append(configGroup);
  }
}
