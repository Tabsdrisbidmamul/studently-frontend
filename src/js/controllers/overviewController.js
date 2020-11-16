import { elements, clearOverview } from '../views/base';
import { cardLoader, cardRender, cardMakerLoader } from './cardController';
import { loginHandler } from './loginHandler';
import User from '../models/userModel';
import Card from '../models/cardModel';
import Deck from '../models/deckModel';
import * as storage from '../utils/localStorage';
import * as cardView from '../views/cardView';
import * as deckView from '../views/deckView';

export const state = {};

// Create all instance of the model when the application starts
state.user = new User();
state.card = new Card();
state.deck = new Deck();

// FIXME: REFACTOR THIS PIECE OF SHIT
// Overview Handler
elements.overview.addEventListener('click', async (e) => {
  // user clicks login button in login form
  if (e.target.matches('.btn--btn-login')) {
    loginHandler(e);

    // User clicks a card in the card home page
  } else if (e.target.closest('.card')) {
    cardLoader(e);

    // User click 'make a new card' button in card homepage
  } else if (e.target.closest('.make-card')) {
    cardMakerLoader(e);
  }
});
