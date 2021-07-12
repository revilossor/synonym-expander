import unit from '../../src/index'

console.log = jest.fn()

describe('WHen I invoke the test function', () => {
  it('Then it says hello', () => {
    unit()
    expect(console.log).toHaveBeenCalledWith('hello world')
  })
})
