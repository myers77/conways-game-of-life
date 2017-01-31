import React from 'react';

const style = {
  width: '10px',
  height: '10px',
  border: '1px solid black',
};

const Cell = ({ children, filled = false, onClick }) => (
  <div
    onClick={onClick}
    style={{
      ...style,
      backgroundColor: filled ? '#333' : '#fff',
    }}
  >
    {children}
  </div>
);

export default Cell;
