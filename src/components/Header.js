import React from 'react';

const headerStyle = {
  'marginTop': 32,
  'fontSize': 48,
  'textAlign': 'center',
  'color': 'rgba(0,0,0,0.87)',
}

const cursive = {
  'fontSize': 42,
  'fontFamily': 'Yellowtail, cursive',
}

const mediumFontWeight = {
  'letterSpacing': 1,
  'fontWeight': 500,
}

const Header = () => (
  <div style={headerStyle}>
    <div style={cursive}>Conway's</div>
    <div style={mediumFontWeight}>Game of Life</div>
  </div>
)

export default Header;
