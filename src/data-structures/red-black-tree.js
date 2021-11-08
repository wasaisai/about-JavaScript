/**
 * @file 红黑树
 */

import BinarySearchTree from "./binary-search-tree.js";
import { Compare, defaultCompare } from "./utils/index.js";
import { TreeNode } from "./utils/tree-node.js";

/**
 * 1. 每个节点不是红的就是黑的
 * 2. 树的根节点是黑的
 * 3. 所有叶节点都是黑的(用NULL引用表示的节点)
 * 4. 如果一个节点是红的, 那么它的两个子节点都是黑的
 * 5. 不能有两个相邻的红节点, 一个红节点不能有红的父节点或子节点
 * 6. 从给定的节点到它的后代节点(NULL叶节点)的所有路径包含相同数量的黑色节点
 */
class RedBlackNode extends TreeNode {
    constructor(key) {
        this.key = key;
        this.color = Colors.RED;
        this.parent = null;
    }
    isRed() {
        return this.color === Colors.RED;
    }
}
class RedBlackTree extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        super(compareFn);
        this.compareFn = compareFn;
        this.root = null;
    }
    insert (key, T) {
        if (this.root == null) {
            this.root = new RedBlackNode(key);
            this.root.color = Colors.BLACK;
        } else {
            const newNode = this.insertNode(this.root, key);
            this.fixTreeProperties(newNode);
        }
    }
    insertNode(node, key) {
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            if (node.left == null) {
                node.left = new RedBlackNode(key);
                node.left.parent = node;
                return node.left
            } else {
                return this.insertNode(node.left, key);
            }
        } else if (node.right == null) {
            node.right =  new RedBlackNode(key);
            node.right.parent = node;
            return node.right
        } else {
            return this.insertNode(node.right, key)
        }
    }
    fixTreeProperties(node) {
        while (node && node.parent &&node.parent.color.isRed()
            && node.color !== Colors.BLACK) {
                let parent = node.parent;
                const grandParent = parent.parent;
                if (grandParent && grandParent.left === parent) {
                    const uncle = grandParent.right;
                   
                }
            }
    }
}