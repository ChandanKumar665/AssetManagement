import React, {Component} from 'react';
import axios from 'axios';
import uuid from 'uuid';
import { Table } from 'reactstrap';

class EmployeeList extends Component{
    constructor(){
        super();
        this.state = {
            data:[]
        }
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
        console.log(uuid())
        let result = this.state.data;
            return (
                <div className="container">
                    <Table dark border="1">
                        <thead>
                            <tr className="stripe-dark">
                                <th scope="row"  key={1}>Name</th>
                                <th scope="row"  key={2}>Email</th>
                                <th scope="row"  key={3}>DOJ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                result.map(item => 
                                    <tr className="stripe-dark">
                                        <td className="pa3" key={4}>{item.fname}</td>
                                        <td className="pa3" key={5}>{item.email}</td>
                                    
                                        <td className="pa3" key={6}>{new Date(item.doj).toDateString()}</td>
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
