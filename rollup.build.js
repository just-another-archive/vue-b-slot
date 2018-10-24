const config = require('./package.json');

const rollup  = require('rollup'),
      minify  = require('rollup-plugin-minify-es'),
      babel   = require('rollup-plugin-babel'),
      resolve = require('rollup-plugin-node-resolve')

const source = {
  input: './src/index.js',
  plugins: [
    resolve(),
    babel({ exclude: 'node_modules/**' }),
    minify()
  ]
}

const umd = {
  file: config.main,
  format: 'umd',
  name: config.global,
}

const esm = {
  file: config.module,
  format: 'esm',
}

async function build() {
  const bundle = await rollup.rollup(source)

  ;[umd].forEach(build => {
    bundle.generate(build)
    bundle.write(build)
  })
}

build()
  .then(() => { console.log("👌") })
  .catch(err => console.error(err.message, err.stack))
