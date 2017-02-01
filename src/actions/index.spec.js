import * as actions from './index'

describe('gameOfLife actions', () => {
    it('updateGrid should create UPDATE_GRID action', () => {
    expect(actions.updateGrid([], [])).toEqual({
      type: 'UPDATE_GRID',
      grid: [],
      historyGrid: [],
    })
  })

    it('updateGrid should create UPDATE_GRID action', () => {
    expect(actions.updateGrid([0], [0])).toEqual({
      type: 'UPDATE_GRID',
      grid: [0],
      historyGrid: [0],
    })
  })

  it('runGameStep should create RUN_GAME_STEP action', () => {
    expect(actions.runGameStep()).toEqual({
      type: 'RUN_GAME_STEP',
    })
  })

    it('toggleRun should create TOGGLE_RUN action', () => {
    expect(actions.toggleRun()).toEqual({
      type: 'TOGGLE_RUN',
    })
  })

      it('toggleShowTrails should create TOGGLE_SHOW_TRAILS action', () => {
    expect(actions.toggleShowTrails()).toEqual({
      type: 'TOGGLE_SHOW_TRAILS',
    })
  })

        it('setIntervalId should create SET_INTERVAL_ID action', () => {
    expect(actions.setIntervalId(0)).toEqual({
      type: 'SET_INTERVAL_ID',
      interval: 0,
    })
  })

  it('setAnimationSpeed should create SET_ANIMATION_SPEED action', () => {
    expect(actions.setAnimationSpeed(500)).toEqual({
      type: 'SET_ANIMATION_SPEED',
      value: 500,
    })
  })

  it('toggleClickedCell should create TOGGLE_CLICKED_CELL action', () => {
    expect(actions.toggleClickedCell(0, 1)).toEqual({
      type: 'TOGGLE_CLICKED_CELL',
      x: 0,
      y: 1,
    })
  })
})