import React from 'react';

import {
    NavLink,
    withRouter,
} from 'react-router-dom';

import Dropdown from '../../ui/Dropdown/Dropdown';

import './NavMenu.scss';

import { extractNavigationOptions } from '../../../utils';


function NavMenu({
    location: {
        pathname,
        search,
    },
    match: {
        path: matchedPath,
    },
    routeProps,
    routes,
    closed,
}) {
    // console.log(arguments[0]);
    return (
        <div className="NavMenu">
            {Object.entries(routes)
                .map(([name, route]) => extractNavigationOptions(name, route, {
                    ...arguments[0],
                    ...routeProps,
                }))
                .filter(({ shouldRender }) => shouldRender !== false)
                .map(({
                    exact,
                    name,
                    path,
                    subroutes
                }, i) => subroutes ? (
                    <Dropdown
                        key={i}
                        title={name}
                        open={closed === true ? false : pathname.includes(path) || undefined}
                        className={
                            pathname.includes(path) ?
                                'matched'
                                :
                                ''
                        }
                    >
                        {Object.entries(subroutes)
                            .map(([name, route]) => extractNavigationOptions(name, route, routeProps))
                            .filter(({ shouldRender }) => shouldRender !== false)
                            .map(({ name: childName, path: childPath }, j) => (
                                <NavLink
                                    key={j}
                                    isActive={(_, { pathname }) => exact ?
                                        pathname === `${matchedPath}${path}${childPath}`
                                        :
                                        pathname.includes(`${path}${childPath}`)
                                    }
                                    to={`${
                                        matchedPath
                                        }${
                                        path
                                        }${
                                        childPath
                                        }${
                                        search
                                        }`}
                                    activeClassName="matched"
                                >
                                    {childName}
                                </NavLink>
                            ))}
                    </Dropdown>
                ) : (
                            <NavLink
                                key={i}
                                isActive={(_, { pathname }) => exact ?
                                    pathname === `${matchedPath}${path}`
                                    :
                                    pathname.includes(path)
                                }
                                to={`${
                                    matchedPath
                                    }${
                                    path
                                    }${
                                    search}`}
                                className="item"
                                activeClassName="matched"
                            >
                                {name}
                            </NavLink>
                        )
                )}
        </div>
    );
}

export default withRouter(NavMenu);