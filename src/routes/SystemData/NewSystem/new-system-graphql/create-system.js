import gql from 'graphql-tag';

export default {
    mutation: gql`mutation CreateSystem(
        $name:String!,
        $manufacturerId:Int,
        $systemTypeId:Int,
        $depth:Float,
        $defaultSightline:Float,
        $shimSize:Float,
        $defaultGlassSize:Float,
        $defaultGlassBite:Float
    ){
        createSystem(
            input:{
                system:{
                    name:$name,
                    manufacturerId:$manufacturerId,
                    systemTypeId:$systemTypeId,
                    depth:$depth,
                    defaultSightline:$defaultSightline,
                    shimSize:$shimSize,
                    defaultGlassSize:$defaultGlassSize,
                    defaultGlassBite:$defaultGlassBite
                }
            }
        ){
            system{
                nodeId
                id
                name
                depth
                defaultSightline
                shimSize
                defaultGlassSize
                defaultGlassBite
                manufacturerId
                systemTypeId
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
                systemSystemTagsBySystemId{
                    nodes{
                        nodeId
                        systemTagBySystemTagId{
                            nodeId
                            id
                            tag
                        }
                    }
                }
            }
        }
    }`,
    mapResultToProps: (newSystem, { system }) => ({
        system: {
            ...system,
            ...newSystem,
        }
    })
};