import React, { Component } from 'react';
import edit from '../../assets/icons/si-glyph-edit.svg';
import _delete from '../../assets/icons/si-glyph-delete.svg';
import check from '../../assets/icons/si-glyph-checked.svg';

class TodoListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { showControls: false, taskName: this.props.data.text, tNameEdit: false, err: false, errorMsg: '' };
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.removeBtnClick = this.removeBtnClick.bind(this);
    this.okBtnClick = this.okBtnClick.bind(this);
    this.changeTaskName = this.changeTaskName.bind(this);
    this.editBtnClick = this.editBtnClick.bind(this);
    this.iconsStyle = {
      cursor: 'pointer',
      marginRight: '10px',
      width: '20px',
      height: '20px'
    };
  }

  mouseEnter(e) {
    this.setState({ showControls: true });
  }

  mouseLeave(e) {
    this.setState({ showControls: false });
  }

  removeBtnClick() {
    this.props.clickHandler(this.props.data.id);
  }

  okBtnClick() {
    this.props.clickHandler(this.props.data.id, true);
  }

  editBtnClick() {
    this.setState({ tNameEdit: true });
  }

  changeTaskName(e) {
    e.preventDefault();
    if (this.props.data.text === this.state.taskName) {
      return;
    }
    this.setState({ tNameEdit: false, err: false, errorMsg: '' });
    this.props.clickHandler(this.props.data.id, true, this.state.taskName);
  }

  cancelTaskNameEditing() {
    this.setState({ tNameEdit: false, taskName: this.props.data.text, err: false, errorMsg: '' });
  }

  editInputChanged(e) {
    let v = e.target.value,
      reg = /^[a-z\d\-_\s]+$/i,
      errM = '';
    !v.length && (errM = 'Task name is required.');
    v.length > 30 && (errM = 'Task name should be less than 30 char.');
    !reg.test(v) && v.length && (errM = 'Task name should not contain special characters.');
    if (errM) {
      this.setState({ taskName: v, errorMsg: errM, err: true });
      setTimeout(() => {
        this.state.errorMsg && this.setState({ errorMsg: '' });
      }, 5000);
      return;
    }
    this.setState({ taskName: v, err: false, errorMsg: '' });
  }

  render() {
    const icon = this.iconsStyle;
    const { showControls } = this.state;
    if (this.state.tNameEdit) {
      const errblock = this.state.errorMsg ? (
        <div className="alert alert-danger" style={{ marginTop: '5px', width: '50%' }}>
          {this.state.errorMsg}
        </div>
      ) : null;
      return (
        <li className="list-group-item">
          <form className="form-inline" onSubmit={this.changeTaskName}>
            <div className={!this.state.err ? 'form-group' : 'form-group has-error'}>
              <input type="text" className="form-control" value={this.state.taskName} onChange={this.editInputChanged.bind(this)} />
            </div>
            <button className="btn btn-primary leftBtn" type="submit" disabled={!this.state.taskName || this.state.err}>
              OK
            </button>
            <span className="btn btn-primary leftBtn" onClick={this.cancelTaskNameEditing.bind(this)}>
              Cancel
            </span>
          </form>
          {errblock}
        </li>
      );
    }
    const t = this.props.data,
      h = this.props.hash;
    const liCls = showControls && t.done !== 'true' ? 'list-group-item infobg' : t.done === 'true' ? 'list-group-item strk' : 'list-group-item';
    const removebtn = showControls ? <img className="float-right" onClick={this.removeBtnClick} title="Remove todo item" src={_delete} style={icon} alt="" /> : null;
    const okbtn = showControls && t.done !== 'true' ? <img className="float-right" onClick={this.okBtnClick} title="Mark as done." src={check} style={icon} alt="" /> : null;
    const editBtn = showControls && t.done !== 'true' ? <img className="float-right" onClick={this.editBtnClick} title="Edit task name." src={edit} style={icon} alt="" /> : null;
    return (
      <li className={liCls} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
        <b>
          <span className="float-left">{h}.</span>
          <span className="rmv" title={t.text.length > 25 ? t.text : ''}>
            {t.text.length > 25 ? t.text.substr(0, 25) + '..' : t.text}
          </span>
        </b>
        {removebtn}
        {okbtn}
        {editBtn}
      </li>
    );
  }
}

export default TodoListItem;
