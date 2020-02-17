import axios from 'axios';
import {urls, tokensInternal} from '../config/config'
import * as axioshttp from "@http/axios"

export async function get(url, tag){
    const requestUrl = urls.base + url
    const config = getConfig(tag)
    return axios.get(requestUrl, config);
}

export function post(url, body, tag){
    const requestUrl = urls.base + url
    const config = getConfig(tag)
    return axios.post(requestUrl, body, config)
}

export function put(url, body, tag){
    const requestUrl = urls.base + url
    const config = getConfig(tag)
    return axios.put(requestUrl, body, config)
}

export function delet(url, body, tag){
    const requestUrl = urls.base + url
    const config = getConfig(tag)
    return axios.delete(requestUrl, config)
}

function getInfoLocaleStorege(token){
    const access = window.localStorage.getItem(token);
    const decode = atob(access)
    const jsonAccess = JSON.parse(decode)
    return jsonAccess
}


function getConfig(tag){
    const jsonAccess = getInfoLocaleStorege(tokensInternal.access)
    const infoUser = getInfoLocaleStorege(tokensInternal.info)
    const role = getInfoLocaleStorege(tokensInternal.role)
    let config = {
        headers: {
            Authorization: `Bearer ${jsonAccess.at}`,
            system: urls.systemOauth,
            cui: infoUser.token.user.id,
            rol: role.tagRol,
            action: tag,
            env: urls.env
        }
    }
    console.log(config)
    return config
}

