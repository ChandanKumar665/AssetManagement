import React, {Component} from 'react';
import axios from 'axios';
import uuid from 'uuid';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Alert} from 'reactstrap';
import {MDBDataTable } from 'mdbreact';
import style from '../Style/Index.css';
import 'font-awesome/css/font-awesome.min.css';
import TopNavBar from '../Header/TopNavBar';
import { NotificationManager,NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

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
        this.dataTablePage = this.dataTablePage.bind(this);
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
        this.setState({
            isOpen:!this.state.isOpen,
            name: e.target.name,
            id:e.target.id
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

    dataTablePage = (content) => {
        const tabledata = {
            columns:[
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc',
                    width: 150
                  },
                  {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc',
                    width: 270
                  },
                  {
                    label: 'DOJ',
                    field: 'doj',
                    sort: 'asc',
                    width: 200
                  },
                  {
                    label: 'Action',
                    field: 'action',
                    width: 50
                  }
            ],
            rows:content
        }
    return tabledata    
    }

    render(){

        if(this.state.isRedirectReqd){
            return <Redirect to={'/login'}/>
        }

        let result = [];
        for(let item of this.state.data){
            result.push({
                        name:item.fname,
                        email:item.email,
                        doj:new Date(item.doj).toDateString(),
                        action:<div className=""><Link className="fa fa-pencil-square-o" to={{pathname:`/users/create`,state:{id:item._id} } }>
                                    </Link>
                                    <span>&nbsp;<span>&#124;</span>&nbsp;</span>
                                    <Link to='' className="fa fa-trash-o" name={item.fname} id={item._id} onClick={this.toggle}>
                                    </Link>
                                </div>
                               
                        }
                    )
        }     

            return (
              
                <>
                <div className="container">
                <TopNavBar/><p></p>
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
                        <Link to={{pathname:`/assets`}}>
                            Show assets List
                        </Link>
                    </div>
                    <br></br>
                    <div className="row">
                        <div className="col-lg-8">
                            <label>Welcome <b>{this.state.globalName}</b></label>
                        </div>
                    </div>
                    
                    <MDBDataTable
                        striped
                        bordered
                        small
                        data={this.dataTablePage(result)}
                    />
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
                <NotificationContainer/>
                </>
            )
    }
        
}

export default EmployeeList;
