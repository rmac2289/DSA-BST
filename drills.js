'use strict';

/* 
- Trees are data structures that consists of nodes linked together in a certain way
- Binary trees are trees with additional limits: each node can only have 0, 1, or 2 children (at most 2 children)
- Binary search tree (BST) are trees where nodes in the left-hand branch of a node are GUARANTEED to have lower values than the node itself.
- BST support 3 fundamental operations: insert, remove, and find
*/

// Create a BST class
class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }
    // With insertions, you have to iterate to the height of the tree. Average case = O(log(n)). Worst case = O(n). Best case = O(1) if inserting into root only
    insert(key, value) {
        // if the tree is empty then this key being inserted is the root node of the tree
        if (this.key === null) {
            this.key = key;
            this.value = value;
        }
        /* If the existing node does not have a left child, 
               meaning that if the `left` pointer is empty, 
               then we can just instantiate and insert the new node 
               as the left child of that node, passing `this` as the parent */
        else if (key < this.key) {
            if (this.left === null) {
                this.left = new BinarySearchTree(key, value, this)
            }
            /* If the node has an existing left child, 
                   then we recursively call the `insert` method 
                   so the node is added further down the tree */
            else {
                this.left.insert(key, value);
            }
        }
        // Similarly, if the new key is greater than the node's key then you do the same thing, but on the right-hand side */
        else {
            if (this.right == null) {
                this.right = new BinarySearchTree(key, value, this)
            } else {
                this.right.insert(key, value);
            }
        }
    }
    // Average = O(log(n)) due to traversing the height of the balanced tree.
    // Worst = if BST is skewed left or right, search to the bottom where everything is inserted to 1 side, so it is O(n).
    // Best = Finding the root node = O(1).
    find(key) {
        // If the item is found at the root then return that value
        if (this.key == key) {
            return this.value;
        }
        /* If the item you are looking for is less than the root 
           then follow the left child.
           If there is an existing left child, 
           then recursively check its left and/or right child
           until you find the item */
        else if (key < this.key && this.left) {
            return this.left.find(key);
        }
        /* If the item you are looking for is greater than the root 
           then follow the right child.
           If there is an existing right child, 
           then recursively check its left and/or right child
           until you find the item */
        else if (key > this.key && this.right) {
            return this.right.find(key);
        }
        // You have searched the tree and the item is not in the tree
        else {
            throw new Error('Key Error');
        }
    }
    remove(key) {
        if (this.key == key) {
            if (this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key);
            }
            /* If the node only has a left child, 
               then you replace the node with its left child */
            else if (this.left) {
                this._replaceWith(this.left);
            }
            /* And similarly if the node only has a right child 
               then you replace it with its right child */
            else if (this.right) {
                this._replaceWith(this.right);
            }
            /* If the node has no children then
               simply remove it and any references to it 
               by calling "this._replaceWith(null)" */
            else {
                this._replaceWith(null);
            }
        }
        else if (key < this.key && this.left) {
            this.left.remove(key);
        }
        else if (key > this.key && this.right) {
            this.right.remove(key);
        }
        else {
            throw new Error('Key Error');
        }
    }
    _replaceWith(node) {
        if (this.parent) {
            if (this == this.parent.left) {
                this.parent.left = node;
            }
            else if (this == this.parent.right) {
                this.parent.right = node;
            }

            if (node) {
                node.parent = this.parent;
            }
        }
        else {
            if (node) {
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            }
            else {
                this.key = null;
                this.value = null;
                this.left = null;
                this.right = null;
            }
        }
    }

    _findMin() {
        if (!this.left) {
            return this;
        }
        return this.left._findMin();
    }
}

// Create a BST and insert 3,1,4,6,9,2,5,7

let newBST = new BinarySearchTree();
newBST.insert(3)
newBST.insert(1)
newBST.insert(4)
newBST.insert(6)
newBST.insert(9)
newBST.insert(2)
newBST.insert(5)
newBST.insert(7)
console.log(newBST);