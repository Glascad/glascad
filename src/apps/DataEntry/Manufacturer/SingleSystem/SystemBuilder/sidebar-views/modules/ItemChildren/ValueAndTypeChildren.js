import React from 'react';
import { GroupingBox, confirmWithModal, Select, CircleButton, Toggle, ToggleBox } from '../../../../../../../components';
import { getAllInstancesOfItem, getLastItemFromPath, getChildren, filterOptionsAbove, getParentPath } from '../../../../../../../app-logic/system-utils';
import { ADD_ITEM, UPDATE_ITEM, DELETE_ITEM } from '../../ducks/actions';
import { getSelectTypeName } from '../../ducks/utils';

const Row = ({
    item,
    item: {
        __typename: childTypename = '',
        path: childPath = '',
    },
    selectValue = '',
    handleSelectChange,
    selectOptions,
    grandchildren,
    dispatch,
    selectItem,
}) => (
        <div className="input-group">
            {console.log({ item })}
            <Select
                data-cy={`edit-child-${selectValue.toLowerCase()}`}
                value={selectValue}
                options={selectOptions}
                onChange={handleSelectChange}
            />
            <CircleButton
                data-cy={`select-child-${selectValue.toLowerCase()}`}
                className="primary"
                actionType="arrow"
                onClick={() => selectItem(item)}
            />
            <CircleButton
                data-cy={`delete-child-${selectValue.toLowerCase()}`}
                type="small"
                className="danger"
                actionType="delete"
                onClick={() => {
                    const deleteType = () => dispatch(DELETE_ITEM, {
                        __typename: childTypename,
                        path: childPath,
                    });
                    if (grandchildren.length > 0) confirmWithModal(deleteType, {
                        titleBar: { title: `Delete ${selectValue}` },
                        children: `Deleting ${selectValue.toLowerCase()} will delete all the items below it. Do you want to continue?`,
                        danger: true,
                        finishButtonText: 'Delete',
                    });
                    else deleteType();
                }}
            />
        </div>
    );

export const ValueAdditionGrouping = ({
    _optionGroups,
    item,
    item: {
        path,
        __typename
    },
    validOptions,
    optionToggleIsSelected,
    children,
    child,
    child: {
        path: childPath,
        __typename: childTypename,
    },
    childTypeType,
    childOptionChildren,
    childOptionName,
    childTypename,
    selectTypes,
    selectValidTypes,
    setOptionIsSelected,
    selectItem,
    dispatch,
    systemMap,
}) => (
        <ToggleBox
            views={[
                {
                    toggle: {
                        text: "Option",
                        "data-cy": "toggle-child-option",
                        selected: optionToggleIsSelected,
                        className: (hasChildren && !optionToggleIsSelected) ? 'disabled' : '',
                        onClick: () => !hasChildren && setOptionIsSelected(true),
                    },
                    render: () => hasChildren ? (
                        <div className="input-group">
                            <Row
                                item={child}
                                selectOptions={filterOptionsAbove(item, validOptions)
                                    .map(({ name }) => name)}
                                grandchildren={childOptionChildren}
                                dispatch={dispatch}
                                selectValue={childOptionName}
                                selectItem={selectItem}
                                handleSelectChange={name => {
                                    const allInstances = getAllInstancesOfItem({
                                        path: `${path}.${name}`,
                                        __typename: childTypename,
                                    }, systemMap);
                                    const firstInstance = systemMap[allInstances[0]];
                                    const instanceValues = firstInstance ? getChildren(firstInstance, systemMap) || []
                                        :
                                        [];
                                    const [instanceDefaultValueKey, instanceDefaultValue] = firstInstance ?
                                        Object.entries(firstInstance).find(([key]) => key.match(/default/i)) || []
                                        :
                                        [];
                                    dispatch(UPDATE_ITEM, {
                                        path: childOptionPath,
                                        __typename: childTypename,
                                        update: {
                                            name,
                                            [`default${childTypename}Value`]: instanceDefaultValue,

                                        }
                                    })
                                    if (_optionGroups.some(og => og.name === name)) {
                                        instanceValues.forEach(value => dispatch(ADD_ITEM, {
                                            [`parent${childTypename}Path`]: `${getParentPath({ path: childOptionPath })}.${name}`,
                                            name: getLastItemFromPath(value.path),
                                            __typename: `${childTypename}Value`,
                                        }, {
                                            replaceState: true
                                        }))
                                    }
                                }}
                            />
                        </div>
                    ) : (
                            <div>
                                No Option
                            </div>
                        )
                },
                {
                    toggle: {
                        text: `${childTypeType.slice(0, 6)}s`,
                        "data-cy": `toggle-child-${childTypeType.toLowerCase()}`,
                        selected: !optionToggleIsSelected,
                        className: hasChildren && optionToggleIsSelected ? 'disabled' : '',
                        onClick: () => !hasChildren && setOptionIsSelected(false),
                    },
                    render: () => hasChildren ? (
                        <>
                            {children.map((item, i, { length }) => {
                                const { path: childTypePath = '', partNumber = '' } = item;
                                const childTypeChildren = getChildren({ path: childTypePath }, systemMap);
                                const childName = childTypePath ?
                                    getLastItemFromPath(childTypePath)
                                    :
                                    partNumber;
                                return (
                                    <Row
                                        key={i}
                                        item={item}
                                        selectOptions={selectTypes}
                                        grandchildren={childTypeChildren}
                                        dispatch={dispatch}
                                        selectValue={childName}
                                        selectItem={selectItem}
                                        handleSelectChange={name => {
                                            if (childName !== name) {
                                                const updateType = () => dispatch(UPDATE_ITEM, {
                                                    __typename: childTypeTypename,
                                                    path: childTypePath,
                                                    update: {
                                                        name,
                                                    },
                                                });
                                                if (childTypeChildren.length > 0) {
                                                    confirmWithModal(updateType, {
                                                        titleBar: { title: `Change ${childName}` },
                                                        children: 'Are you sure?',
                                                        finishButtonText: 'Change',
                                                    });
                                                } else {
                                                    updateType();
                                                }
                                            }
                                        }}
                                    />
                                )
                            })}
                        </>
                    ) : (
                            <div>
                                No {childTypeType}
                            </div>
                        )
                },
            ]}
            circleButton={optionToggleIsSelected ?
                hasChildren ?
                    undefined
                    :
                    {
                        "data-cy": "add-option",
                        actionType: "add",
                        className: "action",
                        onClick: () => dispatch(ADD_ITEM, {
                            __typename: __typename.replace(/value/i, ''),
                            [`parent${__typename}Path`]: path,
                            name: "ADD_OPTION",
                        }),
                    }
                :
                children.length < selectValidTypes.length ? {
                    "data-cy": `add-${childTypeType.toLowerCase()}`,
                    actionType: "add",
                    className: "action",
                    onClick: () => {
                        dispatch(ADD_ITEM, {
                            __typename: childTypeTypename,
                            [`parent${__typename}Path`]: path,
                            name: getSelectTypeName(children, `ADD_${childTypeType.toUpperCase()}`),
                        })
                    },
                }
                    :
                    undefined}
        />
    );

