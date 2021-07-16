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

  public addSibling (data: T): Tree<T> {
    if (typeof (this.parent) === 'undefined') {
      throw new Error('cannot add a sibling to a tree node with no parent ( is this the root? )')
    }
    return this.parent.addChild(data)
  }
}
