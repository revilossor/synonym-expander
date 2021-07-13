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
    this.generateStore()
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
    const synonyms = this.store.get(JSON.stringify(Array.from(index))) // TODO dry, hash func...

    return (synonyms != null)
      ? Array.from(synonyms)
      : []
  }

  private insert (synonyms: string[]): void {
    const meanings = new Set<number>()

    synonyms.forEach(synonym => {
      const existing = this.inverted.get(synonym)
      typeof (existing) === 'undefined'
        ? this.inverted.set(synonym, new Set<number>())
        : existing.forEach(item => meanings.add(item))
    })

    if (meanings.size === 0) {
      meanings.add(++this.identifier)
    }

    synonyms.forEach(synonym => {
      this.inverted.set(synonym, meanings)
    })
  }

  private generateStore (): void {
    const entries = Array.from(this.inverted.entries())

    this.store = entries.reduce((store, [synonym, meanings]) => {
      const key = JSON.stringify(Array.from(meanings)) // TODO hash func
      const list = store.get(key) ?? new Set<string>()
      list.add(synonym)

      store.set(key, list)

      return store
    }, new Map<string, Set<string>>())
  }
}
