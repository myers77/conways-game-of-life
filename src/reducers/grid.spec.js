import grid from './grid';

describe('grid reducer', () => {
  it('should handle RUN_GAME_STEP', () => {
    const state = {
      grid: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      historyGrid: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    }
    expect(grid(state, { type: 'RUN_GAME_STEP' })).toEqual({
      grid: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      historyGrid: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
    })
  })

  it('should handle RUN_GAME_STEP', () => {
    const state = {
      grid: [[0, 0, 0], [0, 1, 0], [0, 0, 0]],
      historyGrid: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    }
    expect(grid(state, { type: 'RUN_GAME_STEP' })).toEqual({
      grid: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      historyGrid: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
    })
  })

  it('should handle RUN_GAME_STEP', () => {
    const state = {
      grid: [[1, 1, 0], [1, 1, 0], [0, 0, 0]],
      historyGrid: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    }
    expect(grid(state, { type: 'RUN_GAME_STEP' })).toEqual({
      grid: [[1, 1, 0], [1, 1, 0], [0, 0, 0]],
      historyGrid: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
    })
  })

  it('should handle RUN_GAME_STEP', () => {
    const state = {
      grid: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
      historyGrid: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    }
    expect(grid(state, { type: 'RUN_GAME_STEP' })).toEqual({
      grid: [[1, 0, 1], [0, 0, 0], [1, 0, 1]],
      historyGrid: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
    })
  })
})