# vue-b-slot
## what
some useful tooling for dealing w/ slot

## why
I find it very frustrating that we can't iterate on children from templating. For sure, we can do a lot with `v-for` or the `render(h)` function, but there are some common usecases in between which won't fit directives and where `render()` is overkill.

## how
I tried to build separate directives for each functionality (to encourage modularity) but directives cannot be used on `<slot />` and/or functional components, so the initial goal to write `<slot v-limit="5" />` was loss from the beginning ; also, there is no way to keep order within directive treatment which could result in a complicated use…

Instead, I'm proposing a functional component along with [vue-fragments](https://github.com/y-nk/vue-fragments) for a most-transparent DOM-wise implementation, at the cost of a slightly verbose use (basically `<b-slot><slot /></b-slot>`).

My only wish is that we could automatically bind the `<slot />` of a component to go in some prefered places, so it would be more auto-magic (like, writing `<b-slot />` would be resolved to `<b-slot><slot /></b-slot>` because of an hypothetical `canBeUsedToReceiveSlot: 'default'` property in `b-slot` component definition)

## use
- download the package `npm i -s vue-b-slot`
- install dependencies `npm i`
- And there you go :

  ```
  import BSlot from 'vue-b-slot'

  export const MyTop5s = {
    components: { BSlot },
    template: '<ol>
      <b-slot :limit="5" :wrap="li"><slot /></b-slot>
    </ol>
    '
  }
  ```

Components properties :

- `foreach : Function` : callback function to iterate on children vnodes (useful to set properties).
- `type : String` : a simple check on tag name, so you can control children passed to your component easily.
- `filter : Function` : a more powerful way to check on your children with a callback.
- `limit : uint` : will trim the number of children.
- `wrap : String` : will wrap the children around a given `wrap` element (useful for `li`)
