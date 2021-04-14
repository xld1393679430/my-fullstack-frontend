import http from './http';

const baseUrl = '/api/notes';

const setToken = (user = null) => {
  if (user) {
    http.defaults.headers = {
      ...http.defaults.headers,
      Authorization: `bearer ${user.token}`,
    };
    localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
  } else {
    http.defaults.headers = {
      ...http.defaults.headers,
      Authorization: '',
    };
    localStorage.setItem('loggedNoteappUser', '');
  }
};

const getNotes = async () => await http.get(baseUrl).then((res) => res.data);

const createNote = async (note) => {
  return await http.post(baseUrl, note).then((res) => res.data);
};

const updateNote = async (id, note) => {
  return await http.put(`${baseUrl}/${id}`, note).then((res) => res.data);
};

export default {
  getNotes,
  createNote,
  updateNote,
  setToken,
};
