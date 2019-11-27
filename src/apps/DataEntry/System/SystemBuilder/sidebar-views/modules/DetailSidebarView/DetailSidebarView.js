import React from 'react';
import DetailDisplay from '../../../../DetailBuilder/DetailDisplay/DetailDisplay';
import { getDefaultPath } from '../../../../../../../app-logic/system-utils';
import { match } from '../../../../../../../utils';

export default function DetailSidebarView({
    systemMap,
    children,
    // selectItem,
    selectedItem,
    selectedItem: {
        path = '',
    },
}) {

    return match(path)
        .regex(/__(C|P)T/i, (<DetailDisplay
            systemMap={systemMap}
            children={children}
            selectedConfigurationPaths={''}
            selectItem={() => console.log("hey")}
            selectedItem={getDefaultPath(selectedItem)}
        />))
        .regex(/__DT__/i, children.map(child => (<DetailDisplay
            systemMap={systemMap}
            children={children}
            selectedConfigurationPaths={''}
            selectItem={() => console.log("hey")}
            selectedItem={getDefaultPath(child)}
        />)))
        .otherwise(null);
};