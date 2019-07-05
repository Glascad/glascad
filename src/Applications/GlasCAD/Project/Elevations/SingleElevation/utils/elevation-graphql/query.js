import gql from 'graphql-tag';
import F from '../../../../../../../schema';

export default gql`
    query ElevationById($id: Int!) {
        elevationById(id: $id) {
            ...EntireElevation
        }
        systemById(id: 6) {
            ...EntireSystem
        }
    }
    ${F.EL_DATA.ENTIRE_ELEVATION}
    ${F.SYS_DATA.ENTIRE_SYSTEM}
`;

export const bugReportQuery = gql`
    {
        bugReports: getBugReports {
            id
            report
            username
            location
            timestamp
            state
        }
    }
`;
