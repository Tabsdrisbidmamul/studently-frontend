import { elements } from './base';
import image from '../../img/default.png';

export const renderHeaderLogin = () => {
  const markup = `
  &nbsp;
  <nav class="user-nav">
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
