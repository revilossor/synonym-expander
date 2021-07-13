import { SynonymRegistry } from '../../src/SynonymRegistry'

describe('Given a SynonymRegistry instance', () => {
  it('Then the registry is empty', () => {
    const registry = new SynonymRegistry()
    expect(registry.keys).toEqual([])
  })

  describe('When I register a single list of synonyms', () => {
    const synonyms = ['it is', "it's"]

    it('Then the instance is returned for chaining', () => {
      const registry = new SynonymRegistry()
      expect(registry.register(synonyms)).toEqual(registry)
    })

    it('Then the registry includes each registered synonym', () => {
      const registry = new SynonymRegistry()
      registry.register(synonyms)

      expect(registry.keys).toEqual(synonyms)
    })

    it('Then each registered item is synonymous with each other registered item', () => {
      const registry = new SynonymRegistry()
      registry.register(synonyms)

      synonyms.forEach(synonym => {
        expect(registry.getSynonymous(synonym)).toEqual(synonyms)
      })
    })

    it('Then unregistered items are synonymous with nothing', () => {
      const registry = new SynonymRegistry()
      registry.register(synonyms)

      expect(registry.getSynonymous('the moon')).toEqual([])
    })
  })

  describe('When I register two lists of synonyms', () => {
    const first = ['1', 'one']
    const second = ['2', 'two']

    describe('And there is no common item in each list', () => {
      it('Then the registry includes the synonyms from each list', () => {
        const registry = new SynonymRegistry()

        registry.register(first, second)

        expect(registry.keys).toEqual([...first, ...second])
      })

      it('Then registered items are only synonymous with items from their own list', () => {
        const registry = new SynonymRegistry()

        registry.register(first)
        registry.register(second);

        ([first, second]).forEach(list => {
          list.forEach(synonym => {
            expect(registry.getSynonymous(synonym)).toEqual(list)
          })
        })
      })

      describe('And I then register a list of synonyms with a common item with both registered lists', () => {
        const third = ['3', 'three', first[0], second[0]]

        it('Then the registry includes the synonyms from each list', () => {
          const registry = new SynonymRegistry()

          registry.register(first, second)
          expect(registry.keys).toEqual([...first, ...second])

          const set = new Set([...first, ...second, ...third])
          const expected = Array.from(set)

          registry.register(third)

          expect(registry.keys).toEqual(expect.arrayContaining(expected))
          expect(registry.keys).toHaveLength(expected.length)
        })

        it('Then all items from all registered lists become synonymous', () => {
          const registry = new SynonymRegistry()

          registry.register(first, second)
          expect(registry.keys).toEqual([...first, ...second])

          const set = new Set([...first, ...second, ...third])
          const all = Array.from(set)

          expect(registry.getSynonymous(first[0])).not.toEqual(
            registry.getSynonymous(second[0])
          )

          registry.register(third);

          ([all]).forEach(list => {
            list.forEach(synonym => {
              expect(registry.getSynonymous(synonym)).toEqual(all)
            })
          })
        })
      })
    })

    describe('And there is an item that appears in both lists', () => {
      const common = 'thing'

      it('Then the registry includes the synonyms from each list', () => {
        const registry = new SynonymRegistry()

        registry.register(
          [...first, common],
          [...second, common]
        )

        expect(registry.keys).toEqual([...first, common, ...second])
      })

      it('Then the items from both lists are all synonymous', () => {
        const registry = new SynonymRegistry()

        registry.register(
          [...first, common],
          [...second, common]
        )

        const expected = [...first, common, ...second];

        ([first, second]).forEach(list => {
          list.forEach(synonym => {
            expect(registry.getSynonymous(synonym)).toEqual(expected)
          })
        })
      })
    })
  })
})
