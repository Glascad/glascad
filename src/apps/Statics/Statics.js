import React, { createContext, createRef, PureComponent, useContext, useEffect } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { DoubleArrow, Navigator, NavMenu, withContext } from '../../components';
import { AuthContext } from '../../http/AuthContext';
import { extractNavigationOptions, normalCase } from '../../utils';
import './Statics.scss';

export const StaticContext = createContext();

export const useCollapseSidebar = () => {
    const { sidebar: { toggle } } = useContext(StaticContext);
    useEffect(() => {
        toggle(false);
        return () => toggle(true);
    }, []);
}

class Statics extends PureComponent {

    state = {
        open: true,
    };

    Viewport = createRef();

    toggle = open => typeof open === 'boolean' ?
        this.setState({ open })
        :
        this.setState({ open: !this.state.open });

    render = () => {
        const {
            state: {
                open,
            },
            props,
            props: {
                AUTH: {
                    currentUser: {
                        username,
                    } = {},
                    logout,
                },
                match: {
                    path,
                },
                initialRoute,
                routes,
                allowedApplications,
            },
            toggle,
            getPathTo,
            Viewport,
        } = this;

        return (
            <StaticContext.Provider
                value={{
                    sidebar: {
                        open,
                        toggle,
                    },
                    routes,
                    getPathTo,
                    Viewport,
                }}
            >
                <div
                    id="Sidebar"
                    className={open ? "" : "closed"}
                    onClick={e => e.stopPropagation()}
                    onKeyDown={e => e.stopPropagation()}
                    onMouseDown={e => e.stopPropagation()}
                    onWheel={e => e.stopPropagation()}
                >
                    <Link
                        id="sidebar-header"
                        to={path}
                    >
                        <Logo className="logo" />
                        <span>glascad</span>
                    </Link>
                    <NavMenu
                        routeProps={props}
                        routes={routes}
                        closed={!open}
                    />
                    <DoubleArrow
                        onClick={toggle}
                    />
                    <div className="bottom-buttons">
                        {Object.entries(allowedApplications)
                            .filter((_, __, { length }) => length > 1)
                            .map(([name, route]) => extractNavigationOptions(name, route))
                            .map(({ name, path }) => (
                                <NavLink
                                    key={path}
                                    to={path}
                                    activeClassName="disabled"
                                >
                                    <button className="light">
                                        {normalCase(name)}
                                    </button>
                                </NavLink>
                            ))}
                        <div id="current-user">
                            <div>
                                {username}
                            </div>
                            {username ? (
                                <button
                                    className="empty light"
                                    onClick={logout}
                                >
                                    Logout
                            </button>
                            ) : null}
                        </div>
                    </div>
                </div>
                <div
                    id="viewport"
                    ref={Viewport}
                >
                    <Navigator
                        initialRoute={initialRoute}
                        routes={routes}
                    />
                </div>
            </StaticContext.Provider>
        );
    }
}

export default withContext(AuthContext, ({ context }) => ({ AUTH: context }))(withRouter(Statics));