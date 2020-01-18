import React from 'react'
import axios from 'axios'
//import { Form, Col, Row, Button,Image } from 'react-bootstrap';
import { TextField, Button, FormControl, Icon, FormLabel } from '@material-ui/core';
import QR from './QR/qr';

export default class TestCrud extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.currentUsername,
            userid: '',
            name: '',
            vintage: '',
            country: '',
            region: '',
            varietal: '',
            pairing: '',
            notes: '',
            quantity: 0,
            cellocation: ''
        }

        this.componentDidMount = this.componentDidMount.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        axios.post('/currentuser/info', { username: this.state.username })
            .then(response => {
                this.setState({
                    userid: response.data
                })
            })
    }
    resetForm() {
        this.setState({
            username: this.props.currentUsername,
            name: '',
            vintage: '',
            country: '',
            region: '',
            varietal: '',
            pairing: '',
            notes: '',
            quantity: 0,
            cellocation: ''
        })
    }
    handleSubmit(event) {
        event.preventDefault()
        axios.post('/wines/newwine', {
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
        }).then(response => {
            console.log(response)
            if (response.status === 200) {
                console.log('Submit successful')
            } else {
                console.log('Soemthing aint right here')
            }
        })
        this.resetForm()
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="wine-form-wrapper">
                <div className="update-form">
                    <form onSubmit={this.handleSubmit}>
                        <FormLabel style={{paddingTop: 20 }}>
                            <h3>New Wine?</h3>
                        </FormLabel>
                        <br/>
                        <FormControl style={{ paddingTop: 20, paddingBottom: 20 }}>
                            <TextField
                                style={{}}
                                placeholder="Name"
                                type="text"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange} />
                        </FormControl>
                        <br />
                        <FormControl style={{ paddingBottom: 20 }}>
                            <TextField style={{}} placeholder="Vintage" type="text" name="vintage" value={this.state.vintage} onChange={this.handleChange} />
                        </FormControl>
                        <br />
                        <FormControl style={{ paddingBottom: 20 }}>
                            <TextField style={{}} placeholder="Country" type="text" name="country" value={this.state.country} onChange={this.handleChange} />
                        </FormControl>
                        <br />
                        <FormControl style={{ paddingBottom: 20 }}>
                            <TextField style={{}} placeholder="Region" type="text" name="region" value={this.state.region} onChange={this.handleChange} />
                        </FormControl>
                        <br />
                        <FormControl style={{ paddingBottom: 20 }}>
                            <TextField style={{}} placeholder="Varietal" type="text" name="varietal" value={this.state.varietal} onChange={this.handleChange} />
                        </FormControl>
                        <br />
                        <FormControl style={{ paddingBottom: 20 }}>
                            <TextField style={{}} placeholder="Pairing" type="text" name="pairing" value={this.state.pairing} onChange={this.handleChange} />
                        </FormControl>
                        <br />
                        <FormControl style={{ paddingBottom: 20 }}>
                            <TextField style={{}} placeholder="Notes" type="text" name="notes" value={this.state.notes} onChange={this.handleChange} />
                        </FormControl>
                        <br />
                        <FormControl style={{ paddingBottom: 20 }}>
                            <TextField style={{}} placeholder="Quantity" type="number" name="quantity" value={this.state.quantity} onChange={this.handleChange} />
                        </FormControl>
                        <br />
                        <FormControl style={{ paddingBottom: 20 }}>
                            <TextField style={{}} placeholder="Location in cellar" type="text" name="cellocation" value={this.state.cellocation} onChange={this.handleChange} />
                        </FormControl>
                        <br />
                        <FormControl style={{ paddingBottom: 20 }}>
                            <Button variant="outlined" type="submit">submit</Button>
                        </FormControl>
                    </form>
                </div>
            </div>
        )
    }
    /*
    render() {
        return (
            <div className="wine-form-wrapper">
                <div id="wineform">
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <Form.Group as={Row} controlId="formHorizontal">
                            <Form.Label column sm={2}>
                                Name
                        </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleChange.bind(this)}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontal">
                            <Form.Label column sm={2}>
                                Vintage
                        </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    name="vintage"
                                    value={this.state.vintage}
                                    onChange={this.handleChange.bind(this)}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontal">
                            <Form.Label column sm={2}>
                                Country
                        </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    name="country"
                                    value={this.state.country}
                                    onChange={this.handleChange.bind(this)}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontal">
                            <Form.Label column sm={2}>
                                Region
                        </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    name="region"
                                    value={this.state.region}
                                    onChange={this.handleChange.bind(this)}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontal">
                            <Form.Label column sm={2}>
                                Varietal
                        </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    name="varietal"
                                    value={this.state.varietal}
                                    onChange={this.handleChange.bind(this)}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontal">
                            <Form.Label column sm={2}>
                                Pairing
                        </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    name="pairing"
                                    value={this.state.pairing}
                                    onChange={this.handleChange.bind(this)}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontal">
                            <Form.Label column sm={2}>
                                Notes
                        </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    name="notes"
                                    value={this.state.notes}
                                    onChange={this.handleChange.bind(this)}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontal">
                            <Form.Label column sm={2}>
                                Quantity
                        </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="number"
                                    name="quantity"
                                    value={this.state.quantity}
                                    onChange={this.handleChange.bind(this)}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontal">
                            <Form.Label column sm={2}>
                                Cellar Location
                        </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    name="cellocation"
                                    value={this.state.cellocation}
                                    onChange={this.handleChange.bind(this)}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm={{ span: 10, offset: 2 }}>
                                <Button type="submit">Submit</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        )
    }*/
}