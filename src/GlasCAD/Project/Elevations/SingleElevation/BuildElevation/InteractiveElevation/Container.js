import React from 'react';

import { SelectionContext } from '../SelectionContext';

export default function Container({
    container: {
        x,
        y,
        height,
        width,
        refId,
    },
}) {
    return (
        <SelectionContext.Consumer>
            {({
                selection: {
                    items,
                    handleMouseDown,
                },
            }) => (
                    <g>
                        <rect
                            id={refId}
                            x={x}
                            y={y}
                            height={height}
                            width={width}
                            fill={`rgba(0, 191, 255, ${
                                items.includes(refId) ?
                                    0.5
                                    :
                                    0.1
                                })`}
                            onMouseDown={handleMouseDown}
                        />
                        <text
                            x={x + 10}
                            y={-(y + 10)}
                            transform="scale(1, -1)"
                        >
                            {refId.replace(/\D*/, '*')}
                        </text>
                    </g>
                )}
        </SelectionContext.Consumer>
    );
}