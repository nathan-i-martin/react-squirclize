import * as React from 'react';
import { SquircleQuality, useCoordinates } from './math.js';
import useMeasure from 'react-use-measure';
import { mergeRefs } from 'react-merge-refs';
import { CoordinateGeneratorSettings } from './math';

const findBestQuality = (width: number, height: number): SquircleQuality => {
    const area = width * height;
    if(area > (3000 * 3000)) return "half";
    if(area > (300 * 300)) return "quarter";
    return "lowest";
}

type SquircleProps = {
    /**
     * The quality of the rounding algorithm.
     * The value will define how many vertices are used while creating the squircle.
     * If this were set to 2 (even though that's not allowed) it would render a straight line.
     * 
     * If you leave this disabled, we'll try to automatically assign a good level of detail for you.
     */
    quality?: SquircleQuality;
    /**
     * The amount of rounding that the squircle should have.
     * The value should be a percentage in decimal form where 0 is a perfect square (no rounding) and 1 is a perfect circle (full rounding).
     */
    rounding?: number;
}
type Props = React.HTMLProps<HTMLElement> & SquircleProps & { children?: React.ReactNode };
const createSquircleComponent = (tagName: string) => {
    return (props: Props) => {
        const [ measureRef, bounds ] = useMeasure();

        const coordinateSettings = {
            radius: props.rounding ?? 0.4,
            quality: props.quality ?? findBestQuality(bounds.width, bounds.height),
            width: bounds.width,
            height: bounds.height
        } as CoordinateGeneratorSettings;
        const squircleCoordinates = React.useMemo(() => useCoordinates(coordinateSettings),[coordinateSettings]);
        const clipPath = `polygon(${squircleCoordinates})`;
        const style = { ...props.style, clipPath };
        const ref = mergeRefs([measureRef, props.ref])

        return React.createElement(tagName, { ...props, style, ref }, props.children);
    };
};

const htmlElements = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'slot', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr'];

const squircle: { [key: string]: React.FC<Props> } = {};

htmlElements.forEach(element => {
    squircle[element] = createSquircleComponent(element);
});

export default squircle;