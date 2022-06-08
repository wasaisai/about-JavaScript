// 1. 手写Object.create
function createObj(obj) {
    function F() { };
    F.prototype = obj;
    return new F();
}

// 2. 手写instanceOf
function instanceOf(left, right) {
    let proto = Object.getPrototypeOf(left);
    let prototype = right.prototype;

    while (true) {
        if (!proto) {
            return false;
        }
        if (proto === prototype) {
            return true;
        }
        proto = Object.getPrototypeOf(proto);
    }
}


// 3.手写new
function NEWFn(obj, ...reset) {
    const newObj = createObj(obj.prototype);
    const result = obj.apply(newObj, reset);

    return typeof result === 'object' && result !== null ? result : newObj;

}


// 4.手写promise
const PENDING = 'pending';
const RESOLVE = 'resolve';
const REJECT = 'reject';

function MyPromise(fn) {
    const self = this;
    this.state = PENDING;

    this.value = null;
    this.resolvedCallBack = [];
    this.rejectedCallBack = [];

    function resolve(value) {
        if (value instanceof MyPromise) {
            return value.then(resolve, reject);
        }

        setTimeout(() => {
            if (this.state === PENDING) {
                self.state = RESOLVE;
                self.value = value;
                self.resolvedCallBack.forEach(callback => {
                    callback(value);
                })
            }
        }, 0)
    }

    function reject(value) {
        if (value instanceof MyPromise) {
            return value.then(resolve, reject);
        }

        setTimeout(() => {
            if (this.state === PENDING) {
                self.state = REJECT;
                self.value = value;
                self.rejectedCallBack.forEach(callback => {
                    callback(value);
                })
            }
        }, 0)
    }

    try {
        fn(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

MyPromise.prototype.then = function (onResolve, onReject) {
    onResolve = typeof onResolve === 'function' ? onResolve : function (value) { return value };
    onReject = typeof onReject === 'function' ? onReject : function (value) { return value };

    if (this.state === PENDING) {
        this.resolvedCallBack.push(onResolve);
        this.rejectedCallBack.push(onReject);
    }

    if (this.state === RESOLVE) {
        onResolve(this.value);
    }

    if (this.state === REJECT) {
        onResolve(this.value);
    }
}

// 5. 手写类型判断函数
function getType(value) {
    if (value === null) {
        return value + ' ';
    }

    if (typeof value === 'object') {
        const valueClass = Object.prototype.toString.call(value);
        let type = valueClass.split(' ')[1].split('');
        type.pop();
        return type.join('').toLowerCase();
    } else {
        return typeof value;
    }
}

// 6. 手写call
Function.prototype.myCall = function (context) {
    if (typeof this !== 'function') {
        console.error('type error')
    }

    let args = [...arguments].slice(1);
    let result = null;

    context = context || window;
    context.fn = this;

    result = context.fn(...args);

    delete context.fn;
    return result;
}


// 7. 手写apply

Function.prototype.myApply = function (context) {
    if (typeof this !== 'function') {
        console.error('type error');
    }

    let result = null;
    context = context || window;

    context.fn = this;

    if (arguments[1]) {
        result = context.fn(...arguments[1]);
    } else {
        result = context.fn();
    }

    delete context.fn;
    return result;
}


// 8. 手写bind
Function.prototype.myBind = function (context) {
    if (typeof this !== 'function') {
        console.error('type error');
    }

    context = context || window;
    let args = [...arguments].slice(1);
    let fn = this;

    return function Fn() {
        return fn.apply(
            this instanceof Fn ? this : context,
            args.concat(...arguments)
        )
    }
}

// 9. 手写浅拷贝
function shallowCopy(obj) {
    if (!obj || typeof obj !== 'object') {
        return console.error('type error');
    }

    let newObj = Array.isArray(obj) ? [] : {};

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key];
        }
    }

    return newObj;
}

// 10. 深拷贝
function deepCopy(obj) {
    if (!obj || typeof obj !== 'object') {
        return console.error('type error');
    }

    let newObj = Array.isArray(obj) ? [] : {};

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        }
    }
}

// 11. 循环打印红黄绿
function red() {
    console.log('red');
}

function yellow() {
    console.log('yellow');
}

function green() {
    console.log('green')
}

const task = (timer, light, callback) => {
    setTimeout(() => {
        if (light === 'red') {
            red();
        } else if (light === 'yellow') {
            yellow();
        } else if (light === 'green') {
            green();
        }
        callback();
    }, timer);
};

// callback方式
const step = () => {
    task(3000, red, () => {
        task(2000, yellow, () => {
            task(1000, green, step);
        });
    });
};

// promise 方式
const promiseTask = (timer, light) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (light === 'red') {
                red();
            } else if (light === 'yellow') {
                yellow();
            } else if (light === 'green') {
                green();
            }
            resolve();
        }, timer)
    })
}

