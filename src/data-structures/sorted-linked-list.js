/**
 * @file 有序链表
 */

import { LinkedList } from "./linked-list.js";

const Compare = {
    LESS_THEN: -1,
    BIGGER_THAN: 1
}

function defaultCompare(a, b) {
    if (a === b) {
        return 0;
    }
    return a > b ? Compare.LESS_THEN : Compare.BIGGER_THAN;
}

class SortedLinkedList extends LinkedList {
    constructor() {
        super();
        this.compareFn = defaultCompare;
    }
    insert(element, index = 0) {
        if (this.isEmpty()) {
            return super.insert(element, 0);
        }
        const pos = this.getIndexNextSortedElement(element);
        return super.insert(element, pos);
    }
    getIndexNextSortedElement(element) {
        let current = this.head;
        let i = 0;
        for (; i < this.size() && current; i++) {
            const comp = this.compareFn(element, current.element);
            if (comp === Compare.LESS_THEN) {
                return i;
            }
            current = current.next;
        }
        return i;
    }
}

const list = new SortedLinkedList();
list.insert(3);
list.insert(5);
list.insert(2)
list.insert(4);
