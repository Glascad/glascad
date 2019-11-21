import React from 'react';
import { getChildren, getLastItemFromPath, getConfigurationTypeFromPath, getDefaultPath } from '../../../../../../app-logic/system-utils';
import Part from './Part';
import { Matrix } from '../../../../../../utils';

export default function Configuration({
    configuration,
    configuration: {
        path,
        transform: matrix,
    },
    systemMap,
    selectItem,
    selectedItem,
    selectedConfigurationPaths,
}) {
    // console.log(arguments[0]);
    const configurationType = getConfigurationTypeFromPath(path);
    const selected = configuration === selectedItem;
    const selectedPath = selectedConfigurationPaths[configurationType];
    const selectedNode = systemMap[selectedPath];
    const parts = getChildren(selectedNode, systemMap);
    const transform = new Matrix(matrix);
    // console.log({
    //     parts,
    //     selected,
    //     configurationType,
    // });
    return (
        <g
            data-cy={`configuration-${path}`}
            className={`Configuration ${selected ? 'selected' : ''}`}
            transform={transform}
        >
            {parts.map(part => (
                <Part
                    {...arguments[0]}
                    part={part}
                    selectItem={() => selectItem(configuration)}
                />
            ))}
        </g>
    );
}