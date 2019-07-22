import React, {Component} from 'react';
import axios from 'axios';
import uuid from 'uuid';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Alert} from 'reactstrap';
import style from '../Style/Index.css';
import 'font-awesome/css/font-awesome.min.css';

class EmployeeList extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:[],
            modal:false,
            name:'',
            globalName:'',
            email:'',
            id:'',
            isOpen:false,
            isShowing:false,
            color:'',
            msg:'',
            isRedirectReqd: false
        }
        this.toggle = this.toggle.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.logout = this.logout.bind(this);
    }


    onDismiss = (e) => {
        e.preventDefault()
        this.setState({
            isShowing:!this.state.isShowing,
            msg:''
        })
        this.props.location.state = null
    }

    toggle = (e) => {
        e.preventDefault()
        // console.log(e.target.id)
        this.setState({
            isOpen:!this.state.isOpen,
            name: e.target.name,
            id:e.target.id
        })
    }

    logout = () => {
        sessionStorage.setItem('userData',null);
        sessionStorage.clear();
        this.setState({
            isRedirectReqd:true,
            name:null,
            globalName:null,
            email:null,
            id:null,
            data:null
        })
    }

    componentDidMount = () => {
        if(sessionStorage.getItem('userData')){
            var user_data = JSON.parse(sessionStorage.getItem('userData'))
            this.setState({
                globalName:user_data.name
            })
            axios.get('http://localhost:4000/api/v1/users')
            .then(response => {
                // console.log(response)
                if(response.data.success){
                    this.setState({
                        data:response.data.data
                    })
                }else{
                    console.log("Error")
                }
            }).catch(err => {
                console.log(err)
            })
        }else{
            this.setState({
                isRedirectReqd:true
            })
        }  
    }

    render(){

        if(this.state.isRedirectReqd){
            return <Redirect to={'/login'}/>
        }

        let result = this.state.data;
       
            return (
              
                <div className="container">
                     <div>
                        <Alert color={this.state.color} isOpen={this.state.isShowing} toggle={this.onDismiss} >
                            {this.state.msg}
                        </Alert>
                    </div>
                    <div>
                        <h3>Employee List</h3>
                    </div>
                    <br></br>
                    <div>
                        <Link to={{pathname:`/users/create` }} className="btn btn-primary">
                            Add +
                        </Link>
                    </div>
                    <br></br>
                    <div>
                        <Link to={{pathname:`/assets`}}>
                            Show assets List
                        </Link>
                    </div>
                    <br></br>
                    <div className="row">
                        <div className="col-lg-8">
                            <label>Welcome <b>{this.state.globalName}</b></label>
                        </div>
                        <div className="col-lg-4">
                            <button className="logout btn-danger" onClick={this.logout}>Logout</button>
                        </div>
                    </div>
                    <Table dark border="1">
                        <thead>
                            <tr className="stripe-dark">
                                <th scope="row"  >Name</th>
                                <th scope="row"  >Email</th>
                                <th scope="row"  >DOJ</th>
                                <th scope="row"  >Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                result.map((item,i) => 
                                    <tr className="stripe-dark">
                                        <td className="pa3" >{item.fname}</td>
                                        <td className="pa3" >{item.email}</td>
                                        <td className="pa3" >{new Date(item.doj).toDateString()}</td>
                                        <td className="pa3">
                                
                                            <Link className="fa fa-pencil-square-o" to={{pathname:`/users/create`,state:{id:item._id} } }>
                                            </Link>
                                            &nbsp;<span>&#124;</span>&nbsp;  
                                            <Link to='' className="fa fa-trash-o" name={item.fname} id={item._id} onClick={this.toggle}>
                                            </Link>
                                            
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                    <Modal isOpen={this.state.isOpen} toggle={this.toggle} className=''>
                        <ModalHeader toggle={this.toggle}>Confirm ?</ModalHeader>
                        <ModalBody>
                            Are you sure you want to delete <b>{this.state.name}</b> record ?
                        </ModalBody>
                        <ModalFooter>
                                <Link to={{pathname:`/users/delete`,state:{id:this.state.id}}} className="btn btn-primary">
                                    Delete
                                </Link>
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
           
            )
    }
        
}

export default EmployeeList;
