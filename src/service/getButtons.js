import _ from 'lodash';

export const getButtons = async (frames) => {

    try {
        let c, s = [];

        // Filter Button Components
        const buttons = await frames.filter(children => children.name === "Button Components")[0].children

        _.map(buttons, (i, k) => {

            const component = buttons.filter(d => d.type === 'COMPONENT')

            const componentSet = buttons.filter(d => d.type === 'COMPONENT_SET')

            if (component) {
                c = handleComponent(component)
            }
            s = handleComponentSet(componentSet)
        })

        return formatCSS(_.concat(c, s))

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

const formatCSS = (d) => {
    let css = [];

    _.map(d, (i, k) => {
        css.push(`
            .button-${d[k].label}
                {
                    color: ${d[k].color};
                    background-color: ${d[k].backgroundColor};
                    border-radius: ${d[k].borderRadius}px;                                        
                    box-shadow: 0px ${d[k].boxShadow.offset}px ${d[k].boxShadow.radius}px 0px ${d[k].boxShadow.boxShadowColor};
                    height: ${d[k].height}px;
                    padding: 0px ${d[k].padding}px;               
                    font-family: '${d[k].typography.fontFamily}';
                    font-size: ${d[k].typography.fontSize}px;
                    font-weight: ${d[k].typography.fontWeight};
                    letter-spacing: ${d[k].typography.letterSpacing}px;
                    text-transform: ${d[k].typography.textCase.toLowerCase()}case;
                    text-align: ${d[k].typography.textAlignHorizontal.toLowerCase()};
                    border: none;
                    outline: none;
                    cursor: ${d[k].label.includes('disabled') ? 'not-allowed' : 'pointer'};

                    &:hover{
                        background-color: ${d[k].backgroundColorHover ? d[k].backgroundColorHover : d[k].backgroundColor};
                        color: ${d[k].colorHover ? d[k].colorHover : d[k].color};
                    }
                }
        `)
        return css
    })
    return css
}

const handleComponent = (c) => {
    let data = [];

    _.map(c, (i, k) => {
        const boxShadow = c[k].effects[0].color
        const bgColor = c[k].backgroundColor
        const txtColor = c[k].children[0].fills[0].color

        const color = formatColor(txtColor.r, txtColor.g, txtColor.b, txtColor.a) || ''
        const boxShadowColor = formatColor(boxShadow.r, boxShadow.g, boxShadow.b, boxShadow.a) || ''
        const backgroundColor = formatColor(bgColor.r, bgColor.g, bgColor.b, bgColor.a) || ''

        data.push({
            color,
            label: c[k].children[0].characters,
            typography: c[k].children[0].style,
            borderRadius: c[k].cornerRadius,
            boxShadow: {
                boxShadowColor,
                offset: c[k].effects[0].offset.y,
                radius: c[k].effects[0].radius
            },
            height: c[k].absoluteBoundingBox.height,
            backgroundColor,
            opacity: c[k].opacity || 1,
            padding: c[k].horizontalPadding
        })
        return data
    })
    return data
}

const handleComponentSet = (c) => {
    let data = [];

    _.map(c, (i, k) => {

        // Button
        const button = c[k].children.filter(d => d.name.includes('button'))

        const boxShadow = button[0].effects[0].color
        const txtColor = button[0].children[0].fills[0].color
        const bgColor = button[0].backgroundColor

        const color = formatColor(txtColor.r, txtColor.g, txtColor.b, txtColor.a) || ''
        const backgroundColor = formatColor(bgColor.r, bgColor.g, bgColor.b, bgColor.a) || ''
        const boxShadowColor = formatColor(boxShadow.r, boxShadow.g, boxShadow.b, boxShadow.a) || ''

        // Hover
        const buttonHover = c[k].children.filter(d => d.name.includes('hover'))

        const txtColorHover = buttonHover[0].children[0].fills[0].color
        const bgColorHover = buttonHover[0].background[0].color

        const colorHover = formatColor(txtColorHover.r, txtColorHover.g, txtColorHover.b, txtColorHover.a) || ''
        const backgroundColorHover = formatColor(bgColorHover.r, bgColorHover.g, bgColorHover.b, bgColorHover.a) || ''

        data.push({
            color,
            label: button[0].children[0].characters,
            typography: button[0].children[0].style,
            borderRadius: button[0].cornerRadius,
            boxShadow: {
                boxShadowColor,
                offset: button[0].effects[0].offset.y,
                radius: button[0].effects[0].radius
            },
            height: button[0].absoluteBoundingBox.height,
            backgroundColor,
            opacity: button[0].opacity || 1,
            padding: button[0].horizontalPadding,
            colorHover,
            backgroundColorHover
        })
        return data
    })
    return data
}

