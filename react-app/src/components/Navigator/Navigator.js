import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Redirect,
    Route,
    Switch,
    withRouter,
} from 'react-router-dom';


const validatePath = path => path.replace(/\/+/g, '/');


class NavigatorChild extends Component {

    componentDidMount = () => this.props.updateCurrentRoute(this.props.index);

    render = () => this.props.children || "It looks like you found an invalid route";
}



class Navigator extends Component {

    state = {
        currentRoute: 0,
    };

    updateCurrentRoute = index => this.props.trackCurrentRoute !== false && this.setState({
        currentRoute: index,
    });

    render = () => {
        const {
            state: {
                currentRoute,
            },
            props: {
                location: {
                    pathname,
                    search,
                },
                match: {
                    path,
                    url,
                },
                parentPath,
                routes,
                children = (_, Children) => Children,
            },
            updateCurrentRoute,
        } = this;

        const previousIndex = currentRoute - 1;
        const nextIndex = currentRoute + 1;

        const previousRoute = routes[previousIndex] || {};
        const nextRoute = routes[nextIndex] || {};

        const previousLink = url + previousRoute.path;
        const nextLink = url + nextRoute.path;

        this.props.log && console.log(this);

        const redirectTo = validatePath(`${
            url
            }${
            routes[0].path
            }${
            search
            }`);

        if (
            currentRoute === -1
            &&
            pathname + search !== redirectTo
        ) {
            console.log({ redirectTo });
            return (
                <Redirect
                    to={redirectTo}
                />
            )
        } else {
            return (
                <Switch>
                    {routes.map(({ exact, component: RouteChild, ...route }, i) => (
                        <Route
                            key={route.path}
                            {...route}
                            exact={exact}
                            path={validatePath(`${
                                path
                                }${
                                route.path
                                }`)}
                            render={routerProps => children({
                                ...routerProps,
                                previousLink,
                                nextLink,
                            },
                                <NavigatorChild
                                    index={i}
                                    updateCurrentRoute={updateCurrentRoute}
                                >
                                    {RouteChild ?
                                        <RouteChild {...routerProps} />
                                        :
                                        route.render(routerProps)
                                    }
                                </NavigatorChild>
                            )}
                        />
                    ))}
                    <NavigatorChild
                        index={-1}
                        updateCurrentRoute={updateCurrentRoute}
                    />
                </Switch>
            );
        }
    }
}

export default withRouter(Navigator);
