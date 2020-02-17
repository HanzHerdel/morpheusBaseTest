import React, {useState} from 'react'
import {Card, CardContent, Typography, Tabs, Tab} from '@material-ui/core';
import {darken} from '@material-ui/core/styles/colorManipulator';
import clsx from 'clsx';
import JWTLoginTab from './tabs/JWTLoginTab';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    root: {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + darken(theme.palette.primary.dark, 0.5) + ' 100%)',
        color     : theme.palette.primary.contrastText
    }
}));

function Login()
{
    const classes = useStyles();
    const [selectedTab, setSelectedTab] = useState(0);

    function handleTabChange(event, value)
    {
        setSelectedTab(value);
    }

    return (
        <div className={clsx(classes.root, "flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0")}>



            <div animation={{translateX: [0, '100%']}}>

                <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>

                    <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">

                        <Typography variant="h6" className="text-center md:w-full mb-48">ESQUELETO</Typography>

                        <JWTLoginTab/>

                        

                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Login;
