/**
 * @file 双向链表
 */

import {DoublyNode} from './utils/node.js';
import { LinkedList } from './linked-list.js';

class DoublyLinkedList extends LinkedList {
    constructor() {
        super();
        this.tail = undefined;
    }
    insert(element, index) {
        if(index >=0 && index <=this.count) {
            const node = new DoublyNode(element);
            let current = this.head;
            if(index === 0) {
                if (this.head == null) {
                    this.head = node;
                    this.tail = node;
                } else {
                    node.next = this.head;
                    current.prev = node;
                    this.head = node;
                }
            } else if(index === this.count) {
               current = this.tail;
               current.next = node;
               node.prev = current;
               this.tail = node;
            } else {
                const previous = this.getElement(index - 1);
                const current = previous.next;
                previous.next = node;
                current.prev = node;
                node.prev = previous
            }
            this.count++;
            return true;
        }
        return false;
    }
    removeAt(index) {
        if (index >=0 && index <= this.count) {
            let current = this.head;
            if (index === 0) {
                if (this.count === 1) {
                    this.tail = undefined;
                } else {
                    this.head.prev = undefined;
                }
            } else if (index === this.count -1) {
                current = this.tail;
                this.tail = current.prev;
                this.tail.next = undefined;
            } else {
                current = this.getElement(index);
                const previous = current.prev;
                previous.next = current.next;
                current.next.prev = previous.next;
            }
            this.count--;
            return current.element;
        }
        return undefined
    }
}


const list = new DoublyLinkedList();
list.insert('3', 0);
list.insert(5453, 1)
list.insert('ffef', 2);
list.insert('addd', 3);
console.log(list.removeAt(2));
console.log(list.toString())