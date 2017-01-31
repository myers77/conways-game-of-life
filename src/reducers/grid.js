import {
  UPDATE_GRID,
  RUN_GAME_STEP,
  TOGGLE_SHOW_TRAILS,
  TOGGLE_RUN,
  SET_INTERVAL_ID,
  SET_ANIMATION_SPEED,
} from '../actions';

const grid = (state, action) => {
  switch (action.type) {
    case UPDATE_GRID:
      return {
        ...state,
        grid: action.grid,
      }
    case RUN_GAME_STEP:
      let newCells = state.grid.map((arr) => {
        return arr.slice();
      })

      let newHistoryGrid = state.historyGrid.map((arr) => {
        return arr.slice();
      })

      for (let row = 1; row < state.height - 1; row++) {
        for (let col = 1; col < state.width - 1; col++) {
          let total = 0;

          total += state.grid[row - 1][col - 1];
          total += state.grid[row - 1][col];
          total += state.grid[row - 1][col + 1];
          total += state.grid[row][col - 1];
          total += state.grid[row][col + 1];
          total += state.grid[row + 1][col - 1];
          total += state.grid[row + 1][col];
          total += state.grid[row + 1][col + 1];
         
          switch (total) {
            case 2:
              newCells[row][col] = state.grid[row][col];
              break;
            case 3:
              newCells[row][col] = 1;
              break;
            default:
              newCells[row][col] = 0; //
          }

          if (newCells[row][col]) {
            newHistoryGrid[row][col] = 1;
          } else {
            newHistoryGrid[row][col] += 1;
          }
        }
      }

      // Stitch edges
      for (let l = 1; l < state.height - 1; l++) {
        newCells[l][0] = newCells[l][state.width - 3];
        newCells[l][state.width - 2] = newCells[l][1];
        newCells[0][l] = newCells[state.width - 3][l];
        newCells[state.width - 2][l] = newCells[1][l];
      }

      return {
        ...state,
        historyGrid: newHistoryGrid,
        grid: newCells,
      };
    case TOGGLE_SHOW_TRAILS:
      return {
        ...state,
        showTrails: !state.showTrails,
      }
    case TOGGLE_RUN:
      return {
        ...state,
        isRunning: !state.isRunning,
      }
    case SET_INTERVAL_ID:
      return {
        ...state,
        intervalId: action.interval,
      }
    case SET_ANIMATION_SPEED:
      return {
        ...state,
        animationSpeed: action.value,
      }
    default:
      return state;
  }
}

export default grid;
