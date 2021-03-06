import React from 'react';
import { TransformProvider } from "../../../../components";
import { useCollapseSidebar } from '../../../Statics/Statics';
import { useCheckDefaultValues, usePartialAction, useSelection } from '../ducks/hooks';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import SystemTree from './SystemTree/SystemTree';
import { parseSearch } from '../../../../utils';

SystemBuilder.navigationOptions = ({
    location: {
        search,
    },
}) => ({
    path: '/build',
    disabled: parseSearch(search).systemId === 'null',
    shouldRenderInNavMenu: parseSearch(search).systemId !== 'null',
});

export default function SystemBuilder({
    location,
    match,
    history,
    queryResult,
    updateEntireSystem,
    fetching,
    updating,
    systemMap,
    system,
    systemInput,
    dispatch,
    save,
}) {

    useCollapseSidebar();

    const {
        selectedItem,
        selectItem,
    } = useSelection({ systemMap, location, match, history });

    console.log({ selectedItem });

    const { partialAction, dispatchPartial, cancelPartial, completePartial } = usePartialAction({ selectItem, dispatch });

    // adding default value to all options without one
    useCheckDefaultValues({ systemMap, system, dispatch, systemInput });

    return (
        <TransformProvider>
            <Header
                {...{
                    queryResult,
                    systemInput,
                    system,
                    systemMap,
                    dispatch,
                    selectedItem,
                    selectItem,
                    save,
                }}
            />
            <SystemTree
                {...{
                    queryResult,
                    updating,
                    fetching,
                    system,
                    systemMap,
                    dispatch,
                    selectItem,
                    selectedItem,
                    partialAction,
                    cancelPartial,
                    completePartial,
                }}
            />
            <Sidebar
                {...{
                    queryResult,
                    system,
                    systemMap,
                    dispatch,
                    selectItem,
                    selectedItem,
                    dispatchPartial,
                    partialAction,
                    cancelPartial,
                    match,
                    location,
                }}
            />
            {/* <RightSidebar
                open={!!selectedItem}
                handleCloseClick={() => selectItem()}
                View={VIEWS[selectedTypename] || { title: '', component: () => null }}
                childProps={{
                    queryResult,
                    system,
                    systemMap,
                    dispatch,
                    selectItem,
                    selectedItem,
                    dispatchPartial,
                    partialAction,
                    cancelPartial,
                }}
            /> */}
        </TransformProvider>
    );
}
