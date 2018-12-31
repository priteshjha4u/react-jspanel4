import React from 'react';

const ActionButton = props => {
  return (
    <button
      type="button"
      className={props.cls || ''}
      id={props.id}
      onClick={e => {
        props.click(e, props.comp);
      }}
    >
      {props.children}
    </button>
  );
};

export default ActionButton;
