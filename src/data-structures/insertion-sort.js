/**
 * @file 插入排序
 * 思路: 插入排序每次排一个数组项, 以此方式构建最后的排序数组;假定第一项已经排好了, 接着它和第二项进行比较
 *      ——第二项是应该待在原位还是插到第一项之前呢?这样, 头两厢就已正确排序, 接着和第三项比较(它是该插入到第一、
 *      第二还是第三的位置呢), 以此类推
 */

import { Compare, createNonSortedArray, defaultCompare } from "./utils/index.js";

export function insertionSort(array, compareFn = defaultCompare) {
    const {length} = array;
    let temp;
    for(let i = 1; i < length; i++) {
        let j = i;
        temp = array[i];
        while (j > 0 && compareFn(array[j - 1], temp) === Compare.BIGGER_THAN) {
            array[j] = array[j - 1];
            j--;
        }
        array[j] = temp;
    }
    return array;
}

let array = createNonSortedArray(5);
console.log(111, array);
array = insertionSort(array);
console.log(array)