import { Tree } from '../../../src/lib/Tree'

describe('When I construct a Tree', () => {
  it('Then it has no children', () => {
    const tree = new Tree('root')
    expect(tree.data).toBe('root')
    expect(tree.children).toHaveLength(0)
  })

  describe('When I add a child by passing some data', () => {
    it('Then a new Tree node is added', () => {
      const tree = new Tree('root')
      const child = tree.addChild('child')

      expect(child).toBeInstanceOf(Tree)
      expect(child.data).toBe('child')
      expect(child.children).toHaveLength(0)

      expect(tree.children).toEqual([
        child
      ])
    })
  })
})
