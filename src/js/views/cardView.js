import tick from '../../img/SVG/check.svg';
import cross from '../../img/SVG/circle-with-cross.svg';

export const renderCardGrid = (parent, cardArray) => {
  let cards = '';
  cardArray.forEach((card) => {
    console.log(card);
    const cardMarkup = `
    <div class="card card-${card.id}" data-card=${card.id}>
      <div class="card__details">
        <span class="name">${card.question}</span>
      </div>
    </div>
    `;
    cards += cardMarkup;
  });

  const markup = `
  <div class="make-card">
    <a href="#" class="btn btn--ghost">Make A New Card</a>
  </div>

  <div class="card-grid">
      ${cards}
  </div>`;

  parent.insertAdjacentHTML('afterbegin', markup);
};

export const renderCardAnswer = (HTMLCard, cardData) => {
  const markup = `
  <div class="card__details">
    <span class="name">${cardData.answer}</span>
  </div>

  <div class="answer-form">
    <a href="#" class="answer-form__link answer-form__icon answer-form__icon--right">
      <svg class="answer-form__icon answer-form__icon--right">
        <use xlink:href="${tick}"></use>
      </svg>
    </a>

    <a href="#" class="answer-form__link answer-form__icon answer-form__icon--wrong"">
      <svg class="answer-form__icon answer-form__icon--wrong">
        <use xlink:href="${cross}"></use>
      </svg>
    </a>
  `;

  HTMLCard.innerHTML = markup;
};

export const renderCardQuestion = (HTMLCard, cardData) => {
  const markup = `
  <div class="card__details">
    <span class="name">${cardData.question}</span>
  </div>
  `;

  HTMLCard.innerHTML = markup;
};
