// 接口(interfaces): 它是对行为的抽象, 而具体如何行动需要由类(classes)去实现(implement)
// ts中的接口非常灵活, 除了可用于对类的一部分行为进行抽象以外, 也常用于对「对象的形状(Shape)」进行描述


interface Person {
    readonly id: Number, // 只读属性
    name: String,
    age: Number,
    like?: String, // 可选属性, 变量赋值时可以不存在
    [propName: string]: String | Number; // 任意属性, 一个接口中只能定义一个任意属性, 多有多个类型的属性, 则可使用联合类型
}
let tom: Person = {  
    id: 12,
    name: 'tom',
    age: 113,
    sax: 'male'
}
console.log(tom)

export {}

// 定义的变量比接口少了一些属性或多一些是不允许的;
// 赋值的时候, 变量的形状必须和接口形状保持一致

// 一旦定义了任意属性, 那么确定属性和可选属性的类型都必须是任意属性的子集
// interface Person {
//     name: String,
//     age: Number,
//     like?: String, 
//     [propName: string]: any; 
// }
// 报错: 'age' of type 'number' is not assignable to string index type 'string'.
// number不是string的子属性

// 只读的约束存在于第一次给对象赋值的时候, 而不是第一次给只读属性赋值的时候
// let tom: Person = {
//     name: 'Tom',
//     gender: 'male'
// };
// tom.id = 89757;
// 报错1:  Type '{ name: string; gender: string; }' is not assignable to type 'Person'.
// 报错2: Cannot assign to 'id' because it is a constant or a read-only property.