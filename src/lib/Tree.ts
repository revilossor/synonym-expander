export class Tree<T> {
  public children: Array<Tree<T>>

  public constructor (public data: T, public parent?: Tree<T>) {
    this.children = new Array<Tree<T>>()
  }

  public addChild (data: T): Tree<T> {
    const child = new Tree<T>(data, this)
    this.children.push(child)
    return child
  }
}
