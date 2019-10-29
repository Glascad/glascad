import { getParentPath, getLastItemFromPath } from "../../../../../../app-logic/system-utils";

export const getOldPath = (systemInput, currentPath) => Object.entries(systemInput)
    .reduce((allUpdatedItemsArr, [key, value]) => (key.match(/options$|values$|details$|configurations$/i) && !key.match(/new/i)) ?
        allUpdatedItemsArr.concat(value)
        :
        allUpdatedItemsArr, [])
    .reduce((resultPaths, items) => {
        const { path, update } = items;
        const [itemParentPathKey, itemParentPath] = Object.entries(update).find(([itemKey, itemVal]) => itemKey.match(/parent/i)) || [];
        const updatedPath = (itemParentPath || update.name) ?
            `${itemParentPath || getParentPath({ path })}.${update.name || getLastItemFromPath(path)}`
            :
            '';

        return updatedPath
            &&
            currentPath.startsWith(updatedPath)
            &&
            (!resultPaths.longestPath || updatedPath.length > resultPaths.longestPath.length) ?
            {
                longestPath: updatedPath,
                path: `${path}${currentPath.replace(updatedPath, '')}`,
            }
            :
            resultPaths
    }, {}).path || currentPath;

export const getSelectTypeName = (valueChildrenArr, name) => !valueChildrenArr.some(value => getLastItemFromPath(value.path) === name) ?
    name
    :
    getSelectTypeName(valueChildrenArr, `${name}_`);