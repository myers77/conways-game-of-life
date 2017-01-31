import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton'
import Checkbox from 'material-ui/Checkbox';
import Slider from 'material-ui/Slider';

import * as Actions from '../actions';

const style = {
  'width': '30%',
}

const sliderRow = {
    'display': 'flex',
  'flexDirection': 'row',
}

const speedSliderStyle = {
  'width': '80%',
}

const Settings = ({ actions, }) => {

  const handleShowTrailsChecked = () => {
    actions.toggleShowTrails();
  }

  const handleSpeedSlider = (event, value) => {
    actions.setAnimationSpeed(value);
  }

  return (
    <div
      style={style}
    >
      <Checkbox
        label="Show trails"
        onCheck={handleShowTrailsChecked}
      />
      <div
        style={sliderRow}
      >
      <FontIcon
            className="material-icons"
          >directions_walk</FontIcon>
      <Slider
        min={0}
        max={500}
        step={1}
        defaultValue={200}
        style={speedSliderStyle}
        onChange={handleSpeedSlider}
      />
      <FontIcon
            className="material-icons"
          >motorcycle</FontIcon>
          </div>
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
)(Settings);
