import http from './http';

const baseUrl = '/api/login';

const login = async (username, password) => await http.post(baseUrl, {
  username,
  password,
}).then((res) => res.data);

export default {
  login,
};
