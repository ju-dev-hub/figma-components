import _ from 'lodash';

export const getButtons = async (frames) => {

    try {
        let data = [];

        // Filter Button Components
        const filterButtons = await frames.filter(children => children.name === "Button Components")[0].children

        const buttons = _.map(filterButtons, (i, k) => {
            return filterButtons[k].children
        })

        _.map(buttons, (i, k) => {

            const label = buttons[k].filter(d => d.name === 'label')
            const background = buttons[k].filter(d => d.name === 'background')

            const boxShadow = background[0].effects[0].color
            const backgroundColor = background[0].fills[0].color

            const color = formatColor(boxShadow.r, boxShadow.g, boxShadow.b, boxShadow.a)
            const bgColor = formatColor(backgroundColor.r, backgroundColor.g, backgroundColor.b, backgroundColor.a)

            const labelX = label[0].absoluteBoundingBox.x
            const backgroundX = background[0].absoluteBoundingBox.x

            data.push({
                label: label[0].characters,
                typography: label[0].style,
                borderRadius: background[0].cornerRadius,
                boxShadow: {
                    color,
                    offset: background[0].effects[0].offset,
                    radius: background[0].effects[0].radius
                },
                padding: labelX - backgroundX,
                width: background[0].absoluteBoundingBox.width,
                height: background[0].absoluteBoundingBox.height,
                bgColor
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
            .button-${data[k].label.toLowerCase()}
                {
                    background-color: ${data[k].bgColor};
                    border-radius: ${data[k].borderRadius}px;                                        
                    box-shadow: 0px ${data[k].boxShadow.offset.y}px ${data[k].boxShadow.radius}px 0px ${data[k].boxShadow.color};
                    height: ${data[k].height}px;  
                    padding: 0px ${data[k].padding}px;               
                    font-family: '${data[k].typography.fontFamily}';
                    font-size: ${data[k].typography.fontSize}px;
                    font-weight: ${data[k].typography.fontWeight};
                    letter-spacing: ${data[k].typography.letterSpacing}px;
                    text-transform: ${data[k].typography.textCase.toLowerCase()}case;
                    text-align: ${data[k].typography.textAlignHorizontal.toLowerCase()};
                    border: none;
                    outline: none;
                    cursor: pointer;
                }
        `)
        return css
    })
    return css
}
