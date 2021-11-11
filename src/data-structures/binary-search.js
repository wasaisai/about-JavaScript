/**
 * @file 二分搜索
 */
import {Compare, createNonSortedArray, defaultCompare} from './utils/index.js';
import {quickSort} from './quick-sort.js';
function binarySearch(array, value, compareFn = defaultCompare) {
    const sortedArray = quickSort(array);
    let low = 0;
    let hight = sortedArray.length - 1;
    // while (low <= hight) {
    //     const mid = Math.floor((low + hight) / 2);
    //     const element = sortedArray[mid];
    //     if (compareFn(element, value) === Compare.LESS_THEN) {
    //         low = mid + 1;
    //     } else if (compareFn(element, value) === Compare.BIGGER_THAN) {
    //         hight = mid - 1;
    //     } else {
    //         return mid;
    //     }
    // }
    // return 'DOES_NOT_EXIST';
    return binarySearchRecursive(array, value, low, hight, compareFn);
}

/**
 * 二分搜索的递归实现
 * @param {Array} array 数组
 * @param {any} value 需要查找的值
 * @param {number} low 最小值
 * @param {number} hight 最大值
 * @param {Function} compareFn 比较函数
 * @returns value的下标
 */

function binarySearchRecursive (array, value, low, hight, compareFn = defaultCompare) {
    if (low <= hight) {
        const mid = Math.floor((low + hight) / 2);
        const element = array[mid];

        if (compareFn(element, value) === Compare.LESS_THEN) {
            return binarySearchRecursive(array, value, mid + 1, hight, compareFn = defaultCompare);
        } else if (compareFn(element, value) === Compare.BIGGER_THAN) {
            return binarySearchRecursive(array, value, low, mid - 1, compareFn = defaultCompare);
        } else {
            return mid;
        }
    }
}

const arr = [1, 2, 3, 4, 5];
const a = binarySearch(arr, 5);
console.log(a);