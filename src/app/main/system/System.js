import React, {useEffect, useRef} from 'react';
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import withReducer from '~/app/store/withReducer';
import reducer from './store/reducers';
import SystemList from "./SystemList";
// import SystemForm from "./SystemForm";
import * as Actions from './store/actions';
//import {useLocalStorage, usePermission} from '@fuse/hooks'
// import {tokensInternal} from '../../../config/config'
import { tags } from "@tags/Tags";

function System(props)
{
    const dispatch = useDispatch();
    let history = useHistory();

    const pageLayout = useRef(null);
    // const [info, setInfo] = useLocalStorage(tokensInternal.info, {})
    // const [createSystem] = usePermission(tagSSO.createSystem, false)
    //const [showSystem] = usePermission(tags.showPage, true)

    const system = useSelector( ({ system })  => {return system});

    useEffect(() => { 
        
        dispatch(Actions.getListExample())
    }, [dispatch]);

    function handleCreate(system)
    {
        dispatch(Actions.createSystem(system));
    }

    return (
        <React.Fragment>

        </React.Fragment>

        
    )
}

export default withReducer('system', reducer)(System);
//export default System;
