
const detailsKey = 'details[vertical][first]';
const containersKey = 'containers[vertical][first]';
const allContainersKey = 'allContainers[vertical][first]';

export default class RecursiveContainer {
    constructor(container, elevation) {
        Object.assign(
            this,
            container,
            {
                elevation,
                [detailsKey]: {
                    true: {
                        true: undefined,
                        false: undefined,
                    },
                    false: {
                        true: undefined,
                        false: undefined,
                    },
                },
                [containersKey]: {
                    true: {
                        true: undefined,
                        false: undefined,
                    },
                    false: {
                        true: undefined,
                        false: undefined,
                    },
                },
                [allContainersKey]: {
                    true: {
                        true: undefined,
                        false: undefined,
                    },
                    false: {
                        true: undefined,
                        false: undefined,
                    },
                }
            },
        );
    }

    get ref() { return document.querySelector(`#Container-${this.id}`); }

    _getDetails(vertical, first) {
        return this[detailsKey][vertical][first] || (
            this[detailsKey][vertical][first] = Object.values(this.elevation.details)
                .filter(({
                    firstContainerId,
                    secondContainerId,
                    vertical: detailVertical,
                }) => vertical === detailVertical && (
                    this.id === (first ?
                        firstContainerId
                        :
                        secondContainerId
                    )
                )));
    }

    _getImmediateContainersByDirection(vertical, first) {
        return this[containersKey][vertical][first] || (
            this[containersKey][vertical][first] = this._getDetails(vertical, first)
                .reduce((details, detail) => details
                    .concat(detail._getContainer(!first)),
                    [])
                .filter(Boolean)
                .sort(this._sortContainers(vertical, first)));
    }

    _getAllContainersByDirection(vertical, first) {
        return this[allContainersKey][vertical][first] || (
            this[allContainersKey][vertical][first] = this._getImmediateContainersByDirection(vertical, first)
                .reduce((all, container) => Array.from(new Set(all
                    .concat([container]
                        .concat(container._getAllContainersByDirection(vertical, first))))),
                    []));
    }

    // details
    get leftDetails() { return this._getDetails(true, false); }
    get rightDetails() { return this._getDetails(true, true); }
    get topDetails() { return this._getDetails(false, true); }
    get bottomDetails() { return this._getDetails(false, false); }

    // containers
    get leftContainers() { return this._getImmediateContainersByDirection(true, false); }
    get rightContainers() { return this._getImmediateContainersByDirection(true, true); }
    get topContainers() { return this._getImmediateContainersByDirection(false, true); }
    get bottomContainers() { return this._getImmediateContainersByDirection(false, false); }

    get allLeftContainers() { return this._getAllContainersByDirection(true, false); }
    get allRightContainers() { return this._getAllContainersByDirection(true, true); }
    get allTopContainers() { return this._getAllContainersByDirection(false, true); }
    get allBottomContainers() { return this._getAllContainersByDirection(false, true); }

    _sortContainers(vertical) {
        return function sort(a, b) {
            const beforeA = a._getAllContainersByDirection(!vertical, false);
            const beforeB = b._getAllContainersByDirection(!vertical, false);
            // a comes before b because b is upward or rightward of a
            if (beforeB.includes(a)) {
                console.log(`${a.id} is before ${b.id}`);
                return -1;
            }
            // b comes before a because a is upward or rightward of a
            else if (beforeA.includes(b)) {
                console.log(`${b.id} is before ${a.id}`);
                return 1;
            }
            // otherwise we need to compare offsets
            else {
                const key = vertical ? 'x' : 'y';

                const [
                    {
                        [key]: offsetA = 0,
                    } = {},
                    {
                        [key]: offsetB = 0,
                    } = {}
                ] = [beforeA, beforeB]
                    .map(before => before
                        .find(({ bottomLeftOffset: { [key]: offset } = {} }) => offset));

                if (offsetA < offsetB) {
                    console.log(`${a.id} is before ${b.id}`);
                    return -1;
                }
                else if (offsetA > offsetB) {
                    console.log(`${b.id} is before ${a.id}`);
                    return 1;
                }
                else {
                    console.log(`${a.id} is equal to ${b.id}`);
                    return 0;
                }
            }
        }
    }

    get placement() {
        return this.__placement || (
            this.__placement = {
                id: this.id,
                height: this.daylightOpening.y,
                width: this.daylightOpening.x,
                x: this.elevation.sightline + (
                    (
                        this.bottomLeftOffset
                        &&
                        this.bottomLeftOffset.x
                    ) || (
                        this.leftContainers[0]
                        &&
                        (
                            this.leftContainers[0].placement.x
                            +
                            this.leftContainers[0].daylightOpening.x
                        )
                    ) || 0
                ),
                y: this.elevation.sightline + (
                    (
                        this.bottomLeftOffset
                        &&
                        this.bottomLeftOffset.y
                    ) || (
                        this.bottomContainers[0]
                        &&
                        (
                            this.bottomContainers[0].placement.y
                            +
                            this.bottomContainers[0].daylightOpening.y
                        )
                    ) || 0
                ),
            });
    }
}
