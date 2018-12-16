import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';

export default class ApolloWrapper3 extends Component {

    static propTypes = {
        query: PropTypes.shape({
            query: PropTypes.object.isRequired,
            mapProps: PropTypes.func,
            variables: PropTypes.object,
        }),
        mutations: PropTypes.objectOf(PropTypes.object),
    };

    render = () => {
        const {
            props: {
                batcher,
                batcher: {
                    getNodeId,
                    batchedMutations,
                    batchMutation,
                } = {},
                query,
                query: {
                    mapProps: mapQueryProps = props => props,
                } = {},
                mutations = {},
                children,
                ...props
            }
        } = this;

        const mutationKeys = Object.keys(mutations);

        const nextMutation = mutations[mutationKeys[0]];

        // REFACTOR TO USE A `Read` COMPONENT LIKE THE ApolloWrapper TO SIMPLIFY LOGIC

        if (query) {
            return (
                <Query
                    {...query}
                >
                    {status => (
                        <ApolloWrapper3
                            mutations={mutations}
                            batcher={batcher}
                        >
                            {accumulatedProps => {
                                // THIS IS THE FINAL CALLBACK THAT RENDERS THE ORIGINAL CHILDREN
                                // iterate through all batched mutations
                                const batchedMutationKeys = Object.keys(batchedMutations);
                                // console.log(batchedMutationKeys);
                                const queryStatus = batchedMutationKeys.reduce((mappedStatus, mutationKey) => {
                                    // console.log(mappedStatus);
                                    const {
                                        mapResultToProps = (res, props) => props
                                    } = mutations[mutationKey] || {};
                                    const {
                                        argumentSets = []
                                    } = batchedMutations[mutationKey] || {};
                                    // iterate through all argument sets of batched mutations
                                    return argumentSets.reduce((mappedStatus, argSet) => ({
                                        ...mappedStatus,
                                        ...mapResultToProps(argSet, mappedStatus),
                                    }), mappedStatus);
                                }, mapQueryProps(status));
                                const childProps = {
                                    ...accumulatedProps,
                                    batcher,
                                    queryStatus,
                                };
                                // console.log(childProps);
                                return children(childProps);
                            }}
                        </ApolloWrapper3>
                    )}
                </Query>
            )
        } else if (mutationKeys.length) {
            return (
                <Mutation
                    {...nextMutation}
                >
                    {(mutate, status) => (
                        <ApolloWrapper3
                            mutations={mutationKeys
                                .slice(1)
                                .reduce((all, key) => ({
                                    ...all,
                                    [key]: mutations[key],
                                }), {})}
                            batcher={batcher}
                        >
                            {accumulatedProps => (
                                children({
                                    ...accumulatedProps,
                                    mutations: {
                                        ...accumulatedProps.mutations,
                                        [mutationKeys[0]]: batcher ?
                                            (args) => batchMutation({
                                                arguments: {
                                                    nodeId: args.nodeId || getNodeId(),
                                                    ...args,
                                                },
                                                mutate,
                                                mutationKey: mutationKeys[0],
                                            })
                                            :
                                            (args) => mutate({
                                                variables: args,
                                            }),
                                        [`${mutationKeys[0]}Status`]: status,
                                    }
                                })
                            )}
                        </ApolloWrapper3>
                    )}
                </Mutation>
            )
        } else {
            return children({
                batcher,
                ...props,
            });
        }
    }
}