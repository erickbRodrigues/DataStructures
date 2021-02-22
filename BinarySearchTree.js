class Node {
    constructor(value) {
        this.left = null
        this.right = null
        this.value = value
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null
        // {
        //     value: 1,
        //     left: null,
        //     right: {
        //         value: 2,
        //         left: null,
        //         right: {
        //             value: 5,
        //             left: {
        //                 value: 3,
        //                 left: {
        //                     value: 4,
        //                     left: null,
        //                     right: null
        //                 },
        //                 right: null
        //             },
        //             right: {
        //                 value: 6,
        //                 left: null,
        //                 right: null
        //             }
        //         }
        //     }
        // }
    }

    insert(value) {
        if (!value) return
        let currentNode = this.root
        const newNode = new Node(value)
        if (!currentNode) {
            this.root = newNode
            return this.root
        } else {
            while (true) {
                if (value > currentNode.value) { // goes right
                    if (!currentNode.right) {
                        currentNode.right = newNode
                        return this
                    }
                    currentNode = currentNode.right
                } else if (value < currentNode.value) { // goes left
                    if (!currentNode.left) {
                        currentNode.left = newNode
                        return this
                    }
                    currentNode = currentNode.left
                } else return 'Can\'t add duplicated value'
            }
        }
    }

    lookup(value) {
        if (!this.root || !value) return null
        let currentNode = this.root
        while (currentNode) {
            if (value > currentNode.value) { // goes right
                currentNode = currentNode.right
            } else if (value < currentNode.value) { // goes left
                currentNode = currentNode.left
            } else return currentNode
        }
        return null
    }

    remove(value) {
        if (!this.root || !value) return null
        let currentNode = this.root
        let parentNode = null
        while (currentNode) {
            if (value > currentNode.value) {
                parentNode = currentNode
                currentNode = currentNode.right
            } else if (value < currentNode.value) {
                parentNode = currentNode
                currentNode = currentNode.left
            } else if (currentNode.value === value) {
                //We have a match, get to work!

                //Option 1: No right child: 
                if (!currentNode.right) {
                    if (!parentNode) {
                        this.root = currentNode.left
                    } else {
                        //if parent > current value, make current left child a child of parent
                        if (currentNode.value < parentNode.value) {
                            parentNode.left = currentNode.left

                            //if parent < current value, make left child a right child of parent
                        } else if (currentNode.value > parentNode.value) {
                            parentNode.right = currentNode.left
                        }
                    }

                    //Option 2: Right child which doesnt have a left child
                } else if (currentNode.right.left === null) {
                    currentNode.right.left = currentNode.left
                    if (parentNode === null) {
                        this.root = currentNode.right
                    } else {

                        //if parent > current, make right child of the left the parent
                        if (currentNode.value < parentNode.value) {
                            parentNode.left = currentNode.right

                            //if parent < current, make right child a right child of the parent
                        } else if (currentNode.value > parentNode.value) {
                            parentNode.right = currentNode.right
                        }
                    }

                    //Option 3: Right child that has a left child
                } else {

                    //find the Right child's left most child
                    let leftmost = currentNode.right.left
                    let leftmostParent = currentNode.right
                    while (leftmost.left !== null) {
                        leftmostParent = leftmost
                        leftmost = leftmost.left
                    }

                    //Parent's left subtree is now leftmost's right subtree
                    leftmostParent.left = leftmost.right
                    leftmost.left = currentNode.left
                    leftmost.right = currentNode.right

                    if (parentNode === null) {
                        this.root = leftmost
                    } else {
                        if (currentNode.value < parentNode.value) {
                            parentNode.left = leftmost
                        } else if (currentNode.value > parentNode.value) {
                            parentNode.right = leftmost
                        }
                    }
                }
                return true
            }
        }
    }

    breadthFirstSearch() {
        let currentNode = this.root
        let list = []
        let queue = []
        queue.push(currentNode)

        while (queue.length) {
            currentNode = queue.shift()
            list.push(currentNode.value)
            if (currentNode.left) {
                queue.push(currentNode.left)
            }
            if (currentNode.right) {
                queue.push(currentNode.right)
            }
        }

        return list
    }

    breadthFirstSearchRecursive(queue, list) {
        if (!queue.length) return list

        const currentNode = queue.shift()
        list.push(currentNode.value)
        if (currentNode.left) {
            queue.push(currentNode.left)
        }
        if (currentNode.right) {
            queue.push(currentNode.right)
        }
        
        return this.breadthFirstSearchRecursive(queue, list)
    }

    depthFirstSearchInOrder() {
        return this._traverseInOrder(this.root, [])
    }

    _traverseInOrder(node, list) {
        if (node.left) {
            this._traverseInOrder(node.left, list)
        }
        list.push(node.value)
        if (node.right) {
            this._traverseInOrder(node.right, list)
        }

        return list
    }

    depthFirstSearchPreOrder() {
            return this._traversePreOrder(this.root, [])
    }

    _traversePreOrder(node, list) {
        list.push(node.value)
        if (node.left) {
            this._traversePreOrder(node.left, list)
        }
        if (node.right) {
            this._traversePreOrder(node.right, list)
        }

        return list
    }

    depthFirstSearchPostOrder() {
            return this._traversePostOrder(this.root, [])
    }

    _traversePostOrder(node, list) {
        if (node.left) {
            this._traversePostOrder(node.left, list)
        }
        if (node.right) {
            this._traversePostOrder(node.right, list)
        }
        list.push(node.value)

        return list
    }

    isValid() { // BFS
        let currentNode = this.root
        let list = []
        let queue = []
        queue.push(currentNode)

        while (queue.length) {
            currentNode = queue.shift()
            list.push(currentNode.value)
            if (currentNode.left) {
                if (currentNode.value < currentNode.left.value) return false
                queue.push(currentNode.left)
            }
            if (currentNode.right) {
                if (currentNode.value > currentNode.right.value) return false
                queue.push(currentNode.right)
            }
        }

        return true
    }

    traverse(node) {
        const tree = {
            value: node.value
        }
        tree.left = node.left ? this.traverse(node.left) : ''
        tree.right = node.right ? this.traverse(node.right) : ''

        return tree
    }

    getHeight(node) {
        if (!node) return 0
        const leftDepth = this.getHeight(node.left)
        const rightDepth = this.getHeight(node.right)
        console.log('leftDepth ->', leftDepth)
        console.log('rightDepth ->', rightDepth)

        if (leftDepth > rightDepth) return leftDepth + 1
        else return rightDepth +1
    }
}

var tree = new BinarySearchTree()
// tree.insert(9)
// tree.insert(4)
// tree.insert(6)
// tree.insert(20)
// tree.insert(170)
// tree.insert(15)
// tree.insert(1)
// tree.lookup(20)
// console.log(JSON.stringify(traverse(tree.root)))
// function traverse(node) {
//     const tree = {
//         value: node.value
//     }
//     tree.left = node.left === null ? null : traverse(node.left)
//     tree.right = node.right === null ? null : traverse(node.right)
//     return tree
// }

//     9
//  4     20
//1  6  15  170
