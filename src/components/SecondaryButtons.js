import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { map } from 'ramda';

import * as Actions from '../actions';

const SecondaryButtons = ({ width, height, grid, isRunning, intervalId, actions }) => {
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

  const handleClearGrid = (height, width) => {
    let newGrid = new Array(height)
    newGrid = map(() => {
      return map(() => 0, new Array(width));
    }, newGrid.slice());
    actions.updateGrid(newGrid);
  }

  return (
    <div>
      <IconButton>
            <FontIcon
              className="material-icons"
              onClick={() => {
                handleRandomizeGrid(height, width)
              }}
            >cached</FontIcon>
          </IconButton>
          <IconButton>
            <FontIcon
              className="material-icons"
              onClick={handleGameStateChange}
            >skip_next</FontIcon>
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
)(SecondaryButtons);
