import React,{Component} from 'react';
import style from '../style.css';
import axios from 'axios';
import { NotificationManager} from 'react-notifications'
import {Alert} from 'reactstrap';
import { Redirect } from 'react-router';

class AddEmployee extends Component {
    constructor(props){
        super(props);
        this.state={
            fname:'',
            email:'',
            is_admin:'',
            isOpen:false,
            res_msg:'',
            color:'primary',
            id: props.location.state === undefined ? '' : props.location.state.id
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
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
        if(this.state.id){
            //edit
            axios.get(`http://localhost:4000/api/v1/users/${this.state.id}`)
        .then(response => {
            // console.log(response)
            this.setState({
                fname:response.data.data.fname,
                email:response.data.data.email,
                is_admin:response.data.data.is_admin ? '1' : '0'
            })
            return <Redirect to="/"></Redirect>
        }).catch(err => {
            console.log(err)
        })
        }
        
    }  


    formSubmit = (e) => {
        e.preventDefault()
        //post form submit
        var insertObj = {
            fname:this.state.fname,
            email:this.state.email,
            is_admin: this.state.is_admin == '1' ? true: false
        }

        if(this.state.id){
                //update
                axios.put(`http://localhost:4000/api/v1/users/${this.state.id}`,insertObj)
                .then(users => {
                    // console.log(users.data)
                    if(users.data.success){
                        // NotificationManager.success(users.data.msg,'Success');
                        this.setState({
                            color:'success',
                            res_msg:users.data.msg,
                            isOpen:!this.state.isOpen
                        })
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
                        res_msg:users.data.msg,
                        isOpen:!this.state.isOpen
                    })
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
        // const {yes,no} = ''
        // if(this.state.is_admin){
        //     yes = 'checked'
        // }else{
        //     no = 'checked'
        // }
        return (
            <div className="container">
                <div>
                    <Alert color={this.state.color} isOpen={this.state.isOpen} toggle={this.onDismiss} fade={true}>
                        {this.state.res_msg}
                    </Alert>
                </div>
                <form onSubmit={this.formSubmit} >
                    <label  className="mr-sm-2">Email address:</label>
                    <input type="email" className="form-control mb-2 mr-sm-2" id="email" name="email" onChange={this.changeHandler} value={this.state.email}/>
                    <label  className="mr-sm-2">Name:</label>
                    <input type="text" className="form-control mb-2 mr-sm-2" name="fname" id="fname" onChange={this.changeHandler} value={this.state.fname}/>
                    <div>
                        <label className="form-check-label">is Admin:</label>
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="is_admin"  value='1'  />Yes
                            </label>
                            </div>
                            <div className="form-check-inline">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="is_admin"  value='0' />No
                            </label>
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary mb-2">Save</button>
                    </div>
                    
                </form>
            </div>
        )
    }

}

export default AddEmployee;