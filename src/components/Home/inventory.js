import React from 'react'
import axios from 'axios'
import Trow from './tablerow'
import NewsWidget from './newswidget'
import Recommended from './recommended'
import QR from '../QR/qr'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default class Inventory extends React.Component {

  constructor(props) {
    super(props)
    this.state = { tableData: [], userid: this.props.userid, wineid: { value: {} } }
    this.setWineObj = this.setWineObj.bind(this)
  }
  componentDidMount() {
    axios.get('/wines/' + this.state.userid)
      .then(response => {
        console.log(response.data)
        this.setState({ tableData: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  componentWillUnmount() {
    this.setState({
      tableData: []
    })
  }
  tabRow() {
    return this.state.tableData.map(wine => {
      return <Trow obj={wine} key={wine._id} findWine={this.setWineObj} />;
    });
  }
  setWineObj(val) {
    this.setState({ wineid: val })
    console.log(this.state.wineid)
  }
  render() {
    return (
      <div className="data-table-wrapper">
        <div className="data-table">
          <TableContainer component={Paper}>
            <Table style={{ backgroundColor: '#031926', color: 'white', height: 500 }}>
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: 'white', textAlign: 'center' }}>Name</TableCell>
                  <TableCell style={{ color: 'white', textAlign: 'center' }}>Vintage</TableCell>
                  <TableCell style={{ color: 'white', textAlign: 'center' }} >Country</TableCell>
                  <TableCell style={{ color: 'white', textAlign: 'center' }}>Region</TableCell>
                  <TableCell style={{ color: 'white', textAlign: 'center' }}>Varietal</TableCell>
                  <TableCell style={{ color: 'white', textAlign: 'center' }}>Notes</TableCell>
                  <TableCell style={{ color: 'white', textAlign: 'center' }}>Pairing</TableCell>
                  <TableCell style={{ color: 'white', textAlign: 'center' }}>Quantity</TableCell>
                  <TableCell style={{ color: 'white', textAlign: 'center' }}>Location</TableCell>
                  <TableCell style={{ color: 'white', textAlign: 'center' }}>GWS</TableCell>
                  <TableCell style={{ color: 'white', textAlign: 'center' }} colSpan='3'>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.tabRow()}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="qr-wrapper">
        <div className="qr-shape">
              <div className="qr-name">
                <h5>News</h5>
                <NewsWidget />
              </div>
          </div>
          <div className="qr-shape">
            <div className="qr-name">
              <h5>QR</h5>
              {this.state.wineid.value.id ?
                <div>
                  <h3>{this.state.wineid.value.name}</h3>
                  <QR wineObj={this.state.wineid.value.id} />
                </div>
                : <div>Select a QR</div>
              }
            </div>
            <div className="qr-name">
              <h5>Recommendations</h5>
              <Recommended />
            </div>
          </div>
        </div>
      </div>

    )
  }
  /*
  render() {
    return (
      <div className="data-table-wrapper" >
        <div className="data-table">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Vintage</th>
                <th>Country</th>
                <th>Region</th>
                <th>Varietal</th>
                <th>Notes</th>
                <th>Pairing</th>
                <th>Quantity</th>
                <th>Location</th>
                <th>GWS</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.tabRow()}
            </tbody>
          </table>
        </div>
        <div className="qr-wrapper">
          <div className="qr-shape">
            <div className="qr-name">
              <h3>QR</h3>
              {this.state.wineid.value.id ?
                <div>
                  <h3>{this.state.wineid.value.name}</h3>
                  <QR wineObj={this.state.wineid.value.id} />
                </div>
                : null
              }
            </div>
            <div className="qr-name">
              <h2>Recommendations</h2>
            </div>
          </div>
          <div className="qr-shape">

          </div>
        </div>
      </div>
    );
  }*/
}
