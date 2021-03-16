// Demonstrates the class version of a react component. Prior to the
// introduction of state and effect hooks in React 16.8, function components
// were inferior to class components in functionality. Currently, it is hinted
// that function components may confer performance advantages over class
// components in future.

// Alternatively: import {Component} from 'react';
// Allows use of: class App extends Component {}
// instead of: class App extends React.Component {}
import React from 'react';

// Add new webpages to react. Files are assumed to .js by default.
// import NewPage from './newPage';

import logo from './images/logo.svg';
import './stylesheets/App.css';

class SayHello extends React.Component {
  // By default, the props object contains any arguments passed to the
  // component. Access them through this.props.propertyName
  render() {
    return <div>hello {this.props.name || 'world'}</div>
  }
}

class Button extends React.Component {
  // Demonstrates calling the constructor in a react class component. Generally,
  // there is no need to call the constructor, unless you wish to make use of
  // states or bind.
  constructor(props) {
    // Any class component with a constructor must call the super function.
    super(props)
    // Demonstrates the bind method. This makes it such that any reference to
    // this refers to properties in the parent class instead of the method
    // itself. Alternatively, all methods can be written as arrow methods.
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    if (!this.props.disabled && this.props.onClick) this.props.onClick(e)
  }

  render() {
    return (
      <button className={this.props.className} type={this.props.type || "button"} name={this.props.name} disabled={this.props.disabled} onClick={this.handleClick}>
        {this.props.value || this.props.children || 'click me!'}
      </button>
    )
  }
}

class CheckBox extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    if (!this.props.disabled && this.props.onClick) this.props.onClick(e)
  }

  render() {
    return (
      <>
        <input type="checkbox" name={this.props.name} onClick={this.props.onClick} defaultChecked={this.props.defaultChecked} />
        <label htmlFor={this.props.name}>{this.props.value}</label>
      </>
    )
  }

}

class TestInputBox extends React.Component {
  constructor(props) {
    super(props)
    // One way to define default values is using the constructor. Note that
    // properties here are accessed using props.propertyName and not
    // this.props.propertyName
    this.placeholder = props.placeholder || 'type text here'

    // It is recommended that all properties that affect rendering be defined
    // in state. This is because react checks for changes in state every time
    // an event occurs.
    this.state = {
      user: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.doLogin = this.doLogin.bind(this)
  }

  handleChange(e) {
    // Demonstrates how setState can be made generic. The typical
    // inplementation setState can be found under the App function.
    this.setState({
      // e.target.name will return the name of the state variable being
      // modified by value.
      [e.target.name]: e.target.value
    });
  }

  doLogin() {
    const s = `
    Login attempt
    user: ${this.state.user}
    password: ${this.state.password}
    `
    console.log(s)
  }

  render() {
    return (
      <>
        <div>
          <input name="user" placeholder={this.placeholder} onChange={this.handleChange} value={this.state.user}/>
        </div>
        <div>
          <input name="password" placeholder={this.placeholder} onChange={this.handleChange} value={this.state.password}/>
        </div>
        <Button value="Login" onClick={this.doLogin} />
      </>
    )
  }
}

class TestLink extends React.Component {
  render() {
    // If if is needed, it is defined inside the render block:
    if (this.props.href && this.props.value) {
    return <a href={this.props.href}>{this.props.value}</a>
    }
    return 'insufficient link parameters'
  }
}

class AppClass extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      clockwise: true
    }
  }

  // Demonstrates defining a method without binding.
  reverseSpin = () => {
    this.setState({
      clockwise: !this.state.clockwise
    })
  }

  render() {
    return (
      <div className="App">
        {/* Note that userName is a property of state. */}
        <SayHello name={this.state.name}/>
        <img src={logo} className={"App-logo" + (this.state.clockwise ? "" : " reverse")} alt="logo"/>
        <div><CheckBox value="reverse spin" onClick={this.reverseSpin}/></div>
        <TestInputBox placeholder="type text here"/>
        <div><TestLink href="./new-page.html" value="test link"/></div>
      </div>
    )
  }
}

export default AppClass;
