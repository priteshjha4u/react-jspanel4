import React from 'react';

export const Modal = props => (
  <React.Fragment>
    <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Modal title
            </h5>
            <button type="button" className="close" aria-label="Close" onClick={props.cb}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{props.children}</div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={props.cb}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={props.cb}>
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="modal-backdrop fade show" />
  </React.Fragment>
);
