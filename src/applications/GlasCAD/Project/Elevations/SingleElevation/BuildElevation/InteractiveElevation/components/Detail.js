import React from 'react';

import { SelectionContext } from '../../contexts/SelectionContext';
import DetailBubble from './DetailBubble';

export default function Detail({
    detail,
    detail: {
        refId,
        vertical,
        _frame,
        class: RecursiveDetail,
        placement: {
            x,
            y,
            height,
            width,
        },
        firstContainer,
        secondContainer,
    },
}) {
    return (
        <SelectionContext.Consumer>
            {({
                items,
                items: {
                    0: firstItem,
                    length,
                },
                selectItem,
            }) => (
                    <div
                        id={refId}
                        className={`Detail ${
                            items.some(f => f.refId === _frame.refId) ?
                                'frame-selected'
                                :
                                firstContainer && items.some(c => c.refId === firstContainer.refId) ?
                                    'first-container-selected'
                                    :
                                    secondContainer && items.some(c => c.refId === secondContainer.refId) ?
                                        'second-container-selected'
                                        :
                                        ''
                            } ${
                            !length || typeof firstItem === 'string' || (
                                firstItem.class === RecursiveDetail
                                &&
                                firstItem.vertical === vertical
                            ) ?
                                'selectable'
                                :
                                ''
                            } ${
                            vertical ?
                                'vertical'
                                :
                                'horizontal'
                            }`}
                        style={{
                            left: vertical ?
                                x + width / 2
                                :
                                x,
                            bottom: vertical ?
                                y
                                :
                                y + height / 2,
                            height: vertical ?
                                height
                                :
                                1,
                            width: vertical ?
                                1
                                :
                                width,
                        }}
                        onClick={() => selectItem(_frame)}
                    >
                        <DetailBubble
                            detail={detail}
                        />
                    </div>
                )
            }
        </SelectionContext.Consumer >
    );
}
