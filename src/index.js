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
// cells = map(() => cells.slice(), cells);
cells = map(() => {
  return map(() => Math.round(Math.random()), new Array(100));
}, cells.slice());

const initialState = {
  height: 100,
  width: 100,
  animationFrames: 10,
  animationDelay: 3,
  animationTrails: true,
  grid: cells,
  oldGrid: cells,
  oldOldGrid: cells,
  running: false,
};

const enhancer = compose(
  applyMiddleware(logger),
);

const store = createStore(grid, initialState, enhancer);
  // const store = createStore(grid, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const rootElement = document.getElementById('root');

render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
  rootElement,
);
