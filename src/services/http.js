import axios from 'axios';
import { message } from 'antd';
import NProgress from 'nprogress';
const storageUser = JSON.parse(localStorage.getItem('loggedNoteappUser') || '{}');
const http = axios.create({});

http.interceptors.request.use((config) => {
    NProgress.start();
    if (storageUser && storageUser.token) {
        config.headers = {
            ...config.headers,
            Authorization: `bearer ${storageUser.token}`,
        };
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

http.interceptors.response.use((response) => {
    NProgress.done();
    return response;
}, (error) => {
    NProgress.done();
    const status = error.response.status;
    switch (status) {
        case 401:
            message.warn(`Error code: ${status}`);
            break;
        default:
            break;
    }
    return Promise.reject(error);
});

export default http;