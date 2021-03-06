import testMoveFrame from './test-move-frame';
import sample3Special from "../../../../../utils/sample-elevations/sample3-special.json";

//Sample3-special Test1
testMoveFrame({
    elevation: sample3Special,
    distance: 200,
    detailId: 2044,
    expectedDetails: [
        {
            firstContainerId: 807,
            secondContainerId: 810,
        },
        {
            firstContainerId: 807,
            secondContainerId: 809,
        },
        {
            firstContainerId: 802,
            secondContainerId: 807,
        },
        {
            firstContainerId: 801,
            secondContainerId: 807,
        },

    ],
    deletedDetails: [
        {
            firstContainerId: 805,
            secondContainerId: 810,
        },
        {
            firstContainerId: 802,
            secondContainerId: 805,
        },
        {
            firstContainerId: 805,
            secondContainerId: 809,
        },
        // These ones have errors
        {
            firstContainerId: 801,
            secondContainerId: 805,
        },
        // This one isn't deleted but put in to make sure no extra detail was added
        {
            firstContainerId: 807,
            secondContainerId: 808,
        },

    ],
    daylightOpenings: [
        {
            id: 807,
            dimensions: {
                width: 86.6666666666667,
                height: 280,
            }
        },
        {
            id: 805,
            dimensions: {
                width: 86.6666666666667,
                height: 50,
            }
        },
    ],
});
