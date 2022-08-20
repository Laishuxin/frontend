const { resolve } = require('path')
const logger = require('consola')

const args = require('minimist')(process.argv.slice(2))
const esbuild = require('esbuild')

const target = args._[0] || 'reactivity'
const format = args.f || 'global'
const pkg = require(resolve(__dirname, `../packages/${target}/package.json`))
const outputFormat = format.startsWith('global')
  ? 'iife'
  : format === 'cjs'
  ? 'cjs'
  : 'esm'
const outputFile = resolve(
  __dirname,
  `../packages/${target}/dist/${target}.${format}.js`,
)

logger.log('target: ', target)
logger.log('format: ', format)

esbuild
  .build({
    entryPoints: [resolve(__dirname, `../packages/${target}/src/index.ts`)],
    format: outputFormat,
    watch: {
      onRebuild(err) {
        logger.verbose('rebuilding error: ', err)
      },
    },
    treeShaking: true,
    sourcemap: true,
    bundle: true,
    platform: format === 'cjs' ? 'node' : 'browser',
    outfile: outputFile,
    tsconfig: resolve(__dirname, '../tsconfig.json'),
    globalName: pkg.buildOptions?.name,
  })
  .then(() => {
    logger.log('building..')
  })
