// 函数声明(Function Declaration)
function result(x: number, y:number): number {
    return x + y
}

// 函数表达式
// 只对等号右侧的匿名函数进行了类型定义, 而等号左边的func, 是通过赋值推论而推断出来的
const func = function (x: number, y: number):number {
    return x + y
}

// 在ts中, =>用来表示函数的定义, 左边是输入类型, 需要用括号括起来, 右边是输出类型

// 用接口定义函数的形状
interface SearchFunc {
    (source: string, subString: string): boolean
}
let mysearch: SearchFunc;
mysearch = function (source:string, subString: string) {
    return source.search(subString) !== -1;
    
}
// 采用函数表达式|接口定义的方式时, 对等号左侧进行类型限制, 可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变

// 可选参数
function buildName(firstName:string, lastName?: string) {
    if (lastName) {
        return firstName + ' ' + lastName; 
    } else {
        return firstName;
    }
    
}
// 可选参数必须接在必需参数后面, 换句话说, 可选参数后面不允许再出现比需参数
const tomcat = buildName('tom', 'cat');
const tom = buildName('tom');

// 参数默认值: ts会将添加了默认值的参数识别为可选参数, 此时不受「可选参数必须接在必选参数后面」的限制
function buildName1 (firstName: String = 'tom', lastName: string) {
    return firstName + '' + lastName;
}
const name1 = buildName1('ross', 'cat');
const name2  = buildName1('mick', 'zhangsan');

// 剩余参数, rest参数只能是最后一个参数
function push(array: any[], ...items: any[]) {
    items.forEach(function (item) {
        array.push(item);
    })
}
const a = [];
push(a, 1, 2, 4);

// 重载: 允许一个函数接受不同数量或类型的参数时, 作出不同的处理
function reverse(x:number): number;
function reverse(x:string): string;
function reverse(x: number | string): number | string | void {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join();
    }
}
// 上例代码中, 我们重复定义了多次函数reverse, 前几次都是函数定义, 最后一次是函数实现.
// 在ts中会优先从最前面的函数定义开始匹配, 所以多个函数定义如果有包含关系, 需要优先把精确的定义写在前面

export {};