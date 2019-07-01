import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
import AppNavbar from './components/AppNavbar';
import EmployeeList from './components/users/EmployeeList';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import AddEmployee from './components/users/AddEmployee';
import Delete from './components/users/Delete';
import Form from './components/Form';
import AssetList from './components/assets/AssetList';
import AssetTypeList from './components/assets/AssetTypeList';
import AssetTypeCeate from './components/assets/AssetTypeCeate';
import AssetCreate from './components/assets/AssetCreate';

function App() {
  return (
    <div className="App">
    <AppNavbar/>
          <Router>
              <Switch>
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
