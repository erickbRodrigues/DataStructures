class Node {
    constructor(key) {
        this.key = key
        this.parent = null
        this.children = {}
        this.end = false
    }
}

class Trie {
    constructor() {
        this.root = new Node(null)
    }

    insert(word) {
        let node = this.root

        for (let i = 0; i < word.length; i++) {
            if (!node.children[word[i]]) {
                node.children[word[i]] = new Node(word[i])
                node.children[word[i]].parent = node
            }
            node = node.children[word[i]]

            if (i === word.length-1) node.end = true
        }
    }

    _traversePreOrder(node, count) {
        if (node.end) count.push(node)
        if (node.children) {
            for (let child in node.children) {
                this._traversePreOrder(node.children[child], count)
            }
        }

        return count
    }

    countMatch(word) {
        let node = this.root
        let count = []

        for (let i =0; i < word.length; i++) {
            if (node.children[word[i]]) {
                node = node.children[word[i]]
            } else return 'not found'
        }
        return this._traversePreOrder(node, count).length
    }
}

var trie = new Trie()
trie.insert('hack')
trie.insert('hackerrank')