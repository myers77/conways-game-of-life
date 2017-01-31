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

const logger = createLogger();

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

let cells = new Array(100).fill(0);
cells = map(() => {
  return map(() => Math.round(Math.random()), new Array(100));
}, cells.slice());

let history = new Array(100).fill(1);
history = map(() => {
  return history.slice(), history;
}, history.slice());

const initialState = {
  height: 100,
  width: 100,
  animationTrails: true,
  grid: cells,
  historyGrid: history,
  showTrails: false,
  isRunning: false,
  intervalId: undefined,
};

const enhancer = compose(
  applyMiddleware(logger),
);

// const store = createStore(grid, initialState, enhancer);
const store = createStore(grid, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const rootElement = document.getElementById('root');

render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
  rootElement,
);
