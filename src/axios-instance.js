import axios from 'axios';

const instance = axios.create({
   baseURL: 'http://700e9910.ngrok.io/api'
});

export default instance;
