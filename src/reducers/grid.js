import {
  UPDATE_GRID,
  RUN_GAME_STEP,
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
        }
      }

      // Stitch edges
      for (let l = 1; l < state.height - 1; l++) {
        newCells[l][0] = newCells[l][state.height - 3];
        newCells[l][state.height - 2] = newCells[l][1];
        newCells[0][l] = newCells[state.height - 3][l];
        newCells[state.height - 2][l] = newCells[1][l];
      }

      return {
        ...state,
        oldOldGrid: state.oldGrid,
        oldGrid: state.grid,
        grid: newCells,
      };
    default:
      return state;
  }
}

export default grid;
