import { elements, clearOverview } from '../views/base';
import { getCardsFromAPI, cardRender } from './cardController';
import { getDecksFromAPI, deckRender } from './deckController';
import { getClassroomsFromAPI, classroomRender } from './classroomController';
import { state } from './overviewController';
import { showAlert } from '../utils/alert';
import * as storage from '../utils/localStorage';

elements.sidebar.addEventListener('click', (e) => {
  const click = e.target.closest('.side-nav__item');
  if (click) renderActiveItem(e.target.closest('.side-nav__item'));
});

export const renderActiveItem = (click) => {
  elements.sidebarItem.forEach((item) => {
    item.classList.remove('side-nav__item--active');
  });

  click.classList.add('side-nav__item--active');
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

// User clicks 'MY DECKS' in the sidebar nav
elements.deck.addEventListener('click', async (e) => {
  try {
    // 1. Clear the overview page
    clearOverview();

    // 2. Check if the user is authenticated
    if (storage.getObj('token') || state.user) {
      // 3. Get and Load the decks
      await getDecksFromAPI();
      deckRender();

      // 2.1 Tell them to login
    } else {
      throw new Error('You are not logged in');
    }
  } catch (err) {
    showAlert('error', err.message);
  }
});

// User clicks 'MY CLASSROOMS' in the sidebar nav
elements.classroom.addEventListener('click', async (e) => {
  try {
    // 1. Clear the overview page
    clearOverview();

    // 2. Check if the user is authenticated
    if (storage.getObj('token') || state.user) {
      // 3. Get and Load the decks
      await getClassroomsFromAPI();
      classroomRender();

      // 2.1 Tell them to login
    } else {
      throw new Error('You are not logged in');
    }
  } catch (err) {
    showAlert('error', err.message);
  }
});
