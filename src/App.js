import React, { Component, lazy, Suspense, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { jsPanel } from 'jspanel4/es6module/jspanel';
import 'jspanel4/es6module/extensions/modal/jspanel.modal';
import 'jspanel4/dist/jspanel.min.css';
import ActionButton from './components/ActionButton';
import CreatePortal from './components/createPortal';
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

  createJsPanel = (action, comp, lazyLoad) => {
    // keep Main component refrence
    const app = this;
    // check if its already mounted
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
          app.setState({ panels: { ...appPanels } }, () => {
            // setTimeout(app.bodyOverflowHidden);
          });
        }
      }
    };
    // create the jsPanel
    const panel = jsPanel.create(options);
    // save panel and compponent (this will be mounted later inside panel body) reference inside state
    app.setState({ panels: { ...app.state.panels, [action]: { panel, comp, lazyLoad } } });
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
        div.innerHTML = '<p>Modal content...</p>';
        this.content.append(div);
      }
    });
  };

  renderJsPanlesInsidePortal() {
    const panels = this.state.panels;
    return Object.keys(panels).map(data => {
      const jsPanel = data.panel;
      const Comp = data.comp;
      const lazyLoad = data.lazyLoad;
      const node = document.getElementById(`${jsPanel.id}-node`);
      if (!Comp) return null;
      const child = lazyLoad ? (
        <Suspense fallback={<div className="alert alert-info">Loading...</div>}>
          <Comp jsPanel={jsPanel} />
        </Suspense>
      ) : (
        <Comp jsPanel={jsPanel} />
      );
      return (
        <CreatePortal rootNode={node} key={jsPanel.id}>
          {child}
        </CreatePortal>
      );
    });
  }

  render() {
    const jsPanels = Object.keys(this.state.panels);
    const actionButtonProps = {
      className: 'btn btn-outline-primary ml-2 mb-2',
      handleClick: this.createJsPanel,
      lazyLoad: true
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
        {jsPanels.length > 0 && this.renderJsPanlesInsidePortal()}
      </Fragment>
    );
  }
}

export default App;
