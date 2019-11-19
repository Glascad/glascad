import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
    TransformProvider,
} from '../../../../../components';
import Header from './Header/Header';
import DetailDisplay from './DetailDisplay/DetailDisplay';
import DetailTray from './DetailTray/DetailTray';
import Sidebar from './Sidebar/Sidebar';
import { getDefaultPath, getChildren } from '../../../../../app-logic/system-utils';
import { parseSearch } from '../../../../../utils';
import { useCollapseSidebar } from '../../../../Statics/Statics';

DetailBuilder.navigationOptions = {
    requiredURLParams: ["path"],
    path: "/detail",
};

export default function DetailBuilder({
    location: {
        search,
    },
    match: {
        path: matchPath,
    },
    systemMap,
}) {

    useCollapseSidebar();

    const { path } = parseSearch(search);

    const fullPath = getDefaultPath(path, systemMap);

    const children = getChildren({ path }, systemMap) || [];

    const [selectedPart, setSelectedPart] = useState();

    const selectPart = newPart => setSelectedPart(part => newPart === part ? undefined : newPart);

    console.log({
        fullPath,
        path,
        systemMap,
        children,
        selectedPart,
    });

    if (path !== fullPath) return (
        <Redirect
            to={{
                pathname: matchPath,
                search: `${parseSearch(search).update({ path: fullPath })}`,
                state: {
                    previousPath: path,
                },
            }}
        />
    );

    return (
        <TransformProvider>
            <Header
                systemMap={systemMap}
            />
            <DetailDisplay
                systemMap={systemMap}
                children={children}
                selectPart={selectPart}
                selectedPart={selectedPart}
            />
            <DetailTray
                systemMap={systemMap}
                selectedPart={selectedPart}
            />
            <Sidebar
                systemMap={systemMap}
            />
        </TransformProvider>
    );
}
