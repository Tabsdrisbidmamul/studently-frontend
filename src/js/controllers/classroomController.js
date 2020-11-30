import { elements, clearOverview } from '../views/base';
import * as classroomView from '../views/classroomView';
import * as storage from '../utils/localStorage';
import { showAlert } from '../utils/alert';
import Classroom from '../models/classroomModel';
import { state } from './overviewController';

export const classroomLoaderAndRender = async () => {
  await getClassroomsFromAPI();
  classroomRender();
};

export const getClassroomsFromAPI = async () => {
  const token = storage.getObj('token') || state.user.token;

  if (!token) {
    return new Error('You are not logged in');
  }

  // TODO: verify the user role
  if (storage.getObj('user').role === 'teacher') {
    state.classroom.classrooms = await state.classroom.getTeacherClassrooms(
      token
    );
  } else {
    state.classroom.classrooms = await state.classroom.getStudentClassrooms(
      token
    );
  }

  console.log(state.classroom.classrooms);

  storage.storeObj('classrooms', state.classroom.classrooms);
};

export const classroomRender = () => {
  classroomView.renderClassroomGrid(
    elements.overview,
    state.classroom.classrooms
  );
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

const addUserToClassroomHandler = (classroomArray) => {
  document
    .querySelector('.make-classroom__list--user')
    .addEventListener('click', (e) => {
      // 1. Get the item that was click
      const item = e.target.closest('.icon');

      // 2. Check if the click was a plus icon
      if (item) {
        // 2.1 Get the user Id from the item
        const userId = item.parentNode.parentNode.dataset.user;

        // 2.2 Store and get the user from state or local storage
        storeUser(userId);
        const card = userController.getUser(userId);

        // 2.3 Add the user to the local deckArray reference
        classroomArray.push(user);

        // 2.4 Store the classroomArray to local storage
        state.classroom.classroomArray = classroomArray;
        storage.storeObj(
          'classrooms.classroomArray',
          state.classroom.classroomArray
        );

        // 2.5 Render the results to the current user section
        classroomView.renderResultsAll(classroomArray);

        // 2.6 more than 4 classrooms, start adding in the paginating handler
        if (classroomArray.length > 4) {
          searchButtonHandler();
        }
      }
    });
};

const getUserFromClassroomArray = (classroomArray, userId) => {
  classroomArray.ForEach((el, i) => {
    if (el.id === userId) {
      return i;
    }
  });
};

const removeUserFromClassroom = (classsroomArray) => {
  document
    .querySelector('.make-classroom__list--curr')
    .addEventListener('click', (e) => {
      // 1. Get the item that was clicked
      const item = e.target.closest('.icon');

      // 2. Check if the item was a user that was clicked
      if (item) {
        // 2.1 Get the user id
        const userId = item.parentNode.parentNode.dataset.user;

        // 2.2 Get the index from the classroomArray
        let index;
        deckArray.forEach((el, i) => {
          if (el.id === userId) {
            index = i;
          }
        });

        // 2.3 Remove it from the Classroom array
        classroomArray.splice(index, 1);

        // 2.4 Re-render the deck cards back to the screen
        classroomView.renderResultsCurrent(classroomArray);
      }
    });
};

// When the user presses next or prev
const searchButtonHandler = () => {
  document
    .querySelector('.make-deck__paginate--all')
    .addEventListener('click', (e) => {
      // 1. See if the button was clicked
      const btn = e.target.closest('btn--inline');
      if (btn) {
        // 1.1 get the page number from the dataset
        const goToPage = parseInt(btn.dataset.goto, 10);
        // FIXME
        const users = state.user.users || storage.getObj('users');

        // 1.2 clear the user results and pagination
        classroomView.clearAllUsersResults();

        // 1.3 Render the new users and new buttons
        classroomView.renderResultsAll(users, goToPage);
        window.scroll(0, 0);
      }
    });

  document
    .querySelector('.make-classroom__paginate--curr')
    .addEventListener('click', (e) => {
      // 1. See if the button was clicked
      const btn = e.target.closest('btn--inline');
      if (btn) {
        // 1.1 get the page number from the dataset
        const goToPage = parseInt(btn.dataset.goto, 10);
        // FIXME
        const users = state.user.users || storage.getObj('users');

        // 1.2 clear the user results and pagination
        classroomView.clearAllUsersResults();

        // 1.3 Render the new users and new buttons
        classroomView.renderResultsAll(users, goToPage);
        window.scroll(0, 0);
      }
    });
};

export const classroomLoader = (e) => {
  const click = e.target.closest('.classroom');
  if (e.target.matches('.classroom, .classroom *')) {
    try {
      // 1. Get the Classroom Id
      const classroomId = click.dataset.classroom;

      //2. Get the classrooms array
      const classrooms =
        storage.getObj('classrooms') || state.classroom.classrooms;

      //3. Find the classroom in the classrooms array via id
      const classroomData = classrooms.filter((classroom) => {
        return classroom.id === classroomId;
      });

      classroomView.renderClassroomName(
        document.querySelector(`.classroom-${classroomId}`),
        classroomData[0].name
      );
    } catch (err) {}
  }
};

const createClassroom = (e) => {
  // User clicks to create the classroom
  document
    .querySelector('.icon--make-classroom-right')
    .addEventListener('click', (e) => {
      const name = document.querySelector('.textarea-q').value;
      const user = storage.getObj('user') || state.user.userData.id;

      if (name && user) {
        state.classroom.createClassroom(name, user, storage.getObj('token'));
      } else {
        showAlert('error', 'Please enter a name');
      }
    });
};

const cancelClassroomMaker = (e) => {
  // User clicks to cancel the classroom creation
  document
    .querySelector('.icon--make-classroom-left')
    .addEventListener('click', (e) => {
      clearOverview();
      classroomRender(elements.overview, state.classroom.classrooms);
    });
};

export const classroomMakerLoader = (e) => {
  clearOverview();
  classroomView.renderMakeClassroomGrid(elements.overview);
  createClassroom(e);
  cancelClassroomMaker(e);
};

const classroomHandler = (click) => {
  try {
    const classroomId = click.dataset.classroom;
    const classroomData = getClassroom(classroomId);
    const classroomUsers = classroomData.users;
    userController.classroomUserRender(classroomUsers);
  } catch (err) {
    showAlert('error', err.message);
  }
};
