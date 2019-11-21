import { COPY_ITEM } from "../../actions"
import { sampleSystemMap } from "../../../../../../../../app-logic/__test__/sample-systems";
import { systemUpdate } from "../../schemas";

function testCopyItem({
    systemInput,
    payload,
    expected
}) {
    describe(`testing the copy-item function`, () => {
        const result = COPY_ITEM({...systemUpdate, ...systemInput}, payload);
        test(`result is expected`, () => {
            expect(result).toMatchObject(expected);
        })
    })
}

testCopyItem({
    systemInput: {},
    payload: {
        partialPayload: {
            path: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.VOID.VOID.__CT__.HORIZONTAL.STOPS",
            __typename: "ConfigurationOption",
        },
        targetItem: {
            path: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.SHIM_SUPPORT.VOID.VOID",
            __typename: "ConfigurationOptionValue"
        },
        systemMap: sampleSystemMap,
    },
    expected: {
        newConfigurationOptions: expect.arrayContaining([
            {
                parentConfigurationOptionValuePath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.SHIM_SUPPORT.VOID.VOID",
                name: "STOPS",
                __typename: "ConfigurationOption"
            },
            {
                parentConfigurationOptionValuePath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.SHIM_SUPPORT.VOID.VOID.STOPS.DOWN",
                name: "GLAZING",
                __typename: "ConfigurationOption",
                defaultConfigurationOptionValue: "OUTSIDE",
            },
            {
                parentConfigurationOptionValuePath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.SHIM_SUPPORT.VOID.VOID.STOPS.UP",
                name: "GLAZING",
                __typename: "ConfigurationOption",
                defaultConfigurationOptionValue: "OUTSIDE",
            },
        ]),
        newConfigurationOptionValues: expect.arrayContaining([
            {
                parentConfigurationOptionPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.SHIM_SUPPORT.VOID.VOID.STOPS",
                name: "DOWN",
                __typename: "ConfigurationOptionValue"
            },
            {
                parentConfigurationOptionPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.SHIM_SUPPORT.VOID.VOID.STOPS.DOWN.GLAZING",
                name: "INSIDE",
                __typename: "ConfigurationOptionValue"
            },
            {
                parentConfigurationOptionPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.SHIM_SUPPORT.VOID.VOID.STOPS.DOWN.GLAZING",
                name: "OUTSIDE",
                __typename: "ConfigurationOptionValue"
            },
            {
                parentConfigurationOptionPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.SHIM_SUPPORT.VOID.VOID.STOPS",
                name: "UP",
                __typename: "ConfigurationOptionValue"
            },
            {
                parentConfigurationOptionPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.SHIM_SUPPORT.VOID.VOID.STOPS.UP.GLAZING",
                name: "INSIDE",
                __typename: "ConfigurationOptionValue"
            },
            {
                parentConfigurationOptionPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.SHIM_SUPPORT.VOID.VOID.STOPS.UP.GLAZING",
                name: "OUTSIDE",
                __typename: "ConfigurationOptionValue"
            },
        ]),
    }
});