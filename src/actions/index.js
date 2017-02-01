export const UPDATE_GRID = 'UPDATE_GRID';
export const RUN_GAME_STEP = 'RUN_GAME_STEP';
export const TOGGLE_RUN = 'TOGGLE_RUN';
export const TOGGLE_SHOW_TRAILS = 'TOGGLE_SHOW_TRAILS';
export const SET_INTERVAL_ID = 'SET_INTERVAL_ID';
export const SET_ANIMATION_SPEED = 'SET_ANIMATION_SPEED';
export const TOGGLE_CLICKED_CELL = 'TOGGLE_CLICKED_CELL';

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

export const setIntervalId = (interval) => ({
  type: SET_INTERVAL_ID,
  interval,
})

export const setAnimationSpeed = (value) => ({
  type: SET_ANIMATION_SPEED,
  value,
})

export const toggleClickedCell = (x, y) => ({
  type: TOGGLE_CLICKED_CELL,
  x,
  y,
})
