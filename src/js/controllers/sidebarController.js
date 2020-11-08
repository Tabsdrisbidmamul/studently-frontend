import { elements, clearOverview } from '../views/base';
import { getCardsFromAPI, cardRender } from './cardController';
import { state } from './overviewController';
import { showAlert } from '../utils/alert';
import * as storage from '../utils/localStorage';

// User clicks 'MY CARDS' in the sidebar nav
elements.card.addEventListener('click', async (e) => {
  try {
    // 1. Clear the overview page
    clearOverview();

    // 2. Check if the user is authenticated
    if (storage.getObj('token') || state.user) {
      // 3. Get and Load the cards
      await getCardsFromAPI();
      cardRender();

      // 2.1 Tell them to login
    } else {
      throw new Error('You are not logged in');
    }
  } catch (err) {
    showAlert('error', err.message);
  }
});
