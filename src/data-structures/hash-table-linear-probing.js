/**
 * @file 线性探查
 */

import { HashTable } from "./hashTable.js";
import { ValuePair } from "./utils/value-pair.js";

class HashTableLinearProbing extends HashTable {
    constructor() {
        super();
    }
    put(key, value) {
        if (key != null && value != null) {
            const position = this.hashCode(key);
            if (this.table[position] == null) {
                this.table[position] = new ValuePair(key, value);
            } else {
                let index = position + 1;
                while(this.table[ index] != null) {
                    index++;
                }
                this.table[index] = new ValuePair(key, value);
            }
            return true;
        }
    }
    get(key) {
        const position = this.hashCode(key);
        const initPositionObj = this.table[position];
        if (initPositionObj != null) {
            if (initPositionObj.key === key) {
                return initPositionObj.value;
            }
            let increasePosition = position + 1;
            const increasePositionObj = this.table[increasePosition];
            while(increasePositionObj != null && increasePositionObj.key !== key) {
                increasePosition++
            }
            if (increasePositionObj != null && increasePositionObj.key === key) {
                return increasePositionObj.value
            }
        }
        return undefined;
    }
    remove(key) {
        const position = this.hashCode(key);
        if (this.table[position] != null) {
            if (this.table[position].key === key) {
                delete this.table[position];
                this.verfiyRemoveSideEffect(key, position);
            } else {
                let index = position +1;
                while(this.table[index] != null && this.table[index].key != key) {
                    index++;
                }
                if (this.table[index] != null && this.table[index].key === key) {
                    delete this.table[index];
                    this.verfiyRemoveSideEffect(key, index);
                }
            }
            return true;
        }
        return undefined
    }
    verfiyRemoveSideEffect(key, removedPosition) {
        const hash = this.hashCode(key);
        let index = removedPosition + 1;
        while (this.table[index] != null) {
            const posHash = this.hashCode(this.table[index].key);
            if (posHash <= hash || posHash <= removedPosition) {
                this.table[removedPosition] = this.table[index];
                delete this.table[index];
                removedPosition = index;
            }
            index++;
        }
    }
}

const hash = new HashTableLinearProbing();
hash.put('Ygritte', 'ygritte@email.com');
hash.put('Jonathan', 'jonathan@email.com');
hash.put('Jamie', 'jamie@email.com');
hash.put('Jack', 'jack@email.com');
hash.put('Jasmine', 'jasmine@email.com');
hash.put('Jake', 'jake@email.com');
hash.put('Nathan', 'nathan@email.com');
hash.put('Athelstan', 'athelstan@email.com');
hash.put('Sue', 'sue@email.com');
hash.put('Aethelwulf', 'aethelwulf@email.com');
hash.put('Sargeras', 'sargeras@email.com');

const a = hash.get('Jack');
const b = hash.remove('Jack');
