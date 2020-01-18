import React from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

export default class NavigationBar extends React.Component {
    constructor() {
        super()
        this.state = { redirectTo: null }
        this.logout = this.logout.bind(this)
    }
    logout(event) {
        event.preventDefault()
        console.log('logging out')
        axios.post('/logout').then(response => {
            console.log(response.data)
            if (response.status === 200) {
                this.props.updateUser({
                    loggedIn: false,
                    username: null,
                    userid: null
                })
                //fix this redirect
                this.setState({ redirectTo: '/login' })
            }
        }).catch(error => {
            console.log('Logout error')
        })
    }
    render() {
        const loggedIn = this.props.loggedIn
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirect }} />
        } else {
            return (
                <div>
                    <div className="appbar">
                        <AppBar position="static" style={{ backgroundColor: "#1b1b3a" }}>
                            <Toolbar>
                                <Typography variant="h6" className="appbartitle">
                                    Personal Cellar
                        </Typography>
                                {loggedIn ?
                                    <Button onClick={this.logout} variant="outlined" startIcon={<Icon>logout</Icon>} color="inherit">Logout</Button>
                                    : null
                                }
                            </Toolbar>
                        </AppBar>
                    </div>
                </div >
            )
        }
    }
}
/*  <Navbar className="navbar">
                    <Navbar.Brand href="/home">Personal Cellar</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/new">Add Wine</Nav.Link>
                        <Nav.Link href="/scan">Scanner</Nav.Link>
                    </Nav>
                    {loggedIn ?
                        <Form inline>
                            <Button variant="outline-info" onClick={this.logout}>Logout</Button>
                        </Form> : null
                    }
                </Navbar>*/