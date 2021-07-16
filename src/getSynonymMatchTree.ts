import { Tree } from './lib/Tree'
import { SynonymMatch } from './SynonymMatcher'

export type SynonymMatchTree = Tree<SynonymMatch>

function byLocationAndLength (left: SynonymMatch, right: SynonymMatch): number {
  const hash = (match: SynonymMatch): number => (match.location * 1000000) + match.length
  return hash(left) - hash(right)
}

function isOverlapping (left: SynonymMatch, right?: SynonymMatch): boolean {
  if (right == null) { return false }
  return right.location >= left.location &&
    right.location <= left.location + left.length
}

function populateTree (
  tree: SynonymMatchTree,
  matches: SynonymMatch[],
  index = 0,
  addSiblings = true
): SynonymMatchTree {
  if (index >= matches.length) {
    return tree
  }
  const thisMatch = matches[index]

  const siblings: SynonymMatchTree[] = []

  if (addSiblings) {
    let nextMatch = matches[index + 1]
    while (isOverlapping(thisMatch, nextMatch)) {
      siblings.push(tree.addSibling(nextMatch))
      nextMatch = matches[index + siblings.length + 1]
    }
    siblings.forEach(sibling => {
      populateTree(sibling, matches, index + siblings.length + 1, false)
    })
  }

  const next = siblings.length > 0
    ? tree.addSibling(thisMatch)
    : tree.addChild(thisMatch)

  populateTree(
    next, matches, index + siblings.length + 1
  )

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
