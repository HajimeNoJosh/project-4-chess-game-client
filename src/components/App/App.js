import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import CreateGame from '../Game/CreateGame'
import MyGame from '../Game/MyGame'
import Games from '../Game/Games'
import Game from '../Game/Game'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: [],
      showCreateButton: true
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = ({ heading, message, variant }) => {
    this.setState({ alerts: [...this.state.alerts, { heading, message, variant }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} showCreateButton={this.state.showCreateButton}/>
        {alerts.map((alert, index) => (
          <AutoDismissAlert
            key={index}
            heading={alert.heading}
            variant={alert.variant}
            message={alert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/games' render={() => (
            <Games alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/games/:id' render={() => (
            <Game alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/create-game' render={() => (
            <CreateGame alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/game/:id' render={() => (
            <MyGame alert={this.alert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
