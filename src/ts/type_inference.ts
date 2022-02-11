// 类型推论: ts会在没有明确指定类型的时候推测出一个类型
// 如果定义的时候没有赋值, 不管之后有没有赋值, 都会被推断成any类型而完全不被类型检查
let num;
num = 'three';
num = 3;

let num2 = 'four'; // 等价于 let num2: String = 'four';
// num2 = 4 报错: 'number' is not assignable to type 'string'.

export {}