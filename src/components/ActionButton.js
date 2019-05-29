import React from 'react';

const ActionButton = ({ title, comp, handleClick, lazyLoad, ...rest }) => {
  return (
    <button type="button" id={title} title={title} onClick={() => handleClick(title, comp, lazyLoad)} {...rest}>
      {title}
    </button>
  );
};

export default ActionButton;
