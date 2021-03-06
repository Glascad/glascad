import gql from 'graphql-tag';
import F from '../../../../schemas';

export const updateEntireSystem = gql`
    mutation UpdateEntireSystem($system: EntireSystemInput!) {
        updateEntireSystem(input: {
            system: $system
        }) {
            system {
                ...EntireSystem
            }
        }
    }
    ${F.MNFG.ENTIRE_SYSTEM}
`;
