import React from 'react'
import {connect} from 'react-redux'
import {Button, ButtonToolbar, Form as BsForm, FormControl, FormGroup, Panel} from 'react-bootstrap'
import {Control, Form} from 'react-redux-form';
import * as routerActions from "react-router-redux";
import {bindActionCreators} from 'redux'

class Home extends React.Component {
  handleRegister(login) {
    console.log(`Registering ${login.toString()}`)
  }

  render() {
    return (
      <div className="container">
        <h1>Welcome to Budgee</h1>


        <BsForm>
          <Form
            model="login"
            onSubmit={(login) => this.props.handleSubmit(login)}
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
                  <Button onClick={(login) => this.handleRegister(login)}>
                    Register
                  </Button>
                </ButtonToolbar>

              </Panel.Footer>

            </FormGroup>

          </Form>
        </BsForm>

      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({handleSubmit}, dispatch);

function handleSubmit(login) {
  return routerActions.push(`/transactions/${login.username}`);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
