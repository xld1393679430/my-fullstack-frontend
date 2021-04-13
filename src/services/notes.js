import axios from 'axios';

const baseUrl = '/api/notes';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getNotes = async () => await axios.get(baseUrl).then((res) => res.data);

const createNote = async (note) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  return await axios.post(baseUrl, note, config).then((res) => res.data);
};

const updateNote = async (id, note) => {
  return await axios.put(`${baseUrl}/${id}`, note).then((res) => res.data);
};

export default {
  getNotes,
  createNote,
  updateNote,
  setToken,
};
