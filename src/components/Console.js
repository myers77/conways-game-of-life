import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton'
import Checkbox from 'material-ui/Checkbox';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { map } from 'ramda';

import * as Actions from '../actions';

const playIconStyle = {
  'font-size': '60px',
}

const playButtonStyle = {
  'height': '85px',
  'width': '85px',
}

const Console = ({ width, height, grid, actions }) => {
  const handleGameStateChange = () => {
    actions.runGameStep();
  }

  const handleToggleRun = () => {
    setInterval(() => {
      actions.runGameStep();
    }, 50);
    // requestAnimationFrame(handleToggleRun);
  }

  const handleRandomizeGrid = (height, width) => {
    let newGrid = new Array(height)
    newGrid = map(() => {
      return map(() => Math.round(Math.random()), new Array(width));
    }, newGrid.slice());
    actions.updateGrid(newGrid);
  }

  const handleClearGrid = (height, width) => {
    let newGrid = new Array(height)
    newGrid = map(() => {
      return map(() => 0, new Array(width));
    }, newGrid.slice());
    actions.updateGrid(newGrid);
  }

  const handleShowTrailsChecked = () => {
    actions.toggleShowTrails();
  }

  return (

    <div>
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
      </div>
      <div>
      <IconButton>
        <FontIcon
          className="material-icons"
          onClick={() => {
            handleRandomizeGrid(height, width)
          }}
        >shuffle</FontIcon>
      </IconButton>
      <IconButton>
        <FontIcon
          className="material-icons"
          onClick={() => {
            handleClearGrid(height, width)
          }}
        >clear</FontIcon>
      </IconButton>
      <IconButton>
        <FontIcon
          className="material-icons"
          onClick={handleGameStateChange}
        >skip_next</FontIcon>
      </IconButton>
      <Checkbox
        label="Show trails"
        onCheck={handleShowTrailsChecked}
       />
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
)(Console);
