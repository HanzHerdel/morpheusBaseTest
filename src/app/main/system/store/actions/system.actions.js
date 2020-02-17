import {urls} from '../../../../../config/config'
import * as ssohttp from '@http/ssohttp';
import { tags } from "@tags/Tags";
export const GET_LIST_EXAMPLE = '[NOTES APP] GET LIST EXAMPLE';
export const CREATE_SYSTEM = '[NOTES APP] CREATE SYSTEM';

export function getListExample()
{
    const request = ssohttp.get(urls.getListExample, tags.getListInfo)
    return (dispatch) =>
        request.then((response) =>{
            console.log("System", response)
            if(response){
                dispatch({
                    type   : GET_LIST_EXAMPLE,
                    payload: response.data
                })
            }
        })
        .catch((error) => {
            console.log(error.response)
        });
}

export function createSystem(system)
{
    console.log(system)
    const body = { ...system }
    const request = ssohttp.post(urls.system, body, tags.createSystem)
    return (dispatch) =>
        request.then((response) => {
                console.log(response)
                dispatch({
                    type: CREATE_SYSTEM,
                    system: response.data
                })
                return dispatch(getListExample())
            }
        )
        .catch((error) => {
            console.log(error.response);
        });
}

