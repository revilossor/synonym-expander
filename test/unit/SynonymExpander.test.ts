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
        const expected = [
          'some random input string',
          'some random test string',
          'some random example string'
        ]
        const actual = expander.expand(input)
        expect(actual).toEqual(expect.arrayContaining(expected))
        expect(actual).toHaveLength(expected.length)
      })
    })

    describe('When I expand a string that contains multiple synonyms', () => {
      it('Then I get the expected results', () => {
        const expander = new SynonymExpander(...synonyms)
        const input = 'test input string example'
        const expected = [
          'input input string input',
          'input input string test',
          'input input string example',
          'input test string input',
          'input test string test',
          'input test string example',
          'input example string input',
          'input example string test',
          'input example string example',
          'test input string input',
          'test input string test',
          'test input string example',
          'test test string input',
          'test test string test',
          'test test string example',
          'test example string input',
          'test example string test',
          'test example string example',
          'example input string input',
          'example input string test',
          'example input string example',
          'example test string input',
          'example test string test',
          'example test string example',
          'example example string input',
          'example example string test',
          'example example string example'
        ]
        const actual = expander.expand(input)
        expect(actual).toEqual(expect.arrayContaining(expected))
        expect(actual).toHaveLength(expected.length)
      })
    })

    describe('When I expand a string that contains overlapping synonyms', () => {
      it('Then I get the expected results', () => {
        const overlapping = [
          ['might not', "mightn't"],
          ['have not', "haven't"],
          ['might not have', "mightn't've"],
          ['might not have not', "mightn't've'nt"]
        ]
        const expander = new SynonymExpander(...overlapping)
        const input = 'I might not have not'
        const expected = [
          'I might not have not',
          "I might not haven't",
          "I mightn't have not",
          "I mightn't haven't",
          "I mightn't've not",
          "I mightn't've'nt"
        ]
        const actual = expander.expand(input)
        expect(actual).toEqual(expect.arrayContaining(expected))
        expect(actual).toHaveLength(expected.length)
      })
    })
  })

  // TODO merging synonyn sets
})
