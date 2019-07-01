import React, { Component } from 'react'
import {Alert} from 'reactstrap'
import axios from 'axios'
import { Redirect } from 'react-router';

class Delete extends Component {
    constructor(props){
        super(props);
        this.state = {
            color:'',
            isOpen:false,
            id: props.location.state === undefined ? '' : props.location.state.id
        }
        this.onDismiss = this.onDismiss.bind(this)
    }

    onDismiss = () => {
        this.setState({
            isOpen:!this.state.isOpen
        })
    }

    componentDidMount = () => {
        if(this.state.id){
            const id = this.state.id
            axios.delete(`http://localhost:4000/api/v1/users/${id}`)
            .then(response => {
                // console.log(response)
                if(response.data.success){
                    this.setState({
                        color:'success',
                        isOpen:!this.state.isOpen,
                        res_msg:response.data.msg
                    })
                    this.props.history.push('/users')
                }else{
                    this.setState({
                        color:'danger',
                        res_msg:response.data.msg,
                        isOpen:!this.state.isOpen
                    })
                }
                
        }).catch(err => {
            console.log(err)
        })
        }else{
            this.setState({
                color:'danger',
                isOpen:true,
                res_msg:'something went wrong.'
            })
        }
    }

  render() {
    return (
      <div className="container">
        <Alert color={this.state.color} isOpen={this.state.isOpen} toggle={this.onDismiss} fade={true}>
                        {this.state.res_msg}
        </Alert>
      </div>
    )
  }
}

export default Delete;