import dhc from './utils/dch';
import SmartPassGen from './services/SmartPassGen';

export default class App {
  constructor() {
    this.mainEl = document.querySelector('.app');
    const buttonGenerate = dhc('button', ['button-generate'], 'Generate');
    const smartPassGen = new SmartPassGen();
    buttonGenerate.onclick = () => this.mainEl.append(dhc('div', ['pass'], smartPassGen.generate()));
    this.mainEl.append(buttonGenerate);
  }
}
