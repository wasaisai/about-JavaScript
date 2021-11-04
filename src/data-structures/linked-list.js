/**
 * @file 链表
 */

import {defaultEquals} from './utils/index.js';
import {Node} from './utils/node.js';

export class LinkedList {
    constructor() {
        this.count = 0;
        this.head = undefined;
        this.equalsFn = defaultEquals;
    }
    push(element) {
        const node = new Node(element);
        let current;

        if (this.head == undefined) {
            this.head = node;
        } else {
            current = this.head;
            while (current.next != null) {
                current = current.next;
            }

            current.next = node;
        }
        this.count++;

    }
    removeAt(index) {
        if (index >= 0 && index < this.count) {
            let current = this.head;

            if (index === 0) {
                this.head = current.next;
            } else {
                const previous = this.getElement(index - 1);
                current = previous.next;
                previous.next = current.next;
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }
    insert(element, index) {
        let node = new Node(element);
        if (index === 0) {
            const current = this.head;
            node.next = current;
            this.head = node;
        } else {
            const previous = this.getElement(index - 1);
            const current = previous.next;
            previous.next = node;
            node.next = current;
        }
        this.count++;
        return true;
    }
    remove(element) {
        const index = this.indexOf(element);
        return this.removeAt(index);
    }
    size() {
        return this.count;
    }
    isEmpty() {
        return this.size() === 0;
    }
    getHead() {
        return this.head;
    }
    toString() {
        if (this.head == null) {
            return '';
        }
        let objString = `${this.head.element}`;
        let current = this.head.next;
        for (let i = 0; i < this.size() && current != null; i++) {
            objString = `${objString} ${current.element}`;
            current = current.next;
        }
        return objString;
    }
    getElement(index) {
        if (index >= 0 && index <= this.count) {
            let current = this.head;
            for (let i = 0; i < index && current.next != null; i++) {
                current = current.next;
            }
            return current;
        }
        return undefined;
    }
    indexOf(element) {
        let current = this.head;
        for (let i = 0; i < this.count && current != null; i++) {
            if (this.equalsFn(element, current.element)) {
                return i;
            }
            current = current.next;
        }
        return -1;
    }
}


const list = new LinkedList();

list.push(15);
list.push(10);
list.push(12);
list.push(3);
list.push(3435);
list.push('aaa');

list.removeAt(2);
list.insert('fd', 6);
console.log(list.toString());
