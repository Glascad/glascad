import gql from 'graphql-tag';

export default {
    mutation: gql`mutation DeleteSystemTypeDetailType(
        $nodeId:ID!
    ){
        deleteSystemTypeDetailType(input:{
            nodeId:$nodeId
        }){
            systemTypeDetailType{
                nodeId
                detailTypeId
                systemTypeId
                systemTypeBySystemTypeId{
                    nodeId
                }
            }
        }
    }`,
};
