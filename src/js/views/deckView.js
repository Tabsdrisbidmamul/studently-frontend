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

// Deck Grid here
export const renderMakeDeckGrid = (parent) => {
  const markup = `<div class="make-deck-grid">

  <form action="#" class="make-deck__form">
      <label for="deck-name" class="make-deck__label">Enter Deck name</label>
      <textarea id="deck-name" class="make-deck__textarea  textarea-q" wrap="off" minlength="5" maxlength="250" placeholder="Enter your deck name" required="true" spellcheck="true"></textarea>
  </form>

  <div class="make-deck__group make-deck--right">
    <a href="#" class="make-deck__link">
      <svg class="icon icon--make-deck icon--make-card-right icon--right">
        <use href="img/SVG/check.svg"></use>
      </svg>
    </a>
    <span class="make-deck__span">Create The Deck</span>
  </div>

  <div class="make-deck__group make-deck--wrong">
    <a href="#" class="make-deck__link">
      <svg class="icon icon--make-deck icon--make-deck-left icon-left icon--wrong">
        <use href="img/SVG/circle-with-cross.svg"></use>
      </svg>
    </a>
    <span class="make-deck__span">Let's Stop!</span>
  </div>
</div>`;

  parent.insertAdjacentHTML('afterbegin', markup);
};
