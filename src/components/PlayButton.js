import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Actions from '../actions';


const playIconStyle = {
  'fontSize': '60px',
}

const playButtonStyle = {
  'height': '85px',
  'width': '85px',
}

const PlayButton = ({ width, height, grid, isRunning, intervalId, actions }) => {
  const handleToggleRun = () => {
    actions.toggleRun();
    if (intervalId) {
      clearInterval(intervalId);
      actions.setIntervalId(undefined);
    } else {
        const interval = setInterval(() => {
          actions.runGameStep();
        }, 50);
        actions.setIntervalId(interval)
      }
    // requestAnimationFrame(handleToggleRun);
  }

  if (isRunning) {
      return (
    <div>
      <IconButton
          iconStyle={playIconStyle}
          style={playButtonStyle}
        >
          <FontIcon
            className="material-icons"
            onClick={handleToggleRun}
          >
            pause</FontIcon>
        </IconButton>
  </div>)
    } else {
            return (
    <div>
      <IconButton
          iconStyle={playIconStyle}
          style={playButtonStyle}
        >
          <FontIcon
            className="material-icons"
            onClick={handleToggleRun}
          >
            play_arrow</FontIcon>
        </IconButton>
  </div>)
    }

        
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
)(PlayButton);
