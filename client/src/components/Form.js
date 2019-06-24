import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
// import Typography from '@material-ui/core/Typography';

export default class Form extends Component {
    constructor(){
        super();
    }
  render() {
    return (
        <div className="container">
            <MuiThemeProvider>
            <React.Fragment>
                <AppBar title="Enter user details"/>
                
                <TextField floatingLabelText="Email"/>
                <br></br>
                <TextField floatingLabelText="Name"/>
                <br></br>

                
                <RaisedButton label="Save" primary={true} style={StyleSheet.button}/>
            </React.Fragment>
        </MuiThemeProvider>

        </div>
        
        
      
    )
  }
}
