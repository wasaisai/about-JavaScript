/**
 * @file 基数排序
 * 特点: 1. 分布式排序算法
 *      2. 根据数字的  有效位  或基数(这也是它为什么叫基数排序)将整数分布到桶中
 *      3. 基数是基于数组中值的计数制的;
 *         例如, 对于十进制数, 使用的基数是10.因此算法将会使用10个桶来分布元素并且首先基于个位数字进行排序,
 *         然后基于百位数字, 以此类推
 */
import {findMinValue, findMaxValue, createNonSortedArray} from './utils/index.js';

function radixSort(array, radixBase = 10) {
    if (array.length < 2) {
        return array;
    }
    const minValue = findMinValue(array);
    const maxValue = findMaxValue(array);
    let significantDigit = 1;

    while ((maxValue - minValue) / significantDigit >= 1) {
        array = contingSortForRadix(array, radixBase, significantDigit, minValue);
        significantDigit *= radixBase;
    }
    return array;
}

function contingSortForRadix(array, radixBase, significantDigit, minValue) {
    let bucketsIndex;
    const buckets = [];
    const aux = [];
    for (let i = 0; i < radixBase; i++) {
        buckets[i] = 0;
    }
    for (let i = 0; i < array.length; i++) {
        bucketsIndex = Math.floor((array[i] - minValue) / significantDigit % radixBase);
        buckets[bucketsIndex]++;
    }
    for(let i = 1; i < radixBase; i++) {
        buckets[i] = buckets[i - 1];
    }
    for (let i = array.length - 1; i >= 0; i--) {
        bucketsIndex = Math.floor(((array[i] -minValue) / significantDigit) % radixBase);
        aux[--buckets[bucketsIndex]] = array[i];
    }
    for (let i = 0; i < array.length; i++) {
        array[i] = aux[i];
    }
    return array;

}

let arr = createNonSortedArray(10);
console.log(111, arr);
arr = radixSort(arr);
console.log(arr);