# Synonym Expander

Tool for expanding strings into every possible state given a set of word / phrase synonyms

Synonym sets are expressed as a list of lists.
You initialise the expander with synonyms, like this:

```typescript
import SynonymExpander from 'synonym-expander'

const synonyms = [
  ["nice", "okay", "fine"],
  ["it's", "it is"]
]

const expander = new SynonymExpander(...synonyms)
```

When you pass a string to the expanders **expand** function you will receive a list of all permutations of the string in which synonyms are replaced with each of their alternatives

```typescript
...

const input = "i think it is nice"

const result = expander.expand(input)

console.log(result)

/*
  i think it is nice
  i think it is okay
  i think it is fine
  i think it's nice
  i think it's okay
  i think it's fine
*/
```
