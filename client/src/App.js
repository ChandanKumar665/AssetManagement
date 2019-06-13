import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavbar from './components/AppNavbar';
import EmployeeList from './components/EmployeeList';
function App() {
  return (
    <div className="App">
      <AppNavbar/>
      <EmployeeList/>
    </div>
  );
}

export default App;
