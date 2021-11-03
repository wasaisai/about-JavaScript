/**
* @file 字典
*/
import {defaultToString} from './utils/index.js';
import {ValuePair} from './utils/value-pair.js';

export default class Dictionary {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {};
    }
    set(key, value) {
        if (key != null && value != null) {
            let tableKey = this.toStrFn(key);
            this.table[tableKey] = new ValuePair(key, value);
            return true;
        }
        return false;
    }
    remove(key) {
        if (this.hasKey(this.toStrFn(key))) {
            delete this.table[this.toStrFn(key)];
            return true;
        }
        return false;
    }
    hasKey(key) {
        return this.table[this.toStrFn(key)] != null;
    }
    get(key) {
        const ValuePair = this.table[this.toStrFn(key)];
        return ValuePair != null ? ValuePair.value : 'UNDEFINED';
    }
    clear() {
        this.table = {};
    }
    size() {
        // return Object.keys(this.table).length;
        return this.keyValues().length;
    }
    isEmpty() {
        return this.size() === 0;
    }
    keys() {
        // return this.keyValues().map(valuePair => valuePair.key);

        const keys = [];
        const valuePair = this.keyValues();
        for (let i = 0; i < valuePair.length; i++) {
            keys.push(valuePair[i].key);
        }
        return keys;
    }
    values() {
        // return this.keyValues().map(valuePair => valuePair.value);

        const value = [];
        const valuePair = this.keyValues();
        for (let i = 0; i < valuePair.length; i++) {
            value.push(valuePair[i].value);
        }
        return value;
    }
    keyValues() {
        // return Object.values(this.table);

        const valuePair = [];
        for (const key in this.table) {
            if (this.hasKey(key)) {
                valuePair.push(this.table[key]);
            }
        }
        return valuePair;
    }
    forEach(callbackFn) {
        const valuePair = this.keyValues();
        for ( let i = 0; i < valuePair.length; i++) {
            const result = callbackFn(valuePair[i].key, valuePair[i].value);
            if(result === false) {
                break;
            }
        }
    }
    toString() {
        if (this.isEmpty()) {
            return '';
        }
        const valuePair = this.keyValues();
        const objString = `${valuePair[0].toString}`;
        for (let i = 1; i < valuePair.length; i++) {
            objString = `${objString}, ${valuePair[i].toString()}`;
        }
        return objString;
    }
}


const dictionary = new Dictionary();
dictionary.set('jack', 'jack@baidu.com');
dictionary.set('san', 'san@email.com');
dictionary.set('lili', 'lili@email.com');
const a = dictionary.hasKey('zhuli');
const b = dictionary.get('jack');
const c = dictionary.hasKey('jack');

const d = dictionary.keyValues();
const e = dictionary.keys();
const f = dictionary.values();
const g = dictionary.size();
const h = dictionary.remove('jack');
const j = dictionary.isEmpty();
dictionary.forEach((key, value) => {
    console.log(key, value);
});
const i = dictionary.clear();
