import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBCol, MDBInput, MDBBtn} from 'mdbreact';
import axios from 'axios'
import { Redirect } from 'react-router';
import { NotificationManager,NotificationContainer} from 'react-notifications'
import 'react-notifications/lib/notifications.css';
import TopNavBar from '../header/TopNavBar';
import {Link} from 'react-router-dom';

class Delete extends Component {
    constructor(props){
        super(props);
        this.state = {
            color:'',
            isOpen:false,
            res_msg:'something went wrong',
            btn_text: (sessionStorage.getItem('tempAdmin'))?'':'Click here to login.',
            id: props.location.state === undefined ? '' : props.location.state.id,
            url: (sessionStorage.getItem('tempAdmin'))?'/users':'/login'
        }
        this.onDismiss = this.onDismiss.bind(this)
    }

    onDismiss = () => {
        this.setState({
            isOpen:!this.state.isOpen
        })
    }

    componentDidMount = () => {
        if(this.state.id && sessionStorage.getItem('usersToken') != null){
            const id = this.state.id

            // setting up access token in request header
            var headers = {
                headers: {'x-auth-token': sessionStorage.getItem('usersToken')}
            } 
            axios.delete(`http://localhost:4000/api/v1/users/${id}`,headers)
            .then(response => {
                // console.log(response)
                if(response.data.success){
                    this.setState({
                        color:'success',
                        isOpen:!this.state.isOpen,
                        res_msg:response.data.msg
                    })
                    this.props.history.push('/users')
                     NotificationManager.success(response.data.msg,'Success');
            } else {
                    this.setState({
                        color:'danger',
                        res_msg:response.data.msg,
                        isOpen:!this.state.isOpen
                    })
                }
                
            }).catch(err => {
                // console.log(err.response)
                this.props.history.push('/users')
                NotificationManager.error(err.response.data.msg,'Error');
                
            })
        } else {
                if(sessionStorage.getItem('tempAdmin')){
                    NotificationManager.warning('Deletion is not allowed for temp Admin','Warning');
                }
                else if(sessionStorage.getItem('usersToken') == null || sessionStorage.getItem('usersToken') == ''){
                    //user is not logged in
                    // this.props.history.push('/login')
                    NotificationManager.info('Please login to continue','Info');
                }
                else if(!this.state.id){
                    //  user has accessed invalid link
                    // this.props.history.push('/users')
                    NotificationManager.warning('You have accessed unauthorized link.', 'Warning');
                } 
            }
    }

  render() {
    return (
        <> 
        <MDBContainer>
            <TopNavBar/><p></p>
            <MDBRow>
                <MDBCol md="12">
                    <MDBCard>
                        <MDBCardBody>
                            <h3>Sorry!!! Please Try again!!</h3>
                            <h4>This error has occured for one of the following reasons :</h4>
                            <ul>
                                <li>
                                    1.	You have tried to get direct URL access.
                                </li>
                                <li>
                                    2.	You have used Back/Forward/Refresh button of your Browser.
                                </li>
                                <li>
                                    3.	You have double clicked on any options/buttons.
                                </li>
                                <li>
                                    4.	You have kept the browser window idle for a long time.
                                </li>
                            </ul>
                            
                            <div className="tc" style={{display: (sessionStorage.getItem('usersToken') != null || sessionStorage.getItem('tempAdmin'))?'none':''}}>
                                <Link to={this.state.url} className="btn btn-primary">{this.state.btn_text}</Link>
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

export default Delete;