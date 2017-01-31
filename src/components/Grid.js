import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { map, addIndex } from 'ramda';

import * as Actions from '../actions';
import Cell from './Cell';

const rowStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
};

class Grid extends Component {
  tick() {
    var ctx = document.getElementById("canvas").getContext("2d");
    this.draw(ctx);
  }

  draw(ctx) {
    const scale = 5;
    var mapIndexed = addIndex(map);
    ctx.clearRect(0, 0, this.props.height * scale, this.props.width * scale);
    this.props.grid.map((row, rowIndex) => {
      row.map((cell, cellIndex) => {
        if (cell) {
          ctx.fillStyle="#000";
          ctx.fillRect(rowIndex * scale, cellIndex * scale, scale, scale);
        }
      });
    });
  }

  drawTransition(ctx, percentCompletion) {
    const scale = 5;
    var mapIndexed = addIndex(map);
    ctx.clearRect(0, 0, this.props.height * scale, this.props.width * scale);
    this.props.grid.map((row, rowIndex) => {
      row.map((cell, cellIndex) => {
        if (cell !== this.props.oldGrid[rowIndex][cellIndex]) {
          if (cell) {
            ctx.fillStyle=`rgba(0,0,0,${percentCompletion})`;
            ctx.fillRect(rowIndex * scale, cellIndex * scale, scale, scale);
          } else {
            ctx.fillStyle=`rgba(0,0,0,${1 - percentCompletion})`;
            ctx.fillRect(rowIndex * scale, cellIndex * scale, scale, scale);
          }
        } else if (cell) {
          ctx.fillStyle="#000";
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
    console.log(x, y);
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

  animateTransition(totalFrames, currentFrame, delay) {
    if (currentFrame <= totalFrames) {
      var ctx = document.getElementById("canvas").getContext("2d");
      this.drawTransition(ctx, currentFrame/totalFrames)
      setTimeout(() => { 
        this.animateTransition(totalFrames, currentFrame += 1, delay);
      }, delay);
    }
  }

  drawTrails(ctx, grid, opacity) {
    const scale = 5;
    var mapIndexed = addIndex(map);
    grid.map((row, rowIndex) => {
      row.map((cell, cellIndex) => {
        if (cell) {
          ctx.fillStyle=`rgba(0,0,0,${opacity})`;
          ctx.fillRect(rowIndex * scale, cellIndex * scale, scale, scale);
        }
      });
    });
  }

  componentDidUpdate() {
    var ctx = document.getElementById("canvas").getContext("2d");
    // this.animateTransition(this.props.animationFrames, 0, this.props.animationDelay);
    this.draw(ctx);
    this.drawTrails(ctx, this.props.oldOldGrid, 0.1);
    this.drawTrails(ctx, this.props.oldGrid, 0.3);
    this.drawTrails(ctx, this.props.grid, 1);
    // for (const i = 0; i < this.props.animationFrames; i++) {
    //   this.drawTransition(ctx);
    // }
    // setTimeout(() => { this.draw(ctx) }, 5000);
  }

  
    // for (var j = 1; j < gridHeight; j++) {
    //     for (var k = 1; k < gridWidth; k++) {
    //         if (theGrid[j][k] === 1) {
    //             ctx.fillRect(j, k, 1, 1);
    //               liveCount++;
                  
    //         }
    //     }
    // }

  render() {
    return (
      <canvas 
        id='canvas'
        width='500px'
        height='500px'
        onClick={this.handleClick}>
      </canvas>
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
