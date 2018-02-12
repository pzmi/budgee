import React from 'react'
import {connect} from 'react-redux'
import {Button, ButtonToolbar, FormControl, FormGroup, Panel} from 'react-bootstrap'
import {Control, Form} from 'react-redux-form';
import * as routerActions from "react-router-redux";
import * as Users from '../../actions/users';
import {bindActionCreators} from 'redux'

class Home extends React.Component {
  handleRegister(login) {
    this.props.addUser(login.username);
  }

  handleSubmit(login) {
    this.props.getUser(login.username);
  }

  componentDidMount() {
    this.redirectIfLogged();
  }

  componentDidUpdate() {
    this.redirectIfLogged();
  }

  redirectIfLogged() {
    if (this.props.loggedIn) {
      this.props.redirectToUser(this.props.username);
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Welcome to Budgee</h1>
        <Form
          model="login"
          onSubmit={(login) => this.handleSubmit(login)}
        >
          <FormGroup
            bsClass="login"
            horizontal="true"
            controlId="login.username"
            validationState={null}>
            <Control model="login.username" placeholder="Username"
                     component={FormControl}/>

            <Panel.Footer>
              <ButtonToolbar>
                <Button type="submit">
                  Login
                </Button>
                <Button onClick={() => this.handleRegister(this.props.login)}>
                  Register
                </Button>
              </ButtonToolbar>

            </Panel.Footer>

          </FormGroup>

        </Form>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  username: state.login.username,
  users: state.users,
  errors: [...state.users.errors],
  login: state.login,
  loggedIn: state.users.loggedIn,
});

const mapDispatchToProps = dispatch => bindActionCreators({redirectToUser, ...Users}, dispatch);

function redirectToUser(username) {
  return routerActions.push(`/transactions/${username}`);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
