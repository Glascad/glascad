import React, { useRef, useState, useContext } from 'react';
import { Tree, TransformBox, Ellipsis } from '../../../../../components';
import { makeRenderable } from '../ducks/utils';
import { normalCase } from '../../../../../utils';
import './SystemTree.scss';
import { StaticContext } from '../../../../Statics/Statics';

const noOptions = {
    item: {
        __typename: "SystemOption",
        name: "_OPTION",
    },
    branches: [],
};

export default function SystemTree({
    system,
    system: {
        _systemOptions: {
            length,
        } = [],
    } = {},
    selectedItem,
    selectItem,
    fetching,
}) {

    const { Viewport } = useContext(StaticContext);

    const trunk = length ?
        makeRenderable(system)
        :
        noOptions;

    console.log({
        fetching,
        system,
        trunk,
    });

    return (
        <TransformBox
            id="SystemTree"
            viewportRef={Viewport}
        >
            {fetching ? (
                <Ellipsis
                    text="Loading"
                />
            ) : (
                    <Tree
                        trunk={trunk}
                        renderItem={(item = {}, { depth, toggleOpen }) => {
                            const { name = '', detailType = '', configurationType = '', __typename = '', } = item;
                            return (
                                <div
                                    data-cy={`${__typename}-${name || detailType || configurationType}`}
                                    className={`tree-item type-${
                                        __typename.replace(/^.*(option|value|type)$/, '$1').toLowerCase()
                                        } subtype-${
                                        __typename.toLowerCase()
                                        } ${
                                        item === selectedItem ? 'selected' : ''
                                        }`}
                                    onClick={() => selectItem(item)}
                                >
                                    <div className="title">{normalCase(name || detailType || configurationType)}</div>
                                </div>
                            );
                        }}
                    // renderItem={({ name, detailType, configurationType, __typename } = {}, { depth }) => match(__typename)
                    //     .against({
                    //         SystemOption: () => <span>{name || detailType || configurationType}</span>,
                    //         DetailOption: () => <span>{name || detailType || configurationType}</span>,
                    //         ConfigurationOption: () => <span>{name || detailType || configurationType}</span>,
                    //         SystemOptionValue: () => <span>{name || detailType || configurationType}</span>,
                    //         DetailOptionValue: () => <span>{name || detailType || configurationType}</span>,
                    //         ConfigurationOptionValue: () => <span>{name || detailType || configurationType}</span>,
                    //         SystemDetailType: () => <span>{name || detailType || configurationType}</span>,
                    //         SystemConfigurationType: () => <span>{name || detailType || configurationType}</span>,
                    //         undefined: () => null,
                    //     })
                    //     .otherwise(() => { throw new Error(`Unknown typename: ${__typename}`) })}
                    />
                )}
        </TransformBox>
    );
}
