export const defaults = {
  nodes: [],
  size: {
    height: 500,
    width: 960
  },
  ticked: (e : any) => {
    console.log('ticked', e)
  },
  keydown: (e : any) => {
    console.log('keydown', e)
  }
}
