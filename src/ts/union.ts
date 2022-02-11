// 联合类型(Union Types) 表示取值可以为多种类型中的一种

let result: string | number; // 允许result的类型是string或number, 但不能是其他类型
result = 'seven';
result = 7;

// 当ts不确定联合类型的变量到底是哪一个类型的时候, 只能访问此联合类型的所有类型里共有的属性或方法
function getLength(something: string | number): string {
    // return something.length; 报错
    return something.toString();
}

// 联合类型的变量在被赋值的时候, 会根据类型推论的规则推断出一个类型

let common: string | number;
common = 'name'; // 推断为string
console.log(common.length);
common = 12; // 推断为number
// console.log(common.length) 编译报错: Property 'length' does not exist on type 'number'.
console.log(isNaN(common)) 