import React from 'react';

import './GroupingBox.scss';
import { Toggle } from '../..';
import AddButton from '../AddButton/AddButton';

export default function GroupingBox({
    title,
    toggle,
    addButton,
    children,
}) {
    return (
        <div className="GroupingBox">
            <div className="title">
                {title}
            </div>
            {toggle ? (
                <div className="toggle-background">
                    <Toggle
                        {...toggle}
                    />
                </div>
            ) : addButton ? (
                <div className="add-button-background">
                    <AddButton
                        {...addButton}
                    />
                </div>
            ) : null}
            {children}
        </div>
    );
}
