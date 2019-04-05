import React, { PureComponent, createRef } from 'react';

import { StaticContext } from '../../../../../../../Statics/Statics';
import { TransformContext } from '../contexts/TransformContext';

import Container from './components/Container';
import Frame from './components/Frame';
import FinishedFloor from './components/FinishedFloor';
import DimensionButton from './components/DimensionButton';

import './InteractiveElevation.scss';
import SelectionLayer from './components/SelectionLayer';
import { DIRECTIONS } from '../../utils/recursive-elevation/directions';
import MERGE_CONTAINERS from '../ducks/actions/merge-containers';

export default class InteractiveElevation extends PureComponent {

    static contextType = StaticContext;

    InteractiveElevation = createRef();

    componentDidMount = () => {
        try {
            this.previousViewportStyles = {
                paddingBottom: this.context.Viewport.current.style.paddingBottom,
                marginBottom: this.context.Viewport.current.style.marginBottom,
                overflowY: this.context.Viewport.current.style.overflowY,
            };
        } catch (err) {
            console.error(err);
        }
        this.resizeViewport();

        window.addEventListener('resize', this.resizeViewport);
    }

    resizeViewport = () => {
        setTimeout(() => {
            try {
                console.log(this.context.Viewport);
                this.context.Viewport.current.style.paddingBottom = "0";
                this.context.Viewport.current.style.marginBottom = "0";
                this.context.Viewport.current.style.overflowY = "hidden";
                this.InteractiveElevation.current.style.height = `${
                    window.innerHeight
                    -
                    this.InteractiveElevation.current.offsetTop
                    -
                    48}px`;
            } catch (err) {
                console.error(err);
            }
        });
    }

    componentWillUnmount = () => {
        try {
            this.context.Viewport.current.style.paddingBottom = this.previousViewportStyles.paddingBottom;
            this.context.Viewport.current.style.marginBottom = this.previousViewportStyles.marginBottom;
            this.context.Viewport.current.style.overflowY = this.previousViewportStyles.overflowY;
        } catch (err) {
            console.error(err);
        }
        window.removeEventListener('resize', this.resizeViewport);
    }

    componentDidUpdate = ({ elevation: oldElevation }) => {
        const {
            props: {
                elevation: newElevation,
                elevation: {
                    allContainers
                },
                updateElevation,
            },
        } = this;

        if (oldElevation !== newElevation) {

            const { containerToMerge, directionToMerge } = allContainers
                .reduce(({ containerToMerge, directionToMerge }, container) => {
                    if (containerToMerge) return { containerToMerge, directionToMerge };

                    if (container.customRoughOpening) {

                        const direction = Object.values(DIRECTIONS)
                            .find(direction => (
                                container.canMergeByDirection(...direction, true)
                                &&
                                container.getImmediateContainersByDirection(...direction)[0].customRoughOpening
                            ));

                        if (direction) {
                            return {
                                containerToMerge: container,
                                directionToMerge: direction,
                            };
                        }
                    }
                    return {};
                }, {});

            if (containerToMerge) {
                updateElevation(MERGE_CONTAINERS, {
                    container: containerToMerge,
                    direction: directionToMerge,
                    allowCustomRoughOpenings: true,
                });
            }
        }
    }

    render = () => {
        const {
            props: {
                elevation: {
                    allContainers = [],
                    allFrames = [],
                    roughOpening: {
                        x: rox = 0,
                        y: roy = 0,
                    } = {},
                    finishedFloorHeight,
                    verticalContainerDimensionTracks = [],
                    horizontalContainerDimensionTracks = [],
                },
            },
        } = this;

        return (
            <TransformContext.Consumer>
                {({
                    scale: {
                        nudgeAmount: scaleNudge,
                        x: scaleX,
                        y: scaleY,
                    },
                    translate: {
                        nudgeAmount,
                        x,
                        y,
                    },
                    watchMouseDown,
                }) => (
                        <div
                            id="InteractiveElevation"
                            ref={this.InteractiveElevation}
                            onMouseDown={watchMouseDown}
                        >
                            <div
                                id="elevation-display"
                                style={{
                                    height: roy,
                                    width: rox,
                                    transform: `translate(${x}px, ${y - finishedFloorHeight}px) scale(${scaleX}, ${scaleY})`,
                                }}
                            >
                                {/* ROUGH OPENING */}
                                {/* <div /> */}
                                {/* CONTAINERS */}
                                {allContainers.map(container => (
                                    <Container
                                        key={container.refId}
                                        container={container}
                                    />
                                ))}
                                {/* FRAMES */}
                                {allFrames.map(_frame => (
                                    <Frame
                                        key={_frame.refId}
                                        _frame={_frame}
                                    />
                                ))}
                                {/* FINISHED FLOOR */}
                                <FinishedFloor
                                    finishedFloorHeight={finishedFloorHeight}
                                />
                                {/* SELECTION */}
                                <SelectionLayer />
                                {/* VERTICAL DIMENSIONS */}
                                <div id="left-dimension-track">
                                    {verticalContainerDimensionTracks.map((track, i) => (
                                        <div key={i}>
                                            {track.map(dimension => (
                                                <DimensionButton
                                                    key={dimension.refId}
                                                    track={i}
                                                    dimension={dimension}
                                                />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                                {/* HORIZONTAL DIMENSIONS */}
                                <div id="bottom-dimension-track">
                                    {horizontalContainerDimensionTracks.map((track, i) => (
                                        <div key={i}>
                                            {track.map(dimension => (
                                                <DimensionButton
                                                    key={dimension.refId}
                                                    track={i}
                                                    dimension={dimension}
                                                    finishedFloorHeight={finishedFloorHeight}
                                                />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
            </TransformContext.Consumer>
        );
    }
}
