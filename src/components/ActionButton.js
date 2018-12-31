import React from 'react';

const noop = () => {};
const ActionButton = props => {
  return (
    <button type="button" className={props.cls || ''} id={props.id} onClick={props.click || noop}>
      {props.children}
    </button>
  );
};

export default ActionButton;
