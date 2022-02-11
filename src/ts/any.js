"use strict";
exports.__esModule = true;
// 普通类型变量, 在赋值过程中改变类型是不允许的
var myFavariteNumber = 'seven';
// myFavariteNumber = 1   报错: Type 'number' is not assignable to type 'string'.
// any类型则允许被赋值为任意类型
var myFavoutiteColor = 'red';
myFavoutiteColor = 3;
// 声明一个变量为任意值之后, 对它的任何操作, 返回的内容的类型都是任意值
// 变量如果在声明的时候, 未指定类型, 那么它会被识别为任意值类型
// 在任意值上访问任何属性都是允许的
var anything = 'hello';
console.log(anything.myName);
console.log(anything.myName.firstName);
// 允许调用任何方法
anything.setName('jerry');
anything.myName.setFirstName('cat');
