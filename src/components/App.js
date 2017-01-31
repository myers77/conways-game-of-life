import React from 'react';
import Header from './Header';
import Grid from './Grid';
import Console from './Console'

const style = {
  'font-family': 'Roboto, sans-serif',
  'text-align': 'center',
}

const App = () => (
  <div
    style={style}
  >
    <Header />
    <Grid />
    <Console />
  </div>
);

export default App;
