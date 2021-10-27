

// 顺序查找
function sequenceSearch(arr, value) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === value) {
            return i;
        }

    }
    return false;
}
// const arr = [1, 3, 4, 5, 2, 4, 2];
// console.log(sequenceSearch(arr, 2));

// 二分查找
function binarySearch(arr, value) {
    let min = 0;
    let max = arr.length - 1;
    while (min <= max) {
        const mid = Math.floor((min + max) / 2);
        if (arr[mid] === value) {
            return mid;
        } else if (arr[mid] > value) {
            max = mid - 1;
        } else {
            min = mid + 1;
        }
    }
    return 'Not Found';
};

// const binaryList = [1, 3, 6, 7, 8, 90];
// console.log(binarySearch(binaryList, 6));



// 插值查找

function interpolationSearch(sortedArray, seekElement) {
    let leftIndex = 0;
    let rightIndex = sortedArray.length - 1;
  
    while (leftIndex <= rightIndex) {
        // 最大值与最小值之间的差值
        const rangeDelta = sortedArray[rightIndex] - sortedArray[leftIndex];
        // 数组的长度
        const indexDelta = rightIndex - leftIndex;
        // 目标值与数组中的最小值的差值
        const valueDelta = seekElement - sortedArray[leftIndex];

        // 如果当前查找的值小于当前查找的数组的最小值,则表示该数组中没有要查找的目标值
        if (valueDelta < 0) {
            return 'Not Found';
        }

        // 如果最大值与最小值相等,判断是否为当前值
        if (!rangeDelta) {
            return sortedArray[leftIndex] === seekElement ? leftIndex : 'Not Found';
        }

        // 计算查找点
        const middleIndex = leftIndex + Math.floor(valueDelta * indexDelta / rangeDelta);

        // 如果查找点==目标值
        if (sortedArray[middleIndex] === seekElement) {
            return middleIndex;
        }

        if (sortedArray[middleIndex] < seekElement) {
            leftIndex = middleIndex + 1;
        } else {
            rightIndex = middleIndex - 1;
        }
    }
    return 'Not Found';
}

// const interpolationList = [43, 56, 57, 78];
// console.log(interpolationSearch(interpolationList, 4));



// 斐波那契查找
// 1. 递归
function fibonacci01(n) {
    if(n === 0 || n === 1) {
        return n;
    }
    // console.log(`fibonacci(${n-1}) + fibonacci(${n-2})`);
    return fibonacci01(n - 2) + fibonacci01(n - 1);
}
// console.log(fibonacci01(3));






// 2. 数组缓存
let fibonacci02 = function () {
    let temp = [0, 1];
    return function (n) {
        let result = temp[n];
        // console.log(result);
        if(typeof result !== 'number') {
            // console.log('n: ' + n)
            result = fibonacci02(n - 1) + fibonacci02(n - 2);
            // console.log('result: ' + result)
            temp[n] = result; // 将每次 fibonacci(n) 的值都缓存下来
            console.log('temp: ' + temp)
        }
        return result;
    }
}(); // 外层立即执行

fibonacci02(3);
// f(5) = f(5-1) + f(5-2) =
// f(4) + f(3) =
// f(4-1) + f(4-2) + f(3 -1) + f(3-2) =
// f(3) + f(2) + f(2) + f(1) =
// f(3-1) + f(3-2) + 2 * (f(2 -1) + f(2 -2)) + 1=
// f(2) + f(1) + 2* (f(1) + f(0)) + 1 =
// f( 2-1) + f(2-2) + 1 + 2 * 1 + 1 =
// f(1) + f(0) + 4 =
// 1 + 4 = 5


// 动态规划：从底部开始解决问题，将所有小问题解决掉，然后合并成一个整体解决方案，从而解决掉整个大问题；
// 递归：从顶部开始将问题分解，通过解决掉所有分解的小问题来解决整个问题；

function fibonacci03(n) {
    let current = 0;
    let next = 1;
    let later;
    for(let i = 0; i < n; i++) {
        later = current;
        current = next;
        next += later;
    }
    // console.log(`fibonacci03(${n}, ${next}, ${current + next})`);
    return current;
}

// console.log(fibonacci03(8));
// i = 0; temp = 0 current = 1 next = next + temp = 1 + 0 = 1;
// i = 1; temp = 1 current = 1 next = next + temp = 1 + 1 = 2;
// i = 2; temp = 1 current = 2 next = next + temp = 2 + 1 = 3;
// i = 3; temp = 2 current = 3 next = next + temp = 3 + 2 = 5;
// i = 4; temp = 3 current = 5 next = next + temp = 5 + 3 = 8;
// i = 5; temp = 5 current = 8 next = next + temp = 8 + 5 = 13;
// i = 6; temp = 8 current = 13 next = next + temp = 13 + 8 = 21;
// i = 7; temp = 13 current = 21 next = next + temp = 21 + 13 = 34;




// 分块查找
/**
 * Jump (block) search implementation.
 *
 * @param {*[]} sortedArray
 * @param {*} seekElement
 * @param {function(a, b)} [comparatorCallback]
 * @return {number}
 */


// 1. 分割的大小
// 2. 分割数组为若干个块
// 3. 获得各个快的最大值,组成映射表
// 4. 在映射表中查找,当前元素所在的块
// 5. 根据上一步查找到的块,在块中查找目标值

// function jumpSearch(sortedArray, seekElement) {
//     const arraySize = sortedArray.length;

//     if (!arraySize) {
//         return 'NOT FOUND';
//     }
//     // 最坏的情况:  ((arraySize/jumpSize) + jumpSize - 1)
//     // 最好的情况: ((arraySize/jumpSize) + jumpSize - 1)
//     // 块的大小: jumpSize = √array.length.
//     const jumpSize = Math.floor(Math.sqrt(arraySize));
//     let blockData;
//     // for(let i = 0 ; i < sortedArray / seekElement; i+ ) {
//     //     const temp = []
//     //     blockData.push([])
//     // }
//     const indexTable = Math.max.apply(null,sortedArray[jumpSize]));

//     let blockStart = 0;
//     let blockEnd = jumpSize;
//     while (!sequenceSearch(sortedArray[Math.min(blockEnd, arraySize) - 1], seekElement)) {
//     // 跳到下一个块.
//         blockStart = blockEnd;
//         blockEnd += jumpSize;
//         if (blockStart > arraySize) {
//             return 'NOT FOUND';
//         }
//     };

//   // 在对应的块中查找元素
//     let currentIndex = blockStart;
//     while (currentIndex < Math.min(blockEnd, arraySize)) {
//         if (comparator.equal(sortedArray[currentIndex], seekElement)) {
//             return currentIndex;
//         }

//     currentIndex += 1;
//   }

//   return -1;
// }



