import VFragments from 'vue-fragments'

export default {
  functional: true,

  props: {
    foreach: {
      type: Function,
      default: null,
    },

    type: {
      type: String,
      default: null,
    },

    filter: {
      type: Function,
      default: null,
    },

    limit: {
      type: Number,
      default: 0,    
      validator(val) { return val >= 0 }
    },

    wrap: {
      type: String,
      default: null,
    },
  },
  
  render(h, { props, children }) {
    let _children = children.concat();

    // trim text nodes
    _children = _children.filter(child => !!child.tag)

    // add props if there is none
    _children.forEach(child => { child.data = child.data || { attrs: {} } })

    // foreach by custom function
    if (props.foreach)
      _children.forEach((child, i) => props.foreach(child, i))
    
    // filter by type
    if (props.type)
      _children = _children.filter(child => child.tag.indexOf(props.type) !== -1)
    
    // filter by custom function
    if (props.filter)
      _children = _children.filter((child, i) => props.filter(child, i))

    // limit output
    if (props.limit > 0)
      _children = _children.slice(0, props.limit)
  
    // decorate
    if (props.wrap)
      _children = _children.map(child => h(props.wrap, null, [child]))


    return h(VFragments.component, null, _children)
  }
}
