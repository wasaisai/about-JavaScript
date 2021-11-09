/**
 * @file 最小堆类
 */

/**
 * 二叉堆是一种特殊的二叉树, 有以下特性
 * 1. 他是一棵完全二叉树, 表示树的每一层都有左侧和右侧子节点(除了最后一层的叶节点), 并且最后一层的叶节点尽可能都是左侧子节点,这焦作结构特性
 * 2. 二叉堆不是最小堆就是最大堆. 最小堆允许快速导出树的最小值, 最大堆允许快速导出树的最大值. 所有的节点都大于等于(最大堆)或小于等于(最小堆)每个它的子节点. 这叫做堆特性
 * 3. 尽管二叉堆是二叉树, 但并不一定是二叉搜索树(BST). 在二叉堆中, 每个子节点都要大于等于父节点(最小堆)或小于等于父节点(最大堆).然而在二叉搜索树中, 左侧子节点总是比父节点小, 右侧子节点也总是更大.
 * 4. 要访问使用普通数组的二叉树节点, 可以用下面的方式操作index:
 *    .它的左侧子节点的位置是 2 * index + 1(如果位置可用)
 *    .它的右侧子节点的位置是 2 * index + 2(如果位置可用)
 *    .它的父节点位置是 index / 2(如果位置可用)
 */

import {Compare, defaultCompare, swap} from "./utils/index.js";

export class MinHeap {
    constructor(comPareFn = defaultCompare) {
        this.comPareFn = comPareFn;
        this.heap = [];
    }
    insert(value) {
        if (value != null) {
            this.heap.push(value);
            this.siftUp(this.heap.length - 1);
            return true;
        }
    }
    extract() {
        if (this.isEmpty()) {
            return undefined;
        }
        if (this.size() === 1) {
            return this.siftUp();
        }
        const removedValue = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.siftDown(0);
        return removedValue;
    }
    size() {
        return this.heap.length;
    }
    isEmpty() {
        return this.size() === 0;
    }
    findMinimum() {
        return this.isEmpty() ? undefined : this.heap[0];
    }
    siftUp(index) {
        let parent = this.getParentIndex(index);
        while (index > 0 && this.comPareFn(this.heap[parent], this.heap[index]) === Compare.BIGGER_THAN) {
            swap(this.heap, parent, index);
            index = parent;
            parent = this.getParentIndex(index);
        }
    }
    siftDown(index) {
        let element = index;
        const left = this.getLeftIndex(index);
        const right = this.getRightIndex(index);
        const size = this.size();
        if (left < size && this.comPareFn(this.heap[element], this.heap[left]) === Compare.BIGGER_THAN) {
            element = left;
        }
        if (right < size && this.comPareFn(this.heap[element], this.heap[right]) === Compare.BIGGER_THAN) {
            element = right;
        }
        if (index !== element) {
            swap(this.heap, index, element);
            this.siftDown(element);
        }
    }
    getLeftIndex(index) {
        return 2 * index + 1;
    }
    getRightIndex(index) {
        return 2 * index + 2;
    }
    getParentIndex(index) {
        if (index === 0) {
            return undefined;
        }
        return Math.floor((index - 1) / 2);
    }
}

const heap = new MinHeap();
heap.insert(1);
heap.insert(2);
heap.insert(3);
heap.insert(4);
heap.insert(5);
heap.insert(6);
heap.insert(7);
heap.insert(8);
heap.insert(9);

const a = heap.extract();



