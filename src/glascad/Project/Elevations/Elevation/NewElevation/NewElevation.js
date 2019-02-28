import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import {
    TitleBar,
    Input,
    GroupingBox,
} from '../../../../../components';

import ElevationPreview from './ElevationPreview';

import calculatePlacement from './ducks/calculate-placement';
import createElevation from './ducks/create';

const defaultElevationInput = {
    verticalLock: false,
    horizontalLock: false,
    verticalRoughOpening: 360,
    horizontalRoughOpening: 180,
    startingBayQuantity: 1,
    finishedFloorHeight: 0,
    sightline: 10,
    defaultBayWidth: 160,
};

export default class NewElevation extends Component {

    state = {
        elevation: defaultElevationInput,
    };

    reset = () => this.setState({ elevation: defaultElevationInput });

    updateElevation = update => console.log({ update, state: this.state }) || this.setState(({
        elevation,
        elevation: {
            horizontalLock,
            horizontalRoughOpening,
            startingBayQuantity,
            sightline,
        },
    }) => ({
        elevation: {
            ...elevation,
            ...(
                (horizontalLock
                    ||
                    (
                        update.startingBayQuantity === undefined
                        ||
                        update.startingBayQuantity === startingBayQuantity
                    )
                ) ?
                    update
                    :
                    {
                        ...update,
                        horizontalRoughOpening: update.startingBayQuantity > startingBayQuantity ?
                            horizontalRoughOpening + sightline + (
                                horizontalRoughOpening - sightline * (startingBayQuantity + 1)
                            ) / startingBayQuantity
                            :
                            horizontalRoughOpening - sightline - (
                                horizontalRoughOpening - sightline * (startingBayQuantity + 1)
                            ) / startingBayQuantity,
                    }
            ),
        },
    }));

    save = () => { };

    render = () => {
        const {
            state: {
                elevation: elevationInput,
                elevation: {
                    name,
                    verticalLock,
                    horizontalLock,
                    verticalRoughOpening,
                    horizontalRoughOpening,
                    startingBayQuantity,
                    finishedFloorHeight,
                    defaultBayWidth,
                },
            },
            props: {
                location: {
                    search,
                },
                match: {
                    path,
                },
            },
            cancel,
            reset,
            save,
            updateElevation,
        } = this;

        const elevation = calculatePlacement(createElevation(elevationInput));

        console.log(this);

        return (
            <>
                <TitleBar
                    title="New Elevation"
                    selections={[name]}
                    right={(
                        <Link
                            to={`${path.replace(/\/elevation\/new-elevation/, '')}${search}`}
                        >
                            <button className="action">
                                Cancel
                            </button>
                        </Link>
                    )}
                />
                <div className="card">
                    <Input
                        label="Elevation Id"
                        value={name}
                        onChange={({ target: { value } }) => updateElevation({
                            name: value,
                        })}
                    />
                    <div className="unfinished">
                        <Input
                            label="System Set"
                        />
                    </div>
                    <GroupingBox
                        title="Rough Opening"
                    >
                        <div className="input-group">
                            <Input
                                label="Vertical"
                                type="number"
                                min={0}
                                value={verticalRoughOpening}
                                onChange={({ target: { value } }) => updateElevation({
                                    verticalRoughOpening: +value,
                                })}
                            />
                            <Input
                                label="Lock"
                                type="checkbox"
                                checked={verticalLock}
                                onChange={({ target: { checked } }) => updateElevation({
                                    verticalLock: checked,
                                })}
                            />
                        </div>
                        <div className="input-group">
                            <Input
                                label="Horizontal"
                                type="number"
                                min={0}
                                value={horizontalRoughOpening}
                                onChange={({ target: { value } }) => updateElevation({
                                    horizontalRoughOpening: +value,
                                })}
                            />
                            <Input
                                label="Lock"
                                type="checkbox"
                                checked={horizontalLock}
                                onChange={({ target: { checked } }) => updateElevation({
                                    horizontalLock: checked,
                                })}
                            />
                        </div>
                    </GroupingBox>
                    <Input
                        label="Starting Bay Quantity"
                        type="number"
                        min={1}
                        value={startingBayQuantity}
                        onChange={({ target: { value } }) => updateElevation({
                            startingBayQuantity: +value,
                        })}
                    />
                    <Input
                        label="Height Above Finished Floor"
                        type="number"
                        min={0}
                        value={finishedFloorHeight}
                        onChange={({ target: { value } }) => updateElevation({
                            finishedFloorHeight: +value,
                        })}
                    />
                    <ElevationPreview
                        elevation={elevation}
                    />
                </div>
            </>
        );
    }
}
