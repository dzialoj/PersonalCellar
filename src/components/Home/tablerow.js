import React from 'react'
import axios from 'axios'
import { BrowserRouter as Redirect, Link } from "react-router-dom"
import { Button } from '@material-ui/core';
import QR from '../QR/qr';
import { TableRow, TableCell } from '@material-ui/core';

export default class TRow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.obj.name,
            vintage: this.props.obj.vintage,
            score: 0,
            wineid: ''
        }
        this.delete = this.delete.bind(this)
        this.getQR = this.getQR.bind(this)
    }
    componentDidMount() {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = 'https://api.globalwinescore.com/globalwinescores/latest/?wine=' + this.state.name + '&vintage=' + this.state.vintage
        fetch(proxyurl + url, {
            method: 'GET',
            headers: {
                'Authorization': 'Token c9b98f94b3c608f5a7669b6351bcc076ce29cbbf',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
            }
        }).then(response => response.json())
            .then(data => {
                this.setState({
                    score: data.results[0].score
                })
            }).catch(err => console.log('No score found'))

    }
    componentWillUnmount() {
        console.log('unmount')
    }
    delete() {
        axios.get('/wines/delete/' + this.props.obj._id)
            .then(
                console.log('Deleted'),
                alert(`Deleted: ${this.props.obj.name}`)
            )
            .catch(err => console.log(err))
    }
    getQR() {
        axios.get('/wines/find/' + this.props.obj._id)
            .then(response => {
                this.props.findWine({ value: { id: response.data._id, name: response.data.name } })
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <TableRow>
                <TableCell style={{ color: 'white', textAlign: 'center' }}>
                    {this.props.obj.name}
                </TableCell>
                <TableCell style={{ color: 'white', textAlign: 'center' }}>
                    {this.props.obj.vintage}
                </TableCell>
                <TableCell style={{ color: 'white', textAlign: 'center' }}>
                    {this.props.obj.country}
                </TableCell>
                <TableCell style={{ color: 'white', textAlign: 'center' }}>
                    {this.props.obj.region}
                </TableCell>
                <TableCell style={{ color: 'white', textAlign: 'center' }}>
                    {this.props.obj.varietal}
                </TableCell>
                <TableCell style={{ color: 'white', textAlign: 'center' }}>
                    {this.props.obj.notes}
                </TableCell>
                <TableCell style={{ color: 'white', textAlign: 'center' }}>
                    {this.props.obj.pairing}
                </TableCell>
                <TableCell style={{ color: 'white', textAlign: 'center' }}>
                    {this.props.obj.quantity}
                </TableCell>
                <TableCell style={{ color: 'white', textAlign: 'center' }}>
                    {this.props.obj.cellocation}
                </TableCell>
                {this.state.score === 0 ?
                    <TableCell style={{ color: 'white', textAlign: 'center' }}>?</TableCell> :
                    <TableCell style={{ color: 'white', textAlign: 'center' }}>{this.state.score}</TableCell>
                }
                <TableCell style={{ color: 'white', textAlign: 'center' }}>
                    <Button
                        style={{ backgroundColor: "#7d80da" }}
                        variant="contained"
                        component={Link}
                        to={"/wines/" + this.props.obj._id}>Edit</Button>
                </TableCell>
                <TableCell style={{ color: 'white', textAlign: 'center' }}>
                    <Button style={{ backgroundColor: "#b0a3d4" }} onClick={this.getQR} variant="contained">QR</Button>
                </TableCell>
                <TableCell style={{ color: 'white', textAlign: 'center' }}>
                    <Button onClick={this.delete} variant="contained" color="secondary">Delete</Button>
                </TableCell>
            </TableRow>
        )
    }
}
/*
render() {
return (
<tr>
    <td>
        {this.props.obj.name}
    </td>
    <td>
        {this.props.obj.vintage}
    </td>
    <td>
        {this.props.obj.country}
    </td>
    <td>
        {this.props.obj.region}
    </td>
    <td>
        {this.props.obj.varietal}
    </td>
    <td>
        {this.props.obj.notes}
    </td>
    <td>
        {this.props.obj.pairing}
    </td>
    <td>
        {this.props.obj.quantity}
    </td>
    <td>
        {this.props.obj.cellocation}
    </td>
    {this.state.score === 0 ?
        <td>N/A</td> :
        <td>{this.state.score}</td>
    }
    <td>
        <Button
        style={{backgroundColor: "#7d80da"}}
        variant="contained"
        component={Link}
        to={"/wines/" + this.props.obj._id}>Edit</Button>
    </td>
    <td>
        <Button style={{backgroundColor: "#b0a3d4"}} onClick={this.getQR} variant="contained">QR</Button>
    </td>
    <td>
        <Button onClick={this.delete} variant="contained" color="secondary">Delete</Button>
    </td>
</tr>
);

}
}*/