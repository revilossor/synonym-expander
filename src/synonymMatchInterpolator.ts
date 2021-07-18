// import { getSynonymMatchTree } from "./getSynonymMatchTree";
import { SynonymMatch } from './SynonymMatcher'

export function synonymMatchInterpolator (
  input: string,
  matches: SynonymMatch[]
): string[] {
  // const tree = getSynonymMatchTree(matches)
  // TODO walk the tree
  return [input]
}
