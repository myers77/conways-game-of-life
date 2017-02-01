import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import { map } from 'ramda';

import * as actions from '../actions';

const buttonsStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  verticalAlign: 'middle',
};

const iconStyle = {
  fontSize: '32px',
};

const buttonStyle = {
  height: 56,
  width: 56,
  margin: '12 24',
};

const playIconStyle = {
  fontSize: 72,
};

const playButtonStyle = {
  height: 94,
  width: 94,
};

const Buttons = ({ width, height, grid, isRunning, intervalId, animationSpeed, actions }) => {
  const handleToggleRun = () => {
    actions.toggleRun();
    if (isRunning) {
      clearInterval(intervalId);
    } else {
      const interval = setInterval(() => {
        actions.runGameStep();
      }, 500 - animationSpeed);
      actions.setIntervalId(interval);
    }
  };

  const handleGameStep = () => {
    actions.runGameStep();
  };

  const handleRandomizeGrid = () => {
    let newGrid = new Array(height);
    newGrid = map(() => {
      return map(() => Math.round(Math.random()), new Array(width));
    }, newGrid.slice());
    const newHistoryGrid = newGrid.slice();
    actions.updateGrid(newGrid, newHistoryGrid);
  };

  return (
    <div style={buttonsStyle}>
      <IconButton iconStyle={iconStyle} style={buttonStyle}>
        <FontIcon
          className="material-icons"
          onClick={() => handleRandomizeGrid(height, width)}
        >
          cached
        </FontIcon>
      </IconButton>
      <IconButton iconStyle={playIconStyle} style={playButtonStyle}>
        <FontIcon className="material-icons" onClick={handleToggleRun}>
          { isRunning ? 'pause' : 'play_arrow' }
        </FontIcon>
      </IconButton>
      <IconButton iconStyle={iconStyle} style={buttonStyle}>
        <FontIcon className="material-icons" onClick={handleGameStep}>
          skip_next
        </FontIcon>
      </IconButton>
    </div>
  );
};

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Buttons);
