/* 
 * Math functions originally by:
 * Author: James S
 * Source: Medium Article
 * URL: https://medium.com/@zubryjs/squircles-bringing-ios-7s-solution-to-rounded-rectangles-to-css-9fc35779aa65
 */

import * as React from "react";
import { SquircleQuality } from "./types";

const handleQuality = (quality: SquircleQuality): number => {
    const HIGHEST = 360;
    const LOWEST = 45;

    if(typeof quality === "number") {
        if(quality > HIGHEST) return HIGHEST;
        if(quality < LOWEST) return LOWEST;
        return quality;
    }
    if(quality == "highest") return HIGHEST;
    if(quality == "half") return HIGHEST * 0.5;
    if(quality == "quarter") return HIGHEST * 0.25;
    if(quality == "lowest") return LOWEST;
    return LOWEST;
}

/**
 * Takes in a pixel radius value and height/width of the viewbox to be used and converts the radius to the properly scaled value for the squircle.
 * @param radius Radius in pixel units.
 * @param height Height of the viewbox in pixels.
 * @param width Width of the viewbox in pixels.
 * @returns { x: number, y: number } Where x and y are both values to be used for calculating the polygon mask coordinates.
 */
const handlePixelRadius = (radius: { x: number, y: number }, width: number, height: number): { x: number, y: number } => ({
    x: radius.x / width,
    y: radius.y / height
});

const squircle = (radiusPixel: number, widthPixel: number, heightPixel: number, theta: number) => {
    if(radiusPixel <= 0) radiusPixel = 1;
    if(widthPixel <= 0) widthPixel = 1;
    if(heightPixel <= 0) heightPixel = 1;

    const skewRadius = {
        x: widthPixel > heightPixel ? radiusPixel - ((widthPixel / heightPixel) * 0.75) : radiusPixel,
        y: heightPixel > widthPixel ? radiusPixel - ((heightPixel / widthPixel) * 0.75) : radiusPixel
    }

    const radius = handlePixelRadius(skewRadius, widthPixel, heightPixel);

    // PAST THIS POINT, ALL VALUES SHOULD BE UNITLESS

    const coordinates = {
        x: Math.pow(Math.abs(Math.cos(theta)), 2 * radius.x) * 50 * Math.sign(Math.cos(theta)) + 50,
        y: Math.pow(Math.abs(Math.sin(theta)), 2 * radius.y) * 50 * Math.sign(Math.sin(theta)) + 50
    };

    const rounded = {
        x: Math.round(coordinates.x * 10) / 10,
        y: Math.round(coordinates.y * 10) / 10
    }

    return rounded;
}

const cropRadius = (settings: CoordinateGeneratorSettings) => {
    let smaller = settings.width > settings.height ? settings.height : settings.width;
    if(settings.radius > (smaller * 0.5)) return Math.floor(smaller * 0.5);
    return settings.radius;
}

export type CoordinateGeneratorSettings = {
    radius: number;
    width: number;
    height: number;
    quality: number;
}
export const useCoordinates = (settings: CoordinateGeneratorSettings) => React.useMemo(() => (settings: CoordinateGeneratorSettings): {x: number, y: number}[] => {
    if(settings.height == 0 || settings.width == 0) return [];
    if(settings.radius == 0) return [];

    settings.radius = cropRadius(settings);

    const coordinates = [];
    const iterations = handleQuality(settings.quality);
    for (let i = 0; i < iterations; i++) {
        const theta = i * Math.PI / (iterations * 0.5);
        coordinates[i] = squircle(settings.radius, settings.width, settings.height, theta);
    }

    return coordinates;
},[settings])(settings);