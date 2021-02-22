class Node {
	constructor(value) {
		this.value = value
		this.next = null
	}
}

class Stack {
	constructor() {
		this.top = null
		this.bottom = null
		this.length = 0
	}
	
	peek() {
		return this.top
	}
	
	push(value) {
		const node = new Node(value)
		if (this.length === 0) {
			this.top = node
			this.bottom = node
		} else {
			let curr = this.top
			this.top = node
			this.top.next = curr
		}
		this.length++
		
		return this
	}
	
	pop() {
		if (this.length === 0) return null
		if (this.length === 1) this.bottom = null
		this.top = this.top.next
		this.length--
		
		return this
	}
	
	isEmpty() {
		return this.length < 1
	}
}

var myStack = new Stack()
myStack.push('Ammy')
myStack.push('Annie')
myStack.push('Jennie')
myStack.pop()
console.log(myStack)
myStack.pop()
myStack.isEmpty()
myStack.pop()
myStack.isEmpty()
