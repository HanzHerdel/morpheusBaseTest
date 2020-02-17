import React, { useEffect } from 'react';
import {  Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import * as moment from 'moment'
import {usePermission} from '@fuse/hooks'
import { tagSSO } from "@tags/Tags"
//import * as Actions from './store/actions';

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
  }))

function ModuleList(props) {
    const dispatch = useDispatch();
    // const files = useSelector(({fileManagerApp}) => fileManagerApp.files);
    // const selectedItemId = useSelector(({fileManagerApp}) => fileManagerApp.selectedItemId);
    // const classes = useStyles();
    const classes = useStyles();
    const listModule = useSelector( ({ moduleApp })  => moduleApp.module.entities.list);
    const [showScreen] = usePermission(tagSSO.getScreen, false)
    useEffect( () => {   }, [dispatch] );

    return (

        <FuseAnimate animation="transition.slideUpIn" delay={300}>
            <Table>

                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell className="hidden sm:table-cell">Date</TableCell>
                        <TableCell className="hidden sm:table-cell">Description</TableCell>
                        <TableCell className="text-center hidden sm:table-cell">Tag</TableCell>
                        <TableCell className="hidden sm:table-cell">Actions</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {listModule ?
                        (listModule.map((n, index) => (
                                <TableRow
                                    key={n._id}
                                    hover
                                    className="cursor-pointer"
                                >
                                    <TableCell>{n.name}</TableCell>
                                    <TableCell className="hidden sm:table-cell">{moment(n.date).format("DD/MM/YYY")}</TableCell>
                                    <TableCell className="hidden sm:table-cell">{n.description}</TableCell>
                                    <TableCell className="text-center hidden sm:table-cell">{n.tag}</TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        {
                                            (showScreen.valid) ? 
                                            <Button
                                                variant="contained"
                                                color="primary" 
                                                size="small"
                                                className={classes.button}
                                                to={`/screen/${n.tag}`}
                                                component={Link}
                                            >Screen</Button>
                                            :
                                            <div></div>
                                        }
                                    </TableCell>
                                </TableRow>
                            )
                    )) : (<TableRow></TableRow>)


                    }

                </TableBody>
            </Table>
        </FuseAnimate>
    );
}

export default withReducer('moduleList', reducer)(ModuleList);