import axios from 'axios';
import qs from 'qs';
import {urls} from '../../../../config/config'

import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import {setUserData} from './user.actions';
import * as Actions from 'app/store/actions';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const TOKEN_CLEAR = 'TOKEN_CLEAR';


export function submitLoginMP({email, password})
{
    const url = urls.base + urls.login
    console.log('url: ', url);
    return async (dispatch) => {
        const requestBody = {
            user: email,
            pass: password
        }

        try{
            const request = await axios.post(url, requestBody)
            console.log("login", request)
            if(request.status === 200){
                if(request.data.valid){
                    return dispatch({
                        type: LOGIN_SUCCESS,
                        payload: request.data,
                        statusCode: request.status
                    })
                }
            }
            return dispatch({
                type: LOGIN_ERROR,
                payload: request.data,
                statusCode: request.status
            })
        }catch(e){
            return dispatch({
                type: LOGIN_ERROR,
                payload: e,
                statusCode: 0
            })
        }
        
    }

}

export function getListTagForRol(rol)
{
    const url = urls.base + urls.getListTokenforUser
    const replace = url.replace(":idRol", rol)
    return async (dispatch) => {
        
        try{
            const request = await axios.get(replace)
            if(request.status === 200){
                if(request.data.valid){
                    return dispatch({
                        type: TOKEN_SUCCESS,
                        payload: request.data,
                        statusToken: true
                    })
                }
            }
            return dispatch({
                type: TOKEN_SUCCESS,
                payload: null,
                statusToken: true
            })
        }catch(e){
            return dispatch({
                type: TOKEN_SUCCESS,
                payload: null,
                statusToken: true
            })
        }
        
    }
}

export function submitLogin({email, password})
{
    return (dispatch) =>
        jwtService.signInWithEmailAndPassword(email, password)
            .then((user) => {
                    dispatch(setUserData(user));

                    return dispatch({
                        type: LOGIN_SUCCESS
                    });
                }
            )
            .catch(error => {
                return dispatch({
                    type   : LOGIN_ERROR,
                    payload: error
                });
            });
}

export function clearData(){
    return (dispatch) =>{
        return dispatch({
            type: TOKEN_CLEAR,
            payload: null,
            statusToken: true
        })
    }
    
}


export function submitLoginWithFireBase({username, password})
{
    return (dispatch) =>
        firebaseService.auth && firebaseService.auth.signInWithEmailAndPassword(username, password)
            .then(() => {
                return dispatch({
                    type: LOGIN_SUCCESS
                });
            })
            .catch(error => {
                const usernameErrorCodes = [
                    'auth/email-already-in-use',
                    'auth/invalid-email',
                    'auth/operation-not-allowed',
                    'auth/user-not-found',
                    'auth/user-disabled'
                ];
                const passwordErrorCodes = [
                    'auth/weak-password',
                    'auth/wrong-password'
                ];

                const response = {
                    username: usernameErrorCodes.includes(error.code) ? error.message : null,
                    password: passwordErrorCodes.includes(error.code) ? error.message : null
                };

                if ( error.code === 'auth/invalid-api-key' )
                {
                    dispatch(Actions.showMessage({message: error.message}));
                }

                return dispatch({
                    type   : LOGIN_ERROR,
                    payload: response
                });
            });
}
