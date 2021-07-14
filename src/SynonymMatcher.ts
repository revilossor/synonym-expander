import { SynonymRegistry } from './SynonymRegistry'

interface Match {
  source: string
  location: number
  length: number
  alternatives: string[]
}

export class SynonymMatcher {
  private readonly registry: SynonymRegistry

  constructor (registry: SynonymRegistry) {
    this.registry = registry
  }

  // private * search(string: string): IterableIterator<Match | undefined> {
  //   let index = 0
  //   const keys =
  //
  //
  //
  //   yield {
  //     source: 'string',
  //     location: 0,
  //     length: 0,
  //     alternatives: []
  //   }
  // }

  public match (string: string): Match[] {
    // for each key in registry
    // create expression
    // get all matches in string
    // build output
    return []
  }
}

/*
private getMatches(target: string, type: Type, model: Model): Array<Match> {
   const length = model[type].length
   const results = Array.from(
     target.matchAll(new RegExp(model[type], 'gi'))
   )
   return results.reduce((
     matches: Array<Match>,
     { index }: RegExpMatchArray
   ) => {
     if(index !== undefined) {
       matches.push({
         type,
         model,
         target,
         location: {
           start: index,
           length,
           end: index + length
         }
       })
     }
     return matches
   }, [])
 }

*/
