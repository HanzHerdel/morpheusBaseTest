
/**
 * Listado de urls que se utilizaran para el sistema
 * pueden cambiar el nombre.
 * Loss proccess.env son los enviados parametrizados desde los archivos .env
 */
export const urls = {
    base: process.env.REACT_APP_BASE_URL,
    tagSystem: process.env.REACT_APP_TAG_SYSTEM,
    systemOauth: process.env.REACT_APP_SYSTEM_OAUTH,
    env: process.env.REACT_APP_ENV,
    /*Login principal*/
    login: "/user/oauth/login",
    /*Dir para refresh token*/
    refreshToken: "/user/oauth/refresh/:refreshToken",
    /*Dir. para validad todos los tag en el sistema*/
    verifyTag: "/validate/request",

    getListExample: "/example/get"



}


/**
 * Constantes principales para el manejo de la informacion en localstorage
 * si se desea una nueva crear un nuevo item
 */
export const tokensInternal = {
    info: 200,
    permission: 210,
    role: 220,
    access: 222
}