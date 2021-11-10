/**
 * @file 桶排序
 * 特点: 1. 分布式排序算法——将元素分为不同的桶(较小的数组),再使用一个简单的排序算法,例如插入排序, 来对每个桶进行排序.然后, 它将所有的桶合并为结果数组
 */

import {insertionSort} from './insertion-sort.js';
import { createNonSortedArray } from './utils/index.js';

function buckedSort(array, bucketSize) {
    if (array.length < 2) {
        return array;
    }
    const buckets = createBuckets(array, bucketSize);
    return sortBuckets(buckets);
}

function createBuckets(arr, bucketSize) {
    let minValue = arr[0];
    let maxValue = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < minValue) {
            minValue = arr[i];
        } else if (arr[i] > maxValue) {
            maxValue = arr[i];
        }
    }

    const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    const buckets = [];
    for (let i = 0; i < bucketCount; i++) {
        buckets[i] = [];
    }
    for (let i = 0; i < arr.length; i++) {
        const bucketIndex = Math.floor((arr[i] - minValue) / bucketSize);
        buckets[bucketIndex].push(arr[i]);
    }
    return buckets;
}

function sortBuckets(buckets) {
    const sortedArray = [];
    for (let i = 0; i < buckets.length; i++) {
        if (buckets[i] != null) {
            insertionSort(buckets[i]);
            sortedArray.push(...buckets[i]);
        }
    }
    return sortedArray;
}

let arr = createNonSortedArray(10);
console.log(111, arr);
arr = buckedSort(arr, 50);
console.log(arr);