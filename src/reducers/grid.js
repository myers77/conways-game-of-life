import {
  UPDATE_GRID,
  RUN_GAME_STEP,
  TOGGLE_SHOW_TRAILS,
  TOGGLE_RUN,
  SET_INTERVAL_ID,
  SET_ANIMATION_SPEED,
  TOGGLE_CLICKED_CELL,
} from '../actions';

const grid = (state, action) => {
  let newCells;

  switch (action.type) {
    case UPDATE_GRID:
      return {
        ...state,
        grid: action.grid,
        historyGrid: action.historyGrid,
      };
    case RUN_GAME_STEP:
      newCells = state.grid.map((arr) => {
        return arr.slice();
      });
      const newHistoryGrid = state.historyGrid.map((arr) => {
        return arr.slice();
      });

      // modulo function for toroidal array logic
      const mod = (a, n) => {
        const rem = a % n;
        return rem >= 0 ? rem : n + rem;
      };

      for (let row = 0; row < state.height; row += 1) {
        for (let col = 0; col < state.width; col += 1) {
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
      };
    case TOGGLE_RUN:
      return {
        ...state,
        isRunning: !state.isRunning,
      };
    case SET_INTERVAL_ID:
      return {
        ...state,
        intervalId: action.interval,
      };
    case SET_ANIMATION_SPEED:
      return {
        ...state,
        animationSpeed: action.value,
      };
    case TOGGLE_CLICKED_CELL:
      newCells = state.grid.map((arr) => {
        return arr.slice();
      });
      newCells[action.y][action.x] = !newCells[action.y][action.x];
      return {
        ...state,
        grid: newCells,
      };
    default:
      return state;
  }
};

export default grid;
