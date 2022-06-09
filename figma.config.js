require('dotenv').config()
const svgo = require('@figma-export/transform-svg-with-svgo')
const fileId = process.env.FILE_ID
const outputters = [ 
    require('@figma-export/output-components-as-svg')({ output: './' })
]

const solidSVGOConfig = [
    { name: 'removeDimensions', active: true },
    { name: 'sortAttrs', params: { xmlnsOrder: 'alphabetical' } },
    { name: 'removeAttrs', params: { attrs: 'fill' } },
    { name: 'addAttributesToSVGElement', params: { attribute: { fill: "currentColor" } } }
]

const outlineSVGOConfig = [
    { name: 'removeDimensions', active: true },
    { name: 'sortAttrs', params: { xmlnsOrder: 'alphabetical' } },
    { name: 'removeAttrs', params: { attrs: 'stroke' } },
    { name: 'addAttributesToSVGElement', params: { attribute: { stroke: "currentColor" } } }
]

const twoToneSVGOConfig = [
    { name: 'removeDimensions', active: true },
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
                transformers: [svgo({ multipass: true, plugins: solidSVGOConfig })],
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