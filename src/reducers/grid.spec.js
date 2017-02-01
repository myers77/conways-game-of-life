import grid from './grid';

describe ('grid reducer', () => {
  it('should handle initial state', () => {
    expect(
      grid(undefined, {})
    ).toEqual([])
  })
})