import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import './TabContainer.scss';



class TabContainerChild extends Component {

    componentDidMount = () => this.props.updateCurrentRoute(this.props.index);

    componentWillUnmount = () => this.props.completeMutations();

    render = () => this.props.children || "It looks like you found an invalid route";
}



export default class TabContainer extends Component {

    state = {
        currentRoute: -1,
    };

    updateCurrentRoute = index => this.setState({
        currentRoute: index,
    });

    render = () => {

        const {
            state: {
                currentRoute,
            },
            props: {
                title,
                path,
                url,
                buttons,
                routes,
                batcher: {
                    completeMutations,
                    resetMutations,
                },
            },
            updateCurrentRoute,
        } = this;

        const prevRoute = currentRoute - 1;
        const nextRoute = currentRoute + 1;

        const prevPath = (routes[prevRoute] || {}).path;
        const nextPath = (routes[nextRoute] || {}).path;

        return (
            <div className="TabContainer" >
                <header>
                    <h1>{title}</h1>
                    <div className="title-buttons">
                        {buttons}
                        <button
                            onClick={completeMutations}
                            className="primary"
                        >
                            Save
                        </button>
                    </div>
                </header>
                <div className="card">
                    <Switch>
                        {routes.map((route, i) => (
                            <Route
                                key={route.path}
                                {...route}
                                path={path + route.path}
                                render={routerProps => (
                                    <TabContainerChild
                                        completeMutations={completeMutations}
                                        index={i}
                                        updateCurrentRoute={updateCurrentRoute}
                                    >
                                        {route.render ?
                                            route.render(routerProps)
                                            :
                                            <route.component {...routerProps} />
                                        }
                                    </TabContainerChild>
                                )}
                            />
                        ))}
                        <TabContainerChild
                            completeMutations={completeMutations}
                            index={-1}
                            updateCurrentRoute={updateCurrentRoute}
                            route={{
                                render: () => "It looks like nothing was matched",
                            }}
                        />
                    </Switch>
                    <div
                        className="bottom-buttons"
                    >
                        <button
                            className="empty"
                            onClick={resetMutations}
                        >
                            Reset
                        </button>
                        <div
                            className="buttons-right"
                        >
                            {prevPath ? (
                                <Link
                                    to={url + prevPath}
                                >
                                    <button
                                        className="empty"
                                    >
                                        Previous
                                    </button>
                                </Link>
                            ) : null}
                            {nextPath ? (
                                <Link
                                    to={url + nextPath}
                                >
                                    <button
                                        className="primary"
                                    >
                                        Next
                                    </button>
                                </Link>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
