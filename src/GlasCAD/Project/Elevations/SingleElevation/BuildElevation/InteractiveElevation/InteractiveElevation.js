import React, { Component, createRef } from 'react';

import { StaticContext } from '../../../../../../Statics/Statics';
import { TransformContext } from '../TransformContext';

import Container from './Container';
import Frame from './Frame';
import FinishedFloor from './FinishedFloor';
import DimensionButton from './DimensionButton';

import './InteractiveElevation.scss';

export default class InteractiveElevation extends Component {

    static contextType = StaticContext;

    InteractiveElevation = createRef();

    componentDidMount = () => {
        setTimeout(() => {
            console.log(this.context.Viewport);
            this.context.Viewport.current.style.paddingBottom = "0";
            this.InteractiveElevation.current.style.height = `${
                window.innerHeight
                -
                this.InteractiveElevation.current.offsetTop
                -
                24}px`;
        });
    }

    render = () => {
        const {
            props: {
                elevation: {
                    placedContainers = [],
                    placedFrames = [],
                    roughOpening: {
                        x: rox = 0,
                        y: roy = 0,
                    } = {},
                    finishedFloorHeight,
                    containerDimensions: {
                        verticals = [],
                        horizontals = [],
                    },
                },
            },
        } = this;

        return (
            <TransformContext.Consumer>
                {({
                    scale,
                    translate: {
                        x,
                        y,
                    },
                    watchMouseDown,
                }) => (
                        <div
                            id="InteractiveElevation"
                            ref={this.InteractiveElevation}
                        >
                            <svg
                                id="Elevation"
                                width={rox + 20}
                                height={roy + finishedFloorHeight + 20}
                                viewBox={`-10 ${-finishedFloorHeight - 10} ${rox + 10} ${roy + 10}`}
                                transform='scale(1, -1)'
                                onMouseDown={watchMouseDown}
                            >
                                <g
                                    transform={`scale(${scale}, ${scale}) 
                                        translate(${x}, ${-y})`}
                                >
                                    {/* ROUGH OPENING */}
                                    {/* <rect
                                        width={x}
                                        height={y}
                                        x={0}
                                        y={finishedFloorHeight}
                                        // fill="rgba(127, 191, 255, 0.25)"
                                        fill="rgba(0, 0, 0, 0)"
                                        stroke="black"
                                    /> */}
                                    {/* FINISHED FLOOR */}
                                    <FinishedFloor
                                        finishedFloorHeight={finishedFloorHeight}
                                    />
                                    {/* CONTAINERS */}
                                    {placedContainers.map(container => (
                                        <Container
                                            key={container.refId}
                                            container={container}
                                            finishedFloorHeight={finishedFloorHeight}
                                        />
                                    ))}
                                    {/* FRAMES */}
                                    {placedFrames.map(_frame => (
                                        <Frame
                                            key={_frame.refId}
                                            _frame={_frame}
                                            finishedFloorHeight={finishedFloorHeight}
                                        />
                                    ))}
                                    {/* </g> */}
                                    {/* </svg> */}
                                    {/* <svg
                                id="VerticalDimensions"
                                width={120}
                                height={roy + finishedFloorHeight + 20}
                                viewBox={`-10 ${-finishedFloorHeight - 10} 110 ${roy + 10}`}
                                transform='scale(1, -1)'
                                onMouseDown={watchMouseDown}
                            > */}
                                    <g
                                        id="VerticalDimensions"
                                    >
                                        {/* VERTICAL DIMENSIONS */}
                                        {verticals.map(dimension => (
                                            <DimensionButton
                                                key={dimension.refId}
                                                dimension={dimension}
                                                vertical={true}
                                            />
                                        ))}
                                    </g>
                                    {/* </svg> */}
                                    {/* <svg
                                id="HorizontalDimensions"
                                width={rox + 20}
                                height={120}
                                viewBox={`-10 110 ${rox + 10} 110`}
                                transform='scale(1, -1)'
                                onMouseDown={watchMouseDown}
                            > */}
                                    <g
                                        id="HorizontalDimensions"
                                    >
                                        {/* HORIZONTAL DIMENSIONS */}
                                        {horizontals.map(dimension => (
                                            <DimensionButton
                                                key={dimension.refId}
                                                dimension={dimension}
                                                vertical={false}
                                            />
                                        ))}
                                    </g>
                                </g>
                            </svg>
                        </div>
                    )}
            </TransformContext.Consumer>
        );
    }
}