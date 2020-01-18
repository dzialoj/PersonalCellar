import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { TextField, Button, FormControl, Icon } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowIcon from '@material-ui/icons/ArrowForward';
import { Link } from 'react-router-dom'
import logo from '../assets/images/pclogo.png'

export default class LoginForm extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log('handleSubmit')
        var userObj = { username: this.state.username, password: this.state.password }
        axios
            .post('/login', userObj)
            .then(response => {
                console.log('login response: ')
                console.log(response)
                if (response.status === 200) {
                    this.props.updateUser({
                        loggedIn: true,
                        username: response.data.username,
                        userid: response.data._id
                    })
                    this.setState({
                        redirectTo: '/home'
                    })
                } else {
                    alert("Login Invalid")
                }
            }).catch(error => {
                console.log('login error: ')
                console.log(error);

            })
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div className="login-form-wrapper">
                    <form className="login-form">
                        <div style={{ width: 100 }}>
                            <img src={logo} size={50} alt="logo" />
                        </div>
                        <FormControl style={{ marginBottom: 30 }}>
                            <TextField
                                style={{ color: "white" }}
                                id="email"
                                variant="outlined"
                                name="username"
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
                                endIcon={<ArrowIcon />}
                                onClick={this.handleSubmit}
                                type="submit">
                                Login
                             </Button>
                        </FormControl>
                        <br />
                        <FormControl>
                            <ButtonGroup variant="contained" >
                                <Button style={{ color: "white", backgroundColor: "black" }} component={Link} to="/login">Login</Button>
                                <Button style={{ color: "white", backgroundColor: "black" }} component={Link} to="/signup">Sign Up</Button>
                            </ButtonGroup>
                        </FormControl>
                    </form>
                </div >
            )
        }
    }
}