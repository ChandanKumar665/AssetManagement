import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { Table } from 'reactstrap';
import axios from 'axios';

export default class AssetList extends Component {
  constructor(){
    super()
    this.state = {
      data:[]
    }
  }

  componentDidMount = () => {
    axios.get('http://localhost:4000/api/v1/assets')
    .then(response => {
        console.log(response)
        this.setState({
            data:response.data.data,
        })
    }).catch(err => {
        console.log(err)
    })
  }


  render() {
    let result = this.state.data
    return (
      <div className="container">
        <div>
          <h3>Asset List</h3>
        </div>
        <br></br>
        <div>
            <Link to={{pathname:`/assets/create` }} className="">
                Add New Asset +
            </Link>
        </div>
        <br></br>
        <div>
            <Link to={{pathname:`/assets/assettype` }} className="">
                Asset Type List
            </Link>
        </div>
        <br></br>
        <Table>
          <thead>
            <tr className="stripe-dark">
                <th scope="row"  >Asset Name</th>
                <th scope="row"  >Asset Type</th>
                <th scope="row"  >Model No</th>
                <th scope="row"  >Assigned To</th>  
            </tr>
          </thead>
          <tbody>
            {
              result.map(item =>
                
                  <tr>
                      <td>{item.asset_name}</td>
                      <td>{item.asset_type}</td>
                      <td>{item.model_no}</td>
                      <td>{item.asset_type_id}</td>   
                  </tr>
                
              )
            }
          </tbody>
        </Table>

      </div>
    )
  }
}
