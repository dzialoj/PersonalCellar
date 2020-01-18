import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './App.css';
import axios from 'axios';
//Component Imports
import SignUp from './components/sign-up';
import Login from './components/login';
import NewWine from './components/newwine';
import NavigationBar from './components/navbar';
import Inventory from './components/Home/inventory';
import EditWine from './components/Home/editwine';

import BottomNav from './components/bottomnav'
//components
const signUp = () => (
  <div>
    <SignUp />
  </div>
)
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null,
      userid: null
    }
    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }
  componentDidMount() {
    this.getUser()
  }
  updateUser(userObject) {
    this.setState(userObject)
  }
  getUser() {
    axios.get('/currentuser').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')
        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          userid: response.data.user._id
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null,
          userid: null
        })
      }
    })
  }
  render() {
    //need to get userid and send with updateuser somehow
    console.log(this.state.userid)
    return (
      <Router>
        <Switch>
          <Route exact path="/signup" component={signUp} />
          <Route
            path="/login"
            render={() => <Login updateUser={this.updateUser} />}
          />
          {this.state.loggedIn &&
            (<Switch>
              <Route path="/new" render={() =>
                <div>
                  <NavigationBar loggedIn={this.state.loggedIn} updateUser={this.updateUser} />
                  <NewWine currentUsername={this.state.username} />
                  <BottomNav />
                </div>} />
              <Route path="/home" render={() =>
                <div>
                  <NavigationBar loggedIn={this.state.loggedIn} updateUser={this.updateUser} />
                  <div>
                    <Inventory userid={this.state.userid} setUserid={this.setUserid} />
                  </div>
                  <div>
                    <BottomNav />
                  </div>
                </div>
              } />
              <Route path="/wines/:id" render={(props) =>
                <div>
                  <NavigationBar loggedIn={this.state.loggedIn} updateUser={this.updateUser} />
                  <EditWine {...props} />
                </div>
              } />
              <Route path="/scan" render={() =>
                <div>
                  <NavigationBar loggedIn={this.state.loggedIn} updateUser={this.updateUser} />
                </div>
              } />
            </Switch>)
          }
        </Switch>
      </Router>
    );
  }
}

export default App;
