import React from 'react';
import axios from 'axios';
import { FormControl, TextField, Button, ButtonGroup } from '@material-ui/core'
import { Link } from 'react-router-dom';
import PersonAdd from '@material-ui/icons/PersonAdd';
import { borderColor } from '@material-ui/system';

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        axios.post('/signup', {
            username: this.state.email,
            password: this.state.password
        }).then(response => {
            console.log(response)
            if (response.data) {
                console.log("Sign up successful")
                this.setState({ redirectTo: '/login' })
            } else {
                console.log('Sign up unsuccessful')
            }
        }).catch(error => { console.log("Sign up error:" + error) })
    }
    render() {
        return (
            <div className="login-form-wrapper">
                <form className="login-form">
                    <FormControl style={{ color: 'white',marginBottom: 30 }}>
                        <div style={{ width: 100, fontFamily: "Roboto", whiteSpace: "nowrap" }}>
                            <h2>Create an Account!</h2>
                        </div>
                        <TextField
                            InputProps={{style:{backgroundColor: 'white'}}}
                            id="email"
                            variant="outlined"
                            name="email"
                            type="email"
                            value={this.state.username}
                            onChange={this.handleChange}
                            label="Email" />
                    </FormControl>
                    <br />
                    <FormControl style={{ marginBottom: 30 }}>
                        <TextField
                            id="password"
                            variant="outlined"
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            label="Password"
                        />
                    </FormControl>
                    <br />
                    <FormControl style={{ marginBottom: 30 }}>
                        <Button
                            style={{ color: "white", backgroundColor: "black" }}
                            variant="contained"
                            endIcon={<PersonAdd />}
                            color="primary"
                            onClick={this.handleSubmit}
                            type="submit">
                            Sign Up
                             </Button>
                    </FormControl>
                    <br />
                    <FormControl>
                        <ButtonGroup color="primary" variant="contained" >
                            <Button style={{ color: "white", backgroundColor: "black" }} component={Link} to="/login">Login</Button>
                            <Button style={{ color: "white", backgroundColor: "black" }} component={Link} to="/signup">Sign Up</Button>
                        </ButtonGroup>
                    </FormControl>
                </form>
            </div>
        )
    }
}