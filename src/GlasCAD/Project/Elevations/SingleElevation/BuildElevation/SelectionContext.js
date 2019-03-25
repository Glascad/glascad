import React, { Component, createContext } from 'react';

import sidebarStates from './RightSidebar/states';

import { DIRECTIONS } from '../utils/recursive-elevation/directions';

export const SelectionContext = createContext();

export default class SelectionProvider extends Component {

    state = {
        sidebarState: sidebarStates.ZoomAndPan,
        previousSidebarStates: [],
        sidebarOpen: true,
        selectedItems: [],
    };

    componentDidMount = () => {
        this.updateViewportWidth();
        window.addEventListener('keydown', this.escape);
        window.addEventListener('keydown', this.watchSpaceKeyDown);
        window.addEventListener('keydown', this.watchArrowKey);
        window.addEventListener('keyup', this.watchSpaceKeyUp);
        // document.body.addEventListener('mousedown', this.cancelSelection);
    }

    componentWillUnmount = () => {
        window.removeEventListener('keydown', this.escape);
        window.removeEventListener('keydown', this.watchSpaceKeyDown);
        window.removeEventListener('keydown', this.watchArrowKey);
        window.removeEventListener('keyup', this.watchSpaceKeyUp);
        // document.body.removeEventListener('mousedown', this.cancelSelection);
    }

    escape = ({ key }) => key === 'Escape' && this.toggleSidebar(false);

    watchSpaceKeyDown = ({ key }) => key === ' ' && (this.spaceKey = true);

    watchSpaceKeyUp = ({ key }) => key === ' ' && (this.spaceKey = false);

    watchArrowKey = ({ key }) => {
        if (!this.spaceKey) {
            const {
                state: {
                    selectedItems: {
                        0: refId,
                        length,
                    },
                },
                props: {
                    elevation,
                },
            } = this;

            if (length === 1
                &&
                refId.match(/Container/)
            ) {
                const direction = DIRECTIONS[
                    key === "ArrowUp" ? "UP"
                        :
                        key === "ArrowDown" ? "DOWN"
                            :
                            key === "ArrowLeft" ? "LEFT"
                                :
                                key === "ArrowRight" ? "RIGHT"
                                    :
                                    ""];

                if (direction) {
                    const container = elevation.getItemByRefId(refId);

                    if (container) {
                        const nextContainer = container._getFirstOrLastContainerByDirection(...direction, false);

                        if (nextContainer) {
                            this.setState({
                                selectedItems: [nextContainer.refId],
                            });
                        }
                    }
                }
            }
        }
    };

    // cancelSelection = ({ target: { id } }) => !isvalidId(id) && this.setState({
    //     selectedItems: [],
    // });

    handleMouseDown = ({ target: { id } }) => {
        if (!this.spaceKey && id.match(/Vertical|Horizontal|Container|Detail|Dimension/)) {
            this.setState(({ selectedItems }) => ({
                selectedItems: selectedItems.includes(id) ?
                    selectedItems.filter(item => item !== id)
                    :
                    selectedItems.length ?
                        selectedItems[0].slice(0, 4) === id.slice(0, 4) ?
                            selectedItems.concat(id)
                            :
                            selectedItems
                        :
                        [id],
            }), () => this.state.selectedItems.length ?
                this.setSidebarState(
                    this.state.selectedItems[0].match(/Container/) ?
                        this.state.selectedItems.length > 1 ?
                            sidebarStates.EditMultipleLites
                            :
                            sidebarStates.EditLite
                        :
                        this.state.selectedItems[0].match(/Vertical/) ?
                            sidebarStates.EditVertical
                            :
                            this.state.selectedItems[0].match(/Horizontal/) ?
                                sidebarStates.EditHorizontal
                                :
                                sidebarStates.EditMultipleFrames
                )
                :
                this.toggleSidebar(false)
            );
        }
    }

    toggleSidebar = sidebarOpen => {
        this.setState({
            sidebarOpen: typeof sidebarOpen === 'boolean' ?
                sidebarOpen
                :
                !this.state.sidebarOpen,
        }, this.updateViewportWidth);
        this.updateSelectionAfterSidebarToggle();
    }

    updateSelectionAfterSidebarToggle = () => {
        this.setState(({ sidebarOpen, selectedItems }) => ({
            selectedItems: sidebarOpen ?
                selectedItems
                :
                [],
        }));
    }

    updateViewportWidth = () => {
        // const VP = document.getElementById("Viewport");
        // const RSB = document.getElementById("RightSidebar");
        // VP.style.marginRight = `${RSB.clientWidth}px`;
    }

    setSidebarState = (sidebarState, clearSelection = false) => this.setState(({
        sidebarState: prevState,
        previousSidebarStates,
        selectedItems,
    }) => ({
        sidebarState,
        previousSidebarStates: previousSidebarStates.concat(prevState),
        selectedItems: clearSelection ?
            []
            :
            selectedItems,
    }), () => this.toggleSidebar(true));

    revertSidebarState = () => this.setState(({
        previousSidebarStates,
        previousSidebarStates: {
            length,
        },
    }) => ({
        sidebarState: previousSidebarStates[length - 1],
        previousSidebarStates: previousSidebarStates.slice(0, length - 1),
    }));

    render = () => {
        const {
            state: {
                sidebarState,
                sidebarOpen,
                selectedItems,
            },
            props: {
                children,
            },
            handleMouseDown,
            toggleSidebar,
            setSidebarState,
            revertSidebarState,
        } = this;

        return (
            <SelectionContext.Provider
                value={{
                    sidebar: {
                        state: sidebarState,
                        open: sidebarOpen,
                        toggle: toggleSidebar,
                        setState: setSidebarState,
                        revert: revertSidebarState,
                    },
                    selection: {
                        items: selectedItems,
                        handleMouseDown,
                    },
                }}
            >
                {children}
            </SelectionContext.Provider>
        )
    }
}