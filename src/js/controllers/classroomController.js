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

  state.classroom.classrooms = await state.classroom.getTeacherClassrooms(
    token
  );
  console.log(state.classroom.classrooms);

  storage.storeObj('classrooms', state.classroom.classrooms);
};

export const classroomRender = () => {
  classroomView.renderClassroomGrid(
    elements.overview,
    state.classroom.classrooms
  );
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
