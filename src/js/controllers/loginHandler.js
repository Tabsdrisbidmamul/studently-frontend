import { clearOverview } from '../views/base';
import { state } from './overviewController';
import * as headerView from '../views/headerView';
import { cardLoaderAndRender } from './cardController';
import User from '../models/userModel';

// Logging in handler
export const loginHandler = async (e) => {
  e.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  // 1. add current instance of user to global object
  // state.user = new User();

  // 2. Check if the login was successful
  const loggedIn = await state.user.login(email, password);

  // 3. Only render the User Ui for a successful login
  if (loggedIn) {
    state.user.email = email;

    // 3.2. Clear the Login Form
    window.setTimeout(clearOverview, 2500);

    // 3.3 Render the user info to the Login UI
    window.setTimeout(headerView.renderHeaderLogin, 2500);

    // 3.4. Load and render User cards
    window.setTimeout(cardLoaderAndRender, 3500);
  }
};
