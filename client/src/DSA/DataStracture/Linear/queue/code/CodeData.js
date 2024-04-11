export const codeStrings = {
  Python: `
class Node:
    def __init__(self, val):
        self.val = val
        self.next = None

class Queue:

    def __init__(self):
        self.first = None
        self.last = None
        self.size = 0

    def enqueue(self, val):
        new_node = Node(val)
        if self.size == 0:  # Handle empty queue
            self.first = self.last = new_node
        else:
            self.last.next = new_node
            self.last = new_node
        self.size += 1

    def dequeue(self):
        if self.size == 0:
            print("Queue is empty!")
            return None  # Or any indicator for error

        temp = self.first
        data = temp.val
        self.first = self.first.next

        if self.first == None:  # Handle queue becoming empty
            self.last = None

        del temp  # Remove the dequeued node
        self.size -= 1
        return data

    def display(self):
        if self.size == 0:
            print("Queue is empty.")
            return

        temp = self.first
        while temp is not None:
            print(temp.val, end=" ")
            temp = temp.next
        print()  # Newline at the end

# Example usage
q = Queue()
q.enqueue(10)
q.enqueue(20)
q.enqueue(30)

print("Queue elements:", end=" ")
q.display()

deq_data = q.dequeue()
print("Dequeued element:", deq_data)

print("Queue elements after dequeue:", end=" ")
q.display()
  
    `,
  "C/C++": `
#include <stdio.h>
#include <stdlib.h>
  
struct Node {
    int val;
    struct Node* next;
};
  
struct Queue {
    struct Node* first;
    struct Node* last;
    int size;
};
  
void createQueue(struct Queue** q) {
    *q = (struct Queue*)malloc(sizeof(struct Queue));
    (*q)->first = NULL;
    (*q)->last = NULL;
    (*q)->size = 0;
}
  
void enqueue(struct Queue* q, int val) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->val = val;
    newNode->next = NULL;
  
    if (q->size == 0) { // Handle empty queue
        q->first = q->last = newNode;
    }
    else {
        q->last->next = newNode;
        q->last = newNode;
    }
  
    q->size++;
}
  
int dequeue(struct Queue* q) {
    if (q->size == 0) {
        printf("Queue is empty!\n");
        return -1; // Or any indicator for error
    }
  
    struct Node* temp = q->first;
    int data = temp->val;
    q->first = q->first->next;
  
    if (q->first == NULL) { // Handle queue becoming empty
        q->last = NULL;
    }
  
    free(temp);
    q->size--;
  
    return data;
}
  
void displayQueue(struct Queue* q) {
    if (q->size == 0) {
        printf("Queue is empty.\n");
        return;
    }
  
    struct Node* temp = q->first;
    while (temp != NULL) {
        printf("%d ", temp->val);
        temp = temp->next;
    }
    printf("\n");
}
  
int main() {
    struct Queue* q = NULL;
    createQueue(&q);
  
    enqueue(q, 10);
    enqueue(q, 20);
    enqueue(q, 30);
  
    printf("Queue elements: ");
    displayQueue(q);
  
    int deq_data = dequeue(q);
    printf("Dequeued element: %d\n", deq_data);
  
    printf("Queue elements after dequeue: ");
    displayQueue(q);
  
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
class ques {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }
    enqueue(val) {
        let newNode = new Node(val);
        if (!this.last) {
            this.last = newNode;
            this.first = newNode;
        }
        this.last.next = newNode;
        this.last = newNode;
        this.size++;
        return newNode;
    }
    deque() {
        if (!this.first) {
            return undefined;
        }
        let temp = this.first;
        this.first = this.first.next;
        this.size--;
        return this;
    }
  }
  
var enq = new ques();
  
  
        `,
};
