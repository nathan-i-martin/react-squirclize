import { Measurement } from "./types";

/**
 * Resolves the passed measurement into a single number representing that measurment's equivalent in pixels.
 * @param meaurment The measurement to convert to pixels.
 */
export const useMeasurements = (measurement: Measurement): number => {
    const numeric = parseFloat(measurement); // Remove non-numeric characters
    if (measurement.includes("cm")) return numeric * 96 / 2.54;
    if (measurement.includes("mm")) return numeric * 96 / 25.4;
    if (measurement.includes("in")) return numeric * 96;
    if (measurement.includes("px")) return numeric;
    if (measurement.includes("pt")) return numeric * 96 / 72;
    if (measurement.includes("pc")) return numeric * 96 / 6;
    if (measurement.includes("em")) throw new Error("em is not currently supported by squircle!");
    if (measurement.includes("ex")) throw new Error("ex is not currently supported by squircle!");
    if (measurement.includes("ch")) throw new Error("ch is not currently supported by squircle!");
    if (measurement.includes("rem")) throw new Error("rem is not currently supported by squircle!");
    if (measurement.includes("vw")) return (numeric * 0.01) * window.innerWidth;
    if (measurement.includes("vh")) return (numeric * 0.01) * window.innerHeight;
    if (measurement.includes("vmin")) throw new Error("vmin is not currently supported by squircle!");
    if (measurement.includes("vmax")) throw new Error("vmax is not currently supported by squircle!");
    if (measurement.includes("%")) throw new Error("% is not currently supported by squircle!");
    throw new Error(`We were unable to parse the measurement value of ${measurement}}!`);
};