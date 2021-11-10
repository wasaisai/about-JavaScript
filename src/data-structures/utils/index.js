/**
 * 比较两个变量是否相等
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */
export function defaultEquals(a, b) {
    return a === b;
};

/**
 * 将数据转换为string类型
 * @param {any} item 需要转换为string类型的数据
 * @returns 
 */
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

/**
 * @constant 较大或较小常量
 */
export const Compare = {
    LESS_THEN: -1,
    BIGGER_THAN: 1
}

/**
 * 比较两个变量的大小
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */
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

/**
 * 获取数组中的最大值
 * @param {Array} array 
 * @returns 最大值
 */
export function findMaxValue(array) {
    let max = array[0];
    for (let i = 1; i < array.length; i++) {
        if (array[i] > max) {
            max = array[i];
        }
    }
    return max;
}

/**
 * 获取数组中的最小值
 * @param {Array} array 
 * @returns 最小值
 */
export function findMinValue(array) {
    let min = array[0];
    for (let i = 1; i < array.length; i++) {
        if (array[i] < min) {
            min = array[i];
        }
    }
    return min;
}

