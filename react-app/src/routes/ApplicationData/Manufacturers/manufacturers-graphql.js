import gql from 'graphql-tag';

export const query = gql`{
    allManufacturers{
        nodes{
            nodeId
            id
            name
        }
    }
}`;

export const create = {
    mutation: gql`mutation CreateManufacturer($name:String!){
        createManufacturer(input:{
            manufacturer:{
                name:$name
            }
        }){
            manufacturer{
                nodeId
                id
                name
            }
        }
    }`,
    update(cache, {
        data: {
            createManufacturer: {
                manufacturer
            }
        }
    }) {
        const { allManufacturers } = cache.readQuery({ query });
        cache.writeQuery({
            query,
            data: {
                allManufacturers: {
                    ...allManufacturers,
                    nodes: allManufacturers.nodes.concat(manufacturer)
                }
            }
        });
    }
};

export const update = {
    mutation: gql`mutation UpdateManufacturer(
        $nodeId:ID!,
        $name:String!
    ){
        updateManufacturer(input:{
            nodeId:$nodeId
            manufacturerPatch:{
                name:$name
            }
        }){
            manufacturer{
                nodeId
                id
                name
            }
        }
    }`,
}

export const _delete = {
    mutation: gql`mutation DeleteManufacturer($nodeId:ID!){
        deleteManufacturer(input:{
            nodeId:$nodeId
        }){
            manufacturer{
                nodeId
                id
                name
            }
        }
    }`,
    update(cache, {
        data: {
            deleteManufacturer: {
                manufacturer: {
                    nodeId: deletedNID
                }
            }
        }
    }) {
        const { allManufacturers } = cache.readQuery({ query });
        cache.writeQuery({
            query,
            data: {
                allManufacturers: {
                    ...allManufacturers,
                    nodes: allManufacturers.nodes.filter(({ nodeId }) => nodeId !== deletedNID)
                }
            }
        })
    }
};