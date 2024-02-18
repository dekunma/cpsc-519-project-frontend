import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

// https://blog.theashishmaurya.me/handling-jwt-access-and-refresh-token-using-axios-in-react-app

const {API_ENDPOINT} = Config;
const api = axios.create({
  baseURL: `${API_ENDPOINT}/v1`,
});

// Add a request interceptor
api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// TODO: backend refresh token API
// (might not be needed before the project ends)

// Add a response interceptor
// api.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;

//     // If the error status is 401 and there is no originalRequest._retry flag,
//     // it means the token has expired and we need to refresh it
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = await AsyncStorage.getItem('refreshToken');
//         const response = await axios.post('/api/refresh-token', {refreshToken});
//         const {token} = response.data;

//         await AsyncStorage.setItem('token', token);

//         // Retry the original request with the new token
//         // originalRequest.headers.Authorization = `Bearer ${token}`;
//         return axios(originalRequest);
//       } catch (err) {
//         // Handle refresh token error or redirect to login
//       }
//     }

//     return Promise.reject(error);
//   },
// );

export default api;
