import React, {Component} from 'react';
import axios from 'axios';
import uuid from 'uuid';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class EmployeeList extends Component{
    constructor(){
        super();
        this.state = {
            data:[],
            modal:false,
            name:'',
            email:'',
            id:''
        }

        this.submitHandler = this.submitHandler.bind(this);
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
        e.preventDefault()
    }

    submitHandler = (e) => {
        e.preventDefault();
        console.log(this.state);
        var updateObj = {
            fname:this.state.name,
            email:this.state.email
        }
        const id = this.state.id
        axios.put(`http://localhost:4000/api/v1/users/${id}`,updateObj)
        .then(response => {
            console.log('updated')
        }).catch(err => {
            console.log(err)
        })

    }


    componentDidMount = () => {
        axios.get('http://localhost:4000/api/v1/users')
        .then(response => {
            // console.log(response)
            this.setState({
                data:response.data.data
            })
        }).catch(err => {
            console.log(err)
        })
    }

    render(){
        // console.log(uuid())
        let result = this.state.data;
            return (
               
                <div className="container">
                    <button className="btn">
                        <Link to={{pathname:`/create` }}>
                            Add +
                        </Link>
                    </button>
                    <div></div>
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
                                        <button className="btn">
                                            <Link to={{pathname:`/create`,state:{id:item._id} } }>
                                                Edit
                                            </Link>
                                        </button>  
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                    
                </div>
           
            )
    }
        
}

export default EmployeeList;
