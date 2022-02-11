let isDone: Boolean = false;
//使用构造函数Boolean创造的对象不是布尔值 返回的是一个对象
let createdByNewBoolean: Boolean = new Boolean(1);
// 直接调用也可以返回一个boolean对象
let createdBoolean: boolean = Boolean(1);

// js中没有空值(viod)的概念, 在ts中, 可以使用boid表示没有任何返回值的函数
function alertName(): void {
    alert('name is tom');
}
// 将变量声明为vioid类型, 只能将它赋值为undefined和null(在strictNullChecks未指定时)
let unuseable: void = undefined;


// undefined和null是所有类型的子类型, 也就是说undefined类型的变量可以赋值给number类型的变量
let num: undefined = undefined;
const u: undefined;
let total: number = u;
// void 类型变量不能赋值给number类型的变量

