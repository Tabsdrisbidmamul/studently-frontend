import { elements, clearOverview } from '../views/base';
import { cardLoader, cardRender, cardMakerLoader } from './cardController';
import { loginHandler } from './loginHandler';
import User from '../models/userModel';
import Card from '../models/cardModel';
import * as storage from '../utils/localStorage';
import * as cardView from '../views/cardView';

export const state = {};

// Create all instance of the model when the application starts
state.user = new User();
state.card = new Card();

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

    // // set the boolean for card facing
    // let cardFacing = 'question';

    // // question box update the value in real time to the card
    // document.querySelector('.textarea-q').addEventListener('input', (e) => {
    //   cardView.renderCardQuestion(
    //     document.querySelector('.card--make'),
    //     document.querySelector('.textarea-q').value
    //   );
    // });

    // // answer box update the value in real time to the card
    // document.querySelector('.textarea-a').addEventListener('input', (e) => {
    //   cardView.renderCardQuestion(
    //     document.querySelector('.card--make'),
    //     document.querySelector('.textarea-a').value
    //   );
    // });

    // // swap card facing side
    // document.querySelector('.btn--switch').addEventListener('click', (e) => {
    //   let textareaBox = '.textarea-q';
    //   if (cardFacing === 'question') {
    //     textareaBox = '.textarea-q';
    //     cardFacing = 'answer';
    //   } else {
    //     textareaBox = '.textarea-a';
    //     cardFacing = 'question';
    //   }

    //   cardView.renderCardQuestion(
    //     document.querySelector('.card--make'),
    //     document.querySelector(textareaBox).value
    //   );
    // });

    // // User clicks to create the card
    // document
    //   .querySelector('.icon--make-card-right')
    //   .addEventListener('click', (e) => {
    //     console.log("we're in");
    //     const question = document.querySelector('.textarea-q').value;
    //     const answer = document.querySelector('.textarea-a').value;
    //     const user = storage.getObj('user') || state.user.userData.id;

    //     state.card.createCard(question, answer, user, storage.getObj('token'));
    //   });

    // // User clicks to cancel the card creation
    // document
    //   .querySelector('.icon--make-card-left')
    //   .addEventListener('click', (e) => {
    //     clearOverview();
    //     cardRender(elements.overview, state.card.cards);
    //   });
  }
});
