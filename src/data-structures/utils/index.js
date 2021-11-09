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

/**
 * 数组元素交换函数
 * @param {Array} array 数组
 * @param {number} a 需要交换的index
 * @param {number} b 需要交换的index
 */
export function swap(array, a, b) {
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}

/**
 * 为了便于测试, 创建一个函数自动创建一个未排序的数组
 * @param {number} size 
 * @returns 
 */
export function createNonSortedArray(size) {
    const array = [];
    for (let i = size; i > 0; i--) {
        array.push(randomNum(1, 100));
    }
    return array;
}

//生成从minNum到maxNum的随机数
function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
} 

