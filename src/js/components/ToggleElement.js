import Component from './Component';
import dch from '../utils/dch';

export default class ToggleElement extends Component {
  constructor(props) {
    super();
    this.rootNode = dch('div', ['toggle-group']);
    const toggleButton = dch('input', ['toggle-group__button']);
    const label = dch('label', ['toggle-group__label']);
    toggleButton.type = 'checkbox';
    toggleButton.checked = props.currentState;
    toggleButton.onclick = (e) => props.onclick(e);
    label.append(toggleButton);
    label.append(dch('span', [], props.textContent));
    this.rootNode.append(label);
  }
}
