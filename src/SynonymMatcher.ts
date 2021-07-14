import { SynonymRegistry } from './SynonymRegistry'

export interface SynonymMatch {
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

  public match (string: string): SynonymMatch[] {
    const output = []
    for (const matches of this.search(string)) {
      output.push(...matches)
    }
    return output
  }

  private * search (string: string): IterableIterator<SynonymMatch[]> {
    for (const key of this.registry.keys()) {
      const expression = this.getSearchExpression(key)
      const output = []
      for (const match of string.matchAll(expression)) {
        if (typeof (match.index) !== 'undefined') {
          output.push({
            match: key,
            location: match.index,
            length: key.length,
            synonyms: this.registry.getSynonymous(key)
          })
        }
      }
      yield output
    }
  }

  private getSearchExpression (string: string): RegExp {
    return new RegExp(`\\b(${string})\\b`, 'gm')
  }
}
