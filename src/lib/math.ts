/* 
 * Math functions originally by:
 * Author: James S
 * Source: Medium Article
 * URL: https://medium.com/@zubryjs/squircles-bringing-ios-7s-solution-to-rounded-rectangles-to-css-9fc35779aa65
 */

export type SquircleQuality = "highest" | "half" | "quarter" | "lowest" | number;

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

const calculateRadius = (radius: number) => {
    if(radius >= 0.9999) return 2; // Circle
    if(radius <= 0.0001) return 1; // Square

    const rangeMin = 2;
    const rangeMax = 10;
    let value = (rangeMax * radius) + rangeMin;

    if(radius > 0.9) value = value * 2;
    if(radius > 0.95) value = value * 4;
    if(radius > 0.97) value = value * 5;

    return value;
  }

const squircle = (radius: number, width: number, height: number, theta: number) => {
    const aspectRatio = width / height;

    const finalRadius = {
        x: width > height ? radius * aspectRatio : radius,
        y: height > width ? radius / aspectRatio : radius
    }
    
    const coordinates = {
        x: Math.pow(Math.abs(Math.cos(theta)), 2 / finalRadius.x) * 50 * Math.sign(Math.cos(theta)) + 50,
        y: Math.pow(Math.abs(Math.sin(theta)), 2 / finalRadius.y) * 50 * Math.sign(Math.sin(theta)) + 50
    };

    const rounded = {
        x: Math.round(coordinates.x * 10)/10,
        y: Math.round(coordinates.y * 10)/10
    }

    return `${rounded.x}%${rounded.y}%`;
}

export type CoordinateGeneratorSettings = {
    radius: number;
    width: number;
    height: number;
    quality: number;
}
export const useCoordinates = (settings: CoordinateGeneratorSettings) => {
    if(settings.height == 0 || settings.width == 0) return "";

    const radius = calculateRadius(settings.radius);
    if(radius == 0) return "";

    const coordinates = [];
    const iterations = handleQuality(settings.quality);
    for (let i = 0; i < iterations; i++) {
        const theta = i * Math.PI / (iterations * 0.5);
        coordinates[i] = squircle(radius, settings.width, settings.height, theta);
    }

    return coordinates.join();
}