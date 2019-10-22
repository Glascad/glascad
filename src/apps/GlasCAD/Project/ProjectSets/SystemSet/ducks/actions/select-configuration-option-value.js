import { getConfigurationTypeFromPath, getDetailTypeFromPath } from "../../../../../../../app-logic/system-utils";
import { replace } from "../../../../../../../utils";
import { defaultSystemSetNode } from "../schemas";

export default function SELECT_CONFIGURATION_OPTION_VALUE({
    _systemSet: {
        _systemSetConfigurationOptionValues = [],
    },
}, {
    configurationOptionValues = [],
},
    configurationOptionValuePath
) {
    const systemId = configurationOptionValuePath[0];
    const detailType = getDetailTypeFromPath(configurationOptionValuePath);
    const configurationType = getConfigurationTypeFromPath(configurationOptionValuePath);

    const { configurationOptionValuePath: oldPath } = _systemSetConfigurationOptionValues.find(cov => (
        cov.configurationOptionValuePath[0] === systemId
        &&
        getDetailTypeFromPath(cov.configurationOptionValuePath) === detailType
        &&
        getConfigurationTypeFromPath(cov.configurationOptionValuePath) === configurationType
    )) || {};

    const updatedCOV = configurationOptionValues.find(({ oldPath, newPath }) => (
        (oldPath || newPath)[0] === systemId
        &&
        getDetailTypeFromPath(oldPath || newPath) === detailType
        &&
        getConfigurationTypeFromPath(oldPath || newPath) === configurationType
    ));

    const index = configurationOptionValues.indexOf(updatedCOV);

    const newCOV = updatedCOV ? {
        ...updatedCOV,
        newPath: configurationOptionValuePath,
    } : {
            ...defaultSystemSetNode,
            oldPath,
            newPath: configurationOptionValuePath,
        };

    return {
        ...arguments[1],
        configurationOptionValues: updatedCOV ?
            updatedCOV.oldPath === configurationOptionValuePath ?
                configurationOptionValues.filter((_, i) => i !== index)
                :
                replace(configurationOptionValues, index, newCOV)
            :
            configurationOptionValues.concat(newCOV),
    };
}
