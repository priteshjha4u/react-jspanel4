import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { jsPanel } from 'jspanel4/es6module/jspanel';
import 'jspanel4/es6module/extensions/modal/jspanel.modal';
import 'jspanel4/dist/jspanel.min.css';
import DisplayName from './components/DisplayName';
import Countries from './components/Countries';
import TodoApp from './components/Todo/TodoApp';
import SampleUsers from './components/SampleUsers';
import RandomImage from './components/RandomImage';
import ActionButton from './components/ActionButton';
import { Modal } from './components/modal';
import CreatePortal from './components/createPortal';
import MouseTracker from './components/mouseTrack';
import cat from './assets/icons/cat.svg';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// Main/Top level React component
class App extends Component {
  constructor() {
    super();
    this.state = {
      panels: {},
      modal: false,
      cat: false
    };
  }

  componentDidMount() {
    this.bodyOverflowHidden();
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  bodyOverflowHidden = () => (document.body.style.overflow = 'hidden');

  // Method that will create jsPanel on demand, right now to keep it simple, we are configuring jsPanel options inside the method statically
  // jsPanel configuration should be passed dynamically
  createJsPanel = e => {
    // keep Main component refrence
    const app = this;
    // component that needs to be mounted
    const action = e.target.id.trim();
    // check if its already mounted
    if (app.state.panels[action]) {
      return app.state.panels[action].front(() => {
        app.state.panels[action].resize({
          height: 'auto'
        });
        app.state.panels[action].reposition('center-top 0 20%');
      });
    }

    const options = {
      theme: 'primary',
      headerTitle: e.target.id.trim(),
      position: 'center-top 0 20%',
      contentSize: {
        width: `${Math.round(window.innerWidth / 3)}px`,
        height: `auto`
      },
      contentOverflow: 'auto',
      // animateIn: 'jsPanelFadeIn',
      // onwindowresize: true,
      content: function() {
        // this function is where we are actually mounting a react component on runtime inside jsPanel content
        const div = document.createElement('div');
        const newId = `${this.id}-node`;

        div.id = newId;
        this.content.append(div);
      },
      callback: function() {
        this.content.style.padding = '10px';
        const maxHeight = window.innerHeight - (window.innerHeight * 30) / 100;
        this.content.style.maxHeight = `${maxHeight}px`;
        this.content.style.maxWidth = `${window.innerWidth - 20}px`;
        // keep the added jsPanel id in main component state for further use if any.
        app.setState({ panels: { ...app.state.panels, [action]: this } });
        app.bodyOverflowHidden();
      },
      onclosed: function() {
        // remove closed jsPanel and its mounted component from state
        const appPanels = app.state.panels;
        if (appPanels[action]) {
          delete appPanels[action];
          app.setState({ panels: { ...appPanels } }, () => {
            setTimeout(app.bodyOverflowHidden);
          });
          // console.log(`jsPanel closed: ${this.id}`);
          /* toast.success(`jsPanel with ID: ${this.id} closed! `, {
			  position: toast.POSITION.BOTTOM_CENTER
			}); */
        }
      }
    };
    // create the jsPanel
    jsPanel.create(options);
  };

  createJsPanelModal = () => {
    // options could be dynamic
    jsPanel.modal.create({
      theme: 'primary',
      headerTitle: 'Modal Example',
      position: 'center-top 0 20%',
      contentSize: {
        width: `${Math.round(window.innerWidth / 3)}px`,
        height: `auto`
      },
      contentOverflow: 'auto',
      content: function() {
        const div = document.createElement('div');
        const newId = `${this.id}-node`;
        div.id = newId;
        div.innerHTML = '<p>Modal content...</p><p><img src="' + cat + '" height="200" width="200" /></p>';
        this.content.append(div);
      }
    });
  };

  renderInsidePortals() {
    const panels = this.state.panels;
    return Object.keys(panels).map(panel => {
      const node = document.getElementById(`${panels[panel].id}-node`);
      switch (panel) {
        case 'Display Name':
          return (
            <CreatePortal rootNode={node} key={panel}>
              <DisplayName name="PKJ" jsPanel={panels[panel]} />
            </CreatePortal>
          );
        case 'Countries List':
          return (
            <CreatePortal rootNode={node} key={panel}>
              <Countries jsPanel={panels[panel]} />
            </CreatePortal>
          );
        case 'Todo App':
          return (
            <CreatePortal rootNode={node} key={panel}>
              <TodoApp jsPanel={panels[panel]} />
            </CreatePortal>
          );
        case 'Sample Users':
          return (
            <CreatePortal rootNode={node} key={panel}>
              <SampleUsers jsPanel={panels[panel]} />
            </CreatePortal>
          );
        case 'Random Image':
          return (
            <CreatePortal rootNode={node} key={panel}>
              <RandomImage jsPanel={panels[panel]} />
            </CreatePortal>
          );
        default:
          return null;
      }
    });
  }

  render() {
    const jsPanels = Object.keys(this.state.panels);
    const { cat } = this.state;
    return (
      <React.Fragment>
        <div className="row bg-dark text-white shadow p-2">
          <div className="col-md-12">
            <h4 className="text-center">jsPanel with react</h4>
          </div>
        </div>
        <div className="row justify-content-center align-items-center mt-4">
          <div className="card">
            <div className="card-body">
              <ActionButton cls="btn btn-outline-primary ml-2 mb-2" click={this.createJsPanel} id="Display Name">
                Display Name
              </ActionButton>
              <ActionButton cls="btn btn-outline-primary ml-2 mb-2" click={this.createJsPanel} id=" Countries List">
                Countries List
              </ActionButton>
              <ActionButton cls="btn btn-outline-primary ml-2 mb-2" click={this.createJsPanel} id="Todo App">
                Todo App
              </ActionButton>
              <ActionButton cls="btn btn-outline-primary ml-2 mb-2" click={this.createJsPanel} id="Sample Users">
                Sample Users
              </ActionButton>
              <ActionButton cls="btn btn-outline-primary ml-2 mb-2" click={this.createJsPanel} id="Random Image">
                Random Image
              </ActionButton>
              <ActionButton cls="btn btn-outline-primary ml-2 mb-2" click={this.createJsPanelModal}>
                Modal
              </ActionButton>
              <ActionButton cls={`btn ml-2 mb-2 ${cat ? 'btn-danger' : 'btn-outline-primary'}`} click={() => this.setState({ cat: !cat })} id="cat">
                {cat ? 'Cat Off' : 'Call Cat'}
              </ActionButton>
            </div>
          </div>
        </div>
        {this.state.modal && (
          <CreatePortal rootNode={document.getElementById('Portal-Root')}>
            <Modal
              cb={() => {
                this.setState({ modal: false }, () => {
                  const root = document.getElementById('Portal-Root');
                  root.parentNode.removeChild(root);
                });
              }}
            >
              <DisplayName name="PKJ" />
            </Modal>
          </CreatePortal>
        )}
        {jsPanels.length > 0 && this.renderInsidePortals()}
        {cat && <MouseTracker />}
        {/* <div className="row">
          <ToastContainer />
        </div> */}
      </React.Fragment>
    );
  }
}

export default App;
