import _ from 'lodash';

export const getInputs = async (frames) => {
    try {
        let data = [];

        // Filter Inputs Components
        const filterInputs = await frames.filter(children => children.name === "Input Components")[0].children

        const inputs = _.map(filterInputs, (i, k) => {
            return filterInputs[k].children
        })

        _.map(inputs, (i, k) => {
            const label = inputs[k].filter(d => d.name === 'label')
            const background = inputs[k].filter(d => d.name === 'background')

            const border = background[0].strokes[0].color
            const color = label[0].fills[0].color
            const labelY = label[0].absoluteBoundingBox.y
            const backgroundY = background[0].absoluteBoundingBox.y

            const borderColor = formatColor(border.r, border.g, border.b, border.a)
            const textColor = formatColor(color.r, color.g, color.b, color.a)

            data.push({
                characters: label[0].characters,
                textColor,
                style: label[0].style,
                cornerRadius: background[0].cornerRadius,
                border: {
                    strokeWeight: background[0].strokeWeight,
                    borderColor,
                    type: background[0].strokes[0].type,
                },
                padding: labelY - backgroundY,
                width: background[0].absoluteBoundingBox.width,
                height: background[0].absoluteBoundingBox.height,
            })
            return data
        })
        const css = formatCSS(data)

        return css

    } catch (error) {
        return error
    }
}

// covert float number to integer
const floatToInt = (float) => {
    return Math.round(float * 255);
}

// convert rgba into a string
const rgbaToString = (r, g, b, a) => {
    const rInt = floatToInt(r);
    const gInt = floatToInt(g);
    const bInt = floatToInt(b);
    return `rgba(${rInt},${gInt},${bInt},${a.toFixed(2)})`;
}

const formatColor = (r, g, b, a) => {
    return `${rgbaToString(r, g, b, a)}`;
}

const formatCSS = (data) => {
    let css = [];

    _.map(data, (i, k) => {
        css.push(`
            .input-${data[k].characters.toLowerCase()}            
                {
                    border-radius: ${data[k].cornerRadius}px;
                    border: ${data[k].border.strokeWeight}px ${data[k].border.type.toLowerCase()} ${data[k].border.borderColor};
                    height: ${data[k].height}px;
                    text-align: ${data[k].style.textAlignHorizontal.toLowerCase()};
                    padding: 0px ${data[k].padding}px;
                    color: ${data[k].textColor};
                    font-family: '${data[k].style.fontFamily}';
                    font-size: ${data[k].style.fontSize}px;
                    font-weight: ${data[k].style.fontWeight};
                    letter-spacing: ${data[k].style.letterSpacing}px;
                }

                ${data[k].characters.toLowerCase().includes('placeholder') ? `input[value=""]{
                    border: ${data[k].border.strokeWeight}px ${data[k].border.type.toLowerCase()} ${data[k].border.borderColor};
                    color: ${data[k].textColor};
                    opacity: ${data[k].opacity ? data[k].opacity : 1};
                }` : ''}               
            `)
        return css
    })
    return css
}
