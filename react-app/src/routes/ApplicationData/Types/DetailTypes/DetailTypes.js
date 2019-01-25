import React from 'react';
import {
    ApolloWrapper,
    ListWrapper,
    Input,
    HeadedContainer,
} from '../../../../components';

import * as apolloProps from './detail-types-graphql';
import TitleBar from '../../../../components/ui/TitleBar/TitleBar';

export default function DetailTypes() {
    return (
        <ApolloWrapper
            {...apolloProps}
        >
            {({
                queryStatus: {
                    allDetailTypes = [],
                },
                mutations: {
                    createDetailType,
                    updateDetailType,
                    deleteDetailType,
                },
            }) => (
                    <ListWrapper
                        title="Detail Types"
                        items={allDetailTypes}
                        mapPillProps={({ type }) => ({
                            title: type
                        })}
                        onCreate={({ }, { input }) => createDetailType({
                            type: input
                        })}
                        onUpdate={({ arguments: { nodeId } }, { input }) => updateDetailType({
                            nodeId,
                            type: input,
                        })}
                        onDelete={({ arguments: { nodeId } }) => deleteDetailType({
                            nodeId
                        })}
                        deleteModal={{
                            name: "Detail Type"
                        }}
                    >
                        {({
                            nodeId,
                            type,
                            vertical,
                            entrance,
                        }) => (
                                <>
                                    <TitleBar
                                        title="Detail Type Settings"
                                        selections={[type]}
                                    />
                                    <Input
                                        label="Vertical"
                                        type="checkbox"
                                        checked={vertical}
                                        onChange={({ target: { checked } }) => updateDetailType({
                                            nodeId,
                                            vertical: checked,
                                        })}
                                    />
                                    <Input
                                        label="Entrance"
                                        type="checkbox"
                                        checked={entrance}
                                        onChange={({ target: { checked } }) => updateDetailType({
                                            nodeId,
                                            entrance: checked
                                        })}
                                    />
                                </>
                            )}
                    </ListWrapper>
                )}
        </ApolloWrapper>
    );
}
