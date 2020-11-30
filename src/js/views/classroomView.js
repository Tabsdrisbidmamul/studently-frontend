import plus from '../../img/SVG/plus.svg';
import minus from '../../img/SVG/minus.svg';
import tick from '../../img/SVG/check.svg';
import cross from '../../img/SVG/circle-with-cross.svg';
import next from '../../img/SVG/chevron-thin-right.svg';
import prev from '../../img/SVG/chevron-thin-left.svg';
import graduation from '../../img/SVG/graduation-cap.svg';
import * as storage from '../utils/localStorage';

export const renderClassroomGrid = (parent, classroomArray) => {
  let classrooms = '';
  classroomArray.forEach((classroom) => {
    const classroomMarkup = `
      <div class="classroom classroom-${classroom.id}" data-classroom=${classroom.id}>
        <div class="classroom__details">
          <div class="name">${classroom.name}</div>
        </div>
      </div> 
    `;
    classrooms += classroomMarkup;
  });

  // checks if the user is a teacher and then allows them to create a new classroom if they are.

  let markup = ``;
  if (storage.getObj('user').role === 'teacher') {
    markup += `
    <div class="make-classroom">
        <a href="#" class="btn btn--ghost make-classroom">Make A New Classroom</a>
    </div>`;
  } else {
    markup += `<div class="make-classroom">
    &nbsp; 
</div>`;
  }

  markup += `
    <div class="classroom-grid">
        ${classrooms}
    </div>;`;

  parent.insertAdjacentHTML('afterbegin', markup);
};

export const renderEmptyClassroomGrid = (parent) => {
  const markup = `
  <div class="classroom-grid">
  <div class="no-item">
      <svg class="icon icon--no-item">
        <use href="${graduation}"></use>
      </svg>
      <span>make some decks to see them here!</span>
  </div>
  </div>`;

  parent.insertAdjacentHTML('afterbegin', markup);
};

// Renders all the users in the 'All Users' list
export const renderAllUsers = (user) => {
  const markup = `
    <li class="make-deck__item" data-card="${user.id}">
    <a href="#" class="make-classroom__link">
      <svg class="icon icon__make-classroom--user">
        <use href="${plus}"></use>
      </svg>
      <div class="make-classroom__user-details">
        <span class="make-classroom__span make-deck-span--name">${user.name}</span>
      </div>
    </a>
  </li>`;

  document
    .querySelector('.make-classroom__list--user')
    .insertAdjacentHTML('beforeend', markup);
};

// Clears the users from the 'All Users' list
export const clearAllUsersResults = () => {
  document.querySelector('.make-classroom__list--user').innerHTML = '';
  document.querySelector('.make-classroom__paginate--user').innerHTML = '';
};

// Renders all the users in the 'Current Users' list
export const renderCurrentUsers = (user) => {
  const markup = `
    <li class="make-deck__item" data-card="${user.id}">
        <a href="#" class="make-classroom__link">
            <svg class="icon icon__make-classroom--user">
                <use href="${minus}"></use>
            </svg>
            <div class="make-classroom__user-details">
                <span class="make-classroom__span make-deck-span--name">${user.name}</span>
            </div>
        </a>
    </li>`;

  document
    .querySelector('.make-classroom__list--user')
    .insertAdjacentHTML('beforeend', markup);
};

// Clears the users from the 'Current Users' list
export const clearCurrentUsersResults = () => {
  document.querySelector('.make-classroom__list--user').innerHTML = '';
  document.querySelector('.make-classroom__paginate--user').innerHTML = '';
};

// Deletes the user from the list
export const deleteUser = (id) => {
  const user = document.querySelector(`[data-user*="${id}"]`);
  if (user) user.remove();
};

