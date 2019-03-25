import React from 'react';

import { SelectionContext } from '../../../SelectionContext';

import {
    TitleBar,
} from '../../../../../../../../components';

import ACTIONS from '../../../ducks/actions';
import RecursiveElevation from '../../../../utils/recursive-elevation/elevation';
import { DIRECTIONS } from '../../../../utils/recursive-elevation/directions';

import EditInfill from './EditInfill';
import AddVertical from '../add/AddVertical';
import AddHorizontal from '../add/AddHorizontal';

export default {
    name: "Edit Lite",
    component: EditLite,
};

function EditLite({
    elevation,
    updateElevation,
}) {
    return (
        <SelectionContext.Consumer>
            {({
                selection: {
                    items: [
                        refId,
                    ],
                },
                sidebar: {
                    setState,
                },
            }) => {
                const container = elevation.getItemByRefId(refId);

                if (!(container instanceof RecursiveElevation.RecursiveContainer)) return null;

                return (
                    <>
                        <div className="sidebar-group">
                            <TitleBar
                                title="Edit Lite"
                            />
                            <div className="sidebar-group">
                                <button
                                    className="sidebar-button empty"
                                    onClick={() => setState(EditInfill)}
                                >
                                    Edit Infill
                                </button>
                            </div>
                            {Object.entries(DIRECTIONS)
                                .map(([key, direction]) => {
                                    const canMerge = container._getCanMergeByDirection(...direction);
                                    return (
                                        <button
                                            key={direction.join('-')}
                                            className={`sidebar-button empty ${canMerge ? '' : 'disabled'}`}
                                            onClick={canMerge ?
                                                () => updateElevation(ACTIONS.MERGE_CONTAINERS, {
                                                    container,
                                                    direction,
                                                })
                                                :
                                                undefined}
                                        >
                                            Merge {key.slice(0, 1)}{key.slice(1).toLowerCase()}
                                        </button>
                                    );
                                })}
                        </div>
                        <div className="sidebar-group">
                            <button
                                className="sidebar-button empty"
                                onClick={() => setState(AddVertical)}
                            >
                                Add Vertical
                            </button>
                            <button
                                className="sidebar-button empty"
                                onClick={() => setState(AddHorizontal)}
                            >
                                Add Horizontal
                            </button>
                        </div>
                    </>
                );
            }}
        </SelectionContext.Consumer>
    );
}