import React from 'react';

const ActionButton = ({ title, comp, handleClick, modal, ...rest }) => {
  return (
    <button type="button" id={title} title={title} onClick={() => handleClick(title, comp, modal)} {...rest}>
      {title}
    </button>
  );
};

export default ActionButton;
