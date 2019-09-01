import React,{Component} from 'react';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBCol, MDBInput, MDBBtn} from 'mdbreact';
import style from '../style/style.css';
import { NotificationManager,NotificationContainer} from 'react-notifications'
import 'react-notifications/lib/notifications.css';
import {Alert} from 'reactstrap';
import { Redirect,Link } from 'react-router-dom';
import TopNavBar from '../header/TopNavBar';


class AddEmployee extends Component {
    constructor(props){
        super(props);
        console.log(props)
        this.state = {
            fname:'',
            email:'',
            is_admin:'0',
            isOpen:false,
            res_msg:'',
            password:'',
            color:'primary',
            isRedirectReqd:false,
            btn_text : props.location.state === undefined ? 'Sign Up' : 'Update',
            id: props.location.state === undefined ? '' : props.location.state.id
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.changeIsAdmin = this.changeIsAdmin.bind(this);
    }

    changeHandler = (e) => {
       
        this.setState({
            [e.target.name] : e.target.value
        })
        e.preventDefault()
    }

    onDismiss() {
        this.setState({ isOpen: !this.state.isOpen });
      }

    componentDidMount = () => {
        if(this.state.id && sessionStorage.getItem('userData') != null){
            //edit
            var headers = {
                headers: {'x-auth-token': sessionStorage.getItem('usersToken')}
            }
            axios.get(`http://localhost:4000/api/v1/users/${this.state.id}`, headers)   
            .then(response => {
                // console.log(response)
                this.setState({
                    fname:response.data.data.fname,
                    email:response.data.data.email,
                    is_admin:response.data.data.is_admin ? '1' : '0'
                })
                
            }).catch(err => {
                console.log(err)
            })
        } else {
            this.setState({
                isRedirectReqd:true
            })
        }
        
        var theme_color = localStorage.getItem('theme') == undefined ? 'default' : localStorage.getItem('theme');
        var btn_color = localStorage.getItem('btn_color') == undefined ? 'btn btn-primary':localStorage.getItem('btn_color');
        if(btn_color == 'btn btn-default'){
            btn_color = 'btn btn-primary'
        }
        this.setState({theme:theme_color,btn_color:btn_color})
    }  

    changeIsAdmin = (e) => {
        this.setState({
            is_admin: e.target.value
        })
    }

    isValid = (formData = {}) => {
        if(!this.state.id){
            //create
            if(!formData){
                NotificationManager.info('Please fill all the fields.', 'Info');
                return {msg:'Please fill all the fields.',success:false}
            }
            else if(!formData.email){
                NotificationManager.error('Please enter email.', 'Error',2000);
                return {msg:'Please enter email.',success:false}
            }else if(!formData.fname) {
                NotificationManager.error('Please enter name.', 'Error',2000);
                return {msg:'Please enter name.',success:false}
            } else if(!formData.password) {
                NotificationManager.error('Please enter password.', 'Error',2000);
                return {msg:'Please enter password.',success:false}
            }   
        } else{
            //update
            if(!formData){
                NotificationManager.error('Please fill all the fields.', 'Error',2000);
                return {msg:'Please fill all the fields.',success:false}
            }
            else if(!formData.email){
                NotificationManager.error('Please enter email.', 'Error',2000);
                return {msg:'Please enter email.',success:false}
            }else if(!formData.fname) {
                NotificationManager.error('Please enter name.', 'Error',2000);
                return {msg:'Please enter name.',success:false}
            } 
        }
        
        return {msg:'all set.',success:true}
     }

    formSubmit = (e) => {
        e.preventDefault()

        //post form submit

        //setting up access token in request header
        
        var headers = {
            headers: {'x-auth-token': sessionStorage.getItem('usersToken')}
        }

        var insertObj = {
            fname:this.state.fname,
            email:this.state.email,
            is_admin: this.state.is_admin == '1' ? true: false,
            password: this.state.password
        }

        //validating all the fields
        var check = this.isValid(insertObj)
    
        if(!check.success){
            this.setState({
                error: check.msg
            })
            return false
        }
    
        if(this.state.id){
                //update
                axios.put(`http://localhost:4000/api/v1/users/${this.state.id}`,insertObj, headers)
                .then(users => {
                    // console.log(users.data)
                    if(users.data.success){
                        this.props.history.push('/users')
                        NotificationManager.success('Record updated successfully','Success');
                    }else{
                        NotificationManager.info('Something went wrong','Info');
                    }
                   
                }).catch(err => {
                    // console.log(err.response)
                    NotificationManager.error(err.response.data.msg,'Error');

                })
        }else{
            // create
            axios.post('http://localhost:4000/api/v1/users',insertObj)
            .then(users => {
                console.log(users.data)
                if(users.data.success){
                    this.props.history.push('/login')
                    NotificationManager.success('Account created successfully.','Success',5000);
                    
                }else{
                    NotificationManager.info('something went wrong.','Info');
                    this.setState({
                        isOpen:!this.state.isOpen
                    })
                }
            }).catch(err => {
                // console.log(err.response.data)
                NotificationManager.error(err.response.data.msg,'Error');
            })
        }
    }

    render(){
        
        return (
        <>    
        <MDBContainer>
        <TopNavBar/><p></p>
            <MDBRow>
                <MDBCol md="12">
                    <MDBCard>
                        <MDBCardBody>
                            <form onSubmit={this.formSubmit}>
                                <p className="h5 text-center mb-4">{this.state.btn_text}</p>
                                <div className="grey-text mt-5">
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
                                    label="Name"
                                    icon="user"
                                    group
                                    name="fname"
                                    type="text"
                                    validate
                                    onChange={this.changeHandler}
                                    value={this.state.fname}
                                    />
                                    <div id="pass" style={{display: (this.state.id && sessionStorage.getItem('userData') != null) ? 'none':''}}>
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
                                    
                                    
                                    <div className="">
                                        <label className="form-check-label">is Admin:&nbsp;<span className="mandatory">*</span>&nbsp;&nbsp;</label>
                                        <div className="custom-control custom-radio custom-control-inline">
                                            <input type="radio" className="custom-control-input" id="is_admin" name="is_admin" checked={this.state.is_admin === '1'} value='1' onChange={this.changeIsAdmin}/>
                                            <label className="custom-control-label" htmlFor="is_admin">Yes</label>
                                        </div>
                                        <div className="custom-control custom-radio custom-control-inline">
                                            <input type="radio" className="custom-control-input" id="defaultInline2" name="is_admin" checked={this.state.is_admin === '0'} value='0' onChange={this.changeIsAdmin}/>
                                            <label className="custom-control-label" htmlFor="defaultInline2">No</label>
                                        </div>
                                    </div>
                                </div>
                                <p></p>
                                <div className="text-center">
                                    <MDBBtn color={this.state.btn_color} type="submit">{this.state.btn_text}</MDBBtn>
                                </div>
                            </form>
    
                            <div className="font-weight-light tc" style={{display:(this.state.id != null)?'none':'' }}>
                                <p className="">Already a member? <Link to={'/login'}>Sign In</Link></p>
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

export default AddEmployee;