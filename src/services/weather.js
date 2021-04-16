import http from './http';

const getWeather = async () => {
    return await http.get('/api/weather').then(res => res.data);
};

export default {
    getWeather
};