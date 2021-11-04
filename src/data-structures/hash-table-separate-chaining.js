/**
 * @file 分离链接
 */

import { HashTable } from "./hashTable.js";
import { LinkedList } from "./linked-list.js";
import { ValuePair } from "./utils/value-pair.js";

class HashTableSeparateChaining  extends HashTable{
    constructor() {
        super();
    }
    put(key, value) {
        if (key != null && value != null ) {
            const position = this.hashCode(key);
            if (this.table[position] == null) {
                this.table[position] = new LinkedList();
            }
            this.table[position].push(new ValuePair(key, value));
            return true;
        }
    }
    get(key) {
        const position = this.hashCode(key);
        const linkedList = this.table[position];
        if (linkedList != null && !linkedList.isEmpty()) {
            let current = linkedList.getHead();
            while(current != null) {
                if (current.element.key === key) {
                    return current.element.value;
                }
                current = current.next;
            }
        }
        return undefined;
    }
    remove(key) {
        const position = this.hashCode(key);
        const linkedList = this.table[position];
        if (linkedList != null && !linkedList.isEmpty()) {
            let current = linkedList.getHead();
            while (current != null) {
                if (current.element.key === key) {
                    linkedList.remove(current.element);
                    if (linkedList.isEmpty()) {
                        delete this.table[position];
                    }
                    return true;
                }
                current = current.next;
            }
        }
        return undefined;
    }
}