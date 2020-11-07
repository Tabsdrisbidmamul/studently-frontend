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
      }
    } catch (err) {
      console.log(err);
      const { message } = err;
      showAlert('error', message);
    }
  }

  getToken() {
    return this.token;
  }
}
