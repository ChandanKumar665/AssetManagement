import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBAlert, MDBCard, MDBCardBody, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import TopNavBar from './header/TopNavBar';

export default class Settings extends Component {
    constructor(){
        super();
        this.state = {
            theme: '',
            btn_color: ''
        }
        this.changeTheme = this.changeTheme.bind(this)
        this.formSubmit = this.formSubmit.bind(this);
    }

    componentDidMount = () => {
        var theme_color = localStorage.getItem('theme') == undefined ? 'default' : localStorage.getItem('theme');
        var btn_color = localStorage.getItem('btn_color') == undefined ? 'btn btn-primary':localStorage.getItem('btn_color');
        if(btn_color == 'btn btn-default'){
            btn_color = 'btn btn-primary'
        }
        this.setState({theme:theme_color,btn_color:btn_color})
    }

    changeTheme = (e) => {
        this.setState({
            theme: e.target.value,
        })
    }

    formSubmit = (e) => {
        // e.preventDefault()
        localStorage.setItem('theme',this.state.theme)
        localStorage.setItem('btn_color','btn btn-'+this.state.theme)
    }

  render() {
      console.log(this.state)
    return (
      <MDBContainer>
          <TopNavBar/>
          <h3>Settings</h3>
          Theme:
          
        <div className="custom-control custom-radio">
        <input type="radio" className="custom-control-input"   
        value="default" 
        id="default"
        checked={this.state.theme == 'default'}
        onChange={this.changeTheme}
        name="themecolor"/>
        <label className="custom-control-label" htmlFor="default">Default</label>
        </div>


        <div className="custom-control custom-radio">
        <input type="radio" className="custom-control-input" id="cyan" 
        checked={this.state.theme == 'cyan'}
        onChange={this.changeTheme}
        value="cyan" 
        name="themecolor"/>
        <label className="custom-control-label" htmlFor="cyan" style={{color:'cyan'}}>Cyan</label>
        </div>


        <div className="custom-control custom-radio">
        <input type="radio" className="custom-control-input" id="geekblue" 
        checked={this.state.theme === 'blue'}
        onChange={this.changeTheme}
        value="blue" 
        name="themecolor"/>
        <label className="custom-control-label" htmlFor="geekblue" style={{color:'blue'}}>Geek Blue</label>
        </div>

        <div className="custom-control custom-radio">
        <input type="radio" className="custom-control-input" id="brown" 
        checked={this.state.theme === 'brown'}
        onChange={this.changeTheme}
        value="brown" 
        name="themecolor"/>
        <label className="custom-control-label" htmlFor="brown" style={{color:'brown'}}>Brown</label>
        </div>


        <div className="custom-control custom-radio">
        <input type="radio" className="custom-control-input" id="pink" 
        checked={this.state.theme === 'pink'}
        onChange={this.changeTheme}
        value="pink" 
        name="themecolor"/>
        <label className="custom-control-label" htmlFor="pink" style={{color:'pink'}}>Pink</label>
        </div>


        <div className="custom-control custom-radio">
        <input type="radio" className="custom-control-input" id="indigo" 
        checked={this.state.theme === 'indigo'}
        onChange={this.changeTheme}
        value="indigo" 
        name="themecolor"/>
        <label className="custom-control-label" htmlFor="indigo" style={{color:'indigo'}}>Indigo</label>
        </div>

        <div className="custom-control custom-radio">
        <input type="radio" className="custom-control-input" id="orange" 
        checked={this.state.theme === 'orange'}
        onChange={this.changeTheme}
        value="orange" 
        name="themecolor"/>
        <label className="custom-control-label" htmlFor="orange" style={{color:'orange'}}>Orange</label>
        </div>


        <div className="custom-control custom-radio">
        <input type="radio" className="custom-control-input" id="green" 
        checked={this.state.theme === 'green'}
        onChange={this.changeTheme}
        value="green" 
        name="themecolor"/>
        <label className="custom-control-label" htmlFor="green" style={{color:'green'}}>Polar Green</label>
        </div>


        <div className="custom-control custom-radio">
        <input type="radio" className="custom-control-input" id="purple" 
        checked={this.state.theme === 'purple'}
        onChange={this.changeTheme}
        value="purple" 
        name="themecolor"/>
        <label className="custom-control-label" htmlFor="purple" style={{color:'purple'}}>Purple</label>
        </div>

        <div className="custom-control custom-radio">
        <input type="radio" className="custom-control-input" id="red" 
        checked={this.state.theme === 'red'}
        onChange={this.changeTheme}
        value="red" 
        name="themecolor"/>
        <label className="custom-control-label" htmlFor="red" style={{color:'red'}}>Red</label>
        </div>


        <div className="custom-control custom-radio">
        <input type="radio" className="custom-control-input" id="amber" 
        checked={this.state.theme === 'amber'}
        onChange={this.changeTheme}
        value="amber" 
        name="themecolor"/>
        <label className="custom-control-label" htmlFor="amber" style={{color:'#ffc107'}}>Amber</label>
        </div>


        <div className="custom-control custom-radio">
        <input type="radio" className="custom-control-input" id="blue-grey" 
        checked={this.state.theme === 'blue-grey'}
        onChange={this.changeTheme}
        value="blue-grey" 
        name="themecolor"/>
        <label className="custom-control-label" htmlFor="blue-grey" style={{color:'blue-grey'}}>Blue-grey</label>
        </div>
        <div>
            <form name="apply_theme" onSubmit={this.formSubmit}>
                <button className={this.state.btn_color}>Apply</button>
                <button className="btn">Cancel</button>
            </form>
        </div>
      </MDBContainer>
    )
  }
}
