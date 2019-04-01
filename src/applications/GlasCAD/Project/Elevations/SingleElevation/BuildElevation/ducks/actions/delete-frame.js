import mergeContainers from './merge-containers';
import RecursiveElevation from '../../../utils/recursive-elevation/elevation';

export default function DELETE_FRAME({
    elevation: elevationInput,
}, {
    _frame,
    _frame: {
        canDelete,
        vertical,
        firstContainers,
    },
}) {
    if (!canDelete) return arguments[0];

    const direction = [!vertical, false];

    return firstContainers
        .reduce((elevation, container) => mergeContainers(elevation, { container, direction }), arguments[0]);
}
