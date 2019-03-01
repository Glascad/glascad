import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { StaticContext } from '../../../../../Statics/Statics';

import {
    TitleBar,
} from '../../../../../components';

import { parseSearch } from '../../../../../utils';

import calculatePlacement from '../ducks/calculate-placement';

import ElevationPreview from '../NewElevation/ElevationPreview';

export default class BuildElevation extends Component {

    static contextType = StaticContext;

    componentDidMount = () => this.context.sidebar.toggle(false);

    componentWillUnmount = () => this.context.sidebar.toggle(true);

    render = () => {
        const {
            props: {
                location: {
                    search,
                },
                match: {
                    path,
                },
                queryStatus: {
                    _elevation,
                },
            },
        } = this;

        const placedElevation = calculatePlacement(_elevation);

        console.log(this.props);

        console.log({
            _elevation,
            placedElevation,
        });

        return (
            <>
                <TitleBar
                    title="Build Elevation"
                    left={(
                        <Link
                            to={`${
                                path.replace(/build/, 'edit')
                                }${
                                search
                                }`}
                        >
                            <button>
                                Elevation Info
                            </button>
                        </Link>
                    )}
                />
                <ElevationPreview
                    elevation={placedElevation}
                />
            </>
        );
    }
}