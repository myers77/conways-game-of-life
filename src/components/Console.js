import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { map } from 'ramda';

import * as Actions from '../actions';

const Console = ({ width, height, grid, actions }) => {
  // let input

  // const handleWidthChange = (e) => {
  //   actions.setGridSize({
  //     width: parseInt(e.target.value),
  //     height
  //   });
  // };

  // const handleHeightChange = (e) => {
  //   actions.setGridSize({
  //     width,
  //     height: parseInt(e.target.value)
  //   });
  // };

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

  return (
    <div>
      <IconButton tooltip='randomize'>
        <FontIcon
          className="material-icons"
          onClick={() => {
            handleRandomizeGrid(height, width)
          }}
        >shuffle</FontIcon>
      </IconButton>
      <IconButton tooltip='clear'>
        <FontIcon
          className="material-icons"
          onClick={() => {
            handleClearGrid(height, width)
          }}
        >clear</FontIcon>
      </IconButton>
      <IconButton tooltip='run'>
        <FontIcon
          className="material-icons"
          onClick={handleToggleRun}>
          play_arrow</FontIcon>
      </IconButton>
      <IconButton tooltip='step'>
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
)(Console);
