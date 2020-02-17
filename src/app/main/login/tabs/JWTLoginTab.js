import React, {useEffect, useRef, useState} from 'react';
import { useHistory } from "react-router-dom";
import {Button, Divider, Typography, InputAdornment, Icon} from '@material-ui/core';

import Formsy from 'formsy-react';
import * as authActions from 'app/auth/store/actions';
import {useDispatch, useSelector} from 'react-redux';
import {tokensInternal, urls} from '../../../../config/config'
import * as ActionsFuse from "app/store/actions";

function JWTLoginTab(props)
{
    const dispatch = useDispatch();
    const login = useSelector(({auth}) => auth.login);

    const [isFormValid, setIsFormValid] = useState(false);
    const [info, setInfoLocal] = useLocalStorage(tokensInternal.info, {})
    const [permission, setPermiLocal] = useLocalStorage(tokensInternal.permission, {})
    const [role, setRole] = useLocalStorage(tokensInternal.role, {})
    const [access, setAccess] = useLocalStorage(tokensInternal.access, {})
    const formRef = useRef(null);
    let history = useHistory();

    useEffect(() => {
        if ( login.error && (login.error.email || login.error.password) )
        {
            formRef.current.updateInputsWithError({
                ...login.error
            });
            disableButton();
        }

        if(login.statusCode!=null){
            if(login.success && login.statusCode === 200){
                setInfoLocal(login.infoUser)
                const listSystem = login.infoUser.token.user.info.systems
                for(let i = 0; i < listSystem.length; i++){
                    if(listSystem[i].tag === urls.tagSystem){
                        if(listSystem[i].rol.length == 1){
                            
                            console.log("*****-------->", listSystem[i].rol[0])
                            setRole(listSystem[i].rol[0])
                        }
                        
                        setAccess({at: login.infoUser.token.accessToken, rt: login.infoUser.token.refreshToken})
                        history.push("/system")
                    }
                }
            }else{
                dispatch(ActionsFuse.showMessage({
                    message     : "Usuario o contraseña incorrectas, volver a intentar. o su usuario puede estar desactivado",
                    autoHideDuration: 10000,
                    anchorOrigin: {
                        vertical  : 'top',
                        horizontal: 'center'
                    },
                    variant: 'error'
                }))
            }
        }

    }, [login]);

    function disableButton()
    {
        setIsFormValid(false);
    }

    function enableButton()
    {
        setIsFormValid(true);
    }

    function handleSubmit(model)
    {
        dispatch(authActions.submitLoginMP(model));
    }

    return (
        <div className="w-full">
            <Form
                onValidSubmit={handleSubmit}
                onValid={enableButton}
                onInvalid={disableButton}
                ref={formRef}
                className="flex flex-col justify-center w-full"
            >
                <input
                    className="mb-16"
                    type="text"
                    name="email"
                    label="Username/Email"
                    value=""
                    validations={{
                        minLength: 4
                    }}
                    validationErrors={{
                        minLength: 'Min character length is 4'
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>
                    }}
                    variant="outlined"
                    required
                />

                <Input
                    className="mb-16"
                    type="password"
                    name="password"
                    label="Password"
                    value=""
                    validations={{
                        minLength: 1
                    }}
                    validationErrors={{
                        minLength: 'Min character length is 4'
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                    }}
                    variant="outlined"
                    required
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="w-full mx-auto mt-16 normal-case"
                    aria-label="LOG IN"
                    disabled={!isFormValid}
                    value="legacy"
                >
                    Login
                </Button>

            </Form>
        </div>
    );
}

export default JWTLoginTab;
