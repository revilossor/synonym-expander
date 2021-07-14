import { SynonymRegistry } from './SynonymRegistry'

interface Match {
  match: string
  location: number
  length: number
  synonyms: string[]
}

export class SynonymMatcher {
  private readonly registry: SynonymRegistry

  constructor (registry: SynonymRegistry) {
    this.registry = registry
  }

  public match (string: string): Match[] {
    const output = []
    for (const matches of this.search(string)) {
      output.push(...matches)
    }
    return output
  }

  private * search (string: string): IterableIterator<Match[]> {
    for (const key of this.registry.keys()) {
      const matches = Array.from(
        string.matchAll(this.getSearchExpression(key))
      )
      yield matches.reduce(
        this.getMatchReducer(key),
        []
      )
    }
  }

  private getSearchExpression (string: string): RegExp {
    return new RegExp(`\\b(${string})\\b`, 'gm')
  }

  private getMatchReducer (key: string): (
    output: Match[],
    match: RegExpMatchArray
  ) => Match[] {
    return (output, match) => {
      if (typeof (match.index) !== 'undefined') {
        output.push({
          match: key,
          location: match.index,
          length: key.length,
          synonyms: this.registry.getSynonymous(key)
        })
      }
      return output
    }
  }
}
