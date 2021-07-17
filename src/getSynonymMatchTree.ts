import { Tree } from './lib/Tree'
import { SynonymMatch } from './SynonymMatcher'

export type SynonymMatchTree = Tree<SynonymMatch>
type SynonymMatchList = SynonymMatch[]

function byLocationAndLength (left: SynonymMatch, right: SynonymMatch): number {
  const hash = (match: SynonymMatch): number => (match.location * 1000000) + match.length
  return hash(left) - hash(right)
}

function isOverlapping (left: SynonymMatch, right: SynonymMatch): boolean {
  const leftEnd = left.location + left.length
  const rightEnd = right.location + right.length

  const onLeft = right.location >= left.location &&
    right.location <= leftEnd
  const onRight = rightEnd >= left.location &&
    rightEnd <= leftEnd
  return onLeft || onRight
}

function determineChildren (matches: SynonymMatchList): [ SynonymMatchList, SynonymMatchList ] {
  const tuple: [SynonymMatchList, SynonymMatchList] = [[], []]
  return matches.reduce(
    ([children, remaining], match) => {
      isOverlapping(match, matches[0])
        ? children.push(match)
        : remaining.push(match)
      return [children, remaining]
    },
    tuple
  )
}

function populateTree (
  tree: SynonymMatchTree,
  matches: SynonymMatch[]
): SynonymMatchTree {
  if (matches.length === 0) {
    return tree
  }

  const [children, remaining] = determineChildren(matches)

  children.forEach(match => {
    populateTree(
      tree.addChild(match),
      remaining.filter(
        item => !isOverlapping(match, item)
      )
    )
  })

  return tree
}

export function getSynonymMatchTree (matches: SynonymMatch[]): SynonymMatchTree {
  const sorted = [...matches].sort(byLocationAndLength)
  const root = new Tree({
    match: 'root',
    location: -1,
    length: -1,
    synonyms: []
  })
  return populateTree(root, sorted)
}
