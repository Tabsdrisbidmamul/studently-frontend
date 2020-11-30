import { elements, clearOverview } from '../views/base';
import * as deckView from '../views/deckView';
import * as cardView from '../views/cardView';
import * as cardController from '../controllers/cardController';
import * as storage from '../utils/localStorage';
import { showAlert } from '../utils/alert';
import Deck from '../models/deckModel';
import { state } from './overviewController';
import { doc } from 'prettier';

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
  if (e.target.matches('.deck, .deck *')) {
    const click = e.target.closest('.deck');
    deckHandler(click);
  }
};

const createDeck = () => {
  // User clicks to create the deck
  document
    .querySelector('.icon--make-deck-right')
    .addEventListener('click', async (e) => {
      // 1. Get all the input from user
      const name = document.querySelector('.make-deck__input').value;
      const user = storage.getObj('user') || state.user.userData.id;
      const deck = state.deck.deckArray;
      const token = storage.getObj('token');

      // 2. Check if they have a deck of cards or gave it a name
      if (name && deck) {
        // 2.1 Create the Deck and reload a new deckMaker Session
        await state.deck.createDeck(name, user, deck, token);
        deckMakerLoader();
      } else {
        showAlert('error', 'Please provide a name and cards');
      }
    });
};

const cancelDeckMaker = () => {
  // User clicks to cancel the deck creation
  document
    .querySelector('.icon--make-deck-left')
    .addEventListener('click', (e) => {
      // 1. Clear the Overview
      clearOverview();

      // 2. Bring the user back to the deck homepage
      deckRender(elements.overview, state.deck.decks);
    });
};

// Get one deck from the array in local storage
const getDeck = (deckId) => {
  //1. Get the decks array
  const decks = storage.getObj('decks') || state.deck.decks;

  //2. Find the deck in the decks array via id
  return decks.filter((deck) => {
    return deck.id === deckId;
  })[0];
};

export const deckMakerLoader = (e) => {
  // 1. Clear the overview
  clearOverview();

  // 2. Render the make a deck grid layout
  deckView.renderMakeDeckGrid(elements.overview);

  // 3. Get the user cards
  const cards = state.card.cards || storage.getObj('cards');

  // 3.1 If they have cards, render them to the page
  if (cards.length !== 0) {
    deckView.renderResults(cards);
    searchButtonHandler();
  }

  // 4. Create the DeckArray reference
  const deckArray = [];

  // 5. Add the event handlers
  getCardItem();
  swapCardFacing();
  addCardToDeckHandler(deckArray);
  removeCardFromDeck(deckArray);
  createDeck();
  cancelDeckMaker();
};

const addCardToDeckHandler = (deckArray) => {
  document
    .querySelector('.make-deck__list--user')
    .addEventListener('click', (e) => {
      // 1. Get the item that was click
      const item = e.target.closest('.icon');

      // 2. Check if the click was a plus icon
      if (item) {
        // 2.1 Get the card Id from the item
        const cardId = item.parentNode.parentNode.dataset.card;

        // 2.2 Store and get the card from state or local storage
        storeCard(cardId);
        const card = cardController.getCard(cardId);

        // 2.3 Add the card to the local deckArray reference
        deckArray.push(card);

        // 2.4 Store the deckArray to local storage
        state.deck.deckArray = deckArray;
        storage.storeObj('decks.deckArray', state.deck.deckArray);

        // 2.5 Render the results to the deck card section
        deckView.renderResultsDeck(deckArray);

        // 2.6 more than 4 cards, start adding in the paginating handler
        if (deckArray.length > 4) {
          searchButtonHandler();
        }
      }
    });
};

const getCardFromDeckArray = (deckArray, cardId) => {
  deckArray.forEach((el, i) => {
    if (el.id === cardId) {
      return i;
    }
  });
};

const removeCardFromDeck = (deckArray) => {
  document
    .querySelector('.make-deck__list--deck')
    .addEventListener('click', (e) => {
      // 1. Get the item was clicked
      const item = e.target.closest('.icon');

      // 2. Check if the item was a card that was click
      if (item) {
        // 2.1 Get the card id
        const cardId = item.parentNode.parentNode.dataset.card;

        // 2.2 Get the index from the deckArray
        let index;
        deckArray.forEach((el, i) => {
          if (el.id === cardId) {
            index = i;
          }
        });

        // 2.3 Remove it from the Deck array
        // const index = getCardFromDeckArray(deckArray, cardId);
        deckArray.splice(index, 1);

        // 2.4 Re-render the deck cards back to the screen
        deckView.renderResultsDeck(deckArray);
      }
    });
};

// When the user presses next or prev
const searchButtonHandler = () => {
  document
    .querySelector('.make-deck__paginate--user')
    .addEventListener('click', (e) => {
      // 1. See if the button was clicked
      const btn = e.target.closest('.btn--inline');
      if (btn) {
        // 1.1. get the page number from the dataset
        const goToPage = parseInt(btn.dataset.goto, 10);
        const cards = state.card.cards || storage.getObj('cards');

        // 1.2. clear the card results and pagination
        deckView.clearUserCardsResults();

        // 1.3. Render the new cards and new buttons
        deckView.renderResults(cards, goToPage);
        window.scroll(0, 0);
      }
    });

  document
    .querySelector('.make-deck__paginate--deck')
    .addEventListener('click', (e) => {
      // 1. See if the button was clicked
      const btn = e.target.closest('.btn--inline');
      if (btn) {
        // 1.1. get the page number from the dataset
        const goToPage = parseInt(btn.dataset.goto, 10);
        const deckArray =
          state.deck.deckArray || storage.getObj('decks.deckArray');

        // 1.2. clear the card results and pagination
        deckView.clearDeckCardsResults();

        // 1.3. Render the new cards and new buttons
        deckView.renderResultsDeck(deckArray, goToPage);
        window.scroll(0, 0);
      }
    });
};

const renderCardValue = (value) => {
  deckView.renderMakeCard(document.querySelector('.card--make'), value);
};

const storeCard = (cardId) => {
  state.deck.card = cardId;
  storage.storeObj('decks.card', cardId);
};

const getCardItem = () => {
  document
    .querySelector('.make-deck__list--user')
    .addEventListener('click', getCardItemHandler);

  document
    .querySelector('.make-deck__list--deck')
    .addEventListener('click', getCardItemHandler);
};

const getCardItemHandler = (e) => {
  {
    // 1. Get the card that was clicked
    const item = e.target.closest('.make-deck__item');

    if (item) {
      // 2. Store a reference of the card that was clicked
      const cardId = item.dataset.card;
      storeCard(cardId);

      // 3. Render the question to the card
      const card = cardController.getCard(cardId);
      renderCardValue(card.question);
    }
  }
};

const swapCardFacing = () => {
  let value = '';
  let cardFacing = 'question';

  document
    .querySelector('.make-deck__switch')
    .addEventListener('click', (e) => {
      // card to be swapped over to answer side
      if (cardFacing === 'question') {
        value = cardController.getCard(
          state.deck.card || storage.getObj('decks.card')
        ).question;
        cardFacing = 'answer';

        // card to be swapped over to question side
      } else {
        value = cardController.getCard(
          state.deck.card || storage.getObj('decks.card')
        ).answer;
        cardFacing = 'question';
      }

      renderCardValue(value);
    });
};

// When the user interacts with the decks in the overview
const deckHandler = (click) => {
  try {
    // 1. Get the Deck Id
    const deckId = click.dataset.deck;

    //2. Get the deck data from the Id
    const deckData = getDeck(deckId);

    //3. Get the cards associated with the deck
    const deckCards = deckData.cards;

    //4. Render the deck cards
    cardController.deckCardRender(deckCards);
  } catch (err) {
    showAlert('error', err.message);
  }
};
