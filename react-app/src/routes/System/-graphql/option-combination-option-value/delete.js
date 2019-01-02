import gql from 'graphql-tag';
import query from '../query';

export default {
    mutation: gql`mutation DeleteOptionCombinationOptionValue(
            $nodeId:ID!
        ){
            deleteOptionCombinationOptionValue(
                input:{
                    nodeId:$nodeId
                }
            ){
            }
        }`,
    // mapResultToProps: ({
    //     nodeId,
    //     systemId,
    //     invalidConfigurationTypeId,
    // }, {
    //     invalidSystemConfigurationTypes,
    // }) => {
    //     return {
    //         invalidSystemConfigurationTypes: invalidSystemConfigurationTypes
    //             .filter(invalid => invalid.nodeId !== nodeId && (
    //                 invalid.systemId !== systemId
    //                 ||
    //                 invalid.invalidConfigurationTypeId !== invalidConfigurationTypeId
    //             ))
    //     };
    // },
};
