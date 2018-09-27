export interface ISelected {
  link : ILink | null
  node : INode | null
}

export interface IMousedown {
  node : INode
  link : ILink
}

export interface IMouseup {
  node : INode
}

export interface ILine {
  attr : (name : string, value : string) => any
}

export interface IDrag {
  line : ILine
}

// TODO: use type from d3
export interface ILink {
  enter : () => any
  exit : () => any
  data : (links : ILink[]) => ILink
  classed : (name : string, handler : (d : any) => any) => any
}

// TODO: use type from d3
export interface INode {
  data : (nodes : INode[]) => INode
  exit : () => any
  x : number
  y : number
}

export type ILinks = ILink[]
export type INodes = any[]
