import React,{Component} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';

class AppNavbar extends Component{
    constructor(){
        super();
        this.state = {
            isOpen:false
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render(){
        return(
                <div>
                    <Navbar color="dark" dark expand="sm" className="mb-5">
                        <Container>
                            <NavbarBrand href="/users">Asset Management</NavbarBrand>
                            <NavbarToggler onClick={this.toggle.bind(this)} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink href="https://github.com/chandankumar665">Github</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#"><i className="fa fa-user"></i></NavLink>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </Container>
                    </Navbar>
                </div>
                )
    }
}

export default AppNavbar;