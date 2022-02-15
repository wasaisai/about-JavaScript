/**
 * 类型断言(Type Assertion) 可以用来手动指定一个值的类型
 * 语法: 值as类型 / <类型>值
 * 在tsx语法中, 必须使用值as类型
 **/

// 将一个联合类型断言为其中一个类型
interface Cat {
    name: string,
    run(): void
}
interface Fish {
    name: string,
    swim(): void
}
function getName(animal: Cat | Fish) {
    if (typeof (animal as Fish).swim === 'function') {
        return true;
    }
    return false;
}
// 类型断言只能够「欺骗」ts编译器, 无法避免允许时的错误, 反而滥用类型断言可能会导致运行时错误
function swim(animal:Cat | Fish) {
    (animal as Fish).swim();
}

const tom:Cat = {
    name: 'Tom',
    run() {console.log('run')}
};
// swim(tom); 编译时不会报错, 但允许时会报错
// 原因: 这段代码(animal as fish).swim()隐藏了animal可能为cat的情况, 将animal直接断言为fish, 而ts编译器信任了我们的断言, 所以在调用swim()时没有编译错误
//     可是swim函数接受的参数是cat | fish, 一旦传入的参数是cat类型的变量, 由于cat上没有swim方法, 就会导致运行时错误了


// 将父类断言为更加具体的子类
class ApiError extends Error {
    code: number = 0;
}
class HttpError extends Error {
    statusCode: number = 200;
}
function isApiError(error: Error) {
    if (typeof (error as ApiError).code === 'number') {
        return true;
    }
    return false;
}
// 声明了函数isApiError, 用来判断传入的参数是不是ApiError类型; 它的参数类型是比较抽象的父类Error, 这样它就能接受Error或它的子类作为参数了
// 但是由于父类Error中没有code属性, 故直接获取error.code会报错, 需要使用类型断言获取(error as ApiError).code
// 上例也可使用instanceof来判断, 因为ApiError是一个Javascript类, 能够通过instanceof来判断error是否是它的实例
// 有的情况下ApiError和HttpError不是一个真正的类, 而只是一个TypeScript的接口(interface), 接口是一个类型, 不是以恶搞真正的值, 它在编译结果中会被删除, 因此无法使用instanceof来做运行判断

// 将任何一个类型断言为any
function getCacheData(key: string): any {
    return (window as any).cache[key];
}

interface Tiger {
    name: string,
    run(): void
}
const jack = getCacheData('jack') as Tiger;
jack.run();

// ts是结构类型系统, 类型之间的对比只会比较它们最终的结构, 会忽略它们定义时的关系
// 双重断言: 将任何一个类型断言为任何另一个类型
function testCat(cat:Cat) {
    return (cat as any as Fish)
}
// 若直接使用cat as fish 肯定会报错, 因为cat和fish互相都不兼容.但是若使用双重断言, 则可以打破「要使得A能够被断言为B, 只需要A兼容B或B兼容A即可」的限制

// 类型断言不是类型转换, 它不会真的影响到变量的类型

