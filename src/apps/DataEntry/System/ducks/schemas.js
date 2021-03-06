
export const configurationOptionValueUpdate = {
    __typename: "ConfigurationOptionValue",
    path: undefined,
};

export const configurationOptionUpdate = {
    __typename: "ConfigurationOption",
    path: undefined,
};

export const detailConfigurationUpdate = {
    __typename: "DetailConfiguration",
    path: undefined,
    optional: false,
};

export const detailOptionValueUpdate = {
    __typename: "DetailOptionValue",
    path: undefined,
};

export const detailOptionUpdate = {
    __typename: "DetailOption",
    path: undefined,
};

export const systemDetailUpdate = {
    __typename: "SystemDetail",
    path: undefined,
};

export const systemOptionValueUpdate = {
    __typename: "SystemOptionValue",
    path: undefined,
    raisedOptionNames: [],
    raisedConfigurationTypes: [],
};

export const systemOptionUpdate = {
    __typename: "SystemOption",
    path: undefined,
};

export const sightline = 2

export const systemUpdate = {
    __typename: "System",
    // path: undefined,
    manufacturerId: undefined,
    systemType: undefined,
    pathsToDelete: [],
    optionGroupsToDelete: [],
    systemOptions: [],
    detailOptions: [],
    configurationOptions: [],
    systemOptionValues: [],
    detailOptionValues: [],
    configurationOptionValues: [],
    systemDetails: [],
    detailConfigurations: [],
    configurationParts: [],
    newOptionGroups: [],
    newSystemOptions: [],
    newDetailOptions: [],
    newConfigurationOptions: [],
    newSystemOptionValues: [],
    newDetailOptionValues: [],
    newConfigurationOptionValues: [],
    newSystemDetails: [],
    newDetailConfigurations: [],
    newConfigurationParts: [],
};
