import { elements } from './base';
import image from '../../img/default.png';

// TODO: Add user data as args into this func
export const renderHeaderLogin = () => {
  const markup = `
  &nbsp;
  <nav class="user-nav">
    <div class="header__login">
      <a href="#" class="btn btn--logout">Logout</a>
    </div>

    <div class="user-nav__user">
      <img
        src="${image}"
        alt="User Photo"
        class="user-nav__user-photo"
      />
      <span class="user-nav__user-name">Jo Mama</span>
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
