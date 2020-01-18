import React from 'react';
import axios from 'axios';
import { TextField, Button, FormControl, Icon } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

export default class EditWine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: '',
            name: '',
            vintage: '',
            country: '',
            region: '',
            varietal: '',
            pairing: '',
            notes: '',
            quantity: 0,
            cellocation: '',
            redirectTo: null
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        var adjust = prompt('Drinking?',0)
        if(isNaN(adjust)){
            alert('Enter a valid number');
        }
        axios.get('/wines/find/' + this.props.match.params.id)
            .then(response => {
                console.log(response)
                this.setState({
                    userid: response.data.userid,
                    name: response.data.name,
                    vintage: response.data.vintage,
                    country: response.data.country,
                    region: response.data.region,
                    varietal: response.data.varietal,
                    pairing: response.data.pairing,
                    notes: response.data.notes,
                    quantity: response.data.quantity - adjust,
                    cellocation: response.data.cellocation
                })
            })
            .catch((err) => { console.log(err) })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit(event) {
        const updatedWine = {
            userid: this.state.userid,
            name: this.state.name,
            vintage: this.state.vintage,
            country: this.state.country,
            region: this.state.region,
            varietal: this.state.varietal,
            pairing: this.state.pairing,
            notes: this.state.notes,
            quantity: this.state.quantity,
            cellocation: this.state.cellocation
        }
        axios.post('/wines/update/' + this.props.match.params.id, updatedWine)
            .then(response => {
                if (response.status === 200) {
                    alert('Update success')
                    console.log(response.data)
                } else {
                    alert("failed update")
                }
            })
        this.setState({
            name: '',
            vintage: '',
            country: '',
            region: '',
            varietal: '',
            pairing: '',
            notes: '',
            quantity: 0,
            cellocation: '',
            redirectTo: '/home'
        })
    }
    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div className="update-form-wrapper">
                    <form className="update-form" onSubmit={this.handleSubmit}>
                        <FormControl style={{ paddingTop: 20, paddingBottom: 20 }}>
                            <TextField style={{}} type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                        </FormControl>
                        <br />
                        <FormControl style={{ paddingBottom: 20 }}>
                            <TextField style={{}} type="text" name="vintage" value={this.state.vintage} onChange={this.handleChange} />
                        </FormControl>
                        <br />
                        <FormControl style={{ paddingBottom: 20 }}>
                            <TextField style={{}} type="text" name="country" value={this.state.country} onChange={this.handleChange} />
                        </FormControl>
                        <br />
                        <FormControl style={{ paddingBottom: 20 }}>
                            <TextField style={{}} type="text" name="region" value={this.state.region} onChange={this.handleChange} />
                        </FormControl>
                        <br />
                        <FormControl style={{ paddingBottom: 20 }}>
                            <TextField style={{}} type="text" name="varietal" value={this.state.varietal} onChange={this.handleChange} />
                        </FormControl>
                        <br />
                        <FormControl style={{ paddingBottom: 20 }}>
                            <TextField style={{}} type="text" name="pairing" value={this.state.pairing} onChange={this.handleChange} />
                        </FormControl>
                        <br />
                        <FormControl style={{ paddingBottom: 20 }}>
                            <TextField style={{}} type="text" name="notes" value={this.state.notes} onChange={this.handleChange} />
                        </FormControl>
                        <br />
                        <FormControl style={{ paddingBottom: 20 }}>
                            <TextField style={{}} type="number" name="quantity" value={this.state.quantity} onChange={this.handleChange} />
                        </FormControl>
                        <br />
                        <FormControl style={{ paddingBottom: 20 }}>
                            <TextField style={{}} type="text" name="cellocation" value={this.state.cellocation} onChange={this.handleChange} />
                        </FormControl>
                        <br />
                        <FormControl style={{ paddingBottom: 20 }}>
                            <Button variant="outlined" type="submit">submit</Button>
                        </FormControl>
                    </form>
                </div>
            )
        }
    }
}