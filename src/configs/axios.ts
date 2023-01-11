import axios from 'axios';

const appAxiosInstance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
});

export default appAxiosInstance;
