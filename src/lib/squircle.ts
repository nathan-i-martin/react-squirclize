import * as React from 'react';
import { useCoordinates, CoordinateGeneratorSettings } from './useCoordinates.js';
import useMeasure, { RectReadOnly } from 'react-use-measure';
import { mergeRefs } from 'react-merge-refs';
import { BorderStyle, Color, PixelLike, SquircleBorderSettings, SquircleProps, SquircleQuality } from './types.js';
import { Border } from './Border.js';

const styles = ["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset", "initial", "inherit"];

const blockStyles = (style: CSSStyleDeclaration) => {
    style.border = "none";
    style.borderRadius = "none";
}

const findBestQuality = (width: number, height: number): SquircleQuality => {
    const area = width * height;
    if(area > (3000 * 3000)) return "half";
    if(area > (300 * 300)) return "quarter";
    return "lowest";
}

const serializeBorderString = (borderStyle: string): SquircleBorderSettings => {
    const border = {
        width: 1,
        color: "white",
        style: "solid"
    } as SquircleBorderSettings;

    const values = borderStyle.split(/\s(?![^(]*\))/);

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

const border = (settings: SquircleBorderSettings | undefined, coordinates: {x: number, y: number}[], bounds: any): React.ReactSVGElement | undefined => 
    settings != undefined ? Border({ settings, coordinates, bounds }) : undefined ;

const mutateStyle = (mutableStyle: CSSStyleDeclaration | undefined, coordinates: {x: number, y: number}[] ) => {
    if(!mutableStyle) return;

    mutableStyle.clipPath = `polygon(${coordinates.map(c => `${c.x}% ${c.y}%`).join()})`;

    blockStyles(mutableStyle);
}

const serializeStyle = (style: CSSStyleDeclaration | undefined) => {
    if(!style) return;

    let border = undefined;
    if(style["borderWidth"] || style["borderColor"] || style["borderStyle"])
        border = {
            width: style["borderWidth"] ?? 1,
            color: style["borderColor"] ?? "white",
            style: style["borderStyle"] ?? "solid"
        } as SquircleBorderSettings;
    if(style["border"]) border = serializeBorderString(style["border"] ?? "");

    const rounding = style["borderRadius"] != "" ? style["borderRadius"] : "10px";
    
    return {
        border: border ?? undefined,
        rounding
    }
}

const computeSquircle = (props: SquircleProps, imports: { ref: (element: HTMLOrSVGElement | null) => void, bounds: RectReadOnly }) => {
    const styleRef = React.useRef<undefined | HTMLDivElement>();
    const elementStyles = styleRef?.current?.style;

    const { bounds } = imports;

    const serialization = serializeStyle(elementStyles);

    const clippingSettings = {
        radius: serialization?.rounding ?? 10,
        quality: props.quality ?? findBestQuality(bounds.width, bounds.height),
        width: bounds.width,
        height: bounds.height
    } as CoordinateGeneratorSettings;
    const coordinates = useCoordinates(clippingSettings);

    mutateStyle(elementStyles, coordinates);

    const children = React.createElement(React.Fragment, null, 
        border(serialization?.border, coordinates, bounds) ?? React.createElement(React.Fragment),
        props.children
    );

    const prepared = {
        ...props,
        ref: mergeRefs([styleRef, imports.ref, props.ref]),
        children
    } as SquircleProps;

    return {
        prepared
    }
}

export default (props: SquircleProps) => {
    const [ ref, bounds ] = useMeasure();

    const { prepared } = computeSquircle(props, { ref, bounds });

    return React.createElement("div", prepared, prepared.children);
};