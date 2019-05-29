import React from 'react';

const DisplayName = ({ name = 'Some functional component here', jsPanel }) => {
  return (
    <div className="card">
      <div className="card-body text-center">
        <h3>{name}</h3>
        <h4>This jsPanel id is {jsPanel && jsPanel.id}</h4>
      </div>
    </div>
  );
};

export default DisplayName;
