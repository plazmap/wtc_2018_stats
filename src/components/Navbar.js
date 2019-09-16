import React from 'react';
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
  
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      };
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
   
    render() {
      return (
        <div>
        <Navbar color="warning" light expand="md">
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className="lead text-light" href="https://www.buzzfeed.com/chelseamarshall/best-kitten-pictures">Stuff</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="lead text-light" href="https://youtu.be/dQw4w9WgXcQ?t=42">Different Stuff</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="lead text-light" href="https://github.com/plazmap/wtc_2018_stats">GitHub</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
      )
    }
  }
  
  export default Navbarplop;
  
