import React, { useState } from 'react';
import Statics from '../Statics/Statics';
import { TitleBar, Pill, ListWrapper, Tree, useQuery } from '../../components';
import { logInputOutput } from '../../utils';
import gql from 'graphql-tag';
import F from '../../schema';

import './Practice.scss';

const option = "option";
const value = "value";
const detail = "detail";
const detailOption = "detail-option";
const detailValue = "detail-option-value";
const configuration = "configuration";
const configurationOption = "configuration-option";
const configurationValue = "configuration-option-value";

const query = gql`
{
    systemById(id:1) {
        ...EntireSystem
    }
}
    ${F.SYS.ENTIRE_SYSTEM}
`;

// const trunk = {
//     item: {
//         type: option,
//         name: "Set",
//     },
//     branches: [
//         {
//             item: {
//                 type: value,
//                 name: "Front",
//             },
//             branches: [],
//         },
//         {
//             item: {
//                 type: value,
//                 name: "Back",
//             },
//             branches: [],
//         },
//         {
//             item: {
//                 type: value,
//                 name: "Center",
//             },
//             branches: [
//                 {
//                     item: {
//                         type: option,
//                         name: "Joinery",
//                     },
//                     branches: [
//                         {
//                             item: {
//                                 type: value,
//                                 name: "Screw Spline",
//                             },
//                             branches: [
//                                 {
//                                     item: {
//                                         type: detail,
//                                         name: "Head",
//                                     },
//                                     branches: [
//                                         {
//                                             item: {
//                                                 type: detailOption,
//                                                 name: "Stops",
//                                             },
//                                             branches: [
//                                                 {
//                                                     item: {
//                                                         type: detailValue,
//                                                         name: "Up",
//                                                     },
//                                                     branches: [],
//                                                 },
//                                                 {
//                                                     item: {
//                                                         type: detailValue,
//                                                         name: "Down",
//                                                     },
//                                                     branches: [
//                                                         {
//                                                             item: {
//                                                                 type: detailOption,
//                                                                 name: "Glazing",
//                                                             },
//                                                             branches: [
//                                                                 {
//                                                                     item: {
//                                                                         type: detailValue,
//                                                                         name: "Inside",
//                                                                     },
//                                                                     branches: [],
//                                                                 },
//                                                                 {
//                                                                     item: {
//                                                                         type: detailValue,
//                                                                         name: "Outside",
//                                                                     },
//                                                                     branches: [],
//                                                                 },
//                                                             ],
//                                                         },
//                                                     ],
//                                                 },
//                                             ],
//                                         },
//                                     ],
//                                 },
//                             ],
//                         },
//                         {
//                             item: {
//                                 type: value,
//                                 name: "Shear Block",
//                             },
//                             branches: [
//                                 {
//                                     item: {
//                                         type: detail,
//                                         name: "Head",
//                                     },
//                                     branches: [
//                                         {
//                                             item: {
//                                                 type: detailOption,
//                                                 name: "Stops",
//                                             },
//                                             branches: [
//                                                 {
//                                                     item: {
//                                                         type: detailValue,
//                                                         name: "Up",
//                                                     },
//                                                     branches: [],
//                                                 },
//                                                 {
//                                                     item: {
//                                                         type: detailValue,
//                                                         name: "Down",
//                                                     },
//                                                     branches: [
//                                                         {
//                                                             item: {
//                                                                 type: detailOption,
//                                                                 name: "Glazing",
//                                                             },
//                                                             branches: [
//                                                                 {
//                                                                     item: {
//                                                                         type: detailValue,
//                                                                         name: "Inside",
//                                                                     },
//                                                                     branches: [],
//                                                                 },
//                                                                 {
//                                                                     item: {
//                                                                         type: detailValue,
//                                                                         name: "Outside",
//                                                                     },
//                                                                     branches: [],
//                                                                 },
//                                                             ],
//                                                         },
//                                                     ],
//                                                 },
//                                             ],
//                                         },
//                                     ],
//                                 },
//                             ],
//                         },
//                         {
//                             item: {
//                                 type: value,
//                                 name: "Stick",
//                             },
//                             branches: [
//                                 {
//                                     item: {
//                                         type: detail,
//                                         name: "Head",
//                                     },
//                                     branches: [
//                                         {
//                                             item: {
//                                                 type: detailOption,
//                                                 name: "Stops",
//                                             },
//                                             branches: [
//                                                 {
//                                                     item: {
//                                                         type: detailValue,
//                                                         name: "Up",
//                                                     },
//                                                     branches: [
//                                                         {
//                                                             item: {
//                                                                 type: configuration,
//                                                                 name: "Head",
//                                                             },
//                                                             branches: [
//                                                                 {
//                                                                     item: {
//                                                                         type: configurationOption,
//                                                                         name: "Head Type",
//                                                                     },
//                                                                     branches: [
//                                                                         {
//                                                                             item: {
//                                                                                 type: configurationValue,
//                                                                                 name: "Standard",
//                                                                             },
//                                                                         },
//                                                                         {
//                                                                             item: {
//                                                                                 type: configurationValue,
//                                                                                 name: "High-Profile",
//                                                                             },
//                                                                         },
//                                                                         {
//                                                                             item: {
//                                                                                 type: configurationValue,
//                                                                                 name: "Brake-Metal",
//                                                                             },
//                                                                         },
//                                                                     ],
//                                                                 },
//                                                             ],
//                                                         },
//                                                         {
//                                                             item: {
//                                                                 type: configuration,
//                                                                 name: "Compensating Receptor",
//                                                             },
//                                                             branches: [
//                                                                 {
//                                                                     item: {
//                                                                         type: configurationOption,
//                                                                         name: "Receptor Type",
//                                                                     },
//                                                                     branches: [
//                                                                         {
//                                                                             item: {
//                                                                                 type: configurationValue,
//                                                                                 name: "Standard",
//                                                                             },
//                                                                         },
//                                                                         {
//                                                                             item: {
//                                                                                 type: configurationValue,
//                                                                                 name: "High Profile",
//                                                                             },
//                                                                         },
//                                                                     ],
//                                                                 },
//                                                             ],
//                                                         },
//                                                     ],
//                                                 },
//                                                 {
//                                                     item: {
//                                                         type: detailValue,
//                                                         name: "Down",
//                                                     },
//                                                     branches: [
//                                                         {
//                                                             item: {
//                                                                 type: detailOption,
//                                                                 name: "Glazing",
//                                                             },
//                                                             branches: [
//                                                                 {
//                                                                     item: {
//                                                                         type: detailValue,
//                                                                         name: "Inside",
//                                                                     },
//                                                                     branches: [],
//                                                                 },
//                                                                 {
//                                                                     item: {
//                                                                         type: detailValue,
//                                                                         name: "Outside",
//                                                                     },
//                                                                     branches: [
//                                                                         {
//                                                                             item: {
//                                                                                 type: configuration,
//                                                                                 name: "Head",
//                                                                             },
//                                                                             branches: [
//                                                                                 {
//                                                                                     item: {
//                                                                                         type: configurationOption,
//                                                                                         name: "Head Type",
//                                                                                     },
//                                                                                     branches: [
//                                                                                         {
//                                                                                             item: {
//                                                                                                 type: configurationValue,
//                                                                                                 name: "Standard",
//                                                                                             },
//                                                                                         },
//                                                                                         {
//                                                                                             item: {
//                                                                                                 type: configurationValue,
//                                                                                                 name: "High-Profile",
//                                                                                             },
//                                                                                         },
//                                                                                         {
//                                                                                             item: {
//                                                                                                 type: configurationValue,
//                                                                                                 name: "Brake-Metal",
//                                                                                             },
//                                                                                         },
//                                                                                     ],
//                                                                                 },
//                                                                             ],
//                                                                         },
//                                                                     ],
//                                                                 },
//                                                             ],
//                                                         },
//                                                     ],
//                                                 },
//                                             ],
//                                         },
//                                     ],
//                                 },
//                             ],
//                         },
//                     ],
//                 },
//             ],
//         },
//         // {
//         //     item: {
//         //         type: value,
//         //         name: "Multi-Plane",
//         //     },
//         //     branches: [],
//         // },
//     ],
// };

const trunk = {
    item: {
        type: option,
        name: "System Option",
    },
    branches: [
        {
            item: {
                type: value,
                name: "Value",
            },
            branches: [
                {
                    item: {
                        type: option,
                        name: "System Option",
                    },
                    branches: [
                        {
                            item: {
                                type: value,
                                name: "Value",
                            },
                            branches: [
                                {
                                    item: {
                                        type: detail,
                                        name: "Detail",
                                    },
                                    branches: [
                                        {
                                            item: {
                                                type: detailOption,
                                                name: "Detail Option",
                                            },
                                            branches: [
                                                {
                                                    item: {
                                                        type: value,
                                                        name: "Detail Value",
                                                    },
                                                    branches: [],
                                                },
                                                {
                                                    item: {
                                                        type: value,
                                                        name: "Detail Value",
                                                    },
                                                    branches: [],
                                                },
                                                {
                                                    item: {
                                                        type: value,
                                                        name: "Detail Value",
                                                    },
                                                    branches: [],
                                                },
                                            ],
                                        }
                                    ],
                                }
                            ],
                        },
                        {
                            item: {
                                type: value,
                                name: "Value",
                            },
                            branches: [
                                {
                                    item: {
                                        type: detail,
                                        name: "Detail",
                                    },
                                    branches: [
                                        {
                                            item: {
                                                type: detailOption,
                                                name: "Detail Option",
                                            },
                                            branches: [
                                                {
                                                    item: {
                                                        type: value,
                                                        name: "Detail Value",
                                                    },
                                                    branches: [],
                                                },
                                                {
                                                    item: {
                                                        type: value,
                                                        name: "Detail Value",
                                                    },
                                                    branches: [],
                                                },
                                                {
                                                    item: {
                                                        type: value,
                                                        name: "Detail Value",
                                                    },
                                                    branches: [],
                                                },
                                            ],
                                        }
                                    ],
                                }
                            ],
                        },
                        {
                            item: {
                                type: value,
                                name: "Value",
                            },
                            branches: [
                                {
                                    item: {
                                        type: detail,
                                        name: "Detail",
                                    },
                                    branches: [
                                        {
                                            item: {
                                                type: detailOption,
                                                name: "Detail Option",
                                            },
                                            branches: [
                                                {
                                                    item: {
                                                        type: value,
                                                        name: "Detail Value",
                                                    },
                                                    branches: [],
                                                },
                                                {
                                                    item: {
                                                        type: value,
                                                        name: "Detail Value",
                                                    },
                                                    branches: [],
                                                },
                                                {
                                                    item: {
                                                        type: value,
                                                        name: "Detail Value",
                                                    },
                                                    branches: [],
                                                },
                                            ],
                                        }
                                    ],
                                }
                            ],
                        },
                    ],
                }
            ],
        },
        {
            item: {
                type: value,
                name: "Value",
            },
            branches: [
                {
                    item: {
                        type: option,
                        name: "System Option",
                    },
                    branches: [
                        {
                            item: {
                                type: value,
                                name: "Value",
                            },
                            branches: [
                                {
                                    item: {
                                        type: detail,
                                        name: "Detail",
                                    },
                                    branches: [
                                        {
                                            item: {
                                                type: detailOption,
                                                name: "Detail Option",
                                            },
                                            branches: [
                                                {
                                                    item: {
                                                        type: value,
                                                        name: "Detail Value",
                                                    },
                                                    branches: [],
                                                },
                                                {
                                                    item: {
                                                        type: value,
                                                        name: "Detail Value",
                                                    },
                                                    branches: [],
                                                },
                                                {
                                                    item: {
                                                        type: value,
                                                        name: "Detail Value",
                                                    },
                                                    branches: [],
                                                },
                                            ],
                                        }
                                    ],
                                }
                            ],
                        },
                        {
                            item: {
                                type: value,
                                name: "Value",
                            },
                            branches: [
                                {
                                    item: {
                                        type: detail,
                                        name: "Detail",
                                    },
                                    branches: [
                                        {
                                            item: {
                                                type: detailOption,
                                                name: "Detail Option",
                                            },
                                            branches: [
                                                {
                                                    item: {
                                                        type: value,
                                                        name: "Detail Value",
                                                    },
                                                    branches: [],
                                                },
                                                {
                                                    item: {
                                                        type: value,
                                                        name: "Detail Value",
                                                    },
                                                    branches: [],
                                                },
                                                {
                                                    item: {
                                                        type: value,
                                                        name: "Detail Value",
                                                    },
                                                    branches: [],
                                                },
                                            ],
                                        }
                                    ],
                                }
                            ],
                        },
                        {
                            item: {
                                type: value,
                                name: "Value",
                            },
                            branches: [
                                {
                                    item: {
                                        type: detail,
                                        name: "Detail",
                                    },
                                    branches: [
                                        {
                                            item: {
                                                type: detailOption,
                                                name: "Detail Option",
                                            },
                                            branches: [
                                                {
                                                    item: {
                                                        type: value,
                                                        name: "Detail Value",
                                                    },
                                                    branches: [],
                                                },
                                                {
                                                    item: {
                                                        type: value,
                                                        name: "Detail Value",
                                                    },
                                                    branches: [],
                                                },
                                                {
                                                    item: {
                                                        type: value,
                                                        name: "Detail Value",
                                                    },
                                                    branches: [],
                                                },
                                            ],
                                        }
                                    ],
                                }
                            ],
                        },
                    ],
                }
            ],
        },
        {
            item: {
                type: value,
                name: "Value",
            },
            branches: [
                {
                    item: {
                        type: option,
                        name: "System Option",
                    },
                    branches: [
                        {
                            item: {
                                type: value,
                                name: "Value",
                            },
                            branches: [
                                {
                                    item: {
                                        type: detail,
                                        name: "Detail",
                                    },
                                    branches: [
                                        {
                                            item: {
                                                type: detailOption,
                                                name: "Detail Option",
                                            },
                                            branches: [
                                                {
                                                    item: {
                                                        type: value,
                                                        name: "Detail Value",
                                                    },
                                                    branches: [],
                                                },
                                                {
                                                    item: {
                                                        type: value,
                                                        name: "Detail Value",
                                                    },
                                                    branches: [],
                                                },
                                                {
                                                    item: {
                                                        type: value,
                                                        name: "Detail Value",
                                                    },
                                                    branches: [],
                                                },
                                            ],
                                        }
                                    ],
                                }
                            ],
                        },
                        {
                            item: {
                                type: value,
                                name: "Value",
                            },
                            branches: [
                                {
                                    item: {
                                        type: detail,
                                        name: "Detail",
                                    },
                                    branches: [
                                        {
                                            item: {
                                                type: detailOption,
                                                name: "Detail Option",
                                            },
                                            branches: [
                                                {
                                                    item: {
                                                        type: value,
                                                        name: "Detail Value",
                                                    },
                                                    branches: [],
                                                },
                                                {
                                                    item: {
                                                        type: value,
                                                        name: "Detail Value",
                                                    },
                                                    branches: [],
                                                },
                                                {
                                                    item: {
                                                        type: value,
                                                        name: "Detail Value",
                                                    },
                                                    branches: [],
                                                },
                                            ],
                                        }
                                    ],
                                }
                            ],
                        },
                        {
                            item: {
                                type: value,
                                name: "Value",
                            },
                            branches: [
                                {
                                    item: {
                                        type: detail,
                                        name: "Detail",
                                    },
                                    branches: [
                                        {
                                            item: {
                                                type: detailOption,
                                                name: "Detail Option",
                                            },
                                            branches: [
                                                {
                                                    item: {
                                                        type: value,
                                                        name: "Detail Value",
                                                    },
                                                    branches: [],
                                                },
                                                {
                                                    item: {
                                                        type: value,
                                                        name: "Detail Value",
                                                    },
                                                    branches: [],
                                                },
                                                {
                                                    item: {
                                                        type: value,
                                                        name: "Detail Value",
                                                    },
                                                    branches: [],
                                                },
                                            ],
                                        }
                                    ],
                                }
                            ],
                        },
                    ],
                }
            ],
        },
    ],
};

function Practice() {
    const [fetch, queryStatus] = useQuery({ query });
    console.log(queryStatus);
    setTimeout(() => console.log(queryStatus));
    const {
        _system,
        _system: {
            _systemOptions = [],
            _detailOptions = [],
            _configurationOptions = [],
        } = {},
    } = queryStatus;
    const firstItem = _systemOptions.find(({ parentSystemOptionValueId }) => !parentSystemOptionValueId) || {};
    const treeTrunk = {
        item: firstItem,
        branches: (firstItem._systemOptionValues || []).map(item => {
            const {
                branchItems,
                branchType,
            } = item._systemDetailTypes && item._systemDetailTypes.length ?
                    {
                        branchType: "detailType",
                        branchItems: item._systemDetailTypes
                    } : {
                        branchType: "systemOption",
                        branchItems: _systemOptions.filter(({ parentSystemOptionValueId }) => parentSystemOptionValueId === item.id),
                    };
            return {
                item,
                branches: branchItems.map(item => ({
                    item,
                    branches: branchType === "detailType" ? (
                        _detailOptions.map(item => ({
                            item,
                        }))
                    ) : ([]),
                })),
            };
        }),
    };
    return (
        <div id="Practice">
            <TitleBar
                title="Test Options"
            />
            <Tree
                trunk={trunk}
                renderItem={(item, props) => (
                    <div
                        onClick={() => {
                            if (props.toggleOpen) props.toggleOpen();
                            console.log({ item, props });
                        }}
                        className={`type-${item.type}`}
                    >
                        <span>
                            {item.name}
                        </span>
                    </div>
                )}
            />
        </div>
    );
}


export default () => <Statics routes={{ Practice }} />
