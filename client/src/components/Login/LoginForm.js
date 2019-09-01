import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBAlert, MDBCard, MDBCardBody, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';
import axios from 'axios';
import style from '../style/style.css';
import { Redirect,Link } from 'react-router-dom';
import TopNavBar from '../header/TopNavBar';
import { NotificationManager,NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';


export default class LoginForm extends Component {
    constructor(props){
        super(props);
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

    componentDidMount = () => {
        var theme_color = localStorage.getItem('theme') == undefined ? 'default' : localStorage.getItem('theme');
        var btn_color = localStorage.getItem('btn_color') == undefined ? 'btn btn-primary':localStorage.getItem('btn_color');
        if(btn_color == 'btn btn-default'){
            btn_color = 'btn btn-primary'
        }
        this.setState({theme:theme_color,btn_color:btn_color})
    }

    changeHandler = (e) => {
         this.setState({
             [e.target.name] : e.target.value
         })
         e.preventDefault()
     }

    isValid = (formData = {}) => {
        if(!formData){
            NotificationManager.info('Please fill all the fields.', 'Info');
            return {msg:'Please fill all the fields.',success:false}
            
        } 
        else if(!formData.email){
            NotificationManager.error('Please enter email.', 'Error',2000);
            return {msg:'Please enter email.',success:false}
        }else if(!formData.password) {
            NotificationManager.error('Please enter password.', 'Error',2000);
            return {msg:'Please enter password.',success:false}
        }   
        return {msg:'all set.',success:true}
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
                    //setting session storage
                    var user = response.data.user;
                    sessionStorage.setItem('userData',JSON.stringify(user));
                    sessionStorage.setItem('usersToken',response.data.token);
                    // localStorage.setItem('theme','black');
                    this.setState({
                        isRedirectReqd: true
                    })
                    NotificationManager.success('Login Success','Success');
                }else{
                    console.log("Login error")
                    NotificationManager.error('Login Error','Error');
                }  
            }).catch(err => {
                // console.log(err.response)
                if(loginObj.email === 'admin@admin.com' && loginObj.password === 'admin123'){
                    //temp admin login
                    this.setState({
                        isRedirectReqd: true
                    })
                    console.log(this.state.isRedirectReqd)
                    sessionStorage.setItem('tempAdmin',true);
                    NotificationManager.success('You have logged in as temp admin. Please refresh the page.','Success');
                }else{
                    NotificationManager.error(err.response.data.msg,'Error');
                }
                
            }) 
    }
    

  render() {
    
    if(this.state.isRedirectReqd){
        return <Redirect to={'/users'}/>
    }
    if(sessionStorage.getItem('userData') || sessionStorage.getItem('tempAdmin')){
        return <Redirect to={'/users'}/>
    }
    return (

        <>
        <MDBContainer>
        <TopNavBar/><p></p>
            {/* <div style= {{display: this.state.error != null ?'':'none'}}>
                <MDBAlert color="danger" dismiss>
                    <strong>Oops!</strong> {this.state.error}.
                </MDBAlert>
            </div> */}
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
                                    <MDBBtn color={this.state.btn_color} type="submit">Login</MDBBtn>
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
        <NotificationContainer/>
        </>  
    )
  }
}
