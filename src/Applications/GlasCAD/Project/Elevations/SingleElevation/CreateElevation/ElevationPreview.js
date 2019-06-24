import React from 'react';

import {
    GroupingBox,
} from '../../../../../../components';

export default function ElevationPreview({
    elevation: {
        allContainers = [],
        // placedDetails = [],
        allFrames = [],
        roughOpening: {
            x = 0,
            y = 0,
        } = {},
        finishedFloorHeight,
    },
}) {
    return (
        <GroupingBox
            title="Elevation Preview"
            className="ElevationPreview"
        >
            <svg
                viewBox={`0 0 ${x} ${y + finishedFloorHeight}`}
                transform="scale(1, -1)"
            >
                {/* ROUGH OPENING */}
                {/* <rect
                    width={x}
                    height={y}
                    x={0}
                    y={finishedFloorHeight}
                    // fill="rgba(127, 191, 255, 0.25)"
                    fill="rgba(0, 0, 0, 0)"
                    stroke="black"
                /> */}
                {/* FINISHED FLOOR -- now in CSS */}
                {/* <path
                    id="finished-floor"
                    strokeWidth={5}
                    d={`M0,-5L${x},-5`}
                /> */}
                {/* CONTAINERS */}
                {allContainers.map(({ placement: { x, y, height, width }, refId }) => (
                    <rect
                        key={refId}
                        id={refId}
                        className="container"
                        x={x}
                        y={y + finishedFloorHeight}
                        height={height}
                        width={width}
                    />
                ))}
                {/* FRAMES */}
                {allFrames.map(({ placement: { x, y, height, width }, refId }) => (
                    <rect
                        key={refId}
                        id={refId}
                        className="frame"
                        x={x}
                        y={y + finishedFloorHeight}
                        height={height}
                        width={width}
                    />
                ))}
            </svg>
        </GroupingBox>
    );
}