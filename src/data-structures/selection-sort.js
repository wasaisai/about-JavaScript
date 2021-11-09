/**
 * @file 选择排序
 * 思路: 找到数据结构中最小的值并将其放置在第一位, 接着找到第二小的值将其放在第二位, 以此类推
 */

import {Compare, createNonSortedArray, defaultCompare, swap} from './utils/index.js';

function selectionSort(array, compareFn = defaultCompare) {
    const {length} = array;
    let indexMin;
    for (let i = 0; i < length - 1; i++) {
        indexMin = i;
        for (let j = i; j < length - 1; j++) {
            if (compareFn(array[indexMin], array[j]) === Compare.BIGGER_THAN) {
                indexMin = j;
            }
        }
        if (i !== indexMin) {
            swap(array, i, indexMin);
        }
    }
    return array;
}

let array = createNonSortedArray(5);
console.log(111, array);
array = selectionSort(array);
console.log(array);