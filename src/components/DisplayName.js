import React from 'react';

const DisplayName = ({ name = 'Some functional component here', jsPanel }) => {
  return (
    <>
      <p>{name}</p>
      <p>This jaPanel id is {jsPanel && jsPanel.id}</p>
    </>
  );
};

export default DisplayName;
