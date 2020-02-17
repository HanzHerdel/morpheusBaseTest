import React from 'react';

export const SystemConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/system',
            component: React.lazy(() => import('./System'))
        }
    ]
};