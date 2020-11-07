import axios from 'axios';
import { showAlert } from '../utils/alert';

export default class Card {
  constructor() {}

  async getCards(token) {
    try {
      const res = await axios.get(
        'https://polar-savannah-53668.herokuapp.com/api/v0/users/my-cards',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data.data.card;
    } catch (err) {
      console.log(err);
      showAlert('error', err.message);
    }
  }
}
