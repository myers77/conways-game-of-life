import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Actions from '../actions';


const playIconStyle = {
  'fontSize': 72,
}

const playButtonStyle = {
  'height': 94,
  'width': 94,
}

const PlayButton = ({ isRunning, intervalId, animationSpeed, actions }) => {
  const handleToggleRun = () => {
    actions.toggleRun();
    if (intervalId) {
      clearInterval(intervalId);
      actions.setIntervalId(undefined);
    } else {
      const interval = setInterval(() => {
        actions.runGameStep();
      }, 500 - animationSpeed);
      actions.setIntervalId(interval)
    }
  }

  return (
    <div>
      <IconButton iconStyle={playIconStyle} style={playButtonStyle}>
        <FontIcon className="material-icons" onClick={handleToggleRun}>
          { isRunning ? 'pause' : 'play_arrow' }
        </FontIcon>
      </IconButton>
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
)(PlayButton);
