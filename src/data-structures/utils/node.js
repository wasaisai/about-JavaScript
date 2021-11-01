/**
 * 单向链表
 */
export class Node {
    constructor(element) {
        this.element = element;
        this.next = undefined;
    }
}

/**
 * 双向链表类
 */
export class DoublyNode extends Node {
    constructor(element, prev, next) {
        super(element, next);
        this.prev = prev
    }
}