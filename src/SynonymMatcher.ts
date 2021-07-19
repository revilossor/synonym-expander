import { SynonymRegistry } from './SynonymRegistry'

export interface SynonymMatch {
  match: string
  location: number
  length: number
  synonym: string
}

export class SynonymMatcher {
  private readonly registry: SynonymRegistry

  public constructor (registry: SynonymRegistry) {
    this.registry = registry
  }

  public match (string: string): SynonymMatch[] {
    const output = []
    for (const matches of this.search(string)) {
      output.push(...matches)
    }
    return output
  }

  private toSynonymMatches (match: RegExpMatchArray, key: string): SynonymMatch[] {
    if (typeof (match.index) === 'undefined') {
      return []
    }
    const location = match.index
    const synonyms = this.registry.getSynonymous(key)
    return synonyms.map(synonym => ({
      match: key,
      length: key.length,
      location,
      synonym
    }))
  }

  private * search (string: string): IterableIterator<SynonymMatch[]> {
    for (const key of this.registry.keys()) {
      const expression = this.getSearchExpression(key)
      const output = []
      for (const match of string.matchAll(expression)) {
        output.push(...this.toSynonymMatches(match, key))
      }
      yield output
    }
  }

  private getSearchExpression (string: string): RegExp {
    return new RegExp(`\\b(${string})\\b`, 'gm')
  }
}
