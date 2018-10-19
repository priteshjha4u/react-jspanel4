import React, { Component } from 'react';

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = { tname: '', error: false, errorMsg: '' };
    this.tnameChange = this.tnameChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  tnameChange(e) {
    let v = e.target.value,
      reg = /^[a-z\d\-_\s]+$/i,
      err = '';
    v.length > 30 && (err = 'Only 30 chars.');
    !reg.test(v) && v.length && (err = 'No special characters.') && (v = v.substr(0, v.length - 1));
    if (err) {
      this.setState({ tname: v, errorMsg: err, error: true });
      setTimeout(() => {
        this.setState({ errorMsg: '', err: false });
      }, 4000);
      return;
    }
    this.setState({ tname: v, error: false, errorMsg: '' });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let d = { tname: this.state.tname };
    this.setState({ tname: '', errorMsg: '', error: false });
    this.props.formsubmit(d);
  }

  render() {
    const errblock = this.state.errorMsg ? <div className="alert alert-danger mt-2">{this.state.errorMsg}</div> : null;
    return (
      <div>
        <div className="row justify-content-center align-items-center">
          <form className="form-inline" onSubmit={this.handleFormSubmit}>
            <div className="input-group">
              <input type="text" className="form-control" placeholder="What to do?" value={this.state.tname} onChange={this.tnameChange} />
              <div className="input-group-append">
                <button className="btn btn-outline-success" type="submit" disabled={!this.state.tname || this.state.error}>
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="row justify-content-center align-items-center">{errblock}</div>
      </div>
    );
  }
}

export default TodoForm;
