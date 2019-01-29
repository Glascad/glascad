import React, { Component } from 'react';

import Modal from '../Modal/Modal';
import Pill from '../Pill/Pill';
import ListContainer from '../ListContainer/ListContainer';

import './MultiSelect.scss';

const removeDuplicateNIDs = list => list.filter((item, i) => i === list.findIndex(({ nodeId }) => nodeId === item.nodeId));

export default class MultiSelect extends Component {

    state = {
        addedItems: [],
        deletedItems: [],
    };

    componentDidUpdate = ({ modal: { display } }) => {
        const {
            props: {
                selection: {
                    selectedNID,
                    creating,
                    deleting
                } = {},
                modal: {
                    display: newDisplay
                },
                previousItems
            }
        } = this;
        if (display !== newDisplay) {
            const selectedItem = previousItems.find(({ nodeId }) => nodeId === selectedNID);
            this.setState({
                addedItems: creating && selectedItem ? [selectedItem] : [],
                deletedItems: deleting && selectedItem ? [selectedItem] : [],
            });
        }
    }

    handleSelect = ({ arguments: item }) => this.setState(({ addedItems }) => ({
        addedItems: addedItems.concat(item)
    }));

    handleDeleteClick = ({ arguments: deletedItem }) => {
        if (this.props.previousItems.some(({ nodeId }) => nodeId === deletedItem.nodeId)) {
            if (this.state.deletedItems.some(({ nodeId }) => nodeId === deletedItem.nodeId)) {
                this.setState(({ deletedItems }) => ({
                    deletedItems: deletedItems.filter(({ nodeId }) => nodeId !== deletedItem.nodeId)
                }));
            } else {
                this.setState(({ deletedItems }) => ({
                    deletedItems: deletedItems.concat(deletedItem)
                }));
            }
        } else {
            this.setState(({ addedItems }) => ({
                addedItems: addedItems.filter(({ nodeId }) => nodeId !== deletedItem.nodeId)
            }));
        }
    }

    render = () => {
        const {
            state,
            state: {
                addedItems,
                deletedItems,
            },
            props: {
                modal,
                previousItems,
                allItems,
                mapPillProps = () => null,
                list: {
                    titleBar,
                },
            },
            handleSelect,
            handleDeleteClick,
        } = this;

        const selectedItems = removeDuplicateNIDs(previousItems.concat(addedItems));

        const nonSelectedItems = allItems
            .filter(item => !selectedItems.some(({ nodeId }) => nodeId === item.nodeId));

        return (
            <Modal
                className="MultiSelect"
                arguments={{
                    ...state,
                    previousItems,
                }}
                {...modal}
            >
                <ListContainer
                    items={selectedItems}
                    renderItem={(item, i) => (
                        <Pill
                            key={item.nodeId}
                            tagname="li"
                            selected={!previousItems.includes(item)}
                            danger={deletedItems.includes(item)}
                            arguments={item}
                            onSelect={handleDeleteClick}
                            onDelete={handleDeleteClick}
                            {...mapPillProps(item, true)}
                        />
                    )}
                />
                <ListContainer
                    titleBar={titleBar}
                    items={nonSelectedItems}
                    renderItem={item => (
                        <Pill
                            key={item.nodeId}
                            tagname="li"
                            onSelect={handleSelect}
                            arguments={item}
                            {...mapPillProps(item, false)}
                        />
                    )}
                />
            </Modal>
        );
    }
}