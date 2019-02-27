import React, { Component } from 'react';

import SystemInfo from './SystemInfo/SystemInfo';
import GlazingInfo from './GlazingInfo/GlazingInfo';
import ValidTypes from './ValidTypes/ValidTypes';
import SystemOptions from './SystemOptions/SystemOptions';
// import InvalidCombinations from './InvalidCombinations/InvalidCombinations';

import {
    TabNavigator,
} from '../../../../components';

import { system as defaultSystem } from './system-manager/default-system';
import mergeSystemUpdate from './system-manager/merge-system-update';
import { _removeFakeIds } from './system-manager/system-actions';

const subroutes = {
    SystemInfo,
    GlazingInfo,
    ValidTypes,
    SystemOptions,
    // InvalidCombinations,
};

export default class SystemDatabase extends Component {

    static navigationOptions = {
        name: "Database",
        path: "/database",
        subroutes,
    };

    state = {
        system: defaultSystem,
    };

    updateSystem = (ACTION, payload) => this.setState(state => {
        const newState = ACTION(state, payload);
        console.log({ newState });
        return newState;
    });

    save = async () => {
        const {
            state: {
                system,
            },
            props: {
                queryStatus: {
                    _system: {
                        id,
                    } = {},
                },
                mutations: {
                    updateEntireSystem,
                },
            },
            reset,
        } = this;

        const update = _removeFakeIds(system);

        await updateEntireSystem({
            system: {
                ...update,
                id,
            },
        });

        reset();
    }

    reset = () => this.setState({ system: defaultSystem });

    render = () => {
        const {
            state: {
                system,
            },
            props: {
                queryStatus,
                mutations,
            },
            save,
            reset,
            updateSystem,
        } = this;

        const updatedSystem = mergeSystemUpdate(system, queryStatus);

        const routeProps = {
            queryStatus,
            mutations,
            system: updatedSystem,
            updateSystem,
        };

        return (
            <TabNavigator
                routeProps={routeProps}
                routes={subroutes}
            >
                <div className="bottom-buttons">
                    <button
                        className="empty"
                        onClick={reset}
                    >
                        Reset
                    </button>
                    <button
                        className="action"
                        onClick={save}
                    >
                        Save
                    </button>
                </div>
            </TabNavigator>
        );
    }
}