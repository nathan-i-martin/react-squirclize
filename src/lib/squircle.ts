import * as React from 'react';
import { useCoordinates, CoordinateGeneratorSettings } from './useCoordinates.js';
import useMeasure, { RectReadOnly } from 'react-use-measure';
import { mergeRefs } from 'react-merge-refs';
import { Measurement, SquircleProps, SquircleQuality, SquircleSettings } from './types.js';
import Border from "./Border.js";
import { useMeasurements } from './resolver.js';

const findBestQuality = (width: number, height: number): SquircleQuality => {
    const area = width * height;
    if(area > (3000 * 3000)) return "half";
    if(area > (300 * 300)) return "quarter";
    return "lowest";
}

const style = (props: SquircleProps, coordinates: string) => {
    return {
        ...props.style,
        border: "hidden",
        borderRadius: "none",
        clipPath: `polygon(${coordinates})`
    };
}

const computeSquircle = (props: SquircleProps, imports: { ref: (element: HTMLOrSVGElement | null) => void, bounds: RectReadOnly }) => {
    const { bounds } = imports;
    const { quality, borderRadius, borderWidth, borderColor } = props.settings ?? {
        quality: 'lowest',
        borderRadius: "10px" as Measurement
    } as SquircleSettings;

    const clippingSettings = {
        radius: useMeasurements(borderRadius as Measurement),
        quality: quality ?? findBestQuality(bounds.width, bounds.height),
        width: bounds.width,
        height: bounds.height
    } as CoordinateGeneratorSettings;
    const coordinates = useCoordinates(clippingSettings);

    const borderSettings = borderWidth || borderColor ? {
        width: borderWidth ?? "1px",
        color: borderColor ?? "white"
    } : undefined;

    const children = React.createElement(React.Fragment, null,
        borderSettings ? Border({ settings: borderSettings, coordinates, bounds }) : React.createElement(React.Fragment),
        props.children
    );

    const prepared = {
        ...props,
        style: style(props, coordinates.map(c => `${c.x}% ${c.y}%`).join()),
        ref: mergeRefs([imports.ref, props.ref]),
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