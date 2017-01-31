import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Paper from 'material-ui/Paper';

import * as Actions from '../actions';

  const style = {
    height: 500,
    width: 500,
    margin: 32,
    textAlign: 'center',
    display: 'inline-block',
  };

class Grid extends Component {
  tick() {
    var ctx = document.getElementById("canvas").getContext("2d");
    this.draw(ctx);
  }

  draw(ctx) {
    const scale = 5;
    ctx.clearRect(0, 0, this.props.height * scale, this.props.width * scale);
    this.props.grid.map((row, rowIndex) => {
      row.map((cell, cellIndex) => {
        if (cell) {
          ctx.fillStyle="rgba(0,0,0,0.87)";
          ctx.fillRect(rowIndex * scale, cellIndex * scale, scale, scale);
        }
      });
    });
  }

  handleClick(e) {
    let canvas = ReactDOM.findDOMNode(this),
        rect = canvas.getBoundingClientRect(),
        pxX = e.clientX - rect.left - 2,
        pxY = e.clientY - rect.top - 2, 
        cWidth = this.props.app.state.width,
        cHeight = this.props.app.state.height,
        x, y;
    x = Math.floor( (pxX/rect.width)*cWidth);
    y = Math.floor( (pxY/rect.width)*cHeight);
    if (x >= 0 && y >= 0) {
      let i = (y*cWidth) + x,
          board = this.props.app.state.board.slice(),
          data = board[i] == 0 ? 1 : 0;
      board.splice (i,1,data);
      
      this.props.app.setState({board: board});
    }
  }

  componentDidMount() {
    this.tick();
  }

  drawHistory(ctx, grid, maxAge) {
    const scale = 5;
    // ctx.clearRect(0, 0, this.props.height * scale, this.props.width * scale);
    ctx.fillStyle='#1A237E'
    ctx.fillRect(0, 0, this.props.height * scale, this.props.width * scale)
    grid.map((row, rowIndex) => {
      row.map((cell, cellIndex) => {
        // if (cell < maxAge) {
          // ctx.fillStyle=`rgba(255,255,255,${1/cell})`
          // ctx.fillStyle=`rgba(${Math.round(245 + 10 * (1 - cell/maxAge))},
          //                     ${Math.round(255 * (1 - cell/maxAge))},
          //                     ${Math.round(87 + 168 * (1 - cell/maxAge))},
          //                     1)`;
          // ctx.fillStyle=`rgba(255,0,0,${1/cell})`
          ctx.fillStyle=`rgba(${Math.round(245+ 10 * (1 - cell/maxAge))},
                              ${Math.round(0 + 255 * (1 - cell/maxAge))},
                              ${Math.round(0 + 255 * (1 - cell/maxAge))},
                              1)`;
          ctx.fillRect(rowIndex * scale, cellIndex * scale, scale, scale);
        // }
      });
    });
  }

  componentDidUpdate() {
    var ctx = document.getElementById("canvas").getContext("2d");
    if (this.props.showTrails) {
      this.drawHistory(ctx, this.props.historyGrid, 5);
    } else {
      this.draw(ctx);
    }
  }
  
  render() {
    return (
      <Paper style={style} zDepth={4}>
        <canvas 
          id='canvas'
          width='500px'
          height='500px'
          onClick={this.handleClick}>
        </canvas>
      </Paper>
    )
  }
}

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Grid);
