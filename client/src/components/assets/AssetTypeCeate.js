import React, { Component } from 'react'
import {Alert} from 'reactstrap';
import {Link} from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

export default class AssetTypeCeate extends Component {
    constructor(){
        super();
        this.state = {
            asset_type:'',
            brand:'',
            res_msg:'',
            isOpen:''
        }
        this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    formSubmit = (e) => {
        e.preventDefault();
        //post form submit
        var insertObj = {
            asset_type:this.state.asset_type,
            brand:this.state.brand,
        }

        axios.post('http://localhost:4000/api/v1/assettypes',insertObj)
        .then(response => {
            if(response.data.success){
                this.props.history.push('/assets/assettype')
            }else{
                this.setState({
                    color:'danger',
                    res_msg:response.data.msg,
                    isOpen:!this.state.isOpen
                })
            }
            
        }).catch(err => console.log(err))
    }

  render() {
    return (
        <div className="container">
        <div>
            {/* <Alert color={this.state.color} isOpen={this.state.isOpen} toggle={this.onDismiss} fade={true}>
                {this.state.res_msg}
            </Alert> */}
        </div>
        
        <form onSubmit={this.formSubmit} >
            <label  className="mr-sm-2">Asset type:&nbsp;<span className="mandatory">*</span></label>
            <input type="text" className="form-control mb-2 mr-sm-2" id="asset_type" name="asset_type" onChange={this.changeHandler} value={this.state.asset_type} required/>
            <div className="invalid-feedback">Please fill out this field.</div>
            <label  className="mr-sm-2">Brand Name:&nbsp;<span className="mandatory">*</span></label>
            <input type="text" className="form-control mb-2 mr-sm-2" name="brand" id="brand" onChange={this.changeHandler} value={this.state.brand} required/>
            <div className="invalid-feedback">Please fill out this field.</div>
        
            <div>
                <button type="submit" className="btn btn-primary mb-2">Save</button>
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
