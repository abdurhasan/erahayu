import React, { Component } from 'react';
import List from './Components/List/List';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import classes from './App.css';
import axios from 'axios';
import * as moment from 'moment';

const BASE_URL = 'https://remindmerhay.herokuapp.com/';
const headers = { Authorization: 'abdurhasan20' };

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            usersLastId: 3,
            newItem: { id: '', currentItem: {}, editMode: false, editUser: '' }
        };

        this.getUsers()
    }

    getUsers = async () => {
        const resp = (await axios.get(BASE_URL + 'getAllUser', { headers })).data
        const users = resp.data ? resp.data : [];
        for (let index = 0; index < users.length; index++) {
            const temp = users[index];
            temp['date'] = moment(temp.date).isValid() ? moment(temp.date).utc().format("DD-MM-YYYY HH:mm") : '';

            users[index] = {
                id: users[index].username,
                currentItem: temp
            }
        }
        this.setState({ users })
    }



    deleteItemHandler = async itemIndex => {
        const users = [...this.state.users];
        const deleteUsername = users[itemIndex].id
        users.splice(itemIndex, 1);
        this.setState({ users: users });
        const resp = (await axios.get(`${BASE_URL}deleteUser/${deleteUsername}`, { headers })).data
        console.log('deleteItemHandler : ', resp)

    };

    newInputChangeHandler = (event, type) => {
        const newItem = { ...this.state.newItem };
        newItem.currentItem[type] = event.target.value;
        this.setState({ newItem: newItem });
    };

    addItemHandler = async () => {
        const newUser = this.state.newItem.currentItem
        const runReq = (await axios.post(BASE_URL + 'register', newUser, { headers })).data
        console.log(runReq)
        await this.getUsers()


    };

    changeClickItemHandler = index => {
        const users = [...this.state.users];
        users[index].editUser = { ...users[index].currentItem };
        users[index].editMode = true;
        this.setState({ users: users });
    };

    changeEditInputHandler = (event, index, type) => {
        const users = [...this.state.users];
        users[index].editUser[type] = event.target.value;
        this.setState({ users: users });
    };

    saveItemHandler = async index => {
        const users = [...this.state.users];
        const editedUser = users[index].editUser
        if (!moment(editedUser.date).isValid()) {
            alert('FORMAT DATE TIDAK VALID')
        } else {
            const runReq = await axios.post(BASE_URL + 'register', editedUser, { headers })
            console.log(runReq)
            await this.getUsers();
        }
    };

    render() {

        return (
            <div className={classes.App}>
                <TextField className={classes.TextField} label="Username" value={this.state.newItem.currentItem.username} onChange={(event) => this.newInputChangeHandler(event, 'username')} />
                <TextField className={classes.TextField} label="Name" value={this.state.newItem.currentItem.fullName} onChange={(event) => this.newInputChangeHandler(event, 'fullName')} />
                <TextField className={classes.TextField} label="KTP" value={this.state.newItem.currentItem.ktp} onChange={(event) => this.newInputChangeHandler(event, 'ktp')} />
                <TextField className={classes.TextField} label="Phone" value={this.state.newItem.currentItem.phone} onChange={(event) => this.newInputChangeHandler(event, 'phone')} />
                <TextField className={classes.TextField} label="Address" value={this.state.newItem.currentItem.address} onChange={(event) => this.newInputChangeHandler(event, 'address')} />
                <TextField className={classes.TextField} type="date" value={this.state.newItem.currentItem.date} onChange={(event) => this.newInputChangeHandler(event, 'date')} />
                <Button mini variant="fab" color="primary" className={classes.Button} onClick={this.addItemHandler}>
                    <AddIcon />
                </Button>
                <List users={this.state.users} users={this.state.users} delete={this.deleteItemHandler} change={this.changeClickItemHandler} changeEdit={this.changeEditInputHandler} save={this.saveItemHandler} />
            </div>
        );
    };
};

export default App;
