import React, { Component } from 'react'
import { MDBAlert} from 'mdbreact';
import TopNavBar from '../header/TopNavBar';
import {Redirect} from 'react-router-dom';
export default class Logout extends Component {
    constructor(){
        super()
        this.state = {
            msg:'',
            isRedirectReqd:false
        }
    }

    componentDidMount = () => {
        sessionStorage.setItem('userData',null);
        sessionStorage.setItem('tempAdmin',null);
        sessionStorage.clear();
        this.setState({
            msg:'logged out successfully.',
            isRedirectReqd:true
        })
    }

  render() {
    if(this.state.isRedirectReqd){
        return <Redirect to={'/'}/>
    }

    return (
        <>
        <TopNavBar/>
        <p></p>
        <div style= {{display: this.state.msg != null ?'':'none'}}>
            <MDBAlert color="success" dismiss>
                {this.state.msg}.
            </MDBAlert>
        </div>
        </>
    )
  }
}
