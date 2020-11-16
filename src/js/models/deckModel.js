import axios from 'axios';
import { showAlert } from '../utils/alert';

export default class Deck {
  constructor() {}

  async getDecks(token) {
    try {
      const res = await axios.get(
        'https://polar-savannah-53668.herokuapp.com/api/v0/users/my-decks',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data.data.deck;
    } catch (err) {
      const { message } = err.response.data;
      showAlert('error', message);
    }
  }

  async createCard(name, user, token) {
    try {
      const res = await axios.post(
        'https://polar-savannah-53668.herokuapp.com/api/v0/cards',
        {
          name,
          user,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.status === 'success') {
        showAlert('success', 'Deck was created');
      }
    } catch (err) {
      const { message } = err.response.data;
      showAlert('error', message);
    }
  }
}
