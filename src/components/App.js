import React from 'react';

import Header from './Header';
import Grid from './Grid';
import Console from './Console';
import Credits from './Credits';

const style = {
  'fontFamily': 'Roboto, sans-serif',
  'textAlign': 'center',
  }

const App = () => (
  <div style={style}>
    <Header />
    <Grid />
    <Console />
    <Credits />
  </div>
);

export default App;
