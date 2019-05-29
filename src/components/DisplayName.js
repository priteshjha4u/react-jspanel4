import React from 'react';

const DisplayName = ({ name = 'Some functional component here' }) => {
  return <p>{name}</p>;
};

export default DisplayName;
