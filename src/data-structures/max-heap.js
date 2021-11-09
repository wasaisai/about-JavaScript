/**
 * @file 最大堆
 */

import {MinHeap} from './min-heap.js';
import {defaultCompare} from './utils/index.js';

class MaxHeap extends MinHeap {
    constructor(comPareFn = defaultCompare) {
        super(comPareFn);
        this.comPareFn = this.reverseCompare(comPareFn);
    }
    reverseCompare(comPareFn) {
        return (a, b) => comPareFn(b, a);
    }
}

const heap = new MaxHeap();

heap.insert(1);
heap.insert(2);
heap.insert(3);
heap.insert(4);
heap.insert(5);
heap.insert(6);
heap.insert(7);
heap.insert(8);
heap.insert(9);

