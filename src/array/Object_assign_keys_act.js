// Object.assign
let org1 = {
    color: 'red',
    size: 'full'
};

let org2 = {
    color: 'black',
    title: {
        first: 'book',
        two: "you don't know js "
    },
    price: 34
};

let org3 = Object.assign(org1, org2);
// console.log(org3);
// console.log(org1);
// console.log(org2);

org2.title.first = 'magazine';
org2.price = 90;
console.log(org1);
console.log(org2);
console.log(org3);

// 原理实现
if (typeof Object.assign1 !== 'function') {
    Object.defineProperties(Object, assign1, {
        value: function (target) {
            'use strict';
            if (target === null) {
                throw new TypeError('Cannot covert undefined or null object');
            }
            let result = Object(target);
            for (let index = 1; index < arguments.length; index++){
                let nextSource = arguments[index];
                if (nextSource !== null) {
                    for (let nextKey in nextSource) {
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            result[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return toString;
        },
        writable: true,
        configurable: true
    });
}




// Object.keys

