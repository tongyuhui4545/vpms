import HttpRequest from './axios';
import config from '../config';
const {baseUrl} = config;

const axios = new HttpRequest(baseUrl, 100000);
export default axios;
