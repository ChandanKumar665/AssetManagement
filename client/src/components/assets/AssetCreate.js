import React, { Component } from 'react'
import {Alert} from 'reactstrap';
import {Link} from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

export default class AssetCreate extends Component {
    constructor(){
        super();
        this.state = {
            asset_name:'',
            asset_type_id:'',
            res_msg:'',
            isOpen:false,
            color:'',
            data:[],
            model_no:''
        }
        // this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount = () => {
        axios.get('http://localhost:4000/api/v1/assettypes')
        .then(response => {
            // console.log(response)
            this.setState({
                data:response.data.data,
            })
        }).catch(err => {
            console.log(err)
        })
      }

    formSubmit = (e) => {
        e.preventDefault();
        //post form submit
        // mongoose.Types.ObjectId
        var insertObj = {
            asset_name:this.state.asset_name,
            asset_type_id:this.state.asset_type_id,
            model_no:this.state.model_no
        }

        axios.post('http://localhost:4000/api/v1/assets',insertObj)
        .then(response => {
            if(response.data.success){
                this.props.history.push('/assets')
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
      let result = this.state.data
    return (
        <div className="container">
        <div>
            <Alert color={this.state.color} isOpen={this.state.isOpen} toggle={this.onDismiss} fade={true}>
                {this.state.res_msg}
            </Alert>
        </div>
        
        <form onSubmit={this.formSubmit} >
            <label  className="mr-sm-2">Asset Name:&nbsp;<span className="mandatory">*</span></label>
            <input type="text" className="form-control mb-2 mr-sm-2" id="asset_name" name="asset_name" onChange={this.changeHandler} value={this.state.asset_name} required/>
            <div className="invalid-feedback">Please fill out this field.</div>
            <label  className="mr-sm-2">Model No:&nbsp;<span className="mandatory">*</span></label>
            <input type="text" className="form-control mb-2 mr-sm-2" id="model_no" name="model_no" onChange={this.changeHandler} value={this.state.model_no} required/>
            <div className="invalid-feedback">Please fill out this field.</div>
            <label  className="mr-sm-2">Asset Type:&nbsp;<span className="mandatory">*</span></label>
            <div className="form-group">
                <select className="form-control" id="sel1" name="asset_type_id" onChange={this.changeHandler} required>
                    <option>--None--</option>
                    {
                        result.map(item => 
                            <option value={item._id} key={item._id}>{item.asset_type}</option>
                        )
                    }
                </select>
                <div className="invalid-feedback">Please fill out this field.</div>
            </div>
            <div>
                <button type="submit" className="btn btn-primary mb-2">Add</button>
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
