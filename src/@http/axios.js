import axios from 'axios';
import {urls, tokensInternal} from '../config/config'
import logoutUser from "@logout";
// for multiple requests
let isRefreshing = false;
let failedQueue = [];

function getTokens(){
    const access = window.localStorage.getItem(tokensInternal.access);
    const decode = atob(access)
    const jsonAccess = JSON.parse(decode)
    return jsonAccess
}

function urlRefresh(){
    const jsonAccess = getTokens()
    let urlRefresh = (urls.base + urls.refreshToken)
    urlRefresh = urlRefresh.replace(":refreshToken", jsonAccess.rt)
    return urlRefresh
}

function setTokens({token}){
    const jsonToken = {at: token.accessToken, rt: token.refreshToken}
    const jsonText = JSON.stringify(jsonToken)
    const base64json = btoa(jsonText)
    console.log(jsonText)
    window.localStorage.setItem(tokensInternal.access, base64json);
    return token.accessToken
}

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    })
    failedQueue = [];
}

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {

  const originalRequest = error.config;
  
  if (error.response.status === 401 && !originalRequest._retry) {
      
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({resolve, reject})
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return axios(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        })
      }

    originalRequest._retry = true;
    isRefreshing = true;

    //const refreshToken = window.localStorage.getItem('refreshToken');
    return new Promise(function (resolve, reject) {
       axios.get(urlRefresh())
        .then(({data}) => {
            setTokens(data)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token.accessToken;
            originalRequest.headers['Authorization'] = 'Bearer ' + data.token.accessToken;
            processQueue(null, data.token.accessToken);
            resolve(axios(originalRequest));
        })
        .catch((err) => {
            //processQueue(err, null);
            console.log("a")
            reject(err);
            logoutUser()
        })
        .then(() => { isRefreshing = false })
    })
  }

  return Promise.reject(error);
});