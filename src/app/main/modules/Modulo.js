import React, {useEffect, useRef} from 'react';
import { useHistory } from "react-router-dom";
import {FusePageSimple} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import * as Actions from './store/actions';
import ModuleList from "./ModuleList";
import ModuloForm from "./ModuloForm";
import {usePermission} from '@fuse/hooks'
import { tagSSO } from "@tags/Tags"

function Module(props)
{
    const dispatch = useDispatch();
    let history = useHistory();

    const pageLayout = useRef(null);
    const params = props.match.params

    const moduleApp = useSelector( ({ moduleApp })  => moduleApp);
    const [showPage] = usePermission(tagSSO.getModule, true)
    const [createModule] = usePermission(tagSSO.createModule, false)

    useEffect(() => {
        dispatch(Actions.getModule(params.idSystem))
    }, [dispatch]);

    function handleCreate(moduleI)
    {
        moduleI.idSystem = props.match.params.idSystem
        dispatch(Actions.createModule(moduleI));
    }

    return (
        <React.Fragment>
            <FusePageSimple
                classes={{
                    contentWrapper: "p-16 sm:p-24 pb-80",
                    content       : "flex min-h-full",
                    leftSidebar   : "w-256 border-0",
                    header        : "min-h-72 h-72"
                }}
                
                content={
                    <div className="flex flex-col w-full items-center">
                        <h3>Modules</h3>
                        {(createModule.valid) ? <ModuloForm onCreate={handleCreate}></ModuloForm> : <div></div>}
                        {(showPage.valid) ? <ModuleList/> : <div></div>}
                        {/* <SystemForm onCreate={handleCreate}></SystemForm> */}
                        
                    </div>
                }
                ref={pageLayout}
                innerScroll
            />
        </React.Fragment>

        
    )
}

export default withReducer('moduleApp', reducer)(Module);
//export default System;