export const codeStrings = {
  Python: `
class Node:
    def __init__(self, val):
        self.val = val
        self.next = None

class Stack:
    def __init__(self):
        self.top = None
        self.size = 0

    def push(self, val):
        new_node = Node(val)
        if not self.top:
            self.top = new_node
        else:
            new_node.next = self.top
            self.top = new_node
        self.size += 1

    def pop(self):
        if not self.top:
            return None # Underflow condition
        removed = self.top
        self.top = self.top.next
        self.size -= 1
        return removed.val

    def peek(self):
        return self.top.val if self.top else None

    def isempty(self):
        return self.size == 0

    def getsize(self):
        return self.size

# Example usage
stack = Stack()
stack.push(5)
stack.push(10)
stack.push(15)

print("Top element:", stack.peek())
print("Size of stack:", stack.getsize())

print("Popped element:", stack.pop())
print("Size of stack after pop:", stack.getsize())

  `,
  "C/C++": `
#include <stdio.h>
#include <stdlib.h>

// Define Node structure
struct Node {
    int val;
    struct Node* next;
};

// Define Stack structure
struct Stack {
    struct Node* top;
    int size;
};

// Function to create a new node
struct Node* newNode(int val) {
    struct Node* node = (struct Node*)malloc(sizeof(struct Node));
    node->val = val;
    node->next = NULL;
    return node;
}

// Function to initialize a stack
struct Stack* createStack() {
    struct Stack* stack = (struct Stack*)malloc(sizeof(struct Stack));
    stack->top = NULL;
    stack->size = 0;
    return stack;
}

// Function to push a value onto the stack
void push(struct Stack* stack, int val) {
    struct Node* newNode = newNode(val);
    if (!stack->top) {
        stack->top = newNode;
    } else {
        newNode->next = stack->top;
        stack->top = newNode;
    }
    stack->size++;
}

// Function to pop a value from the stack
int pop(struct Stack* stack) {
    if (!stack->top) {
        return -1; // Underflow condition
    }
    struct Node* removed = stack->top;
    stack->top = stack->top->next;
    stack->size--;
    int val = removed->val;
    free(removed);
    return val;
}

// Function to peek at the top value of the stack
int peek(struct Stack* stack) {
    return stack->top ? stack->top->val : -1; // Return -1 for empty stack
}

// Function to check if the stack is empty
int isEmpty(struct Stack* stack) {
    return stack->size == 0;
}

// Function to get the size of the stack
int getSize(struct Stack* stack) {
    return stack->size;
}

int main() {
    // Create a new stack
    struct Stack* stack = createStack();

    // Example usage
    push(stack, 5);
    push(stack, 10);
    push(stack, 15);

    printf("Top element: %d\n", peek(stack));
    printf("Size of stack: %d\n", getSize(stack));

    printf("Popped element: %d\n", pop(stack));
    printf("Size of stack after pop: %d\n", getSize(stack));

    return 0;
}

  `,
  JavaScript: `
class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}
  
class Stack {
    constructor() {
        this.top = null;
        this.size = 0;
    }
    push(val) {
        let newNode = new Node(val);
        if (!this.top) {
          this.top = newNode;
        } else {
          newNode.next = this.top;
          this.top = newNode;
        }
        this.size++;
        return this;
    }
    pop() {
        if (!this.top) {
          return undefined;
        }
        let removed = this.top;
        this.top = this.top.next;
    
        this.size--;
        removed.next = null;
        return this;
    }
    peek() {
        return this.top ? this.top.val : undefined;
    }
    isempty() {
        return !!(this.size === 0);
    }
    getsize() {
        return this.size;
    }
}
  
var stack = new Stack();

      `,
};
