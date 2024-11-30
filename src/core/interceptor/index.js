import axios from "axios";
// import { getItem, removeItem } from "../common/storage";

const baseURL = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
  baseURL: baseURL,
});

instance.defaults.headers.common[
  "Authorization"
] = `Bearer ${localStorage?.getItem("token")}`;

const onSuccess = (response) => {
  return response.data;
};

// const onError = (err) => {
//    console.log(err);

// if(err.response.status === 401){
//    removeItem('token')
//    window.location.pathname = '/login'
// }

//    // if(err.response.status >= 400 && err.response.status < 500){
//    //     alert("error:" + err.response.status);
//    // }

//    return Promise.reject(err);
// }

// instance.interceptors.response.use(onSuccess, onError)

// instance.interceptors.request.use((opt) => {
//    const token = getItem('token')

//    if (token) opt.headers.Authorization = 'Bearer ' + token;
//    return opt
// })

export default instance;
