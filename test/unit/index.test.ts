/* eslint-disable no-new */

import SynonymExpander from '../../src/index'
import { SynonymRegistry } from '../../src/SynonymRegistry'

jest.mock('../../src/SynonymRegistry')

console.log = jest.fn()

describe('When I construct a SynonymExpander with some synonym lists', () => {
  const synonyms = [
    ['nice', 'okay', 'fine'],
    ["it's", 'it is']
  ]

  it('Then a synonym registry is initialised and the lists registered', () => {
    new SynonymExpander(...synonyms)

    expect(SynonymRegistry).toHaveBeenCalled()
    expect(SynonymRegistry.prototype.register).toHaveBeenCalledWith(
      ...synonyms
    )
  })
})
