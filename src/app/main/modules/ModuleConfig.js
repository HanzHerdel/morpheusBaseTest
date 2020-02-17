import React from 'react';;

export const ModuleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/module/:idSystem',
            component: React.lazy(() => import('./Modulo'))
        }
    ]
};