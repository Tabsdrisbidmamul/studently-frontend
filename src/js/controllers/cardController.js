import { elements, clearOverview } from '../views/base';
import * as cardView from '../views/cardView';
import * as storage from '../utils/localStorage';
import { showAlert } from '../utils/alert';
import Card from '../models/cardModel';
import { state } from './overviewController';

export const cardLoaderAndRender = async () => {
  await getCardsFromAPI();
  cardRender();
};

export const getCardsFromAPI = async () => {
  // 1. Store the card instance
  // state.card = new Card();

  // 2. Get the TOKEN
  const token = storage.getObj('token') || state.user.token;

  if (!token) {
    return new Error('You are not logged in');
  }

  // 3. Save the user created cards as an array
  state.card.cards = await state.card.getCards(token);
  storage.storeObj('cards', state.card.cards);
};

export const cardRender = () => {
  // 1. Render the card grid and cards on the grid
  cardView.renderCardGrid(elements.overview, state.card.cards);

  // TODO: ADD IF STATEMENT FOR WHEN THE CARDS ARRAY IS EMPTY (USER HAS NO CARDS)
};

// When the user interacts with cards in the overview
export const cardLoader = (e) => {
  const click = e.target.closest('.card');
  if (e.target.matches('.card, .card *')) {
    try {
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
          cardData[0].question
        );
      } else {
        cardView.renderCardAnswer(
          document.querySelector(`.card-${cardId}`),
          cardData[0].answer
        );
      }
    } catch (err) {}
  }
};

//
const QAndAValueChanger = (e) => {
  // 1. question box update the value in real time to the card
  document.querySelector('.textarea-q').addEventListener('input', (e) => {
    cardView.renderCardQuestion(
      document.querySelector('.card--make'),
      document.querySelector('.textarea-q').value
    );
  });

  // 2. answer box update the value in real time to the card
  document.querySelector('.textarea-a').addEventListener('input', (e) => {
    cardView.renderCardQuestion(
      document.querySelector('.card--make'),
      document.querySelector('.textarea-a').value
    );
  });
};

const swapCardFacing = (e) => {
  // 1. set the boolean for card facing
  let cardFacing = 'question';

  // 2. swap card facing side
  document.querySelector('.btn--switch').addEventListener('click', (e) => {
    let textareaBox = '.textarea-q';
    if (cardFacing === 'question') {
      textareaBox = '.textarea-q';
      cardFacing = 'answer';
    } else {
      textareaBox = '.textarea-a';
      cardFacing = 'question';
    }

    cardView.renderCardQuestion(
      document.querySelector('.card--make'),
      document.querySelector(textareaBox).value
    );
  });
};

const createCard = (e) => {
  // User clicks to create the card
  document
    .querySelector('.icon--make-card-right')
    .addEventListener('click', (e) => {
      const question = document.querySelector('.textarea-q').value;
      const answer = document.querySelector('.textarea-a').value;
      const user = storage.getObj('user') || state.user.userData.id;

      if (question && answer && user) {
        state.card.createCard(question, answer, user, storage.getObj('token'));
      } else {
        showAlert('error', 'Please enter a question and an answer');
      }
    });
};

const cancelCardMaker = (e) => {
  // User clicks to cancel the card creation
  document
    .querySelector('.icon--make-card-left')
    .addEventListener('click', (e) => {
      clearOverview();
      cardRender(elements.overview, state.card.cards);
    });
};

export const cardMakerLoader = (e) => {
  clearOverview();
  cardView.renderMakeCardGrid(elements.overview);
  QAndAValueChanger(e);
  swapCardFacing(e);
  createCard(e);
  cancelCardMaker(e);
};
