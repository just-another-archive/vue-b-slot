import VFragments from 'vue-fragments'

export default {
  functional: true,

  props: {
    offset: {
      type: Number,
      default: 0,
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

    each: {
      type: Function,
      default: null,
    },

    wrap: {
      type: [String, Function],
      default: null,
    },

    prerender: {
      type: Function,
      default: null,
    },
  },

  render(h, { props, children }) {
    let _children = children.concat();

    // trim text nodes
    _children = _children.filter(child => !!child.tag)

    // slide index and loop array
    _children = [].concat(
      _children.slice(props.offset),
      _children.slice(0, props.offset)
    )

    // add props if there is none
    _children
        .filter(child => !child.data)
        .forEach(child => child.data = { attrs: {} })

    // filter by type
    if (props.type)
      _children = _children.filter(child => child.tag.indexOf(props.type) !== -1)

    // filter by custom function
    if (props.filter)
      _children = _children.filter((child, i) => props.filter(child, i))

    // limit output
    if (props.limit > 0)
      _children = _children.slice(0, props.limit)

    // foreach by custom function
    if (props.each)
      _children.forEach((child, i) => props.each(child, i))

      // decorate
    if (props.wrap) {
      if (props.wrap instanceof Function)
        _children = _children.map((child, i) => props.wrap(h, child, i))
      else
        _children = _children.map(child => h(props.wrap, null, [child]))
    }

    // prerender hook
    if (props.prerender)
      props.prerender()

    return h(VFragments.component, null, _children)
  }
}
