import { elements, clearOverview } from '../views/base';
import * as cardView from '../views/cardView';
import * as storage from '../utils/localStorage';
import Card from '../models/cardModel';
import { state } from './overviewController';
import { showAlert } from '../utils/alert';

export const cardLoaderAndRender = async () => {
  await getCardsFromAPI();
  cardRender();
};

export const getCardsFromAPI = async () => {
  // 1. Store the card instance
  state.card = new Card();

  // 2. Get the TOKEN
  const token = storage.getObj('token') || state.user.token;

  // 3. Save the user created cards as an array
  state.card.cards = await state.card.getCards(token);
  storage.storeObj('cards', state.card.cards);
};

export const cardRender = () => {
  // 1. Render the card grid and cards on the grid
  cardView.renderCardGrid(elements.overview, state.card.cards);

  // TODO: ADD IF STATEMENT FOR WHEN THE CARDS ARRAY IS EMPTY (USER HAS NO CARDS)
};

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
