import * as React from 'react';
import { useCoordinates, CoordinateGeneratorSettings } from './useCoordinates.js';
import { mergeRefs } from 'react-merge-refs';
import { BoundingBox, SquircleProps, SquircleQuality } from './types.js';
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
        position: "relative",
        border: "hidden",
        borderRadius: "0px",
        overflow: "hidden",
        clipPath: `polygon(${coordinates})`
    };
}

const computeSquircle = (props: SquircleProps, imports: { ref: React.LegacyRef<HTMLElement> | undefined, bounds: BoundingBox }) => {
    const { bounds } = imports;
    const { quality, radius, border_width, border_color } = props;

    const settings = {
        radius: useMeasurements(radius ?? "0px"),
        quality: quality ?? findBestQuality(bounds.width, bounds.height),
        width: bounds.width,
        height: bounds.height
    } as CoordinateGeneratorSettings;
    const coordinates = useCoordinates(settings);
    if(props.debug) console.log({bounds, settings, polygonMask: coordinates});

    const borderSettings = border_width || border_color ? {
        width: border_width ?? "1px",
        color: border_color ?? "white"
    } : undefined;

    const children = React.createElement(React.Fragment, null,
        borderSettings ? Border({ settings: borderSettings, coordinates, bounds }) : React.createElement(React.Fragment),
        props.children
    );

    const prepared = {
        ...props,
        style: style(props, coordinates.map(c => `${c.x}% ${c.y}%`).join()),
        ref: mergeRefs([props.ref, imports.ref]),
        children
    } as SquircleProps;

    return {
        prepared
    }
}

const useBounding = (): { bounds: BoundingBox, ref: React.LegacyRef<HTMLElement> | undefined } => {
    const [bounds, setBounds] = React.useState({width: 0, height: 0} as BoundingBox);
    const ref = React.useRef<HTMLDivElement>(null);

    const observer = new ResizeObserver(() => {
        if(!ref?.current) return;
        const { offsetWidth, offsetHeight } = ref.current;
        setBounds({ width: offsetWidth, height: offsetHeight });
    });      
    
    React.useEffect(() => {
        if(!ref?.current) return;
        const { offsetWidth, offsetHeight } = ref.current;
        setBounds({ width: offsetWidth, height: offsetHeight });

        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        }
    }, []);

    return { ref, bounds };
}

export default (props: SquircleProps) => {
    const { ref, bounds } = useBounding();

    const { prepared } = computeSquircle(props, { ref, bounds });

    return React.createElement("div", prepared, prepared.children);
};
