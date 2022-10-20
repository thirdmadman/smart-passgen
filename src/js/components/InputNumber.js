import Component from './Component';
import dch from '../utils/dch';

export default class InputNumber extends Component {
  constructor(props) {
    super();
    this.rootNode = dch('div', ['input-group']);
    const inputEl = dch('input', ['input-group__input']);
    const label = dch('label', ['input-group__label']);
    inputEl.type = 'number';
    inputEl.value = props.value;
    inputEl.min = 1;
    inputEl.max = 10000;
    inputEl.onchange = (e) => props.onchange(e);
    label.append(inputEl);
    label.append(dch('span', [], props.textContent));
    this.rootNode.append(label);
  }
}
