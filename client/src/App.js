import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// import AppNavbar from './components/header/AppNavbar';
import EmployeeList from './components/users/EmployeeList';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import AddEmployee from './components/users/AddEmployee';
import Delete from './components/users/Delete';
import Form from './components/Form';
import AssetList from './components/assets/AssetList';
import AssetTypeList from './components/assets/AssetTypeList';
import AssetTypeCeate from './components/assets/AssetTypeCeate';
import AssetCreate from './components/assets/AssetCreate';
import LoginForm from './components/login/LoginForm';
// import TopNavBar from './components/Header/TopNavBar';
import Logout from './components/login/Logout';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className="App container">
          
          <Router>
              
              <Switch>
                <Route exact path="/" component={LoginForm}></Route>
                <Route exact path="/login" component={LoginForm}></Route>
                <Route exact path="/logout" component={Logout}></Route>
                <Route exact path="/users" component={EmployeeList}></Route>
                <Route exact path="/users/create" component={AddEmployee}></Route>
                <Route exact path="/users/delete" component={Delete}></Route>
                <Route exact path="/form" component={Form}></Route>
                <Route exact path="/assets" component={AssetList}></Route>
                <Route exact path="/assets/create" component={AssetCreate}></Route>
                <Route exact path="/assets/assettype" component={AssetTypeList}></Route>
                <Route exact path="/assets/assettype/create" component={AssetTypeCeate}></Route>
              </Switch>
              <Footer/>
          </Router>
    </div>
    
  );
}

export default App;
