import axios from 'axios';
import { showAlert } from '../utils/alert';

export default class Classroom {
  constructor() {}

  async getClassroom(role, token) {
    try {
      const path =
        role === 'student' ? 'student-classrooms' : 'teacher-classrooms';

      const url = `https://polar-savannah-53668.herokuapp.com/api/v0/users/${path}`;

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data.data.classroom;
    } catch (err) {
      const { message } = err.response.data;
      showAlert('error', message);
    }
  }

  async getStudents(token) {
    try {
      const res = await axios.get(
        `https://polar-savannah-53668.herokuapp.com/api/v0/users/students`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data.data.user;
    } catch (err) {
      const { message } = err.response.data;
      showAlert('error', message);
    }
  }
}
