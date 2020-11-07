import { elements, clearOverview } from '../views/base';
import * as headerView from '../views/headerView';
import * as loginView from '../views/loginView';
import * as storage from '../utils/localStorage';

if (storage.getObj('token')) {
  headerView.renderHeaderLogin();
}

// User clicks logout button in header
elements.header.addEventListener('click', (e) => {
  if (e.target.matches('.btn--logout')) {
    clearOverview();
    headerView.renderHeaderDefault();
    storage.removeObj('token');
    // User clicks login
  } else if (e.target.matches('.btn--login')) {
    clearOverview();
    loginView.renderLoginForm(elements.overview);
  }
});

// User clicks login button in the header
// elements.headerLoginBtn.addEventListener('click', (e) => {
//   if (e.target.matches('.btn')) {
//     clearOverview();
//     loginView.renderLoginForm(elements.overview);
//   }
// });
