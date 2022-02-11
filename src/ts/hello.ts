// ts只会在编译时对类型进行静态检查, 如果发现有错误, 编译的时候就会报错
// ts在运行时, 与普通的JavaScript文件一样, 不会对类型进行检查
export {}

/**
 * @function
 * @param person string name
 * @returns String
 */
function sayHello(person: String) {
    if (typeof person === 'string') {
        return 'Hello' + person
    } else {
        throw new Error('person is not a string')
    }
}

const user: String = 'tom';
console.log(sayHello(user));