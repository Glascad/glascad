import React, {
    useState,
    useEffect,
} from 'react';

import {
    Input,
    TitleBar,
    withContext,
} from '../../components';

import { AuthenticationContext } from './Authentication';

import Statics, { StaticContext } from '../Statics/Statics';

import LoginSplash from '../../assets/images/Login Splash.jpeg';

import './Login.scss';

function Login({
    AUTH: {
        authenticating,
        login,
        logout,
    },
    staticContext,
    staticContext: {
        Viewport,
        sidebar: {
            toggle,
        },
    },
}) {

    console.log({ staticContext });

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        toggle(false);
        return () => toggle(true);
    }, []);

    return (
        <>
            <img
                id="login-splash"
                src={LoginSplash}
            />
            <div className="floating card">
                {authenticating ? (
                    <TitleBar
                        title="Authenticating..."
                    />
                ) : (
                        <>
                            <TitleBar
                                title="Login"
                            />
                            <Input
                                label="username"
                                value={username}
                                onChange={({ target: { value } }) => setUsername(value)}
                            />
                            <Input
                                label="password"
                                type="password"
                                value={password}
                                onChange={({ target: { value } }) => setPassword(value)}
                            />
                            <div className="bottom-buttons">
                                <button
                                    className="action"
                                    onClick={() => login({ username, password })}
                                >
                                    Login
                            </button>
                            </div>
                        </>
                    )}
            </div>
        </>
    );
}

const LoginWithContext = withContext(
    AuthenticationContext,
    ({ context }) => ({ AUTH: context }),
)(
    withContext(
        StaticContext,
        ({ context }) => ({ staticContext: context }),
    )(Login),
);

export default () => (
    <Statics
        routes={{
            Login: LoginWithContext,
        }}
    />
);
