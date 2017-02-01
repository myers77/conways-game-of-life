import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontIcon from 'material-ui/FontIcon';
import Slider from 'material-ui/Slider';

import Settings from './Settings';
import Buttons from './Buttons';
import * as Actions from '../actions';

const sliderRow = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',
};

const sliderIcon = {
  marginBottom: 24,
  marginLeft: 12,
  marginRight: 12,
};

const speedSliderStyle = {
  width: '40%',
};

const Console = ({ width, height, grid, isRunning, intervalId, animationSpeed, actions }) => {
  const handleSpeedSlider = (event, value) => {
    actions.setAnimationSpeed(value);
    if (isRunning) {
      actions.toggleRun();
    }
    clearInterval(intervalId);
  };

  return (
    <div>
      <Buttons />
      <div style={sliderRow}>
        <FontIcon className="material-icons" style={sliderIcon}>
          directions_walk
        </FontIcon>
        <Slider
          min={0}
          max={500}
          step={1}
          defaultValue={animationSpeed}
          style={speedSliderStyle}
          onChange={handleSpeedSlider}
        />
        <FontIcon className="material-icons" style={sliderIcon}>
          motorcycle
        </FontIcon>
      </div>
      <Settings />
    </div>
  );
};

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Console);
