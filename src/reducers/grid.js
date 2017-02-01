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

      const mod = (a, n) => {
        const rem = a % n;
        return rem >= 0 ? rem : n + rem;
      }

      for (let row = 0; row < state.height; row++) {
        for (let col = 0; col < state.width; col++) {
          let total = 0;
          
          total += state.grid[mod((row - 1), state.height)][mod((col - 1), state.width)];
          total += state.grid[mod((row - 1), state.height)][col];
          total += state.grid[mod((row - 1), state.height)][mod((col + 1), state.width)];
          total += state.grid[mod(row, state.height)][mod((col - 1), state.width)];
          total += state.grid[mod(row, state.height)][mod((col + 1), state.width)];
          total += state.grid[mod((row + 1), state.height)][mod((col - 1), state.width)];
          total += state.grid[mod((row + 1), state.height)][col];
          total += state.grid[mod((row + 1), state.height)][mod((col + 1), state.width)];
         
          switch (total) {
            case 2:
              newCells[row][col] = state.grid[row][col];
              break;
            case 3:
              newCells[row][col] = 1;
              break;
            default:
              newCells[row][col] = 0;
          }

          if (newCells[row][col]) {
            newHistoryGrid[row][col] = 1;
          } else {
            newHistoryGrid[row][col] += 1;
          }
        }
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
