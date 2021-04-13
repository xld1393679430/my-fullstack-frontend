import http from './index';

const baseUrl = '/api/notes';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getNotes = async () => await http.get(baseUrl).then((res) => res.data);

const createNote = async (note) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  return await http.post(baseUrl, note, config).then((res) => res.data);
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
