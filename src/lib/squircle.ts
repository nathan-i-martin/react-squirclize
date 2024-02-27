import * as React from 'react';
import { useCoordinates, CoordinateGeneratorSettings } from './useCoordinates';
import useMeasure from 'react-use-measure';
import { mergeRefs } from 'react-merge-refs';
import { BorderStyle, Color, PixelLike, SquircleBorder, SquircleBorderAbsolute, SquircleProps, SquircleQuality } from './types';
import { Border } from './Border';

const styles = ["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset", "initial", "inherit"];

const findBestQuality = (width: number, height: number): SquircleQuality => {
    const area = width * height;
    if(area > (3000 * 3000)) return "half";
    if(area > (300 * 300)) return "quarter";
    return "lowest";
}

const serializeBorderString = (borderStyle: string): SquircleBorderAbsolute => {
    const border = {
        width: 1,
        color: "white",
        style: "solid"
    } as SquircleBorderAbsolute;

    const values = borderStyle.split(/\s(?![^(]*\))/);
    console.log(values);

    values.forEach(value => {
        if(styles.includes(value)) {
            border.style = (value as BorderStyle);
            return;
        }
        if(!isNaN(parseFloat(value)) || value.includes("px")) {
            border.width = (value as PixelLike);
            return;
        }
        border.color = (value as Color);
    });

    return border;
}

const resolveBorderProps = (style: any | undefined, border: SquircleBorder | undefined): SquircleBorderAbsolute | undefined => {
    if(border)
        return {
            width: border.width ?? 1,
            color: border.color ?? "white",
            style: border.style ?? "solid"
        } as SquircleBorderAbsolute;

    if(style == undefined)
        return undefined;

    if(style["borderWidth"] || style["borderColor"] || style["borderStyle"])
        return {
            width: style["borderWidth"] ?? 1,
            color: style["borderColor"] ?? "white",
            style: style["borderStyle"] ?? "solid"
        } as SquircleBorderAbsolute;

    if(style["border"])
        return serializeBorderString(style["border"] ?? "");

    return undefined;
}

const prepareStyle = (style: any | undefined, coordinates: {x: number, y: number}[] ): React.CSSProperties => {
    const clipPath = `polygon(${coordinates.map(c => `${c.x}% ${c.y}%`).join()})`;

    return {
        ...style,
        border: undefined,
        borderColor: undefined,
        borderWidth: undefined,
        borderStyle: undefined,
        clipPath
    };
}

const mutateProps = (props: SquircleProps, imports: { ref: any, bounds: any }) => {
    const { bounds } = imports;

    const clippingSettings = {
        radius: props.rounding ?? 0.4,
        quality: props.quality ?? findBestQuality(bounds.width, bounds.height),
        width: bounds.width,
        height: bounds.height
    } as CoordinateGeneratorSettings;
    const coordinates = React.useMemo(() => useCoordinates(clippingSettings),[clippingSettings]);

    const resolvedBorder = resolveBorderProps(props.style, props.border);

    const style = prepareStyle(props.style, coordinates);

    const ref = mergeRefs([imports.ref, props.ref])

    const children = React.createElement(React.Fragment, null, 
        resolvedBorder ? Border({ settings: resolvedBorder, coordinates, bounds }) : React.createElement(React.Fragment),
        props.children
    );

    const prepared = {
        ...props,
        style,
        ref,
        children
    } as SquircleProps;

    return {
        prepared,
        hasBorder: resolvedBorder != undefined
    }
}

const createSquircleComponent = (tagName: string) => {
    return (props: SquircleProps) => {
        const [ ref, bounds ] = useMeasure();

        const { prepared, hasBorder } = mutateProps(props, { ref, bounds });

        return React.createElement(tagName, prepared, prepared.children);
    };
};

const htmlElements = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'slot', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr'];

const squircle: { [key: string]: React.FC<SquircleProps> } = {};

htmlElements.forEach(element => {
    squircle[element] = createSquircleComponent(element);
});

export default squircle;