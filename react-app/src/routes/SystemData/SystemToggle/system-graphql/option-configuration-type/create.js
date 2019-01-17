import gql from 'graphql-tag';
import query from '../query';

export default {
    mutation: gql`mutation CreateSystemOptionConfigurationType(
            $systemOptionId:Int!,
            $configurationTypeId:Int!
        ){
            createSystemOptionConfigurationType(
                input:{
                    systemOptionConfigurationType:{
                        systemOptionId:$systemOptionId,
                        configurationTypeId:$configurationTypeId
                    }
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
    mapResultToProps: (newSystemOptionConfigurationType, { systemOptions }) => ({
        systemOptions: systemOptions
            .map(option => option.id === newSystemOptionConfigurationType.systemOptionId ?
                {
                    ...option,
                    systemOptionConfigurationTypesBySystemOptionId: {
                        ...option.systemOptionConfigurationTypesBySystemOptionId,
                        nodes: option.systemOptionConfigurationTypesBySystemOptionId.nodes.concat(newSystemOptionConfigurationType)
                    }
                }
                :
                option)
    }),
    refetchQueries: ({
        data: {
            createSystemOptionConfigurationType: {
                systemOptionConfigurationType: {
                    systemOptionBySystemOptionId: {
                        systemBySystemId: {
                            nodeId
                        }
                    }
                }
            }
        }
    }) => [{ ...query, variables: { nodeId } }]
};
