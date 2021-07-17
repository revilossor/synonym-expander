import { SynonymRegistry } from './SynonymRegistry'
import { SynonymMatcher } from './SynonymMatcher'

export class SynonymExpander {
  private readonly matcher: SynonymMatcher

  constructor (...synonyms: string[][]) {
    const registry = new SynonymRegistry()
    registry.register(...synonyms)

    this.matcher = new SynonymMatcher(registry)
  }

  public expand (item: string): string[] {
    // const matches = this.matcher.match(item)
    // TODO interpolator..... takes matches, builds tree, does replaces, returns strings.
    return [
      item
    ]
  }
}
