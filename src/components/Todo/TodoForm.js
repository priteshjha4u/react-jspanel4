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
    !v.length && (err = 'Task name is required.');
    v.length > 30 && (err = 'Task name should be less than 30 char.');
    !reg.test(v) && v.length && (err = 'Task name should not contain special characters.');
    if (err) {
      this.setState({ tname: v, errorMsg: err, error: true });
      setTimeout(() => {
        this.state.errorMsg && this.setState({ errorMsg: '' });
      }, 5000);
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
    const errblock = this.state.errorMsg ? (
      <div className="alert alert-danger" style={{ marginTop: '5px', width: '40%', marginLeft: '40px' }}>
        {this.state.errorMsg}
      </div>
    ) : null;
    return (
      <div className="row justify-content-center align-items-center">
        <form className="form-inline" onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <input type="text" className="form-control" id="tname" placeholder="What to do?" value={this.state.tname} onChange={this.tnameChange} style={{ marginLeft: '40px' }} />
          </div>
          <button type="submit" className="btn btn-success ml-2" disabled={!this.state.tname || this.state.error}>
            Add
          </button>
        </form>
        {errblock}
      </div>
    );
  }
}

export default TodoForm;
