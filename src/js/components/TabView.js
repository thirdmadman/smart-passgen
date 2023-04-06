/* eslint-disable react/no-unused-class-component-methods */
import Component from './Component';
import dch from '../utils/dch';

export default class TabView extends Component {
  constructor(props) {
    super();
    const { id, name, elements } = props;
    this.id = id;
    this.name = name;
    this.rootNode = dch('div', ['tab-view']);
    this.rootNode.append(...elements);
    this.setIsActive(false);
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  setIsActive(state) {
    if (state) {
      this.rootNode.classList.remove('tab-view_is-hidden');
      return state;
    }

    this.rootNode.classList.add('tab-view_is-hidden');
    return state;
  }
}
