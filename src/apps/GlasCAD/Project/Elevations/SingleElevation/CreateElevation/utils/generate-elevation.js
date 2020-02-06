import _ from 'lodash';
import { defaultElevationInput } from "./elevation-input";

export default function generateElevation({
    height = defaultElevationInput.height,
    width = defaultElevationInput.width,
    startingBayQuantity = defaultElevationInput.startingBayQuantity,
    finishedFloorHeight = defaultElevationInput.finishedFloorHeight,
    sightline = defaultElevationInput.sightline,
    horizontals = defaultElevationInput.horizontals,
} = defaultElevationInput) {

    const bayWidth = (width - sightline * (startingBayQuantity + 1)) / startingBayQuantity;

    const lastContainerHeight = horizontals
        .reduce(((height, { distance }) => height - sightline - distance),
            height - sightline * 2);

    const containerHeights = horizontals
        .map(({ distance }) => distance)
        .concat(lastContainerHeight);

    const _elevationContainers = _.range(startingBayQuantity)
        .reduce((bays, i) => bays
            .concat(containerHeights
                .map((height, j) => ({
                    bay: i,
                    row: j,
                    id: i + 1 + j * startingBayQuantity,
                    original: i === 0 && j === 0,
                    daylightOpening: {
                        dimensions: {
                            width: bayWidth,
                            height,
                        }
                    },
                }))),
            []);

    const validContainerIds = _elevationContainers.reduce((ids, { id }) => ({ ...ids, [id]: id }), {});

    const _containerDetails = _elevationContainers
        .reduce((all, { id, row, bay }, _, { length }) => all
            .concat([
                // left
                bay === 0 && {
                    vertical: true,
                    firstContainerId: undefined,
                    secondContainerId: id,
                },
                // right
                {
                    vertical: true,
                    firstContainerId: id,
                    secondContainerId: bay === startingBayQuantity - 1 ?
                        undefined
                        :
                        id + 1
                },
                // top
                {
                    vertical: false,
                    firstContainerId: id,
                    secondContainerId: validContainerIds[id + startingBayQuantity],
                },
                // bottom
                row === 0 && {
                    vertical: false,
                    firstContainerId: undefined,
                    secondContainerId: id,
                },
            ]), [])
        .filter(Boolean)
        .map((detail, i) => ({
            id: i,
            ...detail,
        }));

    return {
        roughOpening: {
            width,
            height,
        },
        finishedFloorHeight,
        sightline,
        _elevationContainers,
        _containerDetails,
    };
}