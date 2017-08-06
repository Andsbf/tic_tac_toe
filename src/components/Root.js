import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';
import App from '../components/App';
import Login from '../containers/Login';
import NewGame from '../containers/NewGame';
import Game from '../containers/Game';
import Games from '../containers/Games';
import CreateUser from '../containers/CreateUser';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

const Root = ({ store }) => {
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      store.getState().session.access_token ? (
        <Component {...props} isAdmin={store.getState().session.role === 'ADMIN'}/>
      ) : (<Redirect to={{ pathname: '/login' }}/>)
    )}/>
  );

  return (
    <div className='container'>
      <Header />
      <Provider store={store}>
        <Router >
          <Switch>
            <Route path='/login' component={Login}  />
            <PrivateRoute exact path='/' component={App} />
            <PrivateRoute exact path='/games' component={Games}  />
            <PrivateRoute path='/new_game' component={NewGame}  />
            <PrivateRoute path='/create_user' component={CreateUser}  />
            <PrivateRoute path='/games/:id' component={Game} />
            <Redirect from='*' to={'/'} />
          </Switch>
        </Router>
      </Provider>
    </div>
  )
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;