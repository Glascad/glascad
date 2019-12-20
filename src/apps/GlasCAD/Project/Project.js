import React from 'react';
import { Redirect } from 'react-router-dom';
import { ApolloWrapper, Ellipsis, Navigator, useQuery } from '../../../components';
import { parseSearch } from '../../../utils';
import Elevations from './Elevations/Elevations';
import query from './project-graphql/query';
import ProjectSets from './ProjectSets/ProjectSets';

const subroutes = {
    ProjectSets,
    Elevations,
};

Project.navigationOptions = ({
    location: {
        search,
    },
}) => ({
    requiredURLParams: ['projectId'],
    subroutes,
    path: "/project",
    name: (
        <ApolloWrapper
            query={{
                query,
                variables: {
                    id: +parseSearch(search).projectId,
                },
            }}
        >
            {({
                queryResult: {
                    _project: {
                        name = '',
                    } = {},
                } = {},
            }) => name || (
                <Ellipsis />
            )}
        </ApolloWrapper>
    ),
});

export default function Project({
    match: {
        path,
    },
    location: {
        search,
    },
}) {
    const [fetchQuery, queryResult] = useQuery({
        query,
        variables: {
            id: +parseSearch(search).projectId,
        },
    });

    if (!parseSearch(search).projectId) return (
        <Redirect
            to={path.replace(/project.*/, 'main-menu')}
        />
    );

    return (
        <Navigator
            routeProps={{ queryResult }}
            routes={subroutes}
        />
    );
};
