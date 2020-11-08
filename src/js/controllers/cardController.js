import { elements } from '../views/base';
import * as cardView from '../views/cardView';
import * as storage from '../utils/localStorage';
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
          cardData[0]
        );
      } else {
        cardView.renderCardAnswer(
          document.querySelector(`.card-${cardId}`),
          cardData[0]
        );
      }
    } catch (err) {}
  }
};


