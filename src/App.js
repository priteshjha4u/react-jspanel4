import React, { Component, lazy, Suspense } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { jsPanel } from 'jspanel4/es6module/jspanel';
import 'jspanel4/es6module/extensions/modal/jspanel.modal';
import 'jspanel4/dist/jspanel.min.css';

// Normal components
import Clock from './components/clock';
import ActionButton from './components/ActionButton';
import CreatePortal from './components/createPortal';

// jsPanel default options
import jsPanelOptions from './jsPanelOptions';

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
      panels: {}
    };
  }

  createJsPanel = (action, comp, modal = false) => {
    // keep Main component refrence
    const app = this;
    // check if its already mounted, bring it to front
    if (app.state.panels[action]) {
      return app.state.panels[action]['panel'].front(() => {
        app.state.panels[action]['panel'].resize({
          height: 'auto'
        });
        app.state.panels[action]['panel'].reposition('center-top 0 20%');
      });
    }

    const options = {
      ...jsPanelOptions,
      headerTitle: action,
      onclosed: () => {
        // remove closed jsPanel and its mounted component from state
        const appPanels = app.state.panels;
        if (appPanels[action]) {
          delete appPanels[action];
          app.setState({ panels: { ...appPanels } });
        }
      }
    };
    // create jsPanel
    const panel = modal ? jsPanel.modal.create(options) : jsPanel.create(options);
    // save panel and compponent (this will be mounted later inside panel body) reference inside state
    app.setState({ panels: { ...app.state.panels, [action]: { panel, comp } } });
  };

  renderJsPanlesInsidePortal() {
    const panels = this.state.panels;
    return Object.keys(panels).map(action => {
      const jsPanel = panels[action].panel;
      const Comp = panels[action].comp;
      const node = document.getElementById(`${jsPanel.id}-node`);
      let counter = 0;
      if (!Comp) return null;
      return (
        <CreatePortal rootNode={node} key={jsPanel.id}>
          {Array.isArray(Comp) ? (
            Comp.map(C => (
              <Suspense key={`${jsPanel.id}-${counter++}`} fallback={<div className="alert alert-info">Loading...</div>}>
                <C jsPanel={jsPanel} />
              </Suspense>
            ))
          ) : (
            <Suspense fallback={<div className="alert alert-info">Loading...</div>}>
              <Comp jsPanel={jsPanel} />
            </Suspense>
          )}
        </CreatePortal>
      );
    });
  }

  render() {
    const jsPanels = Object.keys(this.state.panels);
    const actionButtonProps = {
      className: 'btn btn-outline-primary ml-2 mb-2',
      handleClick: this.createJsPanel
    };
    return (
      <div className="container-fluid">
        <div className="row bg-dark text-white shadow p-2">
          <div className="col-md-12">
            <h4 className="text-center">jsPanel with react</h4>
          </div>
        </div>
        <div className="row justify-content-center mt-4">
          <div className="card">
            <div className="card-body">
              <ActionButton {...actionButtonProps} title="Simple Example" comp={DisplayName} />
              <ActionButton {...actionButtonProps} title=" Countries List" comp={Countries} />
              <ActionButton {...actionButtonProps} title="Todo App" comp={TodoApp} />
              <ActionButton {...actionButtonProps} title="Sample Users" comp={SampleUsers} />
              <ActionButton {...actionButtonProps} title="Random Image" comp={RandomImage} />
              <ActionButton {...actionButtonProps} title="Modal Example" comp={Clock} modal={true} />
              <ActionButton {...actionButtonProps} title="Multiple Components" comp={[Clock, DisplayName, RandomImage, Countries]} />
            </div>
          </div>
        </div>
        {jsPanels.length > 0 && this.renderJsPanlesInsidePortal()}
      </div>
    );
  }
}

export default App;
