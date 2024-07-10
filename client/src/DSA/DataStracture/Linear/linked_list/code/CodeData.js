export const codeStrings = {
  Python: `class Node:
    def __init__(self, val):
        self.val = val
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
        self.length = 0

    def push(self, val):
        new_node = Node(val)
        if not self.head:
            self.head = new_node
            self.tail = self.head
        else:
            self.tail.next = new_node
            self.tail = new_node
        self.length += 1
        return self

    def pop(self):
        if not self.head:
            return None
        current = self.head
        new_tail = current
        while current.next:
            new_tail = current
            current = current.next
        self.tail = new_tail
        self.tail.next = None
        self.length -= 1
        return current

    def unshift(self, val):
        new_node = Node(val)
        new_node.next = None
        if not self.head:
            self.head = new_node
            self.tail = new_node
        else:
            new_node.next = self.head
            self.head = new_node
        self.length += 1
        return self

    def insert(self, index, val):
        new_node = Node(val)
        new_node.next = None
        if index < 0 or index > self.length:
            return None
        elif index == self.length:
            self.push(val)
        elif index == 0:
            self.unshift(val)
        else:
            count = 1
            cur = self.head
            while count != index:
                cur = cur.next
                count += 1
            new_node.next = cur.next
            cur.next = new_node
        self.length += 1

    def remove(self, index):
        if index < 1 or index > self.length:
            return None
        elif index == 1:
            self.shift()
        elif index == self.length:
            self.pop()
        else:
            cur = self.head
            count = 1
            while count != index - 1:
                cur = cur.next
                count += 1
            cur.next = cur.next.next
        self.length -= 1

    `,
  "C/C++": `#include <stdio.h>
#include <stdlib.h>
  
typedef struct Node {
    int val;
    struct Node* next;
  } Node;
  
typedef struct LinkedList {
    Node* head;
    Node* tail;
    int length;
} LinkedList;
  
Node* createNode(int val) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->val = val;
    newNode->next = NULL;
    return newNode;
}
  
LinkedList* createLinkedList() {
    LinkedList* list = (LinkedList*)malloc(sizeof(LinkedList));
    list->head = NULL;
    list->tail = NULL;
    list->length = 0;
    return list;
}
  
void push(LinkedList* list, int val) {
    Node* newNode = createNode(val);
    if (!list->head) {
        list->head = newNode;
        list->tail = list->head;
    } else {
        list->tail->next = newNode;
        list->tail = newNode;
    }
    list->length++;
}
  
Node* pop(LinkedList* list) {
    if (!list->head) {
        return NULL;
    }
    Node* current = list->head;
    Node* new_tail = current;
    while (current->next) {
        new_tail = current;
        current = current->next;
    }
    list->tail = new_tail;
    list->tail->next = NULL;
    list->length--;
    return current;
}
  
void unshift(LinkedList* list, int val) {
    Node* newNode = createNode(val);
    newNode->next = NULL;
    if (!list->head) {
        list->head = newNode;
        list->tail = newNode;
    } else {
        newNode->next = list->head;
        list->head = newNode;
    }
    list->length++;
}
  
void insert(LinkedList* list, int index, int val) {
    Node* newNode = createNode(val);
    newNode->next = NULL;
    if (index < 0 || index > list->length) {
        return;
    } else if (index == list->length) {
        push(list, val);
    } else if (index == 0) {
        unshift(list, val);
    } else {
        int count = 1;
        Node* cur = list->head;
        while (count != index) {
            cur = cur->next;
            count++;
        }
        newNode->next = cur->next;
        cur->next = newNode;
        list->length++;
    }
}
  
void removeNode(LinkedList* list, int index) {
    if (index < 1 || index > list->length) {
        return;
    } else if (index == 1) {
        Node* temp = list->head;
        list->head = list->head->next;
        free(temp);
        list->length--;
    } else if (index == list->length) {
        pop(list);
    } else {
        int count = 1;
        Node* cur = list->head;
        while (count != index - 1) {
            cur = cur->next;
            count++;
        }
        Node* temp = cur->next;
        cur->next = cur->next->next;
        free(temp);
        list->length--;
    }
}
  
void printList(LinkedList* list) {
    Node* current = list->head;
    while (current) {
        printf("%d ", current->val);
        current = current->next;
    }
    printf("\n");
}
  
void freeList(LinkedList* list) {
    Node* current = list->head;
    Node* temp;
    while (current) {
        temp = current;
        current = current->next;
        free(temp);
    }
    free(list);
}
  
int main() {
    LinkedList* list = createLinkedList();
    push(list, 1);
    push(list, 2);
    push(list, 3);
    insert(list, 1, 4);
    removeNode(list, 2);
    printList(list);
    freeList(list);
    return 0;
}
  
    `,
  JavaScript: `class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}
  
class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    push(val) {
        let newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
      } else {
            this.tail.next = newNode;
            this.tail = newNode;
      }
        this.length++;
        return this;
    }
    pop() {
        if (!this.head) {
            return undefined;
        }
        let current = this.head;
        let new_tail = current;
        while (current.next) {
            new_tail = current;
            current = current.next;
        }
        this.tail = new_tail;
        this.tail.next = null;
        this.length--;
        return current;
    }
  
    unshift(val) {
        const newNode = new Node(val);
        newNode.next = null;
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return this;
    }
  
    insert(index, val) {
        let newNode = new Node(val);
         newNode.nex = null;
        if (index < 0 || index > this.length) {
            return undefined;
        } else if (index === this.length) {
            this.push(val);
            this.length++;
        } else if (index === 0) {
            this.unshift(val);
            this.length++;
        } else {
            let count = 1;
            let cur = this.head;
            while (count !== index - 1) {
                cur = cur.next;
                count++;
            }
            newNode.next = cur.next;
            cur.next = newNode;
        }
        this.length++;
    }
    remove(index) {
        if (index < 1 || index > this.length) {
            return undefined;
        } else if (index === 1) {
            this.shift();
            this.length--;
        } else if (index === this.length) {
            this.pop();
            this.length--;
        } else {
            let cur = this.head;
            let count = 1;
            while (count !== index - 1) {
                cur = cur.next;
                count++;
            }
            cur.next = cur.next.next;
            this.length--;
        }
    }
}
let linked = new LinkedList();
    `,
};
