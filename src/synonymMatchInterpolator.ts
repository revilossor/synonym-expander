import { getSynonymMatchTree, SynonymMatchTree } from './getSynonymMatchTree'
import { SynonymMatch } from './SynonymMatcher'

function augment (
  inputs: string[],
  tree: SynonymMatchTree,
  offset = 0
): string[] {
  if (tree.children.length === 0) {
    return inputs
  }
  return tree.children.reduce((children: string[], child: SynonymMatchTree) => {
    const displacement = child.data.synonym.length - child.data.match.length
    const replacement = Array.from(child.data.synonym)

    const augmented = inputs.map(input => {
      const chars = Array.from(input)
      chars.splice(child.data.location + offset, child.data.length, ...replacement)
      return chars.join('')
    })

    return [
      ...children,
      ...augment(augmented, child, offset + displacement)
    ]
  }, [])
}

export function synonymMatchInterpolator (
  input: string,
  matches: SynonymMatch[]
): string[] {
  const tree = getSynonymMatchTree(matches)

  return augment([input], tree)
}
