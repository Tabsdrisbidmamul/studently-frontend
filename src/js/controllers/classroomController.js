import { elements, clearOverview } from '../views/base';
import * as classroomView from '../views/classroomView';
import * as storage from '../utils/localStorage';
import { showAlert } from '../utils/alert';
import Classroom from '../models/classroomModel';
import { state } from './overviewController';
import { renderCardGrid } from '../views/cardView';

export const classroomLoaderAndRender = async () => {
  await getClassroomsFromAPI();
  classroomRender();
};

export const getClassroomsFromAPI = async () => {
  const token = storage.getObj('token') || state.user.token;

  if (!token) {
    return new Error('You are not logged in');
  }

  state.classroom.classrooms = await state.classroom.getClassroom(
    `${storage.getObj('user').role}`,
    token
  );

  storage.storeObj('classrooms', state.classroom.classrooms);
};

export const classroomRender = () => {
  // 1. Get the classrooms
  const classrooms = state.classroom.classrooms || storage.getObj('classrooms');

  // 2. No classrooms, render the empty grid version
  if (classrooms.length === 0) {
    return classroomView.renderEmptyClassroomGrid(elements.overview);
  }

  // 3. Render the classrooms
  classroomView.renderClassroomGrid(elements.overview, classrooms);
};

// Get one classroom from the array in local storage
const getClassroom = (classroomId) => {
  //1. Get the classrooms array
  const classrooms = storage.getObj('classrooms') || state.classroom.classrooms;

  //2. Find the classroom in the classrooms array via id
  return classrooms.filter((classroom) => {
    return classroom.id === classroomId;
  })[0];
};

export const classroomLoader = (e) => {
  const click = e.target.closest('.classroom');
  if (e.target.matches('.classroom, .classroom *')) {
    try {
      // 1. Get the Classroom Id
      const classroomId = click.dataset.classroom;

      // 2. Get the classroom
      const classroom = getClassroom(classroomId);
      console.log(classroom.deck);

      // 3. Render view classroom
      classroomViewHandler(classroom);
    } catch (err) {}
  }
};

const classroomViewHandler = async (classroom) => {
  try {
    // 1. Get students and teacher from classroom
    const classroomStudents = classroom.students;
    const classroomTeacher = classroom.teacher;

    // 2. Store the students to state
    state.classroom.studentArray = classroomStudents;
    storage.storeObj('students', classroomStudents);

    // 3. Get the deck for that classroom
    const deckId = classroom.deck;
    const token = state.token || storage.getObj('token');
    const classroomDeck = await state.deck.getDeck(deckId, token);

    // 4. Store the teacher's deck array to state
    state.classroom.deckArray = classroomDeck;
    storage.storeObj('classroom.deck', classroomDeck);

    // 5. Render classroom
    clearOverview();

    classroomView.renderViewClassroom(
      elements.overview,
      classroomTeacher.name,
      classroomDeck.name,
      deckId
    );

    // 5.1 Render students
    if (classroomStudents.length !== 0) {
      classroomView.renderStudents(classroomStudents);
      searchButtonStudent();
    } else {
      classroomView.removePaginationStudent();
    }

    // 6. Add event handlers
    viewDeckFromClassroom(deckId);
  } catch (err) {
    showAlert('error', err.message);
  }
};

const searchButtonStudent = () => {
  document
    .querySelector('.view-classroom__paginate')
    .addEventListener('click', (e) => {
      // 1. See if the button was clicked
      const btn = e.target.closest('.btn--inline');
      if (btn) {
        // 1.1. get the page number from the dataset
        const goToPage = parseInt(btn.dataset.goto, 10);
        const students =
          state.classroom.studentArray || storage.getObj('students');

        // 1.2. clear the card results and pagination
        classroomView.clearAllStudents();

        // 1.3. Render the new cards and new buttons
        classroomView.renderStudents(students, goToPage);
        window.scroll(0, 0);
      }
    });
};

const viewDeckFromClassroom = () => {
  document
    .querySelector('.view-classroom__item--deck')
    .addEventListener('click', (e) => {
      const deck =
        state.classroom.deckArray || storage.getObj('classroom.deck');

      clearOverview();
      renderCardGrid(elements.overview, deck.cards, 'teacher-deck');
    });
};
