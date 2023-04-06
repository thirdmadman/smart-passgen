/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-unused-class-component-methods */
import Component from './Component';
import dch from '../utils/dch';

export default class TabsList extends Component {
  constructor(props) {
    super();
    this.tabs = props.tabs;
    this.action = props.action;

    const tabLabelList = this.getTabLabelList(props.activeTabId);
    this.rootNode = dch('div', ['tabs-list']);
    this.rootNode.append(tabLabelList);
  }

  getTabLabelList(activeTabId) {
    return this.tabs.map((tab) => {
      const label = dch('div', ['tabs-list__label'], tab.getName());
      if (tab.getId() === activeTabId) {
        label.classList.add('tabs-list__label_active');
      }
      label.onclick = () => this.action(tab.getId());
      return label;
    });
  }

  setActiveTab(tabId) {
    this.rootNode.innerHTML = '';
    const tabLabelList = this.getTabLabelList(tabId);
    this.rootNode.append(...tabLabelList);
  }
}
