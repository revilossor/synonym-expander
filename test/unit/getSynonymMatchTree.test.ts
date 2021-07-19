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
          synonym: 'it is'
        },
        {
          match: "i'm",
          location: 0,
          length: 3,
          synonym: 'i am'
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
          synonym: 'it is'
        },
        {
          match: "it's an overlap that starts before",
          location: 8,
          length: 2,
          synonym: 'before'
        },
        {
          match: "i'm",
          location: 0,
          length: 3,
          synonym: 'i am'
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
          synonym: '1'
        },
        {
          match: 'beginning',
          location: 0,
          length: 9,
          synonym: '2'
        },
        {
          match: 'go',
          location: 0,
          length: 2,
          synonym: '3'
        }
      ]

      const tree = getSynonymMatchTree(matches)

      expect(tree.children).toHaveLength(3)

      const neighbours = tree.children.map(({ data }) => data)
      expect(neighbours).toEqual(expect.arrayContaining(matches))

      tree.children.forEach(child => {
        expect(child.children).toHaveLength(0)
      })
    })
  })

  describe('And the list contains an overlapping match followed a non overlapping match', () => {
    it('Then the expected tree is returned', () => {
      const matches = [
        {
          match: 'left',
          location: 0,
          length: 5,
          synonym: '1'
        },
        {
          match: 'right',
          location: 0,
          length: 9,
          synonym: '2'
        },
        {
          match: 'both',
          location: 10,
          length: 13,
          synonym: '1 and 2'
        }
      ]

      const tree = getSynonymMatchTree(matches)

      expect(tree.children).toHaveLength(2)
      expect(tree.children[0].data.match).toBe('left')
      expect(tree.children[1].data.match).toBe('right')

      expect(tree.children[0].children).toHaveLength(1)
      expect(tree.children[0].children[0].data.match).toBe('both')

      expect(tree.children[1].children).toHaveLength(1)
      expect(tree.children[1].children[0].data.match).toBe('both')
    })
  })

  describe('And the list contains matches that join non overlapping matches', () => {
    it('Then the expected tree is returned', () => {
      // eg [ [ i am, 'i'm ], [ not have, not've ], [ am not, amn't ] ]
      // with the string "i am not have blah blah blah leaf"

      const matches = [
        {
          match: 'i am',
          location: 0,
          length: 4,
          synonym: '1'
        },
        {
          match: 'am not',
          location: 2,
          length: 6,
          synonym: '2'
        },
        {
          match: 'not have',
          location: 5,
          length: 8,
          synonym: '3'
        },
        {
          match: 'leaf',
          location: 20,
          length: 4,
          synonym: '4'
        }
      ]

      const tree = getSynonymMatchTree(matches)

      expect(tree.children).toHaveLength(2)
      expect(tree.children[0].data.match).toBe('i am')
      expect(tree.children[1].data.match).toBe('am not')

      expect(tree.children[0].children).toHaveLength(1)
      expect(tree.children[0].children[0].data.match).toBe('not have')
      expect(tree.children[0].children[0].children).toHaveLength(1)
      expect(tree.children[0].children[0].children[0].data.match).toBe('leaf')
      expect(tree.children[0].children[0].children[0].children).toHaveLength(0)

      expect(tree.children[1].children).toHaveLength(1)
      expect(tree.children[1].children[0].data.match).toBe('leaf')
      expect(tree.children[1].children[0].children).toHaveLength(0)
    })
  })
})
