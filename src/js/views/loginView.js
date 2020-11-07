import { elements } from './base';

export const renderLoginForm = (parent) => {
  const loginForm = `          
  <div class="login">
    <form action="#" class="form">
      <div class="form__group">
        <input type="email" class="form__input" id="email" placeholder="Email Address" required>
        <label for="email" class="form__label">Email Address</label>
      </div>
      
      <div class="form__group">
        <input type="password" class="form__input" id="password" placeholder="Password" required>
        <label for="password" class="form__label">Password</label>
      </div>

      <div class="form__group">
        <span class="form__span"><a href="#" class="form__link">Forgot your password?</a></span>
      </div>
      
      <div class="form__group">
        <button class="btn--btn-login">Login</button>
      </div>
    </form>
  </div>`;

  parent.insertAdjacentHTML('afterbegin', loginForm);
};
