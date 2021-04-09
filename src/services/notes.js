import axios from 'axios';

const baseUrl = '/api/notes';

const getNotes = async () => await axios.get(baseUrl).then((res) => res.data);

const createNote = async (note) => await axios.post(baseUrl, note).then((res) => res.data);

const updateNote = async (id, note) => await axios.put(`${baseUrl}/${id}`, note).then((res) => res.data);

export default {
  getNotes,
  createNote,
  updateNote,
};
