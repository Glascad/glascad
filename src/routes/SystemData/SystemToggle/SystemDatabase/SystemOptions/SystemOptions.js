import React from 'react';

import {
    HeadedContainer,
    Input,
    ListWrapper,
} from '../../../../../components';
import TitleBar from '../../../../../components/ui/TitleBar/TitleBar';

export default function SystemOptions({
    queryStatus: {
        system: {
            id: systemId,
            systemOptions = [],
        } = {},
        allConfigurationTypes = [],
    },
    mutations: {
        createSystemOption,
        updateSystemOption,
        deleteSystemOption,
        createSystemOptionConfigurationType,
        deleteSystemOptionConfigurationType,
        createOptionValue,
        deleteOptionValue,
    }
}) {
    return (
        <ListWrapper
            title="System Options"
            items={systemOptions}
            mapPillProps={({
                name
            }) => ({
                title: name
            })}
            onCreate={({ }, { input }) => createSystemOption({
                systemId,
                name: input,
            })}
            onUpdate={({ arguments: { nodeId } }, { input }) => updateSystemOption({
                nodeId,
                name: input,
            })}
            onDelete={({ arguments: { nodeId } }) => ({
                nodeId,
            })}
        >
            {({
                nodeId,
                id: systemOptionId,
                name,
                presentationLevel,
                overrideLevel,
                systemOptionConfigurationTypes = [],
                optionValues = [],
            }) => (
                    <>
                        <TitleBar
                            title="Option"
                            selections={[name]}
                        />
                        {/* <Input
                                label="Option Name"
                                value={name}
                                onChange={({ target: { value } }) => updateSystemOption({
                                    nodeId,
                                    name: value
                                })}
                            /> */}
                        <div className="input-group">
                            <Input
                                label="Presentation Level"
                                value={presentationLevel}
                                select={{
                                    value: {
                                        label: presentationLevel,
                                        value: presentationLevel,
                                    },
                                    options: [1, 2, 3, 4].map(n => ({
                                        value: n,
                                        label: n,
                                    })),
                                    onChange: ({ value }) => updateSystemOption({
                                        nodeId,
                                        presentationLevel: value
                                    })
                                }}
                            />
                            <Input
                                label="Override Level"
                                value={overrideLevel}
                                select={{
                                    value: {
                                        label: overrideLevel,
                                        value: overrideLevel,
                                    },
                                    options: [1, 2, 3, 4].map(n => ({
                                        value: n,
                                        label: n,
                                    })),
                                    onChange: ({ value }) => updateSystemOption({
                                        nodeId,
                                        overrideLevel: value
                                    })
                                }}
                            />
                        </div>
                        {/* <Input
                            label="Mirrorable"
                            checked={mirrorable}
                            type="checkbox"
                            onChange={({ target: { checked } }) => updateSystemOption({
                                nodeId,
                                mirrorable: checked
                            })}
                        /> */}
                        <ListWrapper
                            title="Affected Configuration Types"
                            items={systemOptionConfigurationTypes
                                .map(({ nodeId, configurationType }) => ({
                                    systomOptionConfigurationTypeNID: nodeId,
                                    ...configurationType,
                                }))}
                            mapPillProps={({ type }) => ({
                                title: type
                            })}
                            onCreate={configurationType => createSystemOptionConfigurationType({
                                systemOptionId,
                                configurationTypeId: configurationType.id,
                                configurationType
                            })}
                            onDelete={({ systomOptionConfigurationTypeNID, ...configurationType }) => deleteSystemOptionConfigurationType({
                                nodeId: systomOptionConfigurationTypeNID,
                                systemOptionId,
                                configurationTypeId: configurationType.id,
                                configurationType,
                            })}
                            multiSelect={{
                                title: "",
                                // initialItems: [],
                                allItems: allConfigurationTypes,
                            }}
                        />
                        <div className="unfinished">
                            <ListWrapper
                                title="Values"
                                items={optionValues}
                                mapPillProps={({ name }) => ({
                                    title: name
                                })}
                                onCreate={({ }, { input }) => createOptionValue({
                                    systemOptionId,
                                    name: input
                                })}
                            />
                        </div>
                    </>
                )}
        </ListWrapper>
    );
}