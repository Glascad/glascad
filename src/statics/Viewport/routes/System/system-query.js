import gql from 'graphql-tag';

export default gql`query System($systemNID: ID!){
    system(nodeId: $systemNID){
        id
        name
        depth
        defaultSightline
        shimSize
        defaultGlassSize
        defaultGlassBite
        manufacturerByManufacturerId{
            nodeId
            id
            name
        }
        systemTypeBySystemTypeId{
            nodeId
            id
            type
        }
        systemTypeDetailTypesBySystemTypeId{
            nodes{
                nodeId
                    detailTypeByDetailTypeId{
                        nodeId
                        id
                        type
                        entrance
                        vertical
                        systemTypeDetailTypeConfigurationTypesByDetailTypeId{
                            nodes{
                                nodeId
                                required
                                mirrorable
                                configurationTypeByConfigurationTypeId{
                                nodeId
                                type
                                door
                                presentationLevel
                                overrideLevel
                            }
                        }
                    }
                }
            }
        }
        invalidSystemConfigurationTypesBySystemId{
            nodes{
                nodeId
                invalidConfigurationTypeId
            }
        }
        systemConfigurationOverridesBySystemId{
            nodes{
                nodeId
                requiredOverride
                mirrorableOverride
                detailTypeId
                configurationTypeId
            }
        }
        systemSystemTagsBySystemId{
            nodes{
                nodeId
                systemTagBySystemTagId{
                    nodeId
                    id
                    type
                }
            }
        }
        systemInfillSizesBySystemId{
            nodes{
                nodeId
                infillSize
            }
        }
        systemInfillPocketTypesBySystemId{
            nodes{
                nodeId
                infillPocketTypeByInfillPocketTypeId{
                    nodeId
                    id
                    type
                    captured
                    description
                }
            }
        }
        systemInfillPocketSizesBySystemId{
            nodes{
                nodeId
                infillPocketSize
            }
        }
        systemOptionsBySystemId{
            nodes{
                nodeId
                id
                name
                mirrorable
                presentationLevel
                overrideLevel
                optionOrder
                optionValuesBySystemOptionId{
                    nodes{
                        nodeId
                        id
                        name
                        value
                        valueOrder
                    }
                }
                systemOptionConfigurationTypesBySystemOptionId{
                    nodes{
                        nodeId
                        configurationTypeByConfigurationTypeId{
                            nodeId
                            id
                            type
                        }
                    }
                }
            }
        }
    }
}`