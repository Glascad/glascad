import { getChildren, getDefaultPath, getDetailTypeFromPath } from "../../../../../../../app-logic/system-utils";
import { mergeOptionGroupValues } from "../merge";
import { SELECT_DETAIL_OPTION_VALUE } from ".";

export default function SELECT_SYSTEM_SET_OPTION_VALUE({
    _systemSet: {
        _systemSetDetailOptionValues = [],
        _systemSetOptionGroupValues = [],
    },
}, {
    detailOptionValues = [],
    configurationOptionValues = [],
    optionGroupValues = [],
}, [
    payloadPath,
    systemMap,
]) {

    const groupedOptionValues = mergeOptionGroupValues(_systemSetOptionGroupValues, optionGroupValues);
    const systemOptionValuePath = getDefaultPath(payloadPath, systemMap, groupedOptionValues);
    const systemOptionValue = systemMap[systemOptionValuePath];
    const systemDetails = getChildren(systemOptionValue, systemMap);
    // remove all detail and configuration option values -- all must be reselected
    return systemDetails.reduce((systemSetUpdate, { path }) => (
        SELECT_DETAIL_OPTION_VALUE(
            arguments[0],
            systemSetUpdate,
            [
                path,
                systemMap,
            ],
        )
    ), {
        ...arguments[1],
        systemOptionValuePath,
        detailOptionValues: [],
        // detailOptionValues: detailOptionValues.filter(({ newPath, oldPath }) => systemDetails.some(({ path }) => (
        //     getDetailTypeFromPath(newPath || oldPath)
        //     ===
        //     getDetailTypeFromPath(path)
        // ))),
    });
}
