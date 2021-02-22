class Node {
	constructor(value) {
		this.value = value
		this.next = null
	}
}

class Queue {
	constructor() {
		this.first = null
		this.last = null
		this.length = 0
	}
	
	peek() {
		return this.first
	}

	enqueue(value) {
		const newNode = new Node(value)
		if (!this.length) this.first = newNode
		else this.last.next = newNode
		
		this.last = newNode
		this.length++
		
		return this
	}
	
	dequeue() {
		if (!this.length) return null
		if (this.length === 1) this.last = null
		else this.first = this.first.next
	
		this.length--
		
		return this
	}
}

var myQueue = new Queue()
myQueue.enqueue('1')
myQueue.enqueue('2')
myQueue.enqueue('3')
myQueue.peek()
myQueue.dequeue()
myQueue.dequeue()
myQueue.peek()
myQueue.dequeue()
