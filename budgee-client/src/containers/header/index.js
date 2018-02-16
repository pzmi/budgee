import React from 'react'
import {Nav, Navbar, NavItem} from 'react-bootstrap'
import {LinkContainer} from "react-router-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {logout} from "../../actions/users";
import * as routerActions from "react-router-redux";

class Header extends React.Component {
  render() {
    return <Navbar inverse collapseOnSelect>
      <LinkContainer to="/">

        <Navbar.Header>
          <Navbar.Brand>
            <a><strong>Budgee</strong></a>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
      </LinkContainer>

      <Navbar.Collapse>
        <Nav>
          <LinkContainer to="/about">
            <NavItem eventKey={1}>
              About
            </NavItem>
          </LinkContainer>
        </Nav>
        <Nav pullRight>
          {this.logoutButton()}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  }

  logoutButton() {
    if (this.props.loggedIn) {
      return <NavItem eventKey={1} onClick={() => this.logout()}>
        Logout
      </NavItem>;
    }
  }

  logout() {
    this.props.logout();
    this.props.redirectHome();
  }
}

const mapStateToProps = state => ({
  loggedIn: state.users.loggedIn,
});

const mapDispatchToProps = dispatch => bindActionCreators({logout, redirectHome}, dispatch);

function redirectHome() {
  return routerActions.push(`/`);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

