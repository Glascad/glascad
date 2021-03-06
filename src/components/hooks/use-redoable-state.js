import React, { useState, useEffect, useCallback } from 'react';
import { replace } from '../../utils';

export default function useRedoableState(firstState, dependencies = []) {
    const initialState = {
        states: [firstState],
        currentIndex: 0,
    };

    const [wrappedState, setState] = useState(initialState);
    const [{ afterSetState }, setAfterSetState] = useState({ afterSetState() { } });

    // update initial state when dependencies change
    useEffect(() => {
        setState(initialState);
    }, dependencies);

    // to simulate behavior of setState(newState, --> callback <--)
    // which is not available in the hook
    const effectDependency = afterSetState || null;
    useEffect(() => {
        if (afterSetState) afterSetState();
    }, [effectDependency]);

    const dispatch = useCallback((setStateCallback, afterSetState) => {
        setState(oldState => ({
            ...oldState,
            ...setStateCallback(oldState),
        }));
        setAfterSetState({ afterSetState });
    }, [setState, setAfterSetState]);

    const {
        currentIndex,
        states,
    } = wrappedState;

    const {
        [currentIndex]: currentState,
    } = states;

    const cancel = useCallback(() => dispatch(({ states: [initialState] }) => ({
        // n: console.log("CANCEL"),
        states: [initialState],
        currentIndex: 0,
    })), [dispatch]);

    const clearHistory = useCallback(() => dispatch(({ states, currentIndex }) => ({
        // n: console.log("CLEARHISTORY"),
        states: [states[currentIndex]],
        currentIndex: 0,
    })), [dispatch]);

    const undo = useCallback(() => setTimeout(() => dispatch(({ currentIndex }) => ({
        // n: console.log("UNDO"),
        currentIndex: currentIndex > 0 ?
            currentIndex - 1
            :
            currentIndex,
    }))), [dispatch]);

    const redo = useCallback(() => dispatch(({ states: { length }, currentIndex }) => ({
        // n: console.log("REDO"),
        currentIndex: currentIndex < length - 1 ?
            currentIndex + 1
            :
            currentIndex,
    })), [dispatch]);

    const pushState = useCallback((setStateCallback, ...args) => dispatch(({ states, currentIndex }) => ({
        // n: console.log("PUSHSTATE"),
        states: states
            .slice(0, currentIndex + 1)
            .concat({
                ...states[currentIndex],
                ...setStateCallback(states[currentIndex]),
            }),
        currentIndex: currentIndex + 1,
    }), ...args), [dispatch]);

    const replaceState = useCallback((setStateCallback, ...args) => dispatch(({ states, currentIndex }) => ({
        // n: console.log("REPLACESTATE"),
        states:
            replace(states, currentIndex, {
                ...states[currentIndex],
                ...setStateCallback(states[currentIndex]),
            }),
    }), ...args), [dispatch]);

    const resetState = useCallback((newFirstState = firstState, ...args) => dispatch(() => ({
        // n: console.log({ newFirstState }),
        states: [newFirstState],
        currentIndex: 0,
    }), ...args), [dispatch]);

    const loadStates = useCallback((states, ...args) => dispatch(() => ({
        states,
        currentIndex: states.length - 1,
    }), ...args), [dispatch]);

    const onKeyDown = useCallback(e => {
        const { key = '', ctrlKey, metaKey, shiftKey } = e;
        if ((ctrlKey || metaKey) && key.match(/^z$/i)) {
            e.preventDefault();
            if (shiftKey) redo();
            else undo();
        }
    }, [undo, redo]);

    useEffect(() => {
        window.addEventListener("keydown", onKeyDown, true);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [onKeyDown]);

    // console.log({
    //     currentIndex,
    //     states,
    // });

    return {
        currentState,
        currentIndex,
        clearHistory,
        states,
        cancel,
        undo,
        redo,
        pushState,
        replaceState,
        resetState,
        loadStates,
    };
}

export const withRedoableState = (firstState, mapProps = p => ({ undoRedo: p })) => WrappedComponent => props => {
    const undoRedo = useRedoableState(firstState);
    return (
        <WrappedComponent
            {...props}
            {...mapProps(undoRedo)}
        />
    );
}
