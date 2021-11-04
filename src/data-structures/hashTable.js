/**
 * @file 散列表
 * 散列算法的作用是尽可能快地在数据结构中找到一个值
 */

import {defaultToString} from './utils/index.js';
import {ValuePair} from './utils/value-pair.js';
import {Dictionary} from './dictionary.js';

export class HashTable extends Dictionary {
    constructor (toStrFn = defaultToString) {
        super();
        this.table = {};
    }
    put(key, value) {
        if (key != null && value != null) {
            const position = this.hashCode(key);
            this.table[position] = new ValuePair(key, value);
            return true;
        }
        return false;
    }
    remove(key) {
        const hash = this.hashCode(key);
        const valuePair = this.table[hash];
        if (valuePair != null) {
            delete this.table[hash];
            return true;
        }
        return false;
    }
    get(key) {
        const valuePair = this.table[this.hashCode(key)];
        return valuePair == null ? undefined : valuePair.value;
    }
    toString() {
        if (this.isEmpty()) {
            return '';
        }
        const keys = Object.keys(this.table);
        const stringFirstKey = this.table[keys[0]].toString();
        let objString = `${stringFirstKey}`;
        for (let i = 1; i < keys.length; i++) {
            const stringCurKey = this.table[keys[i]].toString();
            objString = `${objString}, ${stringCurKey}`;
        }
        return objString;
    }
    hashCode(key) {
        return this.loseloseHashCode(key);
    }
    loseloseHashCode(key) {
        if (typeof key === 'number') {
            return key;
        }
        const tableKey = this.toStrFn(key);
        let hash = 0;
        for (let i = 0; i < tableKey.length; i++) {
            hash += tableKey.charCodeAt(i);
        }
        return hash % 37;
    }
}

const hash = new HashTable();
hash.put('jack', 'jack@email.com');
hash.put('lili', 'lili@email.com');
hash.put('susan', 'susan@email.com');
hash.put('xiaohong', 'xiaohong@email.com');
hash.put('fanhua', 'fanhua@email.com');
const a = hash.get('jack');
const b = hash.remove('jack');
const c = hash.toString();
const d = hash.loseloseHashCode('jack');