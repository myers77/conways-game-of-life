import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton'
import Slider from 'material-ui/Slider';
import { map } from 'ramda';

import Settings from './Settings';
import * as Actions from '../actions';

const buttonsStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  verticalAlign: 'middle',
}

const iconStyle = {
  fontSize: '32px',
}

const buttonStyle = {
  height: 56,
  width: 56,
  margin: '12 24',
}

const playIconStyle = {
  fontSize: 72,
}

const playButtonStyle = {
  height: 94,
  width: 94,
}

const sliderRow = {
  display: 'flex',
  flexDirection: 'row',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',
}

const sliderIcon = {
  margin: 24,
}

const speedSliderStyle = {
  width: '40%',
}

const Console = ({ width, height, grid, isRunning, intervalId, animationSpeed, actions }) => {
  const handleToggleRun = () => {
    console.log('toggling run');
    actions.toggleRun();
    if (isRunning) {
      clearInterval(intervalId);
    } else {
      const interval = setInterval(() => {
        actions.runGameStep();
      }, 500 - animationSpeed);
      actions.setIntervalId(interval)
    }
  }

  const handleGameStateChange = () => {
    actions.runGameStep();
  }

  const handleRandomizeGrid = (height, width) => {
    let newGrid = new Array(height)
    newGrid = map(() => {
      return map(() => Math.round(Math.random()), new Array(width));
    }, newGrid.slice());
    actions.updateGrid(newGrid);
  }

  const handleSpeedSlider = (event, value) => {
    actions.setAnimationSpeed(value);
    if (isRunning) {
      actions.toggleRun();
    }
    clearInterval(intervalId);
  }

  return (
    <div>
      <div style={buttonsStyle}>
        <IconButton iconStyle={iconStyle} style={buttonStyle}>
          <FontIcon className="material-icons" 
            onClick={() => handleRandomizeGrid(height, width) }
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
          <FontIcon className="material-icons" onClick={handleGameStateChange}>
            skip_next
          </FontIcon>
        </IconButton>
      </div>
      <div style={sliderRow}>
        <FontIcon className="material-icons" style={sliderIcon}>
          directions_walk
        </FontIcon>
        <Slider
          min={0}
          max={500}
          step={1}
          defaultValue={500}
          style={speedSliderStyle}
          onChange={handleSpeedSlider}
        />
        <FontIcon className="material-icons" style={sliderIcon}>
          motorcycle
        </FontIcon>
      </div>
      <Settings />
    </div>
  )
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Console);
