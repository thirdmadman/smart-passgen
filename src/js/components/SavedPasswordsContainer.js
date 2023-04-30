/* eslint-disable react/no-unused-class-component-methods */
import Component from './Component';
import dch from '../utils/dch';

export default class SavedPasswordsContainer extends Component {
  constructor(props) {
    super();
    this.rootNode = dch('div', ['passwords-container']);
    this.renderList(props.passwordsList);
  }

  renderList(passwordsList) {
    this.rootNode.innerHTML = '';
    const createPasswordRecordElement = (passwordRecord) => {
      const { date, password } = passwordRecord;
      const passwordEl = dch('div', ['password-record__password'], password);
      const dateEl = dch('div', ['password-record__date'], date);

      return dch('div', ['password-record'], '', [passwordEl, dateEl]);
    };

    const recordsList = passwordsList
      .sort((a, b) => Date.parse(a) - Date.parse(b))
      .reverse()
      .map((passwordRecord) => createPasswordRecordElement(passwordRecord));

    this.rootNode.append(...recordsList);
  }
}
