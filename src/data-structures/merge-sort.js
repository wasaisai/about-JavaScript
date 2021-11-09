/**
 * @file 归并排序
 * 思路: 分而治之——将原始数组切分成较小的数组, 直到每个小数组只有一个位置
 *     接着将小数组归并成较大的数组, 直到最后只有一个排序完毕的大数组
 */

import { Compare, createNonSortedArray, defaultCompare } from "./utils/index.js";

function mergeSort(array, compareFn = defaultCompare) {
    if (array.length > 1) {
        const {length} = array;
        const middle = Math.floor(length / 2);
        const left = mergeSort(array.slice(0, middle), compareFn);
        const right = mergeSort(array.slice(middle, length), compareFn);
        array = merge(left, right, compareFn);
    }
    return array;
}

function merge(left, right, compareFn) {
    let i = 0;
    let j = 0;
    const result = [];
    while (i < left.length && j < right.length) {
        result.push(compareFn(left[i], right[j]) === Compare.LESS_THEN ? left[i++] : right[j++])
    }
    return result.concat(i < left.length ? left.slice(i) : right.slice(j));
}

let array = createNonSortedArray(10);
console.log(111, array);
array = mergeSort(array);
console.log(array);