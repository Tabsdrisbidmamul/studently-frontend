import axios from 'axios';
import { showAlert } from '../utils/alert';

export default class Classroom {
  constructor() {}

  async getTeacherClassrooms(token) {
    try {
      const res = await axios.get(
        'https://polar-savannah-53668.herokuapp.com/api/v0/users/teacher-classrooms',
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return res.data.data.classroom;
    } catch (err) {
      const { message } = err.response.data;
      showAlert('error', message);
    }
  }

  async getStudentClassrooms(token) {
    try {
      const res = await axios.get(
        'https://polar-savannah-53668.herokuapp.com/api/v0/users/student-classrooms',
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return res.data.data.classroom;
    } catch (err) {
      const { message } = err.response.data;
      showAlert('error', message);
    }
  }

  async createClassroom(name, teacher, token) {
    try {
      const res = await axios.post(
        'https://polar-savannah-53668.herokuapp.com/api/v0/classrooms/',
        {
          name,
          teacher,
          students
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (res.data.status === 'success') {
        showAlert('success', 'Classroom was created');
      }
    } catch (err) {
      const { message } = err.response.data;
      showAlert('error', message);
    }
  }
  async;
}
