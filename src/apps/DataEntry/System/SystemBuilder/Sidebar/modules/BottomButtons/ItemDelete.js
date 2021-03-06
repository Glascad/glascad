import React from 'react';
import { getLastItemFromPath, getAllInstancesOfItem, getChildren } from '../../../../../../../app-logic/system';
import { DELETE_ITEM } from '../../../../ducks/actions';
import { getOptionIsGrouped } from '../../../../ducks/utils';
import { confirmWithModal } from '../../../../../../../components';

const ItemDelete = ({
    system,
    selectedItem,
    selectedItem: {
        path = '',
        __typename = '',
    },
    name,
    dispatch,
    systemMap,
}) => {
    const parentIsGrouped = __typename.match(/value$/i) && getOptionIsGrouped(system, selectedItem);
    const itemName = getLastItemFromPath(path);
    const children = getChildren(selectedItem, systemMap);

    return (
        <button
            className="sidebar-button danger"
            data-cy={`edit-${name.toLowerCase()}-delete-button`}
            onClick={() => {
                const deleteItem = () => dispatch(DELETE_ITEM, {
                    path: path,
                    __typename,
                })
                const deleteValuesFromGroupedOptions = () => {
                    getAllInstancesOfItem({ path, __typename }, systemMap)
                        .forEach((instance, i) => {
                            const item = systemMap[instance];
                            dispatch(DELETE_ITEM, {
                                path: item.path,
                                __typename: item.__typename,
                            }, {
                                replaceState: i !== 0,
                            })
                        })
                };
                parentIsGrouped ?
                    confirmWithModal(deleteValuesFromGroupedOptions, {
                        titleBar: { title: `Delete Grouped Option Value` },
                        children: `Deleting a value attached to a grouped option will impact other values`,
                        finishButtonText: 'Delete',
                        danger: true,
                    })
                    :
                    children.length > 0 ?
                        confirmWithModal(deleteItem, {
                            titleBar: { title: `Delete ${itemName}?` },
                            children: `Deleting ${itemName.toLowerCase()} will delete all the items below it. Do you want to continue?`,
                            finishButtonText: 'Delete',
                            danger: true,
                        })
                        :
                        deleteItem();
            }}
        >
            {`Delete ${name}`}
        </button >
    );
}

export default ItemDelete;