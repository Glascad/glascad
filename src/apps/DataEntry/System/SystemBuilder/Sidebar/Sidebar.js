import React from 'react';
import { getChildren, getLastItemFromPath } from '../../../../../app-logic/system';
import { RightSidebar, TitleBar } from '../../../../../components';
import DetailOrConfigurationOrPart from '../../../../../modules/Detail/DetailOrConfigurationOrPart';
import BottomButtons from './modules/BottomButtons/BottomButtons';
import ItemChildren from './modules/ItemChildren/ItemChildren';
import ItemName from './modules/ItemName/ItemName';
import ItemToggles from './modules/ItemToggles/ItemToggles';

export default function Sidebar({
    queryResult,
    system,
    systemMap,
    dispatch,
    selectItem,
    selectedItem,
    selectedItem: {
        path,
        __typename = '',
    } = {},
    dispatchPartial,
    partialAction,
    cancelPartial,
    match,
    location,
}) {
    const itemName = getLastItemFromPath(path);

    const children = getChildren(selectedItem, systemMap);

    const name = __typename.replace(/^.*([A-Z]\w+)$/, '$1');

    console.log({ selectedItem });

    return selectedItem ? (
        <RightSidebar
            open={!!selectedItem}
            handleCloseClick={() => selectItem()}
        >
            <TitleBar
                title={`Edit ${name}`}
            />
            <DetailOrConfigurationOrPart
                {...{
                    systemMap,
                    path,
                }}
            />
            <ItemName
                {...{
                    queryResult,
                    system,
                    selectedItem,
                    itemName,
                    children,
                    name,
                    dispatch,
                    systemMap,
                }}
            />
            <ItemToggles
                {...{
                    system,
                    selectedItem,
                    itemName,
                    name,
                    dispatch,
                    systemMap,
                }}
            />
            <ItemChildren
                {...{
                    queryResult,
                    system,
                    selectedItem,
                    itemName,
                    children,
                    selectItem,
                    dispatch,
                    systemMap,
                }}
                />
            <BottomButtons
                {...{
                    queryResult,
                    match,
                    location,
                    system,
                    selectedItem,
                    name,
                    partialAction,
                    cancelPartial,
                    dispatchPartial,
                    dispatch,
                    systemMap,
                }}
            />
        </RightSidebar>
    ) : null;
}
