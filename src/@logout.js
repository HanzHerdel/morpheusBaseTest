import {tokensInternal} from 'config/config'

export default function logoutUser(){
    console.log("Logout")
    window.localStorage.setItem(tokensInternal.info, "")
    window.localStorage.setItem(tokensInternal.permission, "")
    window.localStorage.setItem(tokensInternal.role, "")
    window.localStorage.setItem(tokensInternal.access, "")
    window.location.href = "/login"
}