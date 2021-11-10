import axios from 'axios';
import queryString from 'query-string';

const getToken = async () => {
  const token = JSON.parse(localStorage.getItem('user'));
  return token;
}
// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'accept': 'application/json',
  },
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token.token}`;
  }
  return config;
});

axiosClient.interceptors.response.use((response) => {
  if (response && response.data) {
    return response.data;
  }
  return response;
}, (error) => {
  // Handle errors
  if (error.response.status === 401 && error.response.data.message === "Unauthenticated." ) {
    localStorage.removeItem("user");
  }
  throw error;
});

export default axiosClient;