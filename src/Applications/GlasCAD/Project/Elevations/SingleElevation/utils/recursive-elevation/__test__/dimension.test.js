
import RecursiveElevation from "../elevation";

import '../../../../../../../../../public';

import sample6 from '../../../__test__/sample-elevations/sample6.json';
import sample3 from '../../../__test__/sample-elevations/sample3.json';

function testDimensions({
    elevation,
    verticalTrackCount,
    vertical = [],
    horizontalTrackCount,
    horizontal = [],
}) {
    describe(`Testing dimensions of elevation ${elevation.name}`, () => {
        const recursiveElevation = new RecursiveElevation(elevation);

        test(`Elevation has correct number of vertical dimension tracks`, () => {
            expect(recursiveElevation.verticalContainerDimensionTracks).toHaveProperty('length', verticalTrackCount);
        });

        test(`Elevation has correct number of horizontal dimension tracks`, () => {
            expect(recursiveElevation.horizontalContainerDimensionTracks).toHaveProperty('length', horizontalTrackCount);
        });

        function testTrack(vertical, track, i) {
            const actualTrack = recursiveElevation[`${vertical ? 'vertical' : 'horizontal'}DimensionTracks`][i];
            track.forEach(({ containerIds, dimension, offset }) => {
                test(`${vertical ? 'Vertical' : 'Horizontal'} dimension track #${i} contains a dimension with all container ids ${containerIds.join(', ')}, dimension ${dimension}, and offset ${offset}`, () => {
                    expect(actualTrack).toEqual(
                        // array of dimensions
                        expect.arrayContaining([
                            // dimension object
                            expect.objectContaining({
                                // container array
                                containers: expect.arrayContaining(
                                    // expected container ids
                                    containerIds.map(id => (
                                        // actual container
                                        expect.objectContaining({ id })
                                    ))
                                ),
                                dimension,
                                offset,
                            }),
                        ]),
                    );
                });
            });
        }

        vertical.forEach((track, i) => {
            testTrack(true, track, i);
        });

        horizontal.forEach((track, i) => {
            testTrack(false, track, i);
        });
    });
}

//Sample 6
testDimensions({
    elevation: sample6,
    verticalTrackCount: 2,
    horizontalTrackCount: 1,
    // vertical tracks
    vertical: [
        // track #1 -- not sorted - no order
        [
            {
                containerIds: [1379],
                dimension: 27.5,
                offset: 90.5,
            },
            {
                containerIds: [1376],
                dimension: 27.5,
                offset: 61,
            },
            {
                containerIds: [1372, 1374],
                dimension: 57,
                offset: 2,
            },
        ],
        // track #2
        [
            {
                containerIds: [1377],
                dimension: 57,
                offset: 61,
            },
            {
                containerIds: [1380, 1381],
                dimension: 27.5,
                offset: 31.5,
            },
            {
                containerIds: [1373, 1375],
                dimension: 27.5,
                offset: 2,
            },
        ],
    ],
    horizontal: [
        // track #1 - H
        [
            {
                containerIds: [1372, 1376, 1379],
                dimension: 42.5,
                offset: 2,
            },
            {
                containerIds: [1373, 1380, 1377],
                dimension: 42.5,
                offset: 46.5,
            },
            {
                containerIds: [1374],
                dimension: 42.5,
                offset: 91,
            },
            {
                containerIds: [1375, 1381],
                dimension: 42.5,
                offset: 135.5,
            },
        ]
    ]
});

//Sample 3
testDimensions({
    elevation: sample3,
    verticalTrackCount: 3,
    horizontalTrackCount: 1,
    // vertical tracks
    vertical: [
        // track #1 -- not sorted - no order
        [
            {
                containerIds: [803, 807, 811],
                dimension: 80,
                offset: 310,
            },
            {
                containerIds: [802],
                dimension: 120,
                offset: 180,
            },
            // {
            //     containerIds: [801],
            //     dimension: 57,
            //     offset: 2,
            // },
        ],
        // track #2
        // [
        //     {
        //         containerIds: [1377],
        //         dimension: 57,
        //         offset: 61,
        //     },
        //     {
        //         containerIds: [1380, 1381],
        //         dimension: 27.5,
        //         offset: 31.5,
        //     },
        //     {
        //         containerIds: [1373, 1375],
        //         dimension: 27.5,
        //         offset: 2,
        //     },
        // ],
    ],
    horizontal: [
        // track #1 - H
        // [
        //     {
        //         containerIds: [1372, 1376, 1379],
        //         dimension: 42.5,
        //         offset: 2,
        //     },
        //     {
        //         containerIds: [1373, 1380, 1377],
        //         dimension: 42.5,
        //         offset: 46.5,
        //     },
        //     {
        //         containerIds: [1374],
        //         dimension: 42.5,
        //         offset: 91,
        //     },
        //     {
        //         containerIds: [1375, 1381],
        //         dimension: 42.5,
        //         offset: 135.5,
        //     },
        // ]
    ]
});
