import { elements, clearOverview } from '../views/base';
import * as headerView from '../views/headerView';
import * as cardView from '../views/cardView';
import * as storage from '../utils/localStorage';
import { cardLoaderAndRender } from './cardController';
import User from '../models/userModel';

export const state = {};

// Logging in handler
const loginHandler = (e) => {
  e.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  // 1. add current instance of user to global object
  state.user = new User();
  state.user.login(email, password);
  state.user.email = email;

  // 2. Clear the Login Form
  window.setTimeout(clearOverview, 2500);

  // TODO: Render user to the header bar
  window.setTimeout(headerView.renderHeaderLogin, 2500);

  // 4. Load and render User cards
  window.setTimeout(cardLoaderAndRender, 2500);
};

// When the user interacts with cards in the overview
//TODO: ADD CATCHING FOR THE ERROR ON CARD_DATA
const cardLoader = (e) => {
  const click = e.target.closest('.card');
  if (e.target.matches('.card, .card *')) {
    // 1. Get the Card Id
    const cardId = click.dataset.card;

    //2. Get the cards array
    const cards = storage.getObj('cards') || state.card.cards;

    //3. Find the card in the cards array via id
    const cardData = cards.filter((card) => {
      return card.id === cardId;
    });

    // 4. check if the card is a question card or an answer card
    if (click.children.length > 1) {
      cardView.renderCardQuestion(
        document.querySelector(`.card-${cardId}`),
        cardData[0]
      );
    } else {
      cardView.renderCardAnswer(
        document.querySelector(`.card-${cardId}`),
        cardData[0]
      );
    }
  }
};

// FIXME: REFACTOR THIS PIECE OF SHIT
// Overview Handler
elements.overview.addEventListener('click', async (e) => {
  // user clicks login button in login form
  if (e.target.matches('.btn--btn-login')) {
    loginHandler(e);

    // User clicks a card in the card home page
  } else if (e.target.closest('.card')) {
    cardLoader(e);
  } else if (e.target.closest('.make-card')) {
    console.log("we're in");
  }
});
