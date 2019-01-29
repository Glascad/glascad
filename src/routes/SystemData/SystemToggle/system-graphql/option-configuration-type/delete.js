import gql from 'graphql-tag';
import query from '../query';

export default {
    mutation: gql`mutation DeleteSystemOptionConfigurationType(
        $nodeId:ID!
    ){
        deleteSystemOptionConfigurationType(
            input:{
                nodeId:$nodeId
            }
        ){
            systemOptionConfigurationType{
                nodeId
                systemOptionId
                systemOptionBySystemOptionId{
                    nodeId
                    systemBySystemId{
                        nodeId
                    }
                }
                configurationTypeId
                configurationTypeByConfigurationTypeId{
                    nodeId
                }
            }
        }
    }`,
    mapResultToProps: ({ systemOptionId, nodeId }, {
        system,
        system: {
            systemOptions,
        }
    }) => ({
        system: {
            ...system,
            systemOptions: systemOptions
                .map(option => option.id === systemOptionId ?
                    {
                        ...option,
                        systemOptionConfigurationTypesBySystemOptionId: {
                            ...option.systemOptionConfigurationTypesBySystemOptionId,
                            nodes: option.systemOptionConfigurationTypesBySystemOptionId.nodes.filter(soct => soct.nodeId !== nodeId)
                        }
                    }
                    :
                    option)
        }
    }),
};