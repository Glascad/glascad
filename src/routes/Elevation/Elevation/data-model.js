
export default {
    elevation: {
        nodeId: "sldkfjsdlkfjsldjflskjdf",
        id: 1,
        name: "Elevation 1",
        hzRO: 300,
        vtRO: 150,
        sightline: 10,
        elevationContainers: [
            {
                nodeId: "sldkfjsldkfjlskdjflskdjflskdfj",
                elevationId: 1,
                containerId: 1,
                container: {
                    nodeId: "weoiuweoiruwoieruwoeiurwoiru",
                    id: 1,
                    DLO: (300 - (15 * 4)) / 3,
                    infill: undefined,
                    containers: [
                        {
                            nodeId: "oeisfodkwjkoefksdjfkksdjfowjefoksdjkf",
                            id: 4,
                            parentContainerId: 1,
                            DLO: 50,
                            infill: "glass",
                            bottomFrameId: 1,
                            leftFrameId: 2,
                            topFrameId: 6,
                            rightFrameId: 5,
                            fill:"yellow",
                        },
                        {
                            nodeId: "lskdjfwoiejklfweoif",
                            id: 5,
                            parentContainerId: 1,
                            DLO: undefined,
                            infill: "glass",
                            bottomFrameId: 6,
                            leftFrameId: 2,
                            topFrameId: 3,
                            rightFrameId: 5,
                            fill:"orange",
                        },
                    ],
                },
            },
            {
                nodeId: "sldkjsldkfjlskfjslkfjewifj",
                elevationId: 1,
                containerId: 2,
                container: {
                    nodeId: "lsdkfjweoifjsdklf",
                    id: 2,
                    DLO: (300 - (15 * 4)) / 3,
                    containers: [
                        {
                            nodeId: "sldkfjswoeijfklsdmflsjeo",
                            id: 6,
                            parentContainerId: 2,
                            DLO: 25,
                            infill: "glass",
                            bottomFrameId: 1,
                            leftFrameId: 5,
                            topFrameId: 7,
                            rightFrameId: 4,
                            fill: "orange",
                        },
                        {
                            nodeId: "lsdkfjsldkfj",
                            id: 7,
                            parentContainerId: 2,
                            DLO: undefined,
                            infill: "glass",
                            bottomFrameId: 7,
                            leftFrameId: 5,
                            topFrameId: 3,
                            rightFrameId: 4,
                            fill: "red",
                        },
                    ],
                },
            },
            {
                nodeId: "sldkfjwoeidslkmm",
                elevationId: 1,
                containerId: 7,
                container: {
                    id: 3,
                    DLO: undefined,
                    containers: [
                        {
                            nodeId: "slkdfsmclkdsdfsdc",
                            id: 8,
                            parentContainerId: 7,
                            DLO: 50,
                            fill: "red",
                        },
                        {
                            nodeId: "sldkfjwoeivewme",
                            id: 9,
                            parentContainerId: 7,
                            DLO: undefined,
                            fill: "purple",
                        },
                    ],
                },
            },
        ],
    },
};
