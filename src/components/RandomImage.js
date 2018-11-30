import React from 'react';

const RandomImage = () => {
  const src = 'https://source.unsplash.com/random/800x600';
  return (
    <div>
      <img src={src} alt="random" />
    </div>
  );
};

export default RandomImage;
