import { getSynonymMatchTree } from '../../src/getSynonymMatchTree'

describe('When I get a synonym match tree for a list of matches', () => {
  describe('And the list is empty', () => {
    it('Then the tree has no children', () => {
      const tree = getSynonymMatchTree([])
      expect(tree.children).toHaveLength(0)
    })
  })

  describe('And the list contains some matches that dont overlap', () => {
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

      expect(tree.children[0].data.match).toBe("i'm")
      expect(tree.children[0].children[0].data.match).toBe("it's")
    })
  })

  describe('And the list contains some overlapping matches', () => {
    it('Then the expected tree is returned', () => {
      const matches = [
        {
          match: "it's",
          location: 9,
          length: 4,
          synonyms: ['it is', "it's"]
        },
        {
          match: "it's an overlap that starts before",
          location: 8,
          length: 2,
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
      expect(tree.children[0].children).toHaveLength(2)
      expect(tree.children[0].children[0].children).toHaveLength(0)
      expect(tree.children[0].children[1].children).toHaveLength(0)

      expect(tree.children[0].data.match).toBe("i'm")
      expect(tree.children[0].children[0].data.match).toBe("it's an overlap that starts before")
      expect(tree.children[0].children[1].data.match).toBe("it's")
    })
  })

  describe('And the list contains only overlapping matches', () => {
    it('Then the expected tree is returned', () => {
      const matches = [
        {
          match: 'start',
          location: 0,
          length: 5,
          synonyms: ['1', '2']
        },
        {
          match: 'beginning',
          location: 0,
          length: 9,
          synonyms: ['3', '4']
        },
        {
          match: 'go',
          location: 0,
          length: 13,
          synonyms: ['5', '6']
        }
      ]

      const tree = getSynonymMatchTree(matches)

      expect(tree.children).toHaveLength(3)

      expect(tree.children[0].data.match).toBe('start')
      expect(tree.children[1].data.match).toBe('beginning')
      expect(tree.children[2].data.match).toBe('go')
    })
  })

  // overlaps with children

  // overlaps
  // i am / not have / am not
  // i'm / not've / amn't
  // "i am not have"

  // i'm not have
  // i am not've
  // i am'nt have
  // i'm not've    <--- dont think this will work ATM
})
