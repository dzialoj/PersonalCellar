import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class Recommended extends React.Component {
    constructor(props) {
        super(props)
        this.state = { data: [], loaded: false }
    }
    componentDidMount() {
        const proxy = 'https://cors-anywhere.herokuapp.com/'
        const url = 'https://api.globalwinescore.com/globalwinescores/latest/?ordering=-date&country=Usa'
        fetch(proxy + url, {
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
                    data: data.results,
                    loaded: true
                })
                console.log(data.results)
            }).catch(err => console.log('No results'))
    }
    render() {
        return (
            <div>
                {!this.state.loaded ? 
                (<div>
                    <CircularProgress style={{color: 'blue'}} />
                </div>):
                <div style={{ tableLayout: 'fixed', overflow: 'auto', height: 200 }}>
                    <TableContainer component={Paper}>
                        <Table style={{ backgroundColor: '#031926', color: 'white', height: 200 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ color: 'white' }}>Name</TableCell>
                                    <TableCell style={{ color: 'white' }}>Vintage</TableCell>
                                    <TableCell style={{ color: 'white' }}>Score</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.data.map((data, i) => (
                                    <TableRow style={{ color: 'white' }} key={i}>
                                        <TableCell style={{ color: 'white' }} >{data.wine}</TableCell>
                                        <TableCell style={{ color: 'white' }}>{data.vintage}</TableCell>
                                        <TableCell style={{ color: 'white' }}>{data.score}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                }
            </div>
        )
    }
}