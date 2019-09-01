import React, { Component } from 'react'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";    

export default class TopNavBar extends Component {
    constructor(){
        super()
        this.state = {
            isOpen: false,
            isRedirectReqd: false,
            isLoggedIn: false
          };
        this.toggleCollapse = this.toggleCollapse.bind(this); 
    }

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
      }
     
    componentDidMount = () => {
        if(sessionStorage.getItem('userData')){
            var user_data = JSON.parse(sessionStorage.getItem('userData'))
            this.setState({
                name:user_data.name,
                email:user_data.email,
                isLoggedIn: true,
            })
        }else if(sessionStorage.getItem('tempAdmin')){
            this.setState({
                name:'tempadmin',
                email:'admin@admin.com',
                isLoggedIn: true
            })
        }
        this.setState({
            theme: localStorage.getItem('theme') !== undefined && localStorage.getItem('theme') !== 'default' 
            ? localStorage.getItem('theme') : 'black'
        })
    } 

    render() {
    // console.log(window.location.pathname.replace('/',''))
    const path = window.location.pathname.replace('/','');
    var active_settings = '';
    var active_home = '';
    if(path == 'settings'){
        active_settings = 'active';
    }else{
        active_home = 'active';
    }
    return (
        <MDBNavbar color={this.state.theme} dark expand="md">
            <MDBNavbarBrand>
                <strong className="white-text">AM</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.toggleCollapse} />
            <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                <MDBNavbarNav left>
                    <MDBNavItem active>
                        <MDBNavLink to="/users">Home</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink to="/settings">Settings</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink to="#!">Pricing</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBDropdown>
                            <MDBDropdownToggle nav caret>
                                <div className="d-none d-md-inline">Others</div>
                            </MDBDropdownToggle>
                            <MDBDropdownMenu className="dropdown-default">
                                <MDBDropdownItem href="#!">About</MDBDropdownItem>
                                <MDBDropdownItem href="#!">License</MDBDropdownItem>
                                <MDBDropdownItem href="#!">FAQ</MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
                    <MDBNavItem>
                        <MDBNavLink className="waves-effect waves-light" to="#!">
                        <MDBIcon fab icon="google-plus-g" />
                        </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBDropdown>
                        <MDBDropdownToggle nav caret>
                            <MDBIcon icon="user" />&nbsp;
                            <div className="d-none d-md-inline">{this.state.name}</div>
                        </MDBDropdownToggle>
                        <MDBDropdownMenu className="dropdown-default">
                            <MDBDropdownItem href={this.state.isLoggedIn?'#':'/home'}>{this.state.isLoggedIn?'Accounts':'Home'}</MDBDropdownItem>
                            <MDBDropdownItem href={this.state.isLoggedIn?'/settings':'/home'}>{this.state.isLoggedIn?'Settings':'About'}</MDBDropdownItem>
                            <MDBDropdownItem href={this.state.isLoggedIn?'/logout':'/login'}>{this.state.isLoggedIn?'Logout':'Login'}</MDBDropdownItem>
                        </MDBDropdownMenu>
                        </MDBDropdown>
                    </MDBNavItem>
                </MDBNavbarNav>
            </MDBCollapse>
        </MDBNavbar>
    )
  }
}
