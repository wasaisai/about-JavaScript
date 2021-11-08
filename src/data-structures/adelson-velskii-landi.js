/**
 * @file 自平衡树
 */

import BinarySearchTree from './binary-search-tree.js';
import {Compare, defaultCompare} from './utils/index.js';
import {TreeNode} from './utils/tree-node.js';

/**
 * 1. 平衡因子: 在AVL树中, 需要对每个节点计算右子树高度(hr)和左子树高度(hl)之间的差值, 该值(hr- hl)应为0、1、-1.如果结果不是这三个值之一, 则需要平衡该AVL树
 * 2. 节点的高度: 节点的高度是从节点到其任意字节点的边的最大值
 * 3. 左-左(LL): 向右的单旋转——这种情况出现于节点的左侧子节点的高度大于右侧子节点的高度时, 并且左侧子节点也是平衡或左侧较重的
 * 4. 右-右(RR): 向右的单旋转——这种情况出现于右侧子节点的高度大于左侧子节点的高度, 并且右侧子节点也是平衡或右侧较重的
 * 5. 左-右(LR): 向右的双旋转——这种情况出现于左侧子节点的高度大于右侧子节点的高度, 并且左侧子节点右侧较重
 * 6. 右-左(RL): 向左的双旋转——这种情况出现于右侧字节点的高度大于左侧子节点的高度, 并且右侧子节点左侧较重.
*/

const BalanceFactor = {
    UNBALANCED_RIGHT: 1,
    SLIGHTLY_UNBALANCED_RIGHT: 2,
    BALANCED: 3,
    SLIGHTLY_UNBALANCED_LEFT: 4,
    UNBALANCED_LEFT: 5
};

class AVLTree extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        super(compareFn);
        this.compareFn = compareFn;
        this.root = null;
    }
    insert(key) {
        this.root = this.insertNode(this.root, key);
    }
    insertNode(node, key) {
        const a = node;
        const b = key;
        if (node == null) {
            return new TreeNode(key);
        } else if (this.compareFn(key, node.key) === Compare.LESS_THEN) {
            node.left = this.insertNode(node.left, key);
        } else if (this.compareFn(key, node.key === Compare.BIGGER_THAN)) {
            node.right = this.insertNode(node.right, key);
        } else {
            return node;
        }

        const balanceFacor = this.getBalanceFactor(node);
        if (balanceFacor === BalanceFactor.UNBALANCED_LEFT) {
            if (this.compareFn(key, node.left.key) === Compare.LESS_THEN) {
                node = this.rotationLL(node);
            } else {
                return this.rotationLR(node);
            }
        }
        if (balanceFacor === BalanceFactor.UNBALANCED_RIGHT) {
            if (this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) {
                node = this.rotationRR(node);
            } else {
                return this.rotationRL(node);
            }
        }
        return node;
    }
    removeNode(node, key) {
        node = super.removeNode(node, key);
        if (node == null) {
            return node;
        }
        const balanceFacor = this.getBalanceFactor(node);
        if (balanceFacor === BalanceFactor.UNBALANCED_LEFT) {
            const balanceFacorLeft = this.getBalanceFactor(node.left);
            if (balanceFacorLeft === BalanceFactor.BALANCED || balanceFacorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
                return this.rotationLL(node);
            }
            if (balanceFacorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
                return this.rotationLR(node.left);
            }
        }
        if (balanceFacor === BalanceFactor.UNBALANCED_RIGHT) {
            const balanceFacorRight = this.getBalanceFactor(node.right);
            if (balanceFacorRight === BalanceFactor.BALANCED || balanceFacorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
                return this.rotationRR(node);
            }
            if (balanceFacorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
                return this.rotationRL(node.right);
            }
        }
    }
    getNodeHeight(node) {
        if (node == null) {
            return -1;
        }
        return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1;

    }
    getBalanceFactor(node) {
        const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
        switch (heightDifference) {
            case -2:
                return BalanceFactor.UNBALANCED_RIGHT;
            case -1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
            case 1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
            case 2:
                return BalanceFactor.UNBALANCED_LEFT;
            default:
                return BalanceFactor.BALANCED;
        }
    }
    rotationLL(node) {
        const tmp = node.left;
        node.left = tmp.right;
        tmp.right = node;
        return tmp;
    }
    rotationRR(node) {
        const tmp = node.right;
        node.right = tmp.left;
        tmp.left = node;
        return tmp;
    }
    rotationLR(node) {
        node.left = this.rotationRR(node.left);
        return this.rotationLL(node);
    }
    rotationRL(node) {
        node.right = this.rotationLL(node.right);
        return this.rotationRR(node);
    }
}

const tree = new AVLTree();

tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
// tree.insert(9);
// tree.insert(8);
// tree.insert(10);
// tree.insert(13);
// tree.insert(12);
// tree.insert(14);
tree.insert(18);
tree.insert(25);
tree.insert(26);
tree.insert(27);
tree.insert(28);
tree.insert(29);