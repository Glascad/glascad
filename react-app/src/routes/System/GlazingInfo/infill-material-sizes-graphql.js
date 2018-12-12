import gql from 'graphql-tag';
import { query } from './glazing-info-graphql';

export const create = {
    mutation: gql`mutation CreateSystemInfillSize(
        $systemId:Int!,
        $infillSize:Float!
    ){
        createSystemInfillSize(
            input:{
                systemInfillSize:{
                    systemId:$systemId,
                    infillSize:$infillSize
                }
            }
        ){
            systemInfillSize{
                nodeId
                infillSize
                infillSizeByInfillSize{
                    nodeId
                    size
                }
                systemBySystemId{
                    nodeId
                }
            }
        }
    }`,
    refetchQueries: ({
        data: {
            createSystemInfillSize: {
                systemInfillSize: {
                    systemBySystemId: {
                        nodeId
                    }
                }
            }
        }
    }) => [{ query, variables: { nodeId } }]
}