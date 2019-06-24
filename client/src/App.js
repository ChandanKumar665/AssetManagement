import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
import AppNavbar from './components/AppNavbar';
import EmployeeList from './components/EmployeeList';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import AddEmployee from './components/AddEmployee';
import Delete from './components/Delete';
import Form from './components/Form';

function App() {
  return (
    <div className="App">
    <AppNavbar/>
          <Router>
              <Switch>
                <Route exact path="/" component={EmployeeList}></Route>
                <Route exact path="/create" component={AddEmployee}></Route>
                <Route exact path="/delete" component={Delete}></Route>
                <Route exact path="/form" component={Form}></Route>
              </Switch>
          </Router>
    </div>
    
  );
}

export default App;
