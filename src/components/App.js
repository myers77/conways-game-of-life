import React from 'react';

import Header from './Header';
import Grid from './Grid';
import Console from './Console';

const style = {
  fontFamily: 'Roboto, sans-serif',
  textAlign: 'center',
  width: '80%',
  margin: 'auto',
}

const App = () => (
  <div style={style}>
    <Header />
    <Grid />
    <Console />
  </div>
);

export default App;
