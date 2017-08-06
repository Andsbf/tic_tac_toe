import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { auth, usernameChange, passwordChange } from '../actions/login';

const style = { textAlign: 'center'};

let Login  = ({
    invalidCredentials,
    accessToken,
    authorizing,
    usernameChange,
    passwordChange,
    onSubmit
  }) => {
    if(accessToken ) { return <Redirect to={'/main'}/>}

    const invalidCredentialsDiv = (
      <div className='row'>
        <div className="col-md-2 col-md-offset-5">
          <div className="alert alert-danger" role="alert">
            <span className="glyphicon glyphicon-warning-sign" aria-hidden="true"></span> Invalid credentials
          </div>
        </div>
      </div>
    );

    const submitButton = <button onClick={onSubmit} className="btn btn-default">Login</button>

    return (
      <div className='row'>
        <div className="breadcrumb col-md-2 col-md-offset-5">
          <form style={style}>
            <div className="form-group">
              <input onChange={usernameChange} type="text" className="form-control" placeholder="Username" style={style}/>
            </div>
            <div>
              <input onChange={passwordChange} type="password" className="form-control" placeholder="Password" style={style}/>
            </div>
            <br/>
            { authorizing ? <Loading/> : submitButton }

          </form>
        </div>
        { invalidCredentials ? invalidCredentialsDiv : null }
      </div>
    );
};

Login.propTypes = {
  invalidCredentials: PropTypes.bool.isRequired,
  accessToken: PropTypes.string,
  authorizing: PropTypes.bool.isRequired,
  usernameChange: PropTypes.func.isRequired,
  passwordChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

const mapSateToProps = (state) => ({
  accessToken: state.session.access_token,
  invalidCredentials: state.login.invalidCredentials,
  authorizing: state.login.authorizing
});

const mapDispatchToProps = (dispatch) => ({
  usernameChange(input) { dispatch(usernameChange(input.target.value)) },
  passwordChange(input) { dispatch(passwordChange(input.target.value)) },
  onSubmit(e) { e.preventDefault(); dispatch(auth()) }
});

Login = connect(mapSateToProps, mapDispatchToProps)(Login);

export default Login;
