type RGB =       `rgb(${number}, ${number}, ${number})`;
type RGBA =     `rgba(${number}, ${number}, ${number}, ${number})`;
type HSL =       `hsl(${number}, ${number}%, ${number}%)`;
type HSLA =     `hsla(${number}, ${number}%, ${number}%, ${number})`;
type HEX =          `#${string}`;
type NAMES =    "black" | "silver" | "gray" | "white" | "maroon" | "red" | "purple" | "fuchsia" | "green" | "lime" | "olive" | "yellow" | "navy" | "blue" | "teal" | "aqua";

export type Color = RGB | RGBA | HSL | HSLA | HEX | NAMES;

export type PixelLike = number | `${number}px`;

export type BorderStyle = "none" | "hidden" | "dotted" | "dashed" | "solid" | "double" | "groove" | "ridge" | "inset" | "outset" | "initial" | "inherit";

export type Measurement =
    `${number}cm`   | // centimeters
    `${number}mm`   | // millimeters
    `${number}in`   | // inches (1in = 96px = 2.54cm)
    `${number}px`   | // pixels (1px = 1/96th of 1in)
    `${number}pt`   | // points (1pt = 1/72 of 1in)
    `${number}pc`   | // picas (1pc = 12pt)
//    `${number}em`   | // relative to font-size of the element
//    `${number}ex`   | // relative to the x-height of the current font
//    `${number}ch`   | // relative to the width of the "0" (zero)
//    `${number}rem`  | // relative to font-size of the root element
    `${number}vw`   | // relative to 1% of the width of the viewport
    `${number}vh`     // relative to 1% of the height of the viewport
//    `${number}vmin` | // relative to 1% of viewport's smaller dimension
//    `${number}vmax` | // relative to 1% of viewport's larger dimension
//    `${number}%`      // relative to the parent element
;

export type SquircleQuality = "highest" | "half" | "quarter" | "lowest" | number;

export type SquircleSettings = {
    /**
     * The quality of the rounding algorithm.
     * The value will define how many vertices are used while creating the squircle.
     * If this were set to 2 (even though that's not allowed) it would render a straight line.
     * 
     * If you leave this disabled, we'll try to automatically assign a good level of detail for you.
     */
    quality?: SquircleQuality;

    /**
     * The radius of the corners to make.
     */
    radius?: Measurement | "full";

    /**
     * The width of a border to add.
     */
    border_width?: Measurement;

    /**
     * The color to set the border to.
     */
    border_color?: Color;

    /**
     * Enables debug logging for this specific squircle.
     */
    debug?: boolean;

    /**
     * Disables the Squircle's resize observer.
     * If you set this to `true`, the Squircle will no-longer attempt to smartly resize itself as expected.
     * This setting is a good optimization if you have the height AND width of your Squircle specifically set.
     * 
     * As long as your height and width are ALWAYS specifically defined as absolute values (e.g. px, pt, pc), your Squircle will not break.
     * If you use non-absolute values (e.g. %, vw, vh, max-content, min-content, etc etc), you should leave this as false/unset.
     */
    frozen?: boolean;
}

export type VanillaProps = React.HTMLProps<HTMLElement> & { children?: React.ReactNode };
export type SquircleProps = VanillaProps & SquircleSettings;

export type BoundingBox = {
    width: number;
    height: number;
}

export type SquircleDebug = {
    bounds: BoundingBox;
    settings: SquircleSettings;
    polygonMask: {x: number, y: number}[];
}