import React from 'react';
import {
  Row,
  Col,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
  import { connect } from 'react-redux';
  import './header.css';

class Header extends React.Component {
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
    const savedJobs = this.props.savedJobs.savedJobs.map(job => {
        return (
            <DropdownItem>
                <NavLink to={`/job-offer/${job.id.id}`}>
                    {job.title}
                </NavLink>
            </DropdownItem>
            )
    });

    return (
      <div style={{backgroundColor: '#f7f7f7'}}>
        <Row>
        <Col md={2}>
        </Col>
          
          <Col md={8} style={{padding: "15px 15px 15px 0px"}}>
            <Navbar light expand="md">
              
              <NavbarBrand href="/">JobSearch</NavbarBrand>
              
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Saved jobs ({this.props.savedJobs.savedJobs.length})
                    </DropdownToggle>
                    <DropdownMenu right>
                      {this.props.savedJobs.savedJobs.length === 0 ? <div style={{color: '#e1e1e1', margin: "0 auto", marginLeft: "10px"}}>Empty list</div> : ""}
                      {savedJobs}

                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </Collapse>
            </Navbar>
          </Col>
        </Row>
      </div>
    );
  }
}



const mapStateToProps = (state) => ({
    savedJobs: state.savedJobs
});


export default connect(mapStateToProps)(Header);