import axios from 'axios';
import NProgress from 'nprogress';

const http = axios.create({});

http.interceptors.request.use((config) => {
    NProgress.start();
    return config;
}, (error) => {
    return Promise.reject(error);
});

http.interceptors.response.use((response) => {
    NProgress.done();
    return Promise.resolve(response);
}, (error) => {
    NProgress.done();
    return Promise.reject(error);
});

export default http;