import minus from '../../img/SVG/minus.svg';
import tick from '../../img/SVG/check.svg';
import cross from '../../img/SVG/circle-with-cross.svg';
import next from '../../img/SVG/chevron-thin-right.svg';
import prev from '../../img/SVG/chevron-thin-left.svg';
import graduation from '../../img/SVG/graduation-cap.svg';
import deck from '../../img/SVG/drive.svg';
import user from '../../img/SVG/user.svg';
import user2 from '../../img/SVG/user.svg';
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
export const renderAllStudents = (user, index) => {
  const markup = `
  <li class="view-classroom__item">
    <a href="#" class="view-classroom__link">
        <svg class="icon icon__view-classroom--card">
        <use href="${user2}"></use>
      </svg>
      <div class="view-classroom__card-details">
        <span
          class="view-classroom__span view-classroom-span--question"
          >Student ${index}</span
        >
        <span
          class="view-classroom__span make-classroom-span--answer"
          >${user.name}</span
        >
      </div>
    </a>
  </li>`;

  document
    .querySelector('.view-classroom__list')
    .insertAdjacentHTML('beforeend', markup);
};

// Clears the users from the 'All Users' list
export const clearAllStudents = () => {
  document.querySelector('.view-classroom__list').innerHTML = '';
  document.querySelector('.view-classroom__paginate').innerHTML = '';
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
const renderButtonStudents = (page, numResults, resPerPage) => {
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
    addPaginationStudent();

    document
      .querySelector('.view-classroom__paginate')
      .insertAdjacentHTML('afterbegin', btn);
  } else {
    removePaginationStudent();
  }
};

const addPaginationStudent = () => {
  document.querySelector('.view-classroom__paginate').style.display = 'flex';
};

export const removePaginationStudent = () => {
  document.querySelector('.view-classroom__paginate').style.display = 'none';
};

// Render the results and pagination for the 'All Users' list
export const renderStudents = (array, page = 1, resPerPage = 4) => {
  clearAllStudents();

  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;

  array.slice(start, end).forEach((el, i) => {
    renderAllStudents(el, i);
  });

  renderButtonStudents(page, array.length, resPerPage);
};

export const renderViewClassroom = (parent, teacherName, deckName, deckId) => {
  const markup = `
  <div class="view-classroom-grid make-classroom-grid">
    <div
      class="view-classroom__student-nav view-classroom__student-nav--users-student"
    >
      <span class="view-classroom__name">Classmates</span>
      <ul class="view-classroom__list">
        
      </ul>

      <div class="view-classroom__paginate">
        
      </div>
    </div>

    <div
      class="view-classroom__deck-nav view-classroom__deck-nav--deck"
    >
      <span class="view-classroom__name">Deck</span>
      <ul class="view-classroom__list">
        <li class="view-classroom__item view-classroom__item--deck" data-deck=${deckId}>
          <a href="#" class="view-classroom__link">
            <svg class="icon icon__view-classroom--card">
              <use href="${deck}"></use>
            </svg>
            <div class="view-classroom__card-details">
              <span
                class="view-classroom__span view-classroom-span--question"
                >${deckName}</span
              >
            </div>
          </a>
        </li>
      </ul>
    </div>

    <div
      class="view-classroom__teacher-nav view-classroom__teacher-nav--users-teacher"
    >
      <span class="view-classroom__name">Teacher</span>
      <ul class="view-classroom__list">
        <li class="view-classroom__item view-classroom__item--techer">
          <a href="#" class="view-classroom__link">
            <svg class="icon icon__view-classroom--card">
              <use href="${user}"></use>
            </svg>
            <div class="view-classroom__card-details">
              <span
                class="view-classroom__span view-classroom-span--question"
                >Teacher</span
              >
              <span class="make-deck__span make-deck-span--answer"
                >${teacherName}</span
              >
            </div>
          </a>
        </li>
      </ul>
    </div>

  </div>`;

  parent.insertAdjacentHTML('afterbegin', markup);
};
