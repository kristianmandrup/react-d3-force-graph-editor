export const defaults = {
  nodes: [],
  size: {
    height: 500,
    width: 960
  },
  // e : Simulation < never, undefined >
  ticked: (): void => {
    console.log('ticked')
  },
  keydown: (e : any) => {
    console.log('keydown')
  }
}
