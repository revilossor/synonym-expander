export class SynonymRegistry {
  private readonly inverted: Map<string, Set<number>>
  private store: Map<string, Set<string>>

  private identifier = 0

  public constructor () {
    this.inverted = new Map<string, Set<number>>()
    this.store = new Map<string, Set<string>>()
  }

  public register (...lists: string[][]): SynonymRegistry {
    lists.forEach(list => this.insert(list))
    this.generate()
    return this
  }

  public get keys (): string[] {
    return Array.from(this.inverted.keys())
  }

  public getSynonymous (of: string): string[] {
    const index = this.inverted.get(of)

    if (typeof (index) === 'undefined') {
      return []
    }

    const synonyms = this.store.get(this.getStoreKey(index))

    return typeof (synonyms) === 'undefined'
      ? []
      : Array.from(synonyms)
  }

  private insert (synonyms: string[]): void {
    const meanings = new Set<number>()

    const dirty = new Set<string>()

    synonyms.forEach(synonym => {
      const existing = this.inverted.get(synonym)

      if (typeof (existing) === 'undefined') {
        this.inverted.set(synonym, new Set<number>())
      } else {
        const updates = this.store.get(this.getStoreKey(existing))
        if (updates != null) {
          updates.forEach(synonym => dirty.add(synonym))
        }
        existing.forEach(meaning => meanings.add(meaning))
      }
    })

    if (meanings.size === 0) {
      meanings.add(++this.identifier)
    }

    ([...synonyms, ...Array.from(dirty)]).forEach(synonym => {
      this.inverted.set(synonym, meanings)
    })
  }

  private generate (): void {
    const entries = Array.from(this.inverted.entries())

    this.store = entries.reduce((store, [synonym, meanings]) => {
      const key = this.getStoreKey(meanings)
      const list = store.get(key) ?? new Set<string>()
      list.add(synonym)
      store.set(key, list)
      return store
    }, new Map<string, Set<string>>())
  }

  private getStoreKey (meanings: Set<number>): string {
    const sorted = Array.from(meanings)
      .sort((a, b) => a - b)

    return JSON.stringify(sorted)
  }
}
