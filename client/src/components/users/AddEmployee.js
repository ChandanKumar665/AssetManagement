import React,{Component} from 'react';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBCol, MDBInput, MDBBtn, MDBAlert } from 'mdbreact';
import style from '../Style/Index.css';
// import { NotificationManager} from 'react-notifications'
import {Alert} from 'reactstrap';
import { Redirect,Link } from 'react-router-dom';


class AddEmployee extends Component {
    constructor(props){
        super(props);
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
            axios.get(`http://localhost:4000/api/v1/users/${this.state.id}`)   
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
                return {msg:'Please fill all the fields.',success:false}
            }
            else if(!formData.email){
                return {msg:'Please enter email.',success:false}
            }else if(!formData.fname) {
                return {msg:'Please enter name.',success:false}
            } else if(!formData.password) {
                return {msg:'Please enter password.',success:false}
            }   
        } else{
            //update
            if(!formData)
                return {msg:'Please fill all the fields.',success:false}
            else if(!formData.email){
                return {msg:'Please enter email.',success:false}
            }else if(!formData.fname) {
                return {msg:'Please enter name.',success:false}
            } 
        }
        
        return {msg:'all set.',success:true}
     }

    formSubmit = (e) => {
        e.preventDefault()
        //checking for empty field

        //post form submit
        var headers = {
            'Authorization' : sessionStorage.getItem('usersToken'),
            "Content-type": "application/json"
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
                        // NotificationManager.success(users.data.msg,'Success');
                        this.setState({
                            color:'success',
                            res_msg:users.data.msg,
                            isOpen:!this.state.isOpen
                        })
                        // console.log('heyyyy')
                        this.props.history.push('/users')
                    }else{
                        
                        // NotificationManager.info('Error');
                        this.setState({
                            color:'danger',
                            res_msg:users.data.msg,
                            isOpen:!this.state.isOpen
                        })
                    }
                   
                }).catch(err => {
                    // console.log(err.response)
                    this.setState({
                        error:err.response.data.msg
                    })

                })
        }else{
            // create
            axios.post('http://localhost:4000/api/v1/users',insertObj)
            .then(users => {
                // console.log(users.data)
                if(users.data.success){
                    // NotificationManager.success(users.data.msg,'Success');
                    this.setState({
                        color:'success',
                        res_msg:users.data.msg
                    })
                    this.props.history.push('/users')
                }else{
                    
                    // NotificationManager.info('Error');
                    this.setState({
                        color:'danger',
                        res_msg:users.data.msg,
                        isOpen:!this.state.isOpen
                    })
                }
               
            }).catch(err => {
                console.log(err)
            })
        }
    }

    render(){
        
        return (

        <MDBContainer>
            <div style= {{display: this.state.error != null ?'':'none'}}>
                <MDBAlert color="danger" dismiss>
                    <strong>Oops!</strong> {this.state.error}.
                </MDBAlert>
            </div>
            
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
                                    <MDBBtn color="primary" type="submit">Register</MDBBtn>
                                </div>
                            </form>
    
                            <div className="font-weight-light tc">
                                <p className="">Already a member? <Link to={'/login'}>Sign In</Link></p>
                                <p>Forgot Password?</p>
                            </div>
                            
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>    












            // <div className="container">
            //     <div>
            //         <Alert color={this.state.color} isOpen={this.state.isOpen} toggle={this.onDismiss} fade={true}>
            //             {this.state.res_msg}
            //         </Alert>
            //     </div>
                
            //     <form onSubmit={this.formSubmit} >
            //         <label  className="mr-sm-2">Email address:&nbsp;<span className="mandatory">*</span></label>
            //         <input type="email" className="form-control mb-2 mr-sm-2" id="email" name="email" onChange={this.changeHandler} value={this.state.email} required/>
            //         <div className="invalid-feedback">Please fill out this field.</div>
            //         <label  className="mr-sm-2">Name:&nbsp;<span className="mandatory">*</span></label>
            //         <input type="text" className="form-control mb-2 mr-sm-2" name="fname" id="fname" onChange={this.changeHandler} value={this.state.fname} required/>
            //         <div className="invalid-feedback">Please fill out this field.</div>
            //         <div id="pass" style={{display: (this.state.id && sessionStorage.getItem('userData') != null) ? 'none':''}}>
            //             <label  className="mr-sm-2">Password:&nbsp;<span className="mandatory">*</span></label>
            //             <input type="password" className="form-control mb-2 mr-sm-2" name="password" id="password" onChange={this.changeHandler} value={this.state.password}/>
            //         </div>
                    
                    // <div className="form-group">
                    //     <label className="form-check-label">is Admin:&nbsp;<span className="mandatory">*</span>&nbsp;</label>
                    //     <div className="form-check form-check-inline">
                    //         <input type="radio" className="form-check-input" name="is_admin" checked={this.state.is_admin === '1'} value='1' onChange={this.changeIsAdmin} />
                    //         <label className="form-check-label">Yes</label>
                    //     </div>
                    //     <div className="form-check form-check-inline">
                    //         <input type="radio" className="form-check-input" name="is_admin" checked={this.state.is_admin === '0'} value='0' onChange={this.changeIsAdmin} />
                    //         <label className="form-check-label">No</label>
                    //     </div>
                    // </div>
            //         <div>
            //             <button type="submit" className="btn btn-primary mb-2">{this.state.btn_text}</button>
            //         </div>   
            //     </form>
            //     <div>
            //         <Link to={{pathname:`/users`}}>
            //              Home
            //         </Link>
            //     </div>
            // </div>
        )
    }

}

export default AddEmployee;