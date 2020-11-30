import { elements } from '../views/base';
import { hideAlert } from '../utils/alert';
import { deleteCard } from './cardController';
import { deleteDeck } from './deckController';
import * as windowView from '../views/windowView';

export const windowDeletionHandlerCard = (cardId) => {
  // 1. Hide any remaining alerts at the top of body
  hideAlert();

  // 2. display the yes or no box to the user
  windowView.renderWindow(elements.body);

  // 3. Add event handler to when a card is deleted
  document.querySelector('body').addEventListener('click', async (e) => {
    await deleteCard(e, cardId);
  });
};

export const windowDeletionHandlerDeck = (deckId) => {
  // 1. Hide any remaining alerts at the top of body
  hideAlert();

  // 2. display the yes or no box to the user
  windowView.renderWindow(elements.body);

  // 3. Add event handler to when a card is deleted
  document.querySelector('body').addEventListener('click', async (e) => {
    await deleteDeck(e, deckId);
  });
};
