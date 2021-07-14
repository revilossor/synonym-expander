import { SynonymRegistry } from './SynonymRegistry'

export default class SynonymExpander {
  private readonly registry: SynonymRegistry

  constructor (...synonyms: string[][]) {
    this.registry = new SynonymRegistry()
    this.registry.register(...synonyms)
  }

  public expand (item: string): string[] {
    return [
      item
    ]
  }
}
