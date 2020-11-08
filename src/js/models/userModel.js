import axios from 'axios';
import * as storage from '../utils/localStorage';
import { showAlert } from '../utils/alert';

export default class User {
  constructor() {}

  async login(email, password) {
    try {
      const res = await axios.post(
        'https://polar-savannah-53668.herokuapp.com/api/v0/users/login',
        { email, password }
      );
      if (res.data.status === 'success') {
        showAlert('success', 'Logged in successfully!');
        this.token = await res.data.token;
        storage.storeObj('token', this.token);

        // add user info to the state object
        await this.getMe();
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
      const { message } = err.response.data;
      showAlert('error', message);
    }
  }

  async getMe() {
    if (this.token || storage.getObj('token')) {
      try {
        const res = await axios.get(
          'https://polar-savannah-53668.herokuapp.com/api/v0/users/my-account',
          { headers: { Authorization: `Bearer ${this.token}` } }
        );

        if (res.data.status === 'success') {
          this.userData = await res.data.data.user;
          storage.storeObj('user', this.userData);
        }
      } catch (err) {
        const message = err.response.data;
        showAlert('error', message);
      }
    }
  }
}
