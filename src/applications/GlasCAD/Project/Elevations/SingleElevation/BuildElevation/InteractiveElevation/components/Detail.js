import React, { PureComponent } from 'react';

import DetailBubble from './DetailBubble';

export default class Detail extends PureComponent {

    handleClick = () => this.props.selectItem(this.props.detail);

    render = () => {
        const {
            props: {
                itemsByRefId,
                detail,
                detail: {
                    refId,
                    vertical,
                    _frame: {
                        refId: frameRefId,
                    } = {},
                    placement: {
                        x,
                        y,
                        height,
                        width,
                    },
                    firstContainer,
                    firstContainer: {
                        refId: firstContainerRefId,
                    } = {},
                    secondContainer: {
                        refId: secondContainerRefId,
                    } = {},
                },
            },
            handleClick,
        } = this;

        return (
            <div
                id={refId}
                className={`Detail ${
                    frameRefId in itemsByRefId ?
                        'frame-selected'
                        :
                        firstContainerRefId in itemsByRefId ?
                            'first-container-selected'
                            :
                            secondContainerRefId in itemsByRefId ?
                                'second-container-selected'
                                :
                                ''
                    } ${
                    firstContainer ?
                        ''
                        :
                        'no-first-container'
                    } ${
                    vertical ?
                        'vertical'
                        :
                        'horizontal'
                    }`}
                style={{
                    left: ~~x,
                    bottom: ~~y,
                    height: ~~height,
                    width: ~~width,
                }}
                onClick={handleClick}
            >
                <DetailBubble
                    detail={detail}
                />
            </div>
        );
    }
}
