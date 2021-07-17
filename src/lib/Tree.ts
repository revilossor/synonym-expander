export class Tree<T> {
  private readonly members: Set<Tree<T>>

  public get children (): Array<Tree<T>> {
    return [...this.members.keys()]
  }

  public constructor (public data: T, public parent?: Tree<T>) {
    this.members = new Set<Tree<T>>()
  }

  public addChild (data: T): Tree<T> {
    const child = new Tree<T>(data, this)
    this.members.add(child)
    return child
  }
}
