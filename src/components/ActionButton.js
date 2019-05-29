import React from 'react';

const ActionButton = ({ title, comp, handleClick, lazyLoad, modal, ...rest }) => {
  return (
    <button type="button" id={title} title={title} onClick={() => handleClick(title, comp, lazyLoad, modal)} {...rest}>
      {title}
    </button>
  );
};

export default ActionButton;
