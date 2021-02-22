class Node {
	constructor(value) {
		this.value = value
		this.next = null
	}
}

class Linkedlist {
    constructor(value) {
        this.head = {
            value,
            next: null
        }
        this.tail = this.head
        this.length = 1
    }

    append(value) {
        const newNode = new Node(value)

        this.tail.next = newNode
        this.tail = newNode
        this.length++

        return this.printList()
    }

    prepend(value) {
        const newNode = new Node(value)
        newNode.next = this.head
        this.head = newNode
        this.length++

        return this.printList()
    }
	
	printList() {
		const arr = []
		let currentNode = this.head
		while (currentNode !== null) {
			arr.push(currentNode.value)
			currentNode = currentNode.next
		}
		
		return arr
	}
	
	_traverse(index) {
		let pre = this.head
		for (let i = 0; i < index-1; i++) {
			pre = pre.next
		}
		
		return pre
	}
	
	insert(index, value) {
		if (index < 1) return this.prepend(value)
		if (index >= this.length) return this.append(value)
        const newNode = new Node(value)
		let pre = this._traverse(index)
		newNode.next = pre.next
		pre.next = newNode
		this.length++
		
		return this.printList()
	}
	
	remove(index) {
		if(typeof index !== 'number' || index <= 0 || index >= this.length) return
		let pre = this._traverse(index)
		const del = pre.next
		pre.next = del.next
		if (index === this.length-1) this.tail = pre.next
		this.length--
	
		return del.value
	}
	
	reverse() {
		if (!this.head.next) return this.head
		this.tail = this.head
		let current = this.head
		let next = current.next
		while (next) {
			const tmp = next.next
			next.next = current
			current = next
			next = tmp
		}
		this.head.next = null
		this.head = current
		
		return this.printList()		
	}
}


var myLinkedlist = new Linkedlist(10)
myLinkedlist.append(5)
myLinkedlist.append(16)
myLinkedlist.prepend(1)
myLinkedlist.insert(2, 666)
myLinkedlist.remove(1)
console.log(myLinkedlist.printList())
myLinkedlist.reverse()
console.log(myLinkedlist.printList())