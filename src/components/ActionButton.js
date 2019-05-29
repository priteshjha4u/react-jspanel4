import React from 'react';

const ActionButton = ({ title, comp, handleClick, ...rest }) => {
  return (
    <button type="button" id={title} title={title} onClick={() => handleClick(title, comp)} {...rest}>
      {title}
    </button>
  );
};

export default ActionButton;
