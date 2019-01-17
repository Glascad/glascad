import React from 'react';

import {
    ApolloWrapper,
    ListWrapper,
    HeadedContainer,
    Input,
} from '../../../../components';

import query from './configuration-types-graphql/query';
import mutations from './configuration-types-graphql/mutations';

export default function ConfigurationTypes() {
    return (
        <ApolloWrapper
            query={query}
            mutations={mutations}
        >
            {({
                queryStatus: {
                    allConfigurationTypes = [],
                    allManufacturers = [],
                    allPartTypes = [],
                },
                mutations: {
                    createConfigurationType,
                    updateConfigurationType,
                    deleteConfigurationType,
                    createConfigurationTypePartType,
                    deleteConfigurationTypePartType,
                    createConfigurationNameOverride,
                    updateConfigurationNameOverride,
                    deleteConfigurationNameOverride,
                },
            }) => (
                    <ListWrapper
                        title="Configuration Types"
                        items={allConfigurationTypes}
                        mapPillProps={({ type }) => ({
                            title: type
                        })}
                        onCreate={({ }, { input }) => createConfigurationType({
                            type: input
                        })}
                        onUpdate={({ arguments: { nodeId } }, { input }) => updateConfigurationType({
                            nodeId,
                            type: input,
                        })}
                        onDelete={({ arguments: { nodeId } }) => deleteConfigurationType({
                            nodeId
                        })}
                        deleteModal={{
                            name: "Configuration Type"
                        }}
                    >
                        {({
                            nodeId,
                            id: configurationTypeId,
                            type,
                            door,
                            presentationLevel,
                            overrideLevel,
                            configurationTypePartTypes = [],
                            configurationNameOverrides = [],
                        }) => (
                                <HeadedContainer
                                    title={`Configuration Type - ${type}`}
                                >
                                    <Input
                                        label="Door"
                                        type="checkbox"
                                        checked={door}
                                        onChange={({ target: { checked } }) => updateConfigurationType({
                                            nodeId,
                                            door: checked,
                                        })}
                                    />
                                    <Input
                                        label="Presentation Level"
                                        type="number"
                                        initialValue={presentationLevel || 0}
                                        onBlur={({ target: { value } }) => updateConfigurationType({
                                            nodeId,
                                            presentationLevel: value,
                                        })}
                                    />
                                    <Input
                                        label="Override Level"
                                        type="number"
                                        initialValue={overrideLevel || 0}
                                        onBlur={({ target: { value } }) => updateConfigurationType({
                                            nodeId,
                                            overrideLevel: value,
                                        })}
                                    />
                                    <ListWrapper
                                        title={`Part Types - ${type}`}
                                        items={configurationTypePartTypes
                                            .map(({
                                                nodeId,
                                                partType,
                                            }) => ({
                                                configurationTypePartTypeNID: nodeId,
                                                ...partType
                                            }))}
                                        multiSelect={{
                                            allItems: allPartTypes,
                                        }}
                                        mapPillProps={({ type }) => ({
                                            title: type
                                        })}
                                        onCreate={({ id }) => createConfigurationTypePartType({
                                            configurationTypeId,
                                            partTypeId: id,
                                        })}
                                        onDelete={({ configurationTypePartTypeNID }) => deleteConfigurationTypePartType({
                                            nodeId: configurationTypePartTypeNID
                                        })}
                                        deleteModal={{
                                            name: `${type} Part Type`
                                        }}
                                    />
                                    <div className="unfinished">
                                        <ListWrapper
                                            title={`Name Overrides - ${type}`}
                                            items={configurationNameOverrides}
                                            mapPillProps={() => ({})}
                                        />
                                    </div>
                                </HeadedContainer>
                            )
                        }
                    </ListWrapper >
                )}
        </ApolloWrapper >
    );
}
