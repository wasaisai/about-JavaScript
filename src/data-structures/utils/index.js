export function defaultEquals(a, b) {
    return a === b;
};

export function defaultToString(item) {
    if(item === null) {
        return 'NULL';
    } else if (item === undefined) {
        return 'UNDEFINED';
    } else if(typeof item === 'string' || item instanceof String) {
        return `${item}`
    }
    return item.toString();
};

export const Compare = {
    LESS_THEN: -1,
    BIGGER_THAN: 1
}

export function defaultCompare(a, b) {
    if (a === b) {
        return 0;
    }
    return a > b ? Compare.BIGGER_THAN : Compare.LESS_THEN;
}


