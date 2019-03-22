import React, { Component, createContext } from 'react';

import sidebarStates from './RightSidebar/states';

import isvalidId from '../utils/recursive-elevation/is-valid-id';

export const SelectionContext = createContext();

export default class SelectionProvider extends Component {

    state = {
        sidebarState: sidebarStates.ZoomAndPan,
        sidebarOpen: true,
        selectedItems: [],
    };

    componentDidMount = () => {
        this.updateViewportWidth();
        window.addEventListener('keydown', this.watchCtrlKeyDown);
        window.addEventListener('keyup', this.watchCtrlKeyUp);
        // document.body.addEventListener('mousedown', this.cancelSelection);
    }

    componentWillUnmount = () => {
        window.removeEventListener('keydown', this.watchCtrlKeyDown);
        window.removeEventListener('keyup', this.watchCtrlKeyUp);
        // document.body.removeEventListener('mousedown', this.cancelSelection);
    }

    watchCtrlKeyDown = ({ ctrlKey, metaKey }) => this.ctrlKey = ctrlKey || metaKey;

    watchCtrlKeyUp = ({ ctrlKey, metaKey }) => this.ctrlKey = ctrlKey || metaKey;

    // cancelSelection = ({ target: { id } }) => !isvalidId(id) && this.setState({
    //     selectedItems: [],
    // });

    handleMouseDown = ({ target: { id } }) => !this.ctrlKey && this.setState(({ selectedItems }) => ({
        selectedItems: selectedItems.includes(id) ?
            selectedItems.filter(item => item !== id)
            :
            selectedItems.concat(id),
    }));

    toggleSidebar = sidebarOpen => this.setState({
        sidebarOpen: typeof sidebarOpen === 'boolean' ?
            sidebarOpen
            :
            !this.state.sidebarOpen,
    }, this.updateViewportWidth);

    updateViewportWidth = () => {
        const VP = document.getElementById("Viewport");
        const RSB = document.getElementById("RightSidebar");
        VP.style.marginRight = `${RSB.clientWidth}px`;
    }

    setSidebarState = sidebarState => this.setState(() => ({
        sidebarState,
    }), () => this.toggleSidebar(true));

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
        } = this;

        return (
            <SelectionContext.Provider
                value={{
                    sidebar: {
                        state: sidebarState,
                        open: sidebarOpen,
                        toggle: toggleSidebar,
                        setState: setSidebarState,
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
