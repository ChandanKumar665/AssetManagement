import React, { Component } from 'react'
import {Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class AssetTypeList extends Component {
    constructor(props){
      super(props);
      this.state = {
          data:[],
          modal:false,
          name:'',
          email:'',
          id:'',
          isOpen:false,
          isShowing:false,
          color:'',
          msg:''
      }

      // this.toggle = this.toggle.bind(this);
      // this.onDismiss = this.onDismiss.bind(this);
      
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

  render() {
    let result = this.state.data;
    console.log(this.state)
    return (

        <div className="container">
        <div>
          <h3>Asset Type List</h3>
        </div>
        <br></br>
        <div>
            <Link to={{pathname:`/assets/assettype/create` }} className="">
                Add New Asset Type+
            </Link>
        </div>
        <br></br>
        
        <Table>
          <thead>
            <tr className="stripe-dark">
                <th scope="row"  >Asset Type Name</th>
                <th scope="row"  >Brand</th>
            </tr>
          </thead>  
          <tbody>
              {
                result.map((item,i) => 
                    <tr className="stripe-dark">
                        <td className="pa3" >{item.asset_type}</td>
                        <td className="pa3" >{item.brand}</td>
                    </tr>
                )
              }
          </tbody>
        </Table>
      </div>
    )
  }
}
