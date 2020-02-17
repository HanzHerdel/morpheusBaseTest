import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { FuseAnimate } from '@fuse';
import _ from '@lodash';
import { useDispatch } from 'react-redux';
import {useForm} from '@fuse/hooks';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import ModuleModel from "./model//ModuleModel";
//import * as Actions from './store/actions';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 0,
        marginBottom: 50
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100%',
      },
      button: {
        width: '100%',
      }
}));



function ModuleForm(props) {
    const dispatch = useDispatch();
    // const files = useSelector(({fileManagerApp}) => fileManagerApp.files);
    // const selectedItemId = useSelector(({fileManagerApp}) => fileManagerApp.selectedItemId);
    const classes = useStyles();
    useEffect( () => {   }, [dispatch] );

    const {form: moduleForm, handleChange} = useForm(
        _.merge(
            {},
            new ModuleModel()
        ));
    

    function handleOnCreate(event)
    {
        if ( !props.onCreate )
        {
            return;
        }
        props.onCreate(moduleForm);
    }

    return (

        <FuseAnimate animation="transition.slideUpIn" delay={300}>
            <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-basic-name"
                            className={classes.textField}
                            label="Name"
                            margin="normal"
                            variant="outlined"
                            name="nameModule"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-basic-description"
                            className={classes.textField}
                            label="Description"
                            margin="normal"
                            variant="outlined"
                            name="description"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleOnCreate} className={classes.button}>
                        CREAR
                    </Button>
                    </Grid>
                </Grid>
            </div>
        </FuseAnimate>
    );
}

export default withReducer('moduleForm', reducer)(ModuleForm);