import { useArray, ArrayState } from "./lib/ArrayState.js";
import { useBoolean, BooleanState } from "./lib/BooleanState.js";
import { GenericState, useGeneric } from "./lib/GenericState.js";
import { useMap, MapState } from "./lib/MapState.js";
import { useNumber, NumberState } from "./lib/NumberState.js";
import { Optional, useOptional } from "./lib/OptionalState.js";
import { useSet, SetState } from "./lib/SetState.js";
import { useString, StringState } from "./lib/StringState.js";

export const State = {
    useGeneric,
    useOptional,

    useArray,
    useSet,
    useMap,

    useNumber,
    useString,
    useBoolean,
};

export {
    BooleanState,
    GenericState,
    NumberState,
    StringState,
    ArrayState,
    SetState,
    MapState,
    Optional,
};