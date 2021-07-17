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
  index = 0
): SynonymMatchTree {
  if (index >= matches.length) {
    return tree
  }

  const thisMatch = matches[index]
  const thisChild = tree.addChild(thisMatch)

  // console.dir({
  //   index,
  //   match: thisMatch.match
  // })

  let neighbours = 0
  let nextMatch = matches[index + 1]

  while (isOverlapping(thisMatch, nextMatch)) {
    // console.log('['+index+'] overlap with ' + nextMatch.match)
    neighbours++
    populateTree(
      tree.addChild(nextMatch),
      matches,
      index + neighbours + 1
    )
    nextMatch = matches[index + neighbours + 1]
    // if(nextMatch) {
    //   console.log('checking [' + (index + neighbours + 1) + '] ' + nextMatch.match)
    // }
  }

  populateTree(
    thisChild,
    matches,
    index + neighbours + 1
  )

  return tree
}

export function getSynonymMatchTree (matches: SynonymMatch[]): SynonymMatchTree {
  const sorted = [...matches].sort(byLocationAndLength)
  // console.dir({ sorted })
  const root = new Tree({
    match: 'root',
    location: -1,
    length: -1,
    synonyms: []
  })
  return populateTree(root, sorted)
}
