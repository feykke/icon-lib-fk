require('dotenv').config()
const svgo = require('@figma-export/transform-svg-with-svgo')
const capitalize = s => {
    const pageName = s.split('-')
    const capitalized = pageName.map(str => str.charAt(0).toUpperCase() + str.slice(1))
    return capitalized.join('')
}

const fileId = process.env.FILE_ID

const outputters = [ 
    require('@figma-export/output-components-as-svg')({
        output: './svg'
    }),
    require('@figma-export/output-components-as-svgstore')({
        getIconId: ({ componentName }) => componentName.toLowerCase(),
        output: './sprite'
    }),
    require('@figma-export/output-components-as-svgr')({
        getFileExtension: () => ".tsx",
        getComponentName: ({ componentName, pageName }) =>
            componentName + capitalize(pageName),
        getSvgrConfig: () => ({ typescript: true }),
        output: './src'
    })
]

const solidSVGOConfig = [
    // { name: 'removeDimensions', active: true },
    // { name: 'removeTitle', active: false },
    // { name: 'sortAttrs', params: { xmlnsOrder: 'alphabetical' } },
    // { name: 'removeAttrs', params: { attrs: 'fill' } },
    // { name: 'addAttributesToSVGElement', params: { attribute: { fill: "currentColor" } } }
    { name: 'preset-default', params: {
        overrides: {
            removeViewBox: false,
            removeDimensions: true,
            removeTitle: false,
            sortAttrs: true,
            removeAttrs: { attrs: 'fill' },
            addAttributesToSVGElement: { attribute: { fill: 'currentColor' } }
        }
    } }
]

const outlineSVGOConfig = [
    { name: 'removeDimensions', active: true },
    { name: 'removeTitle', active: false },
    { name: 'sortAttrs', params: { xmlnsOrder: 'alphabetical' } },
    { name: 'removeAttrs', params: { attrs: 'stroke' } },
    { name: 'addAttributesToSVGElement', params: { attribute: { stroke: "currentColor" } } }
]

const twoToneSVGOConfig = [
    { name: 'removeDimensions', active: true },
    { name: 'removeTitle', active: false },
    { name: 'sortAttrs', params: { xmlnsOrder: 'alphabetical' } },
    { name: 'removeAttrs', params: { attrs: ['stroke', 'fill'] } },
    { name: 'addAttributesToSVGElement', params: { attribute: { stroke: 'currentColor', fill: 'currentColor' } } }
]

module.exports = {
    commands: [
        [
            'components', {
                fileId,
                onlyFromPages: ["solid"],
                // transformers: [svgo({ multipass: true, plugins: solidSVGOConfig })],
                outputters,
            }
        ],
        [
            'components', {
                fileId,
                onlyFromPages: ["outline"],
                transformers: [svgo({ multipass: true, plugins: outlineSVGOConfig })],
                outputters,
            }
        ],
        [
            'components', {
                fileId,
                onlyFromPages: ["two-tone"],
                transformers: [svgo({ multipass: true, plugins: twoToneSVGOConfig })],
                outputters
            }
        ]
    ]
}