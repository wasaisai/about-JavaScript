// 「类型 + 方括号」
const arr1: number[] = [1, 2, 3, 4];
// 数组的一些方法的参数也会根据数组在定义时约定的类型进行限制
// arr1.push('8') 报错: Argument of type '"8"' is not assignable to parameter of type 'number'.
arr1.push(8);

// 数组泛型(Array Generic)
const arr2: Array<number> = [1, 2, 3, 4];

// 用接口表示数组
interface ArrayNumber {
    [index: number]: number // 只要索引的类型是数字时, 那么值的类型必须是数字
}
const arr3: ArrayNumber = [1, 2, 3, 4];

// 类数组(Array-like Object)
// 类数组, 不是数组类型, 例如arguments
function sum() {
    // const args: number[] = arguments; 报错: Type 'IArguments' is missing the following properties from type 'number[]': pop, push, concat, join, and 24 more.
    const args: {
        [index: number]: number,
        length: number,
        callee: Function
    } = arguments;
}

// 常用的类数组都有自己的接口定义, 如: IAIArguments、NodeList、HTMLCollection等

// arguments是一个类数组，不能用普通的数组的方式来描述，而应该用接口
interface IArguments {
    [index: number]: number,
    length: number,
    callee: Function
}

function sum1() {
    const args: IArguments = arguments;
}

// 用any表示数组中允许出现任意类型
const list: any[] = ['vaga', 2, {name: 'zhangsan'}];

