export interface ISelected {
  link : ILink
  node : INode
}

export interface IMousedown {
  node : INode
  link : ILink
}

export interface IMouseup {
  node : INode
}

export interface ILine {
  attr : (name : string, value : any) => any
}

export interface IDrag {
  line : ILine
}

type DataHandler = (d : any) => any

// TODO: use type from d3
export interface ILink {
  attr : (name : string, handler : DataHandler) => any | never
  enter : () => any
  exit : () => any
  data : (links : ILink[]) => ILink
  classed : (name : string, handler : DataHandler) => any
}

// TODO: use type from d3
export interface INode {
  attr : (name : string, handler : DataHandler) => any | never
  data : (nodes : INode[]) => INode
  exit : () => any
  enter : () => any
  classed : (name : string, handler : DataHandler) => any
  x : number
  y : number
}

export interface ISimulation {
  start : () => void
}

export type ILinks = ILink[]
export type INodes = any[]