// 12. 手写promise.all
function myPromiseAll(promise) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promise)) {
            console.error('type error');
        }

        let resolvedCounter = 0;
        const promiseNum = promise.length;
        let resolvedResult = [];
        for (let i = 0; i < promiseNum; i++) {
            Promise.resolve(promise[i]).then(value => {
                resolvedCounter++;
                resolvedResult[i] = value;
                if (resolvedCounter === promiseNum) {
                    return resolve(resolvedResult)
                }
            }, error => {
                return reject(error);
            })
        }
    })
}

// 13. 手写promise.race
Promise.race = function (args) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < args.length; i++) {
            args[i].then(resolve, reject);
        }
    })
}

// 14. 实现数组的乱序输出
function outOfOrder(arr) {
    const randomIndex = Math.round(Math.random * (arr.length - 1 - i) + i);
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
}

// 15. 数组扁平化
function flatten01(arr) {
    return arr.reduce((prev, next) => {
        return prev.concat(Array.isArray(next) ? flatten01(next) : next);
    }, []);
}

function flatten02(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            result = result.concat(flatten02(arr[i]));
        } else {
            result.push(arr[i]);
        }
    }
    return result;
}

// 16. 元素求和
function add1(arr) {
    return arr.reduce((prev, next) => {
        return prev += prev + next;
    }, 0);
}

function add2(arr) {
    return arr.toString().split(',').reduce((prev, next) => {
        return prev += prev + next;
    }, 0);
}

function add3(arr) {
    if (arr.length === 1) {
        return arr[0];
    }

    return arr[0] + add3(arr.slice(1));
}

// 17. 数组去重
function duplication1(arr) {
    return Array.from(new Set(arr));
}

function duplication2(arr) {
    let map = {};
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (!map.hasOwnProperty(arr[i])) {
            map[arr[i]] = 1;
            result.push(arr[i]);
        }
    }
    return result;
}

// 18. 实现flat方法
function _flat(arr, depth) {
    if (!Array.isArray(arr) || depth <= 0) {
        return arr;
    }

    return arr.reduce((prev, next) => {
        if (Array.isArray(next)) {
            return prev.concat(_flat(next));
        } else {
            return prev.concat(next);
        }

    }, []);
}

// 19. 实现数组的push方法
Array.prototype.push = function () {
    for (let i = 0; i < arguments.length; i++) {
        this[this.length] = arguments[i];
    }
    return this.length
}

// 20. 实现filter方法
Array.prototype.filter = function (fn) {
    if (typeof fn !== 'function') {
        console.error('参数错误');
    }
    const result = [];
    for (let i = 0, len = this.length; i < len; i++) {
        fn(this[i]) && result.push(this[i]);
    }
    return result;
}

// 21. 实现map方法
Array.prototype.filter = function (fn) {
    if (typeof fn !== 'function') {
        console.error('参数错误');
    }
    const result = [];
    for (let i = 0, len = this.length; i < len; i++) {
        result.push(fn(i));
    }

    return result;
};

// 22. 实现repeat方法
function repeat1(s, n) {
    return (new Array(n + 1)).join(s);
}

function repeat2(s, n) {
    return n > 0 ? s.concat(repeat2(s, --n)) : '';
}

// 23. 字符串翻转
String.prototype._reverse = function (str) {
    return str.split('').reverse().join('');
};

// 24. 实现add(1)(2)(3)

function add4(a) {
    return function (b) {
        return function (c) {
            return a + b + c;
        };
    };
}
add4(1)(2)(3);

function add5(m) {
    const temp = function (n) {
        return add5(m + n);
    };
    temp.toString = function (m) {
        return m;
    };
    return temp;
}

function add6(...args) {
    return args.reduce((a, b) => a + b);
}

function currying(fn) {
    let args = [];
    return function temp(...newArgs) {
        if (newArgs.length) {
            args = [
                ...args,
                ...newArgs
            ];
            return temp;
        } else {
            let val = fn.apply(this, args);
            args = [];
            return val;
        }
    };
}
console.log(currying(add6));

// 25. 将js对象转化为树形结构

function jsonTree(data) {
    let result = [];
    if (!Array.isArray(data)) {
        return result;
    }

    let map = {};
    data.forEach(item => {
        map[item.id] = item;
    });

    data.forEach(item => {
        let parent = map[item.id];
        if (parent) {
            (parent.children || (parent.children = [])).push(item);
        } else {
            result.push(item);
        }
    });
    return result;
}

// 26. 字符串出现的不重复最长长度
function lengthOfLongestSubstring(s) {
    let map = new Map();
    let i = -1;
    let res = 0;
    let n = s.length;

    for (let j = 0; j < n; j++) {
        if (map.has(s[j])) {
            i = Math.max(i, map[s[j]]);
        }
        res = Math.max(res, j - i);
        map.set(s[j], j);
    }

    return res;
}


