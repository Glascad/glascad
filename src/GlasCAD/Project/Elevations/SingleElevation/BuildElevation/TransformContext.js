import React, { Component, createContext } from 'react';

export const TransformContext = createContext();

export default class TransformProvider extends Component {

    state = {
        scale: 1,
        translate: {
            x: 0,
            y: 0,
        },
    };

    componentDidMount = () => {
        window.addEventListener('keydown', this.watchCtrlKeyDown);
        window.addEventListener('keydown', this.watchArrowKeys);
        window.addEventListener('keyup', this.watchCtrlKeyUp);
        window.addEventListener('mouseup', this.watchMouseUp);
    }

    componentWillUnmount = () => {
        window.removeEventListener('keydown', this.watchCtrlKeyDown);
        window.removeEventListener('keydown', this.watchArrowKeys);
        window.removeEventListener('keyup', this.watchCtrlKeyUp);
        window.removeEventListener('mouseup', this.watchMouseUp);
    }

    watchCtrlKeyDown = ({ ctrlKey, metaKey }) => this.ctrlKey = ctrlKey || metaKey;

    watchCtrlKeyUp = ({ ctrlKey, metaKey }) => this.ctrlKey = ctrlKey || metaKey;

    watchArrowKeys = ({ key }) => this.ctrlKey && (
        key === "ArrowUp" ?
            this.setState(({ scale }) => ({ scale: scale + 0.01 }))
            :
            key === 'ArrowDown' ?
                this.setState(({ scale }) => ({ scale: scale - 0.01 }))
                :
                null
    );

    watchMouseDown = e => {
        if (this.ctrlKey) {

            e.preventDefault();

            const { clientX, clientY } = e;

            this.panning = true;

            console.log("START");
            console.log({ clientX, clientY });

            const {
                state: {
                    translate: {
                        x,
                        y,
                    },
                },
            } = this;

            this.mouseStart = {
                x: clientX - x,
                y: clientY - y,
            };

            document.body.style.cursor = 'grabbing';
            window.addEventListener('mousemove', this.pan);
        }
    };

    watchMouseUp = () => {
        if (this.panning) {
            console.log("DONE");
            console.log(this.state);

            document.body.style.cursor = "";
            window.removeEventListener('mousemove', this.pan);
        }
    }

    pan = e => {

        e.preventDefault();

        const { clientX, clientY } = e;

        const {
            mouseStart: {
                x,
                y,
            },
        } = this;

        console.log("MOVE");
        console.log({ clientX, clientY });

        this.setState({
            translate: {
                x: clientX - x,
                y: clientY - y,
            },
        });
    }

    undoPan = () => {

    }

    updateScale = ({ target: { value } }) => this.setState({ scale: value });

    updateTranslateX = ({ target: { value } }) => this.setState(({ translate }) => ({
        translate: {
            ...translate,
            x: value,
        },
    }));

    updateTranslateY = ({ target: { value } }) => this.setState(({ translate }) => ({
        translate: {
            ...translate,
            y: value,
        },
    }));

    resetScale = () => this.setState({ scale: 1 });

    resetTranslate = () => this.setState({ translate: { x: 0, y: 0 } });

    render = () => {
        const {
            state: {
                scale,
                translate,
            },
            props: {
                children,
            },
            updateScale,
            resetScale,
            updateTranslateX,
            updateTranslateY,
            resetTranslate,
            watchMouseDown,
            watchMouseUp,
        } = this;

        return (
            <TransformContext.Provider
                value={{
                    scale,
                    translate,
                    updateScale,
                    resetScale,
                    updateTranslateX,
                    updateTranslateY,
                    resetTranslate,
                    watchMouseDown,
                    watchMouseUp,
                }}
            >
                {children}
            </TransformContext.Provider>
        )
    }
}
