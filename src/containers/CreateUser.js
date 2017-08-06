import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from '../components/Loading';
import BackToMenu from '../components/BackToMenu';
import { fetchPlayers } from '../actions/session';
import { createUser, newUsernameChange, newUserPasswordChange } from '../actions/createUser';

const style = { textAlign: 'center', color: '#337ab7' };

class CreateUser extends Component {
  componentWillMount() {
    this.props.fetchPlayers()
  };

  render () {
    const {
      onSubmit,
      creating,
      newUsername,
      newUserPassword,
      onNewUsernameChange,
      onNewUserPasswordChange,
    } = this.props

    const usersList = () => {
      const { users } = this.props
      if(!users) { return <Loading message={ 'Fetching Users...' }/> }

      return (
        <div>
          <p style={style}>Users</p>
          <ul className="list-group">
            { users.map(u => <li className="list-group-item" key={ u.username }>{ u.username }</li>) }
          </ul>
        </div>
      );
    };

    const submitButton = <button onClick={ onSubmit } disabled={ creating } className="btn btn-default">Create</button>

    return (
      <div className='row' style={style}>
        <BackToMenu />
        <br/>
        <div className="breadcrumb col-md-2 col-md-offset-4">
          <form style={ style }>
            <div className="form-group">
              <input
                onChange={ onNewUsernameChange }
                type="text"
                className="form-control"
                placeholder="Username"
                style={ style }
                value={ newUsername ? newUsername : '' }
              />
            </div>
            <div>
              <input
                onChange={ onNewUserPasswordChange }
                type="password"
                className="form-control"
                placeholder="Password"
                style={ style }
                value={ newUserPassword ? newUserPassword : '' }
              />
            </div>
            <br/>
          { creating ? <Loading /> : submitButton }
          </form>
        </div>
        <div className=" col-md-2">
          { usersList() }
        </div>
      </div>
    )
  }
};

const mapSateToProps = (state) => ({
  newUsername: state.createUser.newUsername,
  newUserPassword: state.createUser.newUserPassword,
  users: state.session.players,
  creating: state.createUser.creating
});

const mapDispatchToProps = (dispatch) => ({
  fetchPlayers() { dispatch(fetchPlayers()) },
  onNewUsernameChange(input) { dispatch(newUsernameChange(input.target.value)) },
  onNewUserPasswordChange(input) { dispatch(newUserPasswordChange(input.target.value)) },
  onSubmit(e) { e.preventDefault(); dispatch(createUser()) }
});

CreateUser = connect(mapSateToProps, mapDispatchToProps)(CreateUser);

export default CreateUser;
