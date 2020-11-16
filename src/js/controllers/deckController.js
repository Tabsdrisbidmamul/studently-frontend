import { elements, clearOverview } from '../views/base';
import * as deckView from '../views/deckView';
import * as storage from '../utils/localStorage';
import { showAlert } from '../utils/alert';
import Deck from '../models/deckModel';
import { state } from './overviewController';

export const deckLoaderAndRender = async () => {
  await getDecksFromAPI();
  deckRender();
};

export const getDecksFromAPI = async () => {
  const token = storage.getObj('token') || state.user.token;

  if (!token) {
    return new Error('You are not logged in');
  }

  state.deck.decks = await state.deck.getDecks(token);
  storage.storeObj('decks', state.deck.decks);
};

export const deckRender = () => {
  deckView.renderDeckGrid(elements.overview, state.deck.decks);
};

export const deckLoader = (e) => {
  const click = e.target.closest('.deck');
  if (e.target.matches('.deck, .deck *')) {
    try {
      // 1. Get the Deck Id
      const deckId = click.dataset.deck;

      //2. Get the decks array
      const decks = storage.getObj('decks') || state.deck.decks;

      //3. Find the deck in the decks array via id
      const deckData = decks.filter((deck) => {
        return deck.id === deckId;
      });

      deckView.renderDeckName(
        document.querySelector(`.deck-${deckId}`),
        deckData[0].name
      );
    } catch (err) {}
  }
};

const createDeck = (e) => {
  // User clicks to create the deck
  document
    .querySelector('.icon--make-deck-right')
    .addEventListener('click', (e) => {
      const name = document.querySelector('.textarea-q').value;
      const user = storage.getObj('user') || state.user.userData.id;

      if (name && user) {
        state.deck.createDeck(name, user, storage.getObj('token'));
      } else {
        showAlert('error', 'Please enter a name');
      }
    });
};

const cancelDeckMaker = (e) => {
  // User clicks to cancel the deck creation
  document
    .querySelector('.icon--make-deck-left')
    .addEventListener('click', (e) => {
      clearOverview();
      deckRender(elements.overview, state.deck.decks);
    });
};

export const deckMakerLoader = (e) => {
  clearOverview();
  deckView.renderMakeDeckGrid(elements.overview);
  createDeck(e);
  cancelDeckMaker(e);
};
