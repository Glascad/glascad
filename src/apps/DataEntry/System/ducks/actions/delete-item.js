import _ from 'lodash'
import { getOldPath, getUpdatedPath } from "../utils";

export default function DELETE_ITEM(systemInput, { path, __typename }) {
    const {
        [`new${__typename}s`]: newItemArray,
        pathsToDelete: initialPathsToDelete,
        systemOptions: initialSystemOptions,
        systemOptionValues: initialSystemOptionValues,
        systemDetails: initialSystemDetails,
        detailOptions: initialDetailOptions,
        detailOptionValues: initialDetailOptionValues,
        detailConfigurations: initialDetailConfigurations,
        configurationOptions: initialConfigurationOptions,
        configurationOptionValues: initialConfigurationOptionValues,
    } = systemInput;

    const oldPath = getOldPath(path, systemInput);

    const isNewItem = newItemArray.some(newItem => path === getUpdatedPath(newItem));

    const isUpdatedItem = systemInput[`${__typename.replace(/^./, letter => letter.toLowerCase())}s`]
        .some(updatedItem => path === getUpdatedPath(updatedItem));

    const partitionDeletedItems = itemArray => itemArray.reduce(([updated, deleted], item) => {
        const updatedPath = getUpdatedPath(item);

        return updatedPath.startsWith(path) && !updatedPath.startsWith(`${path}_`) ?
            [updated, deleted.concat(getOldPath(updatedPath, systemInput))]
            :
            [updated.concat(item), deleted]
    }, [[], []]);

    // delete all new items that include the deleted path
    const updatedNewItems = Object.entries(systemInput)
        .filter(([key]) => key.match(/^new/i) && !key.match(/groups/))
        .reduce((updatedSystemInput, [key, value]) => ({
            ...updatedSystemInput,
            [key]: value.filter(item => {
                const updatedNewPath = getUpdatedPath(item);
                return !updatedNewPath.startsWith(path) || updatedNewPath.startsWith(`${path}_`);
            })
        }), {});

    // finds the original paths of all updated paths that need to be deleted and adds them to paths to delete,
    // filters out the items that need to be deleted from the updated state.
    const [systemOptions, systemOptionsToDelete] = partitionDeletedItems(initialSystemOptions);
    const [systemOptionValues, systemOptionValuesToDelete] = partitionDeletedItems(initialSystemOptionValues);
    const [systemDetails, systemDetailsToDelete] = partitionDeletedItems(initialSystemDetails);
    const [detailOptions, detailOptionsToDelete] = partitionDeletedItems(initialDetailOptions);
    const [detailOptionValues, detailOptionValuesToDelete] = partitionDeletedItems(initialDetailOptionValues);
    const [detailConfigurations, detailConfigurationsToDelete] = partitionDeletedItems(initialDetailConfigurations);
    const [configurationOptions, configurationOptionsToDelete] = partitionDeletedItems(initialConfigurationOptions);
    const [configurationOptionValues, configurationOptionValuesToDelete] = partitionDeletedItems(initialConfigurationOptionValues);
    const pathsToDelete = [
        ...initialPathsToDelete,
        ...systemOptionsToDelete,
        ...systemOptionValuesToDelete,
        ...systemDetailsToDelete,
        ...detailOptionsToDelete,
        ...detailOptionValuesToDelete,
        ...detailConfigurationsToDelete,
        ...configurationOptionsToDelete,
        ...configurationOptionValuesToDelete,
    ];

    return {
        ...systemInput,
        ...updatedNewItems,
        systemOptions,
        systemOptionValues,
        systemDetails,
        detailOptions,
        detailOptionValues,
        detailConfigurations,
        configurationOptions,
        configurationOptionValues,
        pathsToDelete: pathsToDelete.concat(isNewItem || isUpdatedItem || pathsToDelete.includes(oldPath) ? [] : oldPath),
    };
}