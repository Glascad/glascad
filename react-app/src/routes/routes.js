// HOME
import Home from './Home/Home';
// SYSTEM
// import System from './System/System';
// SYSTEM CONFIGURATIONS
// import SystemConfigurations from './SystemConfigurations/SystemConfigurations';
import SystemTypes from './SystemConfigurations/SystemTypes/SystemTypes';
import SystemTags from './SystemConfigurations/SystemTags/SystemTags';
import DetailTypes from './SystemConfigurations/DetailTypes/DetailTypes';
import ConfigurationTypes from './SystemConfigurations/ConfigurationTypes/ConfigurationTypes';
import PartTypes from './SystemConfigurations/PartTypes/PartTypes';
import PartTags from './SystemConfigurations/PartTags/PartTags';
// SETTINGS
// import Settings from './Settings/Settings';
import Manufacturers from './Settings/Manufacturers/Manufacturers';
import Linetypes from './Settings/LinetypesView/LinetypesView';
import PartOrientations from './Settings/PartOrientations/PartOrientations';
// import Fasteners from './Settings/Fasteners/Fasteners';
import InfillSizes from './Settings/InfillSizes/InfillSizes';
import InfillTypes from './Settings/InfillTypesView/InfillTypesView';
// PRACTICE
import Practice from './Practice/Practice';

export default [
    {
        name: "HOME",
        exact: true,
        path: "/",
        component: Home,
    },
    {
        name: "SYSTEM",
        exact: true,
        path: "/system/:systemNID",
        // component: System,
        subroutes: [
            // {
            //     name: "SYSTEM",
            //     exact: true,
            //     path: "/:mnfgNID",
            //     component: System
            // },
            // {
            //     name: "SYSTEM",
            //     path: "/:mnfgNID/:systemNID",
            //     component: System
            // },
            {
                name: "SYSTEM INFO",
                path: "/system info"
                // component: 
            },
            {
                name: "GLAZING INFO",
                path: "/glazing info"
                // component: 
            },
            {
                name: "VALID TYPES",
                path: "/valid types"
                // component: 
            },
            {
                name: "SYSTEM COMPATIBILITY",
                path: "/system compatibility"
                // component: 
            },
            {
                name: "SYSTEM OPTIONS",
                path: "/system options"
                // component: 
            },
            {
                name: "INVALID COMBINATIONS",
                path: "/invalid combinations"
                // component: 
            },
        ]
    },
    {
        name: "SYSTEM CONFIGURATIONS",
        exact: true,
        path: "/system configurations",
        // component: SystemConfigurations,
        subroutes: [
            {
                name: "SYSTEM TYPES",
                path: "/system types",
                component: SystemTypes
            },
            {
                name: "SYSTEM TAGS",
                path: "/system tags",
                component: SystemTags
            },
            {
                name: "DETAIL TYPES",
                path: "/detail types",
                component: DetailTypes
            },
            {
                name: "CONFIGURATION TYPES",
                path: "/configuration types",
                component: ConfigurationTypes
            },
            {
                name: "PART TYPES",
                path: "/part types",
                component: PartTypes
            },
            {
                name: "PART TAGS",
                path: "/part tags",
                component: PartTags
            },
        ]
    },
    {
        name: "SETTINGS",
        exact: true,
        path: "/settings",
        // component: Settings,
        subroutes: [
            {
                name: "MANUFACTURERS",
                path: "/manufacturers",
                component: Manufacturers
            },
            {
                name: "LINETYPES",
                path: "/linetypes",
                component: Linetypes
            },
            {
                name: "PART ORIENTATIONS",
                path: "/part orientations",
                component: PartOrientations
            },
            // {
            //     name: "FASTENERS",
            //     path: "/fasteners",
            //     // component: Fasteners
            // },
            {
                name: "INFILL SIZES",
                path: "/infill sizes",
                component: InfillSizes
            },
            {
                name: "INFILL TYPES",
                path: "/infill types",
                component: InfillTypes
            },
        ]
    },
    {
        name: "PRACTICE",
        path: "/practice",
        component: Practice
    }
];
