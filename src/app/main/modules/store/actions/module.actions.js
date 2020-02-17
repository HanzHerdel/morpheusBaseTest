import * as ssohttp from '@http/ssohttp';
import {urls} from '../../../../../config/config'
import { tags } from "@tags/Tags"
export const GET_MODULE = '[SSO APP] GET MODULE';
export const CREATE_MODULE = '[SSO APP] CREATE MODULE';

export function getModule(idSystem)
{
    const dir = urls.getModule
    console.log('dir: ', dir);
    const replace = dir.replace(":system", idSystem)
    console.log('replace: ', replace);
    console.log('tags.getModule: ', tags.getModule);
    const request = ssohttp.get(replace, tags.getModule)
    console.log('request: ', request);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_MODULE,
                payload: response.data
            })
        );
}


export function createModule(data)
{
    const {idSystem} = data
    const body = {
        ...data
    }
    const request = ssohttp.post(urls.module, body,  tags.createModule)
    return (dispatch) =>
        request.then((response) => {
                dispatch({
                    type: CREATE_MODULE,
                    system: response.data
                })
                return dispatch(getModule(idSystem))
            }
        )
        .catch((error) => {
            console.log(error.response);
          });
}
