/**
* @file 树
*/

/**
 * 相关概念
 * 1. 根节点: 树顶部的节点叫作根节点
 * 2. 内部节点: 至少有一个子节点的节点称为内部节点
 * 3. 没有子元素的节点称为外部节点或叶子节点]
 * 4. 子树: 子树由节点和它的后代构成
 * 5. 节点的一个属性是深度, 节点的深度取决于它的祖先节点的数量
 * 6. 树的高度取决于所有节点深度的最大值.
 * 7. 二叉树: 二叉树中的节点最多只能有两个字节点:一个是左侧字节点, 另一个是右侧子节点
 * 8. 二叉搜索树(BST): 是二叉树的一种, 但是只允许在左侧节点存储(比父节点)小的值, 在右侧节点存储(比父节点)大的值
 * 9. 键: 键是树相关的术语中对节点的称呼
 */

import {Compare, defaultCompare} from './utils/index.js';
import {TreeNode} from './utils/tree-node.js';

export default class BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn;
        this.root = null;
    }
    insert(key) {
        if (this.root == null) {
            this.root = new TreeNode(key);
        } else {
            this.insertNode(this.root, key);
        }
    }
    search(key) {
        this.searchNode(this.root, key);
    }
    inOrderTraverse(callback) {
        // 中序遍历
        this.inOrderTraverseNode(this.root, callback);
    }
    preOrderTraverse(callback) {
        // 先序遍历
        this.preOrderTraverseNode(this.root, callback);
    }
    postOrderTraverse(callback) {
        // 后序遍历
        this.postOrderTraverseNode(this.root, callback);
    }
    min() {
        return this.minNode(this.root);
    }
    max() {
        return this.maxNode(this.root);
    }
    remove(key) {
        return this.removeNode(this.root, key);
    }
    insertNode(node, key) {
        if (this.compareFn(key, node.key) === Compare.LESS_THEN) {
            if (node.left == null) {
                node.left = new TreeNode(key);
            } else {
                this.insertNode(node.left, key);
            }
        } else {
            if (node.right == null) {
                node.right = new TreeNode(key);
            } else {
                this.insertNode(node.right, key);
            }
        }
    }
    inOrderTraverseNode(node, callback) {
        if (node != null) {
            const a = node;
            const b = node.left;
            this.inOrderTraverseNode(node.left, callback);
            callback(node.key);
            this.inOrderTraverseNode(node.right, callback);
        }
    }
    preOrderTraverseNode(node, callback) {
        if (node != null) {
            const a = node;
            const b = node.left;
            const c = node.right;
            callback(node.key);
            this.preOrderTraverseNode(node.left, callback);
            this.preOrderTraverseNode(node.right, callback);  
        }
    }
    postOrderTraverseNode(node, callback) {
        if (node != null) {
            const a = node;
            const b = node.left;
            const c = node.right;
            this.postOrderTraverseNode(node.left, callback);
            this.postOrderTraverseNode(node.right, callback);
            callback(node.key);
        }
    }
    minNode(node) {
        let current = node;
        while (current != null && current.left != null) {
            current = current.left;
        }
        return current;
    }
    maxNode(node) {
        let current = node;
        while (current != null && current.right != null) {
            current = current.right;
        }
        return current;
    }
    searchNode(node, key) {
        if (node == null) {
            return false;
        }
        if (this.compareFn(key, node.key) === Compare.LESS_THEN) {
            return this.searchNode(node.left, key);
        } else if (this.compareFn(key, node.key === Compare.BIGGER_THAN)) {
            return this.searchNode(node.right, key);
        } else {
            return true;
        }
    }
    removeNode(node, key) {
        if (node == null) {
            return null;
        }
        if (this.compareFn(key, node.key) === Compare.LESS_THEN) {
            node.left = this.removeNode(node.left, key);
            return node;        
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            node.right = this.removeNode(node.right, key);
            return node;
        } else {
            if (node.left == null && node.right == null) {
                node = null;
                return node;
            }
            if (node.left == null) {
                node = node.right;
                return node;
            } else if (node.right == null) {
                node = node.left;
                return node;
            }
            const aux = this.minNode(node.right);
            node.key = aux.key;
            node.right = this.removeNode(node.right, key);
            return node;
        }
    }
}

const tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(18);
tree.insert(25);

const printNode = (value => console.log(value));
tree.inOrderTraverse(printNode);
tree.preOrderTraverse(printNode);
tree.postOrderTraverse(printNode);