class Stack {
	constructor() {
		this.data = []
	}
	
	peek() {
		return this.data[this.data.length-1] || null
	}
	
	push(value) {
		this.data.push(value)
		
		return this
	}
	
	pop() {
		if (this.data.length === 0) return null
		this.data.pop()
		
		return this
	}
	
	isEmpty() {
		return this.data.length < 1
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
