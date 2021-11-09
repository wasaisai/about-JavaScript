/**
 * @file 冒泡排序
 */

import { Compare, createNonSortedArray, defaultCompare, swap } from "./utils/index.js";

function bubbleSort(array, comPareFn = defaultCompare) {
    const {length} = array;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - 1; j++) {
            if (comPareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
                swap(array, j, j + 1);
            }
        }
    }
    return array;
}

function modifiedBubbleSort(array, comPareFn = defaultCompare) {
    const {length} = array;
    for(let i = 0; i <length; i++) {
        for(let j = 0; j < length - 1 - i; j++) {
            if (comPareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
                swap(array, j, j + 1);
            }
        }
    }
    return array;
}

let array = createNonSortedArray(5);
console.log(111, array)
// array = bubbleSort(array);
array = modifiedBubbleSort(array)
console.log(array)
