import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import AppNavbar from './components/Header/AppNavbar';
import EmployeeList from './components/Users/EmployeeList';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import AddEmployee from './components/Users/AddEmployee';
import Delete from './components/Users/Delete';
import Form from './components/Form';
import AssetList from './components/Assets/AssetList';
import AssetTypeList from './components/Assets/AssetTypeList';
import AssetTypeCeate from './components/Assets/AssetTypeCeate';
import AssetCreate from './components/Assets/AssetCreate';
import Login from './components/Login/Login';

function App() {
  return (
    <div className="App">
    <AppNavbar/>
          <Router>
              <Switch>
                <Route exact path="/login" component={Login}></Route>
                <Route exact path="/users" component={EmployeeList}></Route>
                <Route exact path="/users/create" component={AddEmployee}></Route>
                <Route exact path="/users/delete" component={Delete}></Route>
                <Route exact path="/form" component={Form}></Route>
                <Route exact path="/assets" component={AssetList}></Route>
                <Route exact path="/assets/create" component={AssetCreate}></Route>
                <Route exact path="/assets/assettype" component={AssetTypeList}></Route>
                <Route exact path="/assets/assettype/create" component={AssetTypeCeate}></Route>
              </Switch>
          </Router>
    </div>
    
  );
}

export default App;
