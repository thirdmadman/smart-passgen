import App from './js/App';
import 'normalize.css';
import './scss/style.scss';

// eslint-disable-next-line no-unused-vars
const app = new App();

document.querySelector('.app').replaceWith(app.render());
