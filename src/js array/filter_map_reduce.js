/**
 * @file filter、map、reduce、find、some数组方法实现的原理
 */

 // filter
// let filterArr = [2, 4, 6, 8, 10, 11];
// let filterArrFilter = filterArr.filter(item => {
//     return item > 4;
// });
// console.log(filterArrFilter);

// // 原理实现
// Array.prototype.filter1 = function (fn) {
//     // console.log(this)
//     let newArr = [];
//     for(let i = 0; i < this.length; i++) {
//         // console.log(fn)
//         // console.log(fn(this[i]));
//         // console.log(this[i])
//         fn(this[i]) && newArr.push(this[i]);
//     }
//     return newArr;
// };

// let filterArrCutom = [2, 4, 6, 8, 10, 11];
// let filterArrCutomFilter = filterArrCutom.filter1(item => {
//     return item > 4;
// });
// console.log(filterArrCutomFilter);



// map
let mapArr = ['zhangsan', 'lisi', 'wangwu'];
let mapFuncArr = mapArr.map(item => {
    return item + '：' + 'hello world!!!';
});
// console.log(mapFuncArr);

// // 原理实现
Array.prototype.map1 = function (fn) {
    let newArr = [];
    for (let i = 0; i < this.length; i++) {
        // console.log(this)
        // console.log(this[i])
        newArr.push(fn(this[i]));
    }
    // console.log(newArr)
    return newArr;
};

let mapArrCustom = ['zhangsan', 'lisi', 'wangwu'];
let mapArrCustomFunc = mapArrCustom.map1(item => {
    return item + '：' + 'hello world!!!';
});
console.log(mapArrCustomFunc);



// reduce
let reduceArr = [2, 4, 6, 7, 8];
let reduceFuncArr = reduceArr.reduce((prev, cur, index, arr) => {
    return prev + cur;
});
console.log(reduceFuncArr);

// 原理实现
Array.prototype.reduceFuncCustom = function (callback, initVal)  {
    let pre = initVal;
    let i = 0;
    if (pre === undefined) {
        pre = this[0];
        i = 1;
    }
    for (i; i < this.length; i++) {
        pre = callback(pre, this[i], i, this);
    }
    return pre;
};

let reduceArrCuston = [2, 4, 6, 7, 8];
let reduceArrFuncCustom = reduceArrCuston.reduceFuncCustom((prev, cur, index, arr) => {
    return prev + cur;
});
console.log(reduceArrFuncCustom);


// find
let findArr = [1, 2, 4, 5];
let findFuncArr = findArr.find(item => item > 2);
console.log(findFuncArr);

// 原理解析
Array.prototype.find1 = function (fn) {
    for (let i = 0; i < this.length; i++) {
        if (fn(this[i])) {
            return this[i];
        }
    }
};

let findArrCustom = [1, 2, 4, 5];
let findArrFuncCustom = findArrCustom.find1(item => item > 2);
console.log(findArrFuncCustom);


// some

let someArr = [2, 4, 5, 7, 8];
let someFuncArr = someArr.some(item => item > 4);
console.log(someFuncArr);

// 原理实现
Array.prototype.some1 = function (fn) {
    for (let i = 0; i < this.length; i++) {
        if (fn(this[i])) {
            return true;
        }
    }
};
let someArrCustom = [2, 4, 5, 7, 8];
let someArrFuncCustom = someArrCustom.some1(item => item > 5);
console.log(someArrFuncCustom);






