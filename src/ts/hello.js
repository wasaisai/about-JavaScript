"use strict";
exports.__esModule = true;
/**
 * @function
 * @param person string name
 * @returns String
 */
function sayHello(person) {
    if (typeof person === 'string') {
        return 'Hello' + person;
    }
    else {
        throw new Error('person is not a string');
    }
}
var user = 'tom';
console.log(sayHello(user));
