import React,{Component} from 'react';
import axios from 'axios';
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
            color:'primary',
            isRedirectReqd:false,
            btn_text : props.location.state === undefined ? 'Save' : 'Update',
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
        if(this.state.id && sessionStorage.getItem('userData')){
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

    formSubmit = (e) => {
        e.preventDefault()
        //checking for empty field

        //post form submit
        var insertObj = {
            fname:this.state.fname,
            email:this.state.email,
            is_admin: this.state.is_admin == '1' ? true: false,
            token: sessionStorage.getItem('usersToken')
        }

        if(this.state.id){
                //update
                axios.put(`http://localhost:4000/api/v1/users/${this.state.id}`,insertObj)
                .then(users => {
                    console.log(users.data)
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
                    console.log(err)
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

        // if(this.state.isRedirectReqd){
        //     return <Redirect to={'/users/create'}/>
        // }
        return (
            <div className="container">
                <div>
                    <Alert color={this.state.color} isOpen={this.state.isOpen} toggle={this.onDismiss} fade={true}>
                        {this.state.res_msg}
                    </Alert>
                </div>
                
                <form onSubmit={this.formSubmit} >
                    <label  className="mr-sm-2">Email address:&nbsp;<span className="mandatory">*</span></label>
                    <input type="email" className="form-control mb-2 mr-sm-2" id="email" name="email" onChange={this.changeHandler} value={this.state.email} required/>
                    <div className="invalid-feedback">Please fill out this field.</div>
                    <label  className="mr-sm-2">Name:&nbsp;<span className="mandatory">*</span></label>
                    <input type="text" className="form-control mb-2 mr-sm-2" name="fname" id="fname" onChange={this.changeHandler} value={this.state.fname} required/>
                    <div className="invalid-feedback">Please fill out this field.</div>
                    <div id="pass" style={{display: this.state.id ? 'none':''}}>
                        <label  className="mr-sm-2">Password:&nbsp;<span className="mandatory">*</span></label>
                        <input type="password" className="form-control mb-2 mr-sm-2" name="password" id="password" onChange={this.changeHandler} value={this.state.password} required/>
                    </div>
                    
                    <div className="form-group">
                        <label className="form-check-label">is Admin:&nbsp;<span className="mandatory">*</span>&nbsp;</label>
                        <div className="form-check form-check-inline">
                            <input type="radio" className="form-check-input" name="is_admin" checked={this.state.is_admin === '1'} value='1' onChange={this.changeIsAdmin} />
                            <label className="form-check-label">Yes</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="radio" className="form-check-input" name="is_admin" checked={this.state.is_admin === '0'} value='0' onChange={this.changeIsAdmin} />
                            <label className="form-check-label">No</label>
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary mb-2">{this.state.btn_text}</button>
                    </div>   
                </form>
                <div>
                    <Link to={{pathname:`/users`}}>
                         Home
                    </Link>
                </div>
            </div>
        )
    }

}

export default AddEmployee;