export const TypeAdditionGrouping = ({
    _optionGroups,
    validOptions,
    selectedType,
    selectedType: {
        path,
        __typename
    } = {},
    type,
    oName,
    child,
    child: {
        path: oPath,
        __typename: oTypename,
    } = {},
    childValues,
    selectItem,
    dispatch,
    systemMap,
}) => (
        <GroupingBox
            title="Option"
            circleButton={child ? undefined : {
                "data-cy": "add-option",
                actionType: "add",
                className: "action",
                onClick: () => dispatch(ADD_ITEM, {
                    __typename: `${type}Option`,
                    [`parent${__typename}Path`]: path,
                    name: 'ADD_OPTION',
                }),
            }}
        >
            {child ? (
                <div className="input-group">
                    <Row
                        item={child}
                        selectOptions={filterOptionsAbove(selectedType, validOptions).map(({ name }) => name)}
                        grandchildren={childValues}
                        dispatch={dispatch}
                        selectValue={oName}
                        selectItem={selectItem}
                        handleSelectChange={name => {
                            const allInstances = getAllInstancesOfItem({
                                path: `${path}.${name}`,
                                __typename: oTypename,
                            }, systemMap);
                            const firstInstance = systemMap[allInstances[0]];
                            const instanceValues = firstInstance ? getChildren(firstInstance, systemMap) : [];
                            const [instanceDefaultValueKey, instanceDefaultValue] = firstInstance ?
                                Object.entries(firstInstance).find(([key, value]) => key.match(/default/i))
                                :
                                [];
                            dispatch(UPDATE_ITEM, {
                                path: oPath,
                                __typename: oTypename,
                                update: {
                                    name,
                                    [`default${oTypename}Value`]: instanceDefaultValue,

                                }
                            })
                            if (_optionGroups.some(og => og.name === name)) {
                                instanceValues.forEach(value => dispatch(ADD_ITEM, {
                                    [`parent${oTypename}Path`]: `${getParentPath({ path: oPath })}.${name}`,
                                    name: getLastItemFromPath(value.path),
                                    __typename: `${oTypename}Value`,
                                }, {
                                    replaceState: true
                                }))
                            }
                        }}

                    />
                </div>
            ) : (
                    <div>
                        No Option
                    </div>
                )}
        </GroupingBox>
    );
