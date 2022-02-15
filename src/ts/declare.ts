// declear var: 声明全局变量
// 声明语句中只能定义类型, 切勿在声明语句中定义具体的实现
declare const a: number;

// declare function: 定义全局函数类型; 在函数类型的声明语句中, 函数重载也是支持的
declare function jQuery(selector:string): any
declare function jQuery(domReadyCallback: () => any): any

// delcare class: 定义全局类, declare class语句只能用来定义类型, 不能用来定义具体的实现
declare class Animal {
    name: string;
    constructor(name: string);
    sayHi(): string
}
const cat = new Animal('tom');

// declare enum: 定义枚举类型也称作外部枚举(Ambient Enmus)
declare enum Directions {
    Up,
    Dowm,
    Left,
    Right
}
const direction = [Directions.Up, Directions.Dowm, Directions.Left, Directions.Right];

// declare namespace: namespace是ts早期为了解决模块化而创造的关键字, 中文称为命名空间
// 由于历史原因, 在早起还没有ES6的时候, ts提供了一种模块划方案, 使用module关键字表示内部模块;
//    但由于后来ES6也使用了module关键字, ts为了兼容ES6, 使用namespace替代了自己的module, 更名为命名空间

// 随着ES6的广泛应用, 现在已经不建议再使用ts中的namespace, 二推荐使用ES6的模块化方案了
// namespace被淘汰了, 但是在声明文件中, declare namespace还是比较常用的, 它用来表示全局变量是一个对象, 包含很多子属性
// 例如jQuery是一个全局变量, 它是一个对象, 提供了一个jQuery.ajax方法可以调用, 那么我们就应该使用declare namespace jQuery来声明这个拥有多个子属性的全局变量
declare namespace jQuery {
    function ajax(url: string, settings?: any): void;
    const version: number;
    class Event {
        blur(eventType: EventTarget): void
    }
    enum EventType {
        CustomClick
    }
    namespace fn {
        function extend(Object: any): void
    }
}

// npm包的声明文件主要有以下几种语法: 
/**
 * 1. export 导出变量
 * 2. export namespace 导出(含有子属性的)对象
 * 3. export default ES6默认导出
 * 4. export = commonjs 导出模块
 */
// npm包的声明文件与全局变量的声明文件有很大区别. 在npm包的声明文件中, 使用declare不再会声明一个全局变量, 而只会在当前文件中声明一个局部变量
// 只有在声明文件中使用export导出, 然后在使用方import导入后, 才会应用到这些类型声明
export const name: string = 'tom';

// UMD库: 既可以通过<script>标签引入, 又可以通过import导入的库, 称为UMD库相比于npm包的类型声明文件, 我们需要额外声明一个全局变量, 为了实现这种方式, ts提供了一个新语法export as namespace
// export as namespace时, 都是先有了npm包的声明文件, 再基于它添加一条export as namespace语句, 即可将声明好的一个变量声明为全局变量
// export as namespace foo;
// export = foo;

declare function foo(): string;
declare namespace foo {
    const bar: number;
}

export {}
