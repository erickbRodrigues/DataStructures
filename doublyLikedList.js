class Node {
	constructor(value) {
		this.value = value
		this.next = null
		this.previous = null
	}
}

class Linkedlist {
    constructor(value) {
        this.head = {
            value,
            next: null,
			previous: null
        }
        this.tail = this.head
        this.length = 1
    }

    append(value) {
        const newNode = new Node(value)

		newNode.previous = this.tail
        this.tail.next = newNode
        this.tail = newNode
        this.length++

        return this.printList()
    }

    prepend(value) {
        const newNode = new Node(value)
        newNode.next = this.head
		newNode.next.previous = newNode
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
	
	_traverseForward(index) {
		console.log('used _traverseForward')
		let pre = this.head
		for (let i = 0; i < index-1; i++) {
			pre = pre.next
		}
		
		return pre
	}
	
	_traverseBackward(index) {
		console.log('used _traverseBackward')
		let pre = this.head
		for (let i = this.length-1; i > index-1; i--) {
			pre = pre.next
		}
		
		return pre
	}
	
	insert(index, value) {
		if (index < 1) return this.prepend(value)
		if (index >= this.length) return this.append(value)
        const newNode = new Node(value)
		let pre = index < this.length / 2 ? this._traverseForward(index) : this._traverseBackward(index)
		newNode.previous = pre
		newNode.next = pre.next
		newNode.next.previous = newNode
		pre.next = newNode
		this.length++
		
		return this.printList()
	}
	
	remove(index) {
		if(typeof index !== 'number' || index <= 0 || index >= this.length) return
		let pre = index < this.length / 2 ? this._traverseForward(index) : this._traverseBackward(index)
		const del = pre.next
		del.next.previous = del.previous
		pre.next = del.next
		if (index === this.length-1) this.tail = pre.next
		this.length--
		
		return del.value
	}
}


var myLinkedlist = new Linkedlist(10)
myLinkedlist.append(5)
myLinkedlist.append(16)
myLinkedlist.prepend(1)
myLinkedlist.insert(2, 666)
console.log(myLinkedlist.remove(1))
console.log(myLinkedlist.printList())
console.log(myLinkedlist)
