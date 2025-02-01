import React from 'react';
import Button from '../components/Button.js';

const HomePage = () => {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div className="text-center py-10">
      <h1 className="text-4xl font-bold mb-4">Welcome to My React App</h1>
      <Button label="Click Me" onClick={handleClick} />
    </div>
  );
};

export default HomePage;
