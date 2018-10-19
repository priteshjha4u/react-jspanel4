import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import { jsPanel } from '../node_modules/jspanel4/es6module/jspanel';
import '../node_modules/jspanel4/dist/jspanel.min.css';
import DisplayName from './components/DisplayName';
import Countries from './components/Countries';
import TodoApp from './components/Todo/TodoApp';
import SampleUsers from './components/SampleUsers';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// Main/Top level React component
class App extends Component {
  constructor() {
    super();
    this.state = {
      panels: []
    };
  }

  componentDidMount() {
    try {
      document.body.style.overflow = 'hidden';
    } catch (e) {
      console.log(e.message);
    }
  }

  // Method that will create jsPanel on demand, right now to keep it simple, we are configuring jsPanel options inside the method statically
  // jsPanel configuration should be passed dynamically
  createJsPanel = e => {
    // keep Main component refrence
    const app = this;

    // create the jsPanel here
    jsPanel.create({
      theme: 'primary',
      headerTitle: e.target.id.trim(),
      position: 'center-top 0 58',
      contentSize: {
        width: function() {
          const minus = (window.innerWidth * 20) / 100;
          return window.innerWidth - minus;
        },
        height: 'auto'
      },
      contentOverflow: 'auto',
      animateIn: 'jsPanelFadeIn',
      onwindowresize: true,
      content: function() {
        // this function is where we are actually mounting a react component on runtime inside jsPanel content
        const div = document.createElement('div');
        const action = e.target.id.trim();
        const newId = this.id + 'prit';

        div.id = newId;
        this.content.append(div);
        const node = document.getElementById(newId);

        if (action === 'Display Name') {
          ReactDOM.render(<DisplayName name="Pritesh Jha" jsPanel={this} />, node);
        }
        if (action === 'Countries List') {
          ReactDOM.render(<Countries jsPanel={this} />, node);
        }
        if (action === 'Todo List') {
          ReactDOM.render(<TodoApp jsPanel={this} />, node);
        }
        if (action === 'Sample Users') {
          ReactDOM.render(<SampleUsers jsPanel={this} />, node);
        }
      },
      callback: function() {
        this.content.style.padding = '20px';
        // keep the added jsPanel id in main component state for further use if any.
        app.setState({ panels: [...app.state.panels, this.id] });
      },
      onbeforeclose: function() {
        // here we make sure to unmount the mounted component properly.
        const id = this.id + 'prit';
        const mountedComponentNodeId = document.getElementById(id);
        if (mountedComponentNodeId) {
          // Remove a mounted React component from the DOM and clean up its event handlers and state.
          ReactDOM.unmountComponentAtNode(mountedComponentNodeId);
        }
        return true;
      },
      onclosed: function() {
        // remove closed jsPanel from state as well
        const appPanels = app.state.panels.slice(0);
        const index = appPanels.indexOf(this.id);
        if (index > -1) {
          appPanels.splice(index, 1);
          app.setState({ panels: appPanels });
          /* toast.success(`jsPanel with ID: ${this.id} closed! `, {
            position: toast.POSITION.BOTTOM_CENTER
          }); */
        }
      }
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React and jsPanel4 playground</h1>
        </header>
        <p className="App-intro">Here we are trying to combine and show how jsPanel4 can be integrated with React JS without altering jspanel4 library.</p>
        <hr />
        <div className="row h-100 justify-content-center align-items-center">
          <div className="card">
            <div className="card-body">
              <button className="btn btn-outline-primary ml-2" type="button" onClick={this.createJsPanel} id="Display Name">
                Display Name
              </button>
              <button className="btn btn-outline-primary ml-2" type="button" onClick={this.createJsPanel} id="Countries List">
                Countries list
              </button>
              <button className="btn btn-outline-primary ml-2" type="button" onClick={this.createJsPanel} id="Todo List">
                Todo List
              </button>
              <button className="btn btn-outline-primary ml-2" type="button" onClick={this.createJsPanel} id="Sample Users">
                Sample Users
              </button>
            </div>
          </div>
        </div>
        {/* <div className="row">
          <ToastContainer />
        </div> */}
      </div>
    );
  }
}

export default App;
