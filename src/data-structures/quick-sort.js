/**
 * @file 快速排序
 * 思路: 1. 首先从数组中选择一个值作为  主元(pivot)   也就是数组中间的那个值
 *      2. 创建两个指针(引用), 左边一个指向数组第一个值, 右边一个指向数组最后一个值.然后移动
 *         左指针直到我们找到一个比主元大的值, 接着, 移动右指针直到找到一个比主元小的值,然后交换它们,
 *         重复这个过程.直到左指针超过了右指针.
 *         这个过程将使得比主元小的值都排在主元之前, 而比主元大的值都排在主元之后.这一步叫作划分(partition)操作
 *      3. 接着, 算法对划分后的小数组(较主元小的值组成的子数组, 以及较主元大的值组成的子数组)重复之前的两个步骤, 直至数组已完成排序
 */

import { Compare, createNonSortedArray, defaultCompare, swap } from "./utils/index.js";

function quickSort(arrary, compareFn = defaultCompare) {
    return quick(arrary, 0, arrary.length - 1, compareFn);
}

function quick(arrary, left, right, compareFn) {
    let index;
    if (arrary.length > 1) {
        index = partition(arrary, left, right, compareFn);
        if (left < index - 1) {
            quick(arrary, left, index - 1, compareFn);
        }
        if (index < right) {
            quick(arrary, index, right, compareFn)
        }
    }
    return arrary;
}

function partition(arrary, left, right, compareFn) {
    const pivot = arrary[Math.floor((right + left) / 2)];
    let l = left;
    let r = right;
    while (l <= r) {
        while (compareFn(arrary[l], pivot) === Compare.LESS_THEN) {
            l++;
        }
        while(compareFn(arrary[r], pivot) === Compare.BIGGER_THAN) {
            r--;
        }
        if (l <= r) {
            swap(arrary, l, r);
            l++;
            r--;
        }
    }
    return l;
}


let arrary = createNonSortedArray(5);
console.log(111, arrary);
arrary = quickSort(arrary);
console.log(arrary)