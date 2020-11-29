import plus from '../../img/SVG/plus.svg';
import minus from '../../img/SVG/minus.svg';
import tick from '../../img/SVG/check.svg';
import cross from '../../img/SVG/circle-with-cross.svg';
import next from '../../img/SVG/chevron-thin-right.svg';
import prev from '../../img/SVG/chevron-thin-left.svg';

export const renderDeckGrid = (parent, deckArray) => {
  let decks = '';
  deckArray.forEach((deck) => {
    const deckMarkup = `
        <div class="deck deck-${deck.id}" data-deck=${deck.id}>
            <div class="deck__details">
                <div class="name">${deck.name}</div>
            </div>
        </div> 
        `;
    decks += deckMarkup;
  });

  const markup = `
    <div class="make-deck">
        <a href="#" class="btn btn--ghost">Make A New Deck</a>
    </div>

    <div class="deck-grid">
        ${decks}
    </div>;`;

  parent.insertAdjacentHTML('afterbegin', markup);
};

export const renderUserCards = (card) => {
  const markup = `
    <li class="make-deck__item" data-card="${card.id}">
    <a href="#" class="make-deck__link">
      <svg class="icon icon__make-deck--card">
        <use href="${plus}"></use>
      </svg>
      <div class="make-deck__card-details">
        <span class="make-deck__span make-deck-span--question">${card.question}</span>
      <span class="make-deck__span make-deck-span--answer">${card.answer}</span>
      </div>
    </a>
  </li>`;

  document
    .querySelector('.make-deck__list--user')
    .insertAdjacentHTML('beforeend', markup);
};

export const renderDeckCards = (card) => {
  const markup = `
    <li class="make-deck__item" data-card="${card.id}">
    <a href="#" class="make-deck__link">
      <svg class="icon icon__make-deck--card">
        <use href="${minus}"></use>
      </svg>
      <div class="make-deck__card-details">
        <span class="make-deck__span make-deck-span--question">${card.question}</span>
      <span class="make-deck__span make-deck-span--answer">${card.answer}</span>
      </div>
    </a>
  </li>`;

  document
    .querySelector('.make-deck__list--deck')
    .insertAdjacentHTML('beforeend', markup);
};

export const deleteCard = (id) => {
  const card = document.querySelector(`[data-card*="${id}"]`);
  if (card) card.remove();
};

export const renderMakeDeckGrid = (parent, cards) => {
  const markup = `<div class="make-deck-grid">
  <form action="#" class="make-deck__form">
      <label for="deck-name" class="make-deck__label">Enter Deck name</label>
      <input class="make-deck__input" type="text" minlength="5" maxlength="50" id="deck-name" placeholder="Deck Name">
  </form>

  <div class="make-deck__card-nav make-deck__card-nav--user-cards">
    <span class="make-deck__name">My Cards</span>
    <ul class="make-deck__list make-deck__list--user">
      
    </ul>

    <div class="make-deck__paginate">
      <button class="btn--inline btn__search btn__search--next" data-goto="1">
      <span>Page 1</span>  
      <svg class="icon icon__search icon__search--next">
          <use href="${prev}"></use>
        </svg>
      </button>

      <button class="btn--inline btn__search btn__search--prev" data-goto="4">
        <span>Page 4</span>
        <svg class="icon icon__search icon__search--prev">
          <use href="${next}"></use>
        </svg>
      </button>
    </div>
  </div>

  <div class="make-deck__card-nav make-deck__card-nav--deck-cards">
    <span class="make-deck__name">Deck Cards</span>
    <ul class="make-deck__list make-deck__list--deck">
      
    </ul>
  </div>

  <div class="make-deck__card-switch">
    <div class="card card--make make-deck__card">
    <div class="card__options">
      <a href="#" class="options options--add">
        <svg class="icon icon--options icon--add">
          <use xlink:href="${plus}"></use>
        </svg>
        <span class="show-hide card--edit">Add card</span>
      </a>

    </div>

    <div class="card__details">
      <span class="name">What is a Question?</span>
    </div>
    </div>

    <div class="make-deck__group make-deck--switch">
      <a href="#" class="make-deck__switch btn btn--switch">Turn Over</a>
    </div>
  </div>
  
  <div class="make-deck__options">
    <div class="make-deck__group make-deck--right">
      <a href="#" class="make-deck__link">
        <svg class="icon icon--make-deck icon--make-deck-right icon--right">
          <use href="${tick}"></use>
        </svg>
      </a>
      <span class="make-deck__span">Create The Deck</span>
    </div>

    <div class="make-deck__group make-deck--wrong">
      <a href="#" class="make-deck__link">
        <svg class="icon icon--make-deck icon--make-deck-left icon-left icon--wrong">
          <use href="${cross}"></use>
        </svg>
      </a>
      <span class="make-deck__span">Let's Stop!</span>
    </div>
  </div>
</div>`;

  parent.insertAdjacentHTML('afterbegin', markup);
};
