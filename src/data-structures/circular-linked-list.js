/**
 * @file 循环链表
 */
import { LinkedList } from './linked-list.js';
import { Node } from './utils/node.js';

class CircularLinkedList extends LinkedList {
    constructor() {
        super();
    }
    insert(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new Node(element);
            let current = this.head;

            if (index === 0) {
                if (this.head == null) {
                    this.head = node;
                    node.next = this.head;
                } else {
                    node.next = current;
                    current = this.getElement(this.size());
                    this.head = node;
                    current.next = this.head;
                }
            } else {
                const previous = this.getElement(index - 1);
                node.next = previous.next;
                previous.next = node;

            }
            this.count++;
            return true;
        }
        return false;
    }
    removeAt(index) {
        if (index >= 0 && index <= this.count) {
            let current = this.head;
            if (index === 0) {
                if (this.size() === 1) {
                    this.head = undefined;
                } else {
                    const removed = this.head;
                    current = this.getElement(this.size());
                    this.head = this.head.next;
                    current.next = this.head;
                    current = removed;
                }
            } else {
                const previous = this.getElement(index - 1);
                current = previous.next;
                previous.next = current.next;
            }
            this.count--;
            return current;
        }
        return undefined;
    }
}

const list = new CircularLinkedList();
list.insert('3', 0);
list.insert('rere', 1);
list.insert('aaa', 2);
list.insert('bbb', 3);
list.insert(342, 4);
list.insert('avafagagag', 1);
list.removeAt(3);
