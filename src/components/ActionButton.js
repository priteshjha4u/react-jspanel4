import React from 'react';

const ActionButton = props => {
  return (
    <button type="button" className={props.cls || ''} id={props.id} onClick={props.click}>
      {props.children}
    </button>
  );
};

export default ActionButton;
