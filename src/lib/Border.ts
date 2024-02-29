import * as React from "react";
import { Color, Measurement } from "./types.js";
import { useMeasurements } from "./resolver.js";

const XYToSVG = (points: {x: number, y: number}[], width: number, height: number) => {
    const coordinates = points.map((c) => {
      const absoluteX = (c.x / 100) * width;
      const absoluteY = (c.y / 100) * height;
      return `${absoluteX},${absoluteY}`;
    });
  
    const pathString = `M${coordinates.join(' L')} Z`;
  
    return pathString;
}
  
export default (props: { settings: {width: Measurement, color: Color}, coordinates: {x: number, y: number}[], bounds: any }) => {
    const { bounds, coordinates } = props;
    const { width, color } = props.settings;

    const path = XYToSVG(coordinates, bounds.width, bounds.height);

    const thickness = useMeasurements(width);

    return React.createElement('svg', {
        width: `${bounds.width}px`,
        height: `${bounds.height}px`,
        viewBox: `0 0 ${bounds.width} ${bounds.height}`,
        style: {
            position: "absolute",
            left: "0px",
            top: "0px",
            zIndex: "-1",
        }
    },
        React.createElement('path', {
            d: path,
            fill: "none",
            stroke: color,
            strokeWidth: thickness,
        })
    );
}