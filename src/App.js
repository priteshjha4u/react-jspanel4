import React, { Component, lazy, Suspense, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { jsPanel } from 'jspanel4/es6module/jspanel';
import 'jspanel4/es6module/extensions/modal/jspanel.modal';
import 'jspanel4/dist/jspanel.min.css';
import ActionButton from './components/ActionButton';
import CreatePortal from './components/createPortal';

// lazy loaded components
const DisplayName = lazy(() => import('./components/DisplayName'));
const Countries = lazy(() => import('./components/Countries'));
const TodoApp = lazy(() => import('./components/Todo/TodoApp'));
const SampleUsers = lazy(() => import('./components/SampleUsers'));
const RandomImage = lazy(() => import('./components/RandomImage'));

// Top level React component
class App extends Component {
  constructor() {
    super();
    this.state = {
      panels: {},
      modal: false
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
  createJsPanel = (action, comp) => {
    // keep Main component refrence
    const app = this;
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
        case 'Simple Example':
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
    const actionButtonProps = {
      className: 'btn btn-outline-primary ml-2 mb-2',
      handleClick: this.createJsPanel
    };
    return (
      <Fragment>
        <div className="row bg-dark text-white shadow p-2">
          <div className="col-md-12">
            <h4 className="text-center">jsPanel with react</h4>
          </div>
        </div>
        <div className="row justify-content-center align-items-center mt-4">
          <div className="card">
            <div className="card-body">
              <ActionButton {...actionButtonProps} title="Simple Example" comp={DisplayName} />
              <ActionButton {...actionButtonProps} title=" Countries List" comp={Countries} />
              <ActionButton {...actionButtonProps} title="Todo App" comp={TodoApp} />
              <ActionButton {...actionButtonProps} title="Sample Users" comp={SampleUsers} />
              <ActionButton {...actionButtonProps} title="Random Image" comp={RandomImage} />
              <ActionButton {...actionButtonProps} title="Modal Example" handleClick={this.createJsPanelModal} />
            </div>
          </div>
        </div>
        {jsPanels.length > 0 && this.renderInsidePortals()}
      </Fragment>
    );
  }
}

export default App;
