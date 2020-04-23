import axios from 'axios';

const api = axios.create({
    baseURL: 'https://b4156841.ngrok.io/',
});

export default api;