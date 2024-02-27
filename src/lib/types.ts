type RGB =       `rgb(${number}, ${number}, ${number})`;
type RGBA =     `rgba(${number}, ${number}, ${number}, ${number})`;
type HSL =       `hsl(${number}, ${number}%, ${number}%)`;
type HSLA =     `hsla(${number}, ${number}%, ${number}%, ${number})`;
type HEX =          `#${string}`;
type NAMES =    "black" | "silver" | "gray" | "white" | "maroon" | "red" | "purple" | "fuchsia" | "green" | "lime" | "olive" | "yellow" | "navy" | "blue" | "teal" | "aqua";

type Color = RGB | RGBA | HSL | HSLA | HEX | NAMES;

export type PixelLike = number | `${number}px`;

type BorderStyle = "none" | "hidden" | "dotted" | "dashed" | "solid" | "double" | "groove" | "ridge" | "inset" | "outset" | "initial" | "inherit";

export type SquircleBorder = {
    /**
     * The width of the border in pixels.
     * Defaults to `1px`.
     */
    width?: PixelLike;

    /**
     * The color of the border.
     * Defaults to `white`.
     * Supports all CSS color formats.
     */
    color?: Color;

    /**
     * The style of the border.
     * Defaults to `solid`.
     * Supports all CSS border styles.
     */
    style?: BorderStyle;
}

export type SquircleQuality = "highest" | "half" | "quarter" | "lowest" | number;

export type VanillaProps = React.HTMLProps<HTMLElement> & { children?: React.ReactNode };
export type SquircleProps = VanillaProps & {
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

    /**
     * Set the border for this Squircle.
     * Defaults to no border.
     */
    border?: SquircleBorder;
};