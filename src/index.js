import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { map } from 'ramda';

import grid from './reducers/grid';
import App from './components/App';

// Needed for onTouchTap
injectTapEventPlugin();

let cells = new Array(100).fill(0);
cells = map(() => {
  return map(() => Math.round(Math.random()), new Array(100));
}, cells.slice());

const initialState = {
  height: 100,
  width: 100,
  scale: 5,
  grid: cells,
  historyGrid: cells.slice(),
  showTrails: false,
  isRunning: false,
  intervalId: undefined,
  animationSpeed: 400,
};

const enhancer = compose(applyMiddleware(createLogger()));
const store = createStore(grid, initialState, enhancer);
const rootElement = document.getElementById('root');

render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
  rootElement,
);
