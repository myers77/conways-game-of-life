export const UPDATE_GRID = 'UPDATE_GRID';
export const RUN_GAME_STEP = 'RUN_GAME_STEP';
export const TOGGLE_RUN = 'TOGGLE_RUN';
export const TOGGLE_SHOW_TRAILS = 'TOGGLE_SHOW_TRAILS';

export const updateGrid = ( grid ) => ({
  type: UPDATE_GRID,
  grid,
});

export const runGameStep = () => ({
  type: RUN_GAME_STEP,
});

export const toggleRun = () => ({
  type: TOGGLE_RUN,
});

export const toggleShowTrails = () => ({
  type: TOGGLE_SHOW_TRAILS,
})
