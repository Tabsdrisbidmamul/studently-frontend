import { elements, clearOverview } from '../views/base';
import * as loginView from '../views/loginView';
import * as headerView from '../views/headerView';
import * as cardView from '../views/cardView';
import * as storage from '../utils/localStorage';
import User from '../models/userModel';
import Card from '../models/cardModel';

const state = {};

// FIXME: REFACTOR THIS SHIT
elements.overview.addEventListener('click', async (e) => {
  // user clicks login button in login form
  if (e.target.matches('.btn--btn-login')) {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    // add current instance of user to global object
    state.user = new User();
    state.user.login(email, password);
    state.user.email = email;

    // Clear the Login Form
    window.setTimeout(clearOverview, 2500);

    // TODO: Render user to the header bar
    headerView.renderHeaderLogin();

    // User clicks a card in the card home page
  } else if (e.target.closest('.card')) {
    const click = e.target.closest('.card');
    if (click) {
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
    }
  } else if (e.target.closest('.make-card')) {
    console.log("we're in");
  }
});

// User clicks login button in the header
elements.headerLoginBtn.addEventListener('click', (e) => {
  if (e.target.matches('.btn')) {
    clearOverview();
    loginView.renderLoginForm(elements.overview);
  }
});

// TODO: MAKE THIS A FUNCTION SO WE CAN RECALL IT WHEN A USER LOGS IN
// User clicks 'MY CARDS' in the sidebar nav
elements.card.addEventListener('click', async (e) => {
  // 1. Clear the overview page
  clearOverview();

  // 2. Store the card instance
  state.card = new Card();
  console.log(storage.getObj('token'));
  const token = storage.getObj('token') || state.user.token;

  // 3. Save the user created cards as an array
  state.card.cards = await state.card.getCards(token);
  storage.storeObj('cards', state.card.cards);

  console.log(state.card.cards);

  // 4. Render the card grid and cards on the grid
  cardView.renderCardGrid(elements.overview, state.card.cards);
});
