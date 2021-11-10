/**
 * @file 计数排序
 * 特点: 1. 分布式排序——使用已组织好的辅助数据结构(称为桶), 然后进行合并, 得到排好的数组
 *       2. 使用一个用来存储每个元素在原始数组中出现次数的                      临时数组
 *       3. 在所有元素都计数完成后, 临时数组已排好序并可迭代以构建排序后的结果数组
 */

import { createNonSortedArray } from "./utils/index.js";

function countingSort(array) {
    if (array.length < 2) {
        return array;
    }
    const maxValue = findMaxValue(array);
    const counts = new Array(maxValue + 1);

    array.forEach(element => {
        if (!counts[element]) {
            counts[element] = 0;
        }
        counts[element]++;
    });

    let sortedIndex = 0;
    counts.forEach((count, i) => {
        while (count > 0) {
            array[sortedIndex++] = i;
            count--;
        }
    })
    return array; 
}

function findMaxValue(array) {
    let max = array[0];
    for (let i = 1; i < array.length; i++) {
        if (array[i] > max) {
            max = array[i];
        }
    }
    return max;
}

let arr = createNonSortedArray(5);
console.log(111, arr);
arr = countingSort(arr);
console.log(arr);