import { getSynonymMatchTree } from '../../src/getSynonymMatchTree'

describe('When I get a synonym match tree for a list of matches', () => {
  describe('And the list is empty', () => {
    it('Then the tree has no children', () => {
      const tree = getSynonymMatchTree([])
      expect(tree.children).toHaveLength(0)
    })
  })

  describe('And the list some ( unsorted ) matches', () => {
    it('Then the expected tree is returned', () => {
      const matches = [
        {
          match: "it's",
          location: 9,
          length: 4,
          synonyms: ['it is', "it's"]
        },
        {
          match: "i'm",
          location: 0,
          length: 3,
          synonyms: ['i am', "i'm"]
        }
      ]

      const tree = getSynonymMatchTree(matches)

      expect(tree.children).toHaveLength(1)
      expect(tree.children[0].children).toHaveLength(1)
      expect(tree.children[0].children[0].children).toHaveLength(0)

      expect(tree.children[0].data).toBe(matches[1])
      expect(tree.children[0].children[0].data).toBe(matches[0])
    })
  })
})

// handles overlaps correctly - same index, overlap of length
// handles overlaps on first thing
