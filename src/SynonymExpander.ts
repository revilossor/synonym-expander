import { SynonymRegistry } from './SynonymRegistry'
import { SynonymMatcher } from './SynonymMatcher'
import { synonymMatchInterpolator } from './synonymMatchInterpolator'

export class SynonymExpander {
  private readonly matcher: SynonymMatcher

  constructor (...synonyms: string[][]) {
    const registry = new SynonymRegistry()
    registry.register(...synonyms)

    this.matcher = new SynonymMatcher(registry)
  }

  public expand (input: string): string[] {
    const matches = this.matcher.match(input)
    return synonymMatchInterpolator(input, matches)
  }
}
