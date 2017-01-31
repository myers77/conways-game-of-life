import React from 'react';

const headerStyle = {
  'font-size': '48px',
  'text-align': 'center',
}

const cursive = {
  'font-size': '42px',
  'font-family': 'Yellowtail, cursive',
}

const mediumFontWeight = {
  'letter-spacing': '1px',
  'font-weight': '500',
}

const Header = () => (
  <div
    style={headerStyle}
  >
    <span style={cursive}>Conway's</span>
    <div style={mediumFontWeight}>Game of Life</div>
  </div>
)

export default Header;
