import { elements } from './base';
import image from '../../img/default.png';
import * as storage from '../utils/localStorage';

// TODO: Add user data as args into this func
export const renderHeaderLogin = (user) => {
  // FIXME: User value comes up undefined when they login due to promise
  if (!user) {
    user = storage.getObj('user');
  }

  const markup = `
  &nbsp;
  <nav class="user-nav">
    <div class="header__login">
      <a href="#" class="btn btn--logout">Logout</a>
    </div>

    <div class="user-nav__user">
      <img
        src="https://polar-savannah-53668.herokuapp.com/img/users/${user.photo}"
        alt="${user.name} Photo"
        class="user-nav__user-photo"
      />
      <span class="user-nav__user-name">${user.name}</span>
    </div>
</nav>`;

  elements.header.innerHTML = markup;
};

export const renderHeaderDefault = () => {
  const markup = `
  &nbsp;
  <div class="header__login">
    <a href="#" class="btn btn--login">Login</a>
    <a href="#" type="submit" class="btn btn--ghost">Sign up</a>
  </div>`;

  elements.header.innerHTML = markup;
};
