import { ImperialValue } from "../../../../../../../utils";

export const measureFromOptions = [
    // "Rough Opening (Bottom)",
    "Previous Horizontal (Top)",
    // "Previous Horizontal (Bottom)",
];

export const measureToOptions = [
    // "Horizontal (Top)",
    "Horizontal (Bottom)",
];

export const defaultHorizontal = {
    distance: 32,
    from: measureFromOptions[0].value,
    to: measureToOptions[0].value,
};

export const defaultElevationInput = {
    verticalLock: true,
    horizontalLock: true,
    verticalRoughOpening: 120,
    horizontalRoughOpening: 38,
    verticalMasonryOpening: true,
    horizontalMasonryOpening: true,
    startingBayQuantity: 1,
    finishedFloorHeight: 0,
    horizontals: [defaultHorizontal],
};
