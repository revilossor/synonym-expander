import { SynonymRegistry } from '../../src/SynonymRegistry'
import { SynonymMatcher } from '../../src/SynonymMatcher'

describe('Given a SynonymMatcher for a SynonymRegistry', () => {
  const registry = new SynonymRegistry()
  registry.register(
    ['it is', "it's"],
    ['i am', "i'm"]
  )

  describe('When I find matches for a string', () => {
    describe('And there are no matches', () => {
      it('Then an empty array is returned', () => {
        const matcher = new SynonymMatcher(registry)
        expect(matcher.match('the moon')).toEqual([])
        expect(matcher.match("is notisn'tiami'm")).toEqual([])
        expect(matcher.match('this IS NOT a match')).toEqual([])
      })
    })

    describe('And there are some matches', () => {
      it('Then the expected match objects are returned', () => {
        const string = "i'm sure it's a good example"
        const matcher = new SynonymMatcher(registry)
        const expected = [
          {
            match: "i'm",
            location: 0,
            length: 3,
            synonym: 'i am'
          },
          {
            match: "i'm",
            location: 0,
            length: 3,
            synonym: "i'm"
          },
          {
            match: "it's",
            location: 9,
            length: 4,
            synonym: 'it is'
          },
          {
            match: "it's",
            location: 9,
            length: 4,
            synonym: "it's"
          }
        ]

        expect(matcher.match(string)).toEqual(expected)
      })
    })
  })
})
