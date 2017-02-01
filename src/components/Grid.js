import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';

import * as actions from '../actions';

const style = {
  height: 500,
  width: 500,
  margin: 32,
  textAlign: 'center',
  display: 'inline-block',
};

const canvasStyle = {
  imageRendering: 'pixelated',
};

class Grid extends Component {
  componentDidMount() {
    const ctx = document.getElementById('canvas').getContext('2d');
    this.draw(ctx);
  }

  componentDidUpdate() {
    const { showTrails } = this.props;
    const ctx = document.getElementById('canvas').getContext('2d');
    showTrails ? this.drawHistory(ctx, 5) : this.draw(ctx);
  }

  drawHistory(ctx, maxAge) {
    const { historyGrid, scale } = this.props;
    historyGrid.map((row, rowIndex) => {
      row.map((cell, cellIndex) => {
        ctx.fillStyle = `rgba(${Math.round(245 + 10 * (1 - cell/maxAge))},
                              ${Math.round(0 + 255 * (1 - cell/maxAge))},
                              ${Math.round(0 + 255 * (1 - cell/maxAge))},
                              1)`;
        ctx.fillRect(cellIndex * scale, rowIndex * scale, scale, scale);
      });
    });
  }

  handleClick(event) {
    const { scale, actions } = this.props,
      rect = document.getElementById('canvas').getBoundingClientRect(),
      x = Math.floor((event.clientX - rect.left) / scale),
      y = Math.floor((event.clientY - rect.top) / scale);
    actions.toggleClickedCell(x, y);
  }

  draw(ctx) {
    const { height, width, grid, scale } = this.props;
    ctx.clearRect(0, 0, height * scale, width * scale);
    grid.map((row, rowIndex) => {
      row.map((cell, cellIndex) => {
        if (cell) {
          ctx.fillStyle = "rgba(0,0,0,0.87)";
          ctx.fillRect(cellIndex * scale, rowIndex * scale, scale, scale);
        }
      });
    });
  }

  render() {
    return (
      <Paper style={style} zDepth={4}>
        <canvas
          id="canvas"
          width="500px"
          height="500px"
          style={canvasStyle}
          onClick={this.handleClick.bind(this)}>
        </canvas>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Grid);
