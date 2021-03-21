import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import classes from './List.css';
// import * as moment from 'moment';

const list = (props) => {
    return (
        <Paper>
            <div className={classes.List}>
                <Table className={classes.Table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Ktp</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.users.map((item, index) => {
                            let itemBlock = null;
                            if (item.editMode) {                                
                                itemBlock = (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>
                                            <TextField label="Name" value={item.editUser.fullName} onChange={(event) => props.changeEdit(event, index, 'fullName')} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField label="KTP" value={item.editUser.ktp} onChange={(event) => props.changeEdit(event, index, 'ktp')} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField label="Phone" value={item.editUser.phone} onChange={(event) => props.changeEdit(event, index, 'phone')} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField label="Address" value={item.editUser.address} onChange={(event) => props.changeEdit(event, index, 'address')} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField type="date" value={item.editUser.date} defaultValue={item.editUser.date} onChange={(event) => props.changeEdit(event, index, 'date')} />
                                        </TableCell>
                                        <TableCell>
                                            <Button mini variant="fab" color="primary" className={classes.Button} onClick={() => props.save(index)}>
                                                <SaveIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            } else {
                                // const viewDate = moment(item.currentItem.date).isValid() ? moment(item.currentItem.date).format("DD-MM-YYYY HH:mm") : null
                                itemBlock = (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.currentItem.fullName}</TableCell>
                                        <TableCell>{item.currentItem.ktp}</TableCell>
                                        <TableCell>{item.currentItem.phone}</TableCell>
                                        <TableCell>{item.currentItem.address}</TableCell>
                                        <TableCell>{item.currentItem.date}</TableCell>
                                        <TableCell>
                                            <Button mini variant="fab" color="primary" className={classes.Button} onClick={() => props.change(index)}>
                                                <EditIcon />
                                            </Button>
                                            <Button mini variant="fab" color="primary" className={classes.Button} onClick={() => props.delete(index)}>
                                                <DeleteIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                            return itemBlock
                        })}
                    </TableBody>
                </Table>
            </div>
        </Paper>
    );
};

export default list;