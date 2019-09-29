import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
 } from 'reactstrap';

  class Navbarplop extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {
        isOpen: false
      };
    }
    toggle = () => {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }

    changeUrl = url => {
      this.props.history.push(url);
    }
  
    render() {
      
      return (
        <div>
          <Navbar color="warning" light expand="md">
            <NavbarBrand className="lead text-light font-weight-bold" style={{cursor: "pointer"}} onClick={() => {this.changeUrl("/")}}>Home</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink className="lead text-light" style={{cursor: "pointer"}} onClick={() => {this.changeUrl("/results")}}>Results</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="lead text-light" style={{cursor: "pointer"}} onClick={() => {this.changeUrl("/rankings")}}>Rankings</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="lead text-light" style={{cursor: "pointer"}} onClick={() => {this.changeUrl("/explorer")}}>Explorer</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="lead text-light" href={"https://github.com/plazmap/wtc_2018_stats"}>GitHub</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      )
    }
  }
  
  export default withRouter (Navbarplop);
  
