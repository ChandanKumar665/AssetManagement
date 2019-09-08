import React, { Component } from 'react'
import axios from 'axios';
import style from '../style/style.css';
import { Redirect,Link } from 'react-router-dom';
// import LoginForm from './LoginForm';

export default class Login extends Component {

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

    changeHandler = (e) => {
       console.log(e.target.value)
        this.setState({
            [e.target.name] : e.target.value
        })
        e.preventDefault()
    }

    formSubmit = (e) => {
        e.preventDefault()
        //checking for empty field

        //post form submit
        var loginObj = {
            email:this.state.email,
            password:this.state.password
        }
        
        try {
            axios.post('http://localhost:4000/api/v1/auth',loginObj)
            .then(response => {
                // console.log(response);
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
                console.log(err)
            })
        } catch (error) {
            console.log('some thing went wrong')
        }

      
    }
    

  render() {

    if(this.state.isRedirectReqd){
        return <Redirect to={'/users'}/>
    }
    if(sessionStorage.getItem('userData')){
        return <Redirect to={'/users'}/>
    }
    
    return (
        
        <div className="container">
            {/* <LoginForm/> */}
            <p></p>
            <div className="card">
                <form onSubmit={this.formSubmit} className="login_form">
                    <label  className="mr-sm-2">Email address:&nbsp;<span className="mandatory">*</span></label>
                    <input type="email" className="form-control mb-2 mr-sm-2" id="email" name="email" onChange={this.changeHandler} value={this.state.email} required/>
                    <div className="invalid-feedback">Please fill out this field.</div>
                    <label  className="mr-sm-2">Password:&nbsp;<span className="mandatory">*</span></label>
                    <input type="password" className="form-control mb-2 mr-sm-2" name="password" id="password" onChange={this.changeHandler} value={this.state.password} required/>
                    <div>
                        <button type="submit" className="btn btn-primary mb-2">Login</button>
                    </div>   
                </form>
            </div>  
            <div>
                <Link to={{pathname:`/login`}}>
                    Home
                </Link>
            </div>
    </div>
        
    )
  }
}
