import React from 'react';

export default function FinishedFloor({
    finishedFloorHeight = 0,
}) {
    if (finishedFloorHeight < 1) return null;
    else return (
        <div
            id="finished-floor"
            style={{
                bottom: -finishedFloorHeight,
            }}
        />
        // <path
        //     d={`M-10000,${-finishedFloorHeight}L10000,${-finishedFloorHeight}`}
        //     stroke="black"
        //     strokeWidth={5}
        // />
    );
}