import { synonymMatchInterpolator } from '../../src/synonymMatchInterpolator'

describe('When I interpolate an empty list of matches', () => {
  it('Then I get the input string only', () => {
    const input = 'some input string'
    expect(synonymMatchInterpolator(input, [])).toEqual([input])
  })
})

describe('When I interpolate a list of matches with no overlaps', () => {
  it('Then I get the expected augmented versions of the input string', () => {
    const input = 'some input string'
    const matches = [
      {
        match: 'input',
        location: 5,
        length: 5,
        synonym: 'input'
      },
      {
        match: 'input',
        location: 5,
        length: 5,
        synonym: 'test'
      },
      {
        match: 'input',
        location: 5,
        length: 5,
        synonym: 'example'
      },
      {
        match: 'string',
        location: 11,
        length: 6,
        synonym: 'string'
      },
      {
        match: 'string',
        location: 11,
        length: 6,
        synonym: 'sentence'
      }
    ]

    const expected = [
      'some input string',
      'some test string',
      'some example string',
      'some input sentence',
      'some test sentence',
      'some example sentence'
    ]

    const actual = synonymMatchInterpolator(input, matches)

    expect(actual).toHaveLength(expected.length)
    expect(actual).toEqual(expect.arrayContaining(expected))
  })
})

describe('When I interpolate matches that would produce dupilicte augmentations', () => {
  it('Then the duplicates are removed', () => {
    const input = 'I might not have not'
    const matches = [
      {
        match: 'might not have',
        length: 14,
        location: 2,
        synonym: 'might not have'
      },
      {
        match: 'might not have',
        length: 14,
        location: 2,
        synonym: "mightn't've"
      },
      { match: 'have not', length: 8, location: 12, synonym: 'have not' },
      { match: 'have not', length: 8, location: 12, synonym: "haven't" },
      { match: 'might not', length: 9, location: 2, synonym: 'might not' },
      { match: 'might not', length: 9, location: 2, synonym: "mightn't" }
    ]

    const expected = [
      'I might not have not',
      "I might not haven't",
      "I mightn't have not",
      "I mightn't haven't",
      "I mightn't've not"
    ]

    const actual = synonymMatchInterpolator(input, matches)

    expect(actual).toHaveLength(expected.length)
    expect(actual).toEqual(expect.arrayContaining(expected))
  })
})
