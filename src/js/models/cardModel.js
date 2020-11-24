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
      const { message } = err.response.data;
      showAlert('error', message);
    }
  }

  async createCard(question, answer, user, token) {
    try {
      const res = await axios.post(
        'https://polar-savannah-53668.herokuapp.com/api/v0/cards',
        {
          question,
          answer,
          user,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.status === 'success') {
        showAlert('success', 'Card was created');
      }
    } catch (err) {
      const { message } = err.response.data;
      showAlert('error', message);
    }
  }
}
