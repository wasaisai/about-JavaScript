"use strict";
exports.__esModule = true;
// 函数声明(Function Declaration)
function result(x, y) {
    return x + y;
}
// 函数表达式
// 只对等号右侧的匿名函数进行了类型定义, 而等号左边的func, 是通过赋值推论而推断出来的
var func = function (x, y) {
    return x + y;
};
var mysearch;
mysearch = function (source, subString) {
    return source.search(subString) !== -1;
};
// 采用函数表达式|接口定义的方式时, 对等号左侧进行类型限制, 可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变
// 可选参数
function buildName(firstName, lastName) {
    if (lastName) {
        return firstName + ' ' + lastName;
    }
    else {
        return firstName;
    }
}
// 可选参数必须接在必需参数后面, 换句话说, 可选参数后面不允许再出现比需参数
var tomcat = buildName('tom', 'cat');
var tom = buildName('tom');
// 参数默认值: ts会将添加了默认值的参数识别为可选参数, 此时不受「可选参数必须接在必选参数后面」的限制
function buildName1(firstName, lastName) {
    if (firstName === void 0) { firstName = 'tom'; }
    return firstName + '' + lastName;
}
var name1 = buildName1('ross', 'cat');
var name2 = buildName1('mick', 'zhangsan');
// 剩余参数, rest参数只能是最后一个参数
function push(array) {
    var items = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        items[_i - 1] = arguments[_i];
    }
    items.forEach(function (item) {
        array.push(item);
    });
}
var a = [];
push(a, 1, 2, 4);
function reverse(x) {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    }
    else if (typeof x === 'string') {
        return x.split('').reverse().join();
    }
}
