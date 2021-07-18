import { synonymMatchInterpolator } from '../../src/synonymMatchInterpolator'

describe('When I interpolate an empty list of matches', () => {
  it('Then I get the input string only', () => {
    const input = 'some input string'
    expect(synonymMatchInterpolator(input, [])).toEqual([input])
  })
})
