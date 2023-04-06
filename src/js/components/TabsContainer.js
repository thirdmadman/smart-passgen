/* eslint-disable react/no-unused-class-component-methods */
import Component from './Component';
import dch from '../utils/dch';
import TabsList from './TabsList';

export default class TabsContainer extends Component {
  tabs = [];

  constructor(props) {
    super();
    this.rootNode = dch('div', ['tabs-container']);
    this.tabs = props.tabs;
    this.switchAction = props.switchAction;
    this.tabsList = new TabsList({ tabs: this.tabs, action: (tabId) => this.switchActiveTab(tabId), activeTabId: 0 });
    this.switchActiveTab(props.activeTabId);
  }

  switchActiveTab(tabId) {
    let activeTabId = tabId;
    if (tabId > this.tabs.length - 1) {
      activeTabId = 0;
    }
    this.tabsList.setActiveTab(activeTabId);

    this.switchAction(activeTabId);

    this.tabs.forEach((tab) => {
      if (tab.getId() === activeTabId) {
        tab.setIsActive(true);
      } else {
        tab.setIsActive(false);
      }
    });

    this.rootNode.innerHTML = '';
    const tabToShow = this.tabs.find((tab) => tab.getId() === activeTabId);
    this.rootNode.append(this.tabsList.getElement(), tabToShow.getElement());
  }
}
