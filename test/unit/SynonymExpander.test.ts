import { SynonymExpander } from '../../src/SynonymExpander'

describe('Given a SynonymExpander', () => {
  describe('When there are no synonyms registered', () => {
    describe('When I expand a string', () => {
      it('Then I get the original string only back', () => {
        const expander = new SynonymExpander()
        const input = 'some random input string'
        expect(expander.expand(input)).toEqual([
          input
        ])
      })
    })
  })
  describe('When there are synonyms registered', () => {
    const synonyms = [
      ['input', 'test', 'example']
    ]

    describe('When I expand a string that doesnt contain a synonym', () => {
      it('Then I get the original string only back', () => {
        const expander = new SynonymExpander(...synonyms)
        const input = 'some random string'
        expect(expander.expand(input)).toEqual([
          input
        ])
      })
    })

    describe('When I expand a string that contains a single synonym', () => {
      it('Then I get the expected results', () => {
        const expander = new SynonymExpander(...synonyms)
        const input = 'some random input string'
        expect(expander.expand(input)).toEqual([
          'some random input string',
          'some random test string',
          'some random example string'
        ])
      })
    })
  })
})