const createButton = (page, type) => `
<button class="btn--inline btn__search btn__search--${type}" data-goto=${
  type === 'prev' ? page - 1 : page + 1
}>
<span>Page ${type === 'prev' ? page - 1 : page + 1}</span>  
<svg class="icon icon__search icon__search--${
  type === 'prev' ? 'prev' : 'next'
}">
    <use href="${type === 'prev' ? prev : next}"></use>
  </svg>
</button>`;

// Pagination for the 'All Users' list
const renderButtonAll = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);

  let btn;
  if (page === 1 && pages > 1) {
    // Only Button to go to the next page
    btn = createButton(page, 'next');
  } else if (page < pages) {
    // Both Buttons
    btn = `
      ${createButton(page, 'prev')}
      ${createButton(page, 'next')}
    `;
  } else if (page === pages && pages > 1) {
    // Only Button to go to the prev page
    btn = createButton(page, 'prev');
  }

  if (btn) {
    document
      .querySelector('.make-classroom__paginate--user')
      .insertAdjacentHTML('afterbegin', btn);
  }
};

// Pagination for the 'Current Users' list
const renderButtonsCurrent = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);

  let btn;
  if (page === 1 && pages > 1) {
    // Only Button to go to the next page
    btn = createButton(page, 'next');
  } else if (page < pages) {
    // Both Buttons
    btn = `
        ${createButton(page, 'prev')} 
        ${createButton(page, 'next')}
        `;
  } else if (page === pages && pages > 1) {
    // Only Button to go to the prev page
    btn = createButton(page, 'prev');
  }

  if (btn)
    document
      .querySelector('.make-deck__paginate--curr')
      .insertAdjacentHTML('afterbegin', btn);
};

// Render the results and pagination for the 'All Users' list
export const renderResultsAll = (array, page = 1, resPerPage = 4) => {
  clearAllUsersResults();

  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;

  array.slice(start, end).forEach(renderAllUsers);

  renderButtonAll(page, array.length, resPerPage);
};

export const renderResultsCurrent = (array, page = 1, resPerPage = 4) => {
  // render the results of the current page
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;

  array.slice(start, end).forEach(renderCurrentUsers);

  // render pagination button
  renderButtonsCurrent(page, array.length, resPerPage);
};

export const renderMakeClassroom = (HTMLCard, value) => {
  const markup = `

  `;
};

// Renders the make class grid
export const renderMakeClassroomGrid = (parent, users) => {
  const markup = `<div class="make-classroom-grid">
  <form action="#" class="make-classroom__form">
      <label for="classroom-name" class="make-classroom__label">Enter Classroom name</label>
      <input class="make-classroom__input" type="text" minlength="5" maxlength="50" id="classroom-name" placeholder="Classroom Name">
  </form>

  <div class="make-classroom__user-nav make-classroom__user-nav--all-users">
    <span class="make-classroom__name">All Users</span>
    <ul class="make-classroom__list make-classroom__list--all">
      
    </ul>

    <div class="make-classroom__paginate--all">
      
    </div>
  </div>

  <div class="make-classroom__user-nav make-classroom__card-nav--curr-users">
    <span class="make-classroom__name">Current Users</span>
    <ul class="make-classroom__list make-classroom__list--curr">
      
    </ul>
    
    <div class="make-classroom__paginate--curr">
      
    </div>
  </div>
  
  <div class="make-classroom__options">
    <div class="make-classroom__group make-classroom--right">
      <a href="#" class="make-classroom__link">
        <svg class="icon icon--make-classroom icon--make-classroom-right icon--right">
          <use href="${tick}"></use>
        </svg>
      </a>
      <span class="make-classroom__span">Create The Classroom</span>
    </div>

    <div class="make-classroom__group make-classroom--wrong">
      <a href="#" class="make-classroom__link">
        <svg class="icon icon--make-classroom icon--make-classroom-left icon-left icon--wrong">
          <use href="${cross}"></use>
        </svg>
      </a>
      <span class="make-classroom__span">Let's Stop!</span>
    </div>
  </div>
</div>`;

  parent.insertAdjacentHTML('afterbegin', markup);
};
