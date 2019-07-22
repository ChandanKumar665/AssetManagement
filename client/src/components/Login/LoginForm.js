import React, { Component } from 'react';
import { MDBContainer, MDBRow,MDBModalFooter, MDBCard, MDBCardBody, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';
import axios from 'axios';
import style from '../Style/Index.css';
import { Redirect,Link } from 'react-router-dom';
// import TopNavBar from './components/Header/TopNavBar';

export default class LoginForm extends Component {
    constructor(){
        super();
        this.state = {
            email:'',
            password:'',
            isOpen:false,
            res_msg:'',
            color:'primary',
            'isRedirectReqd': false
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    changeHandler = (e) => {
         this.setState({
             [e.target.name] : e.target.value
         })
         e.preventDefault()
     }

     isValid = (formData = {}) => {
        if(!formData)
            return {msg:'Please fill all the fields.',success:false}
        else if(!formData.email){
            return {msg:'Please enter email.',success:false}
        }else if(!formData.password) {
            return {msg:'Please enter password.',success:false}
        }   
        return true
     }

     formSubmit = (e) => {
        e.preventDefault()

        //post form submit
        var loginObj = {
            email:this.state.email,
            password:this.state.password
        }

        var check = this.isValid(loginObj)
        if(!check.success){
            this.setState({
                error: check.msg
            })
            return false
        }
                

            axios.post('http://localhost:4000/api/v1/auth',loginObj)
            .then(response => {
                if(response.data.success){
                    // NotificationManager.success(users.data.msg,'Success');
                    //setting session storage
                    var user = response.data.user;
                    sessionStorage.setItem('userData',JSON.stringify(user))
                    sessionStorage.setItem('usersToken',response.data.token)
                    this.setState({
                        isRedirectReqd: true
                    })
                    
                }else{
                    console.log("Login error")
                }  
            }).catch(err => {
                // console.log(err.response)
                this.setState({
                    error:err.response.data.msg
                })
            }) 
    }
    

  render() {

    if(this.state.isRedirectReqd){
        return <Redirect to={'/users'}/>
    }
    if(sessionStorage.getItem('userData')){
        return <Redirect to={'/users'}/>
    }
    return (
        
        <MDBContainer>
            <div className="alert alert-danger alert-dismissible" style = {{display: this.state.error != null ?'':'none'}}>
                <button type="button" className="close" data-dismiss="alert">&times;</button>
                <strong>Oops!</strong> {this.state.error}
            </div>
            <MDBRow>
                <MDBCol md="12">
                    <MDBCard>
                        <MDBCardBody>
                            <form onSubmit={this.formSubmit}>
                                <p className="h5 text-center mb-4">Sign in</p>
                                <div className="grey-text">
                                    <MDBInput
                                    label="Email"
                                    icon="envelope"
                                    group
                                    type="email"
                                    validate
                                    error="wrong"
                                    name="email"
                                    success="right"
                                    onChange={this.changeHandler}
                                    value={this.state.email} 
                                    />
                                    <MDBInput
                                    label="Password"
                                    icon="lock"
                                    group
                                    name="password"
                                    type="password"
                                    validate
                                    onChange={this.changeHandler}
                                    value={this.state.password}
                                    />
                                </div>
                                <div className="text-center">
                                    <MDBBtn color="primary" type="submit">Login</MDBBtn>
                                </div>
                            </form>
    
                            <div className="font-weight-light tc">
                                <p className="">Not a member? <Link to={'/users/create'}>Sign Up</Link></p>
                                <p>Forgot Password?</p>
                            </div>
                            
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>    
    )
  }
}
