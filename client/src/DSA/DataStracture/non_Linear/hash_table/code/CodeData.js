export const codeStrings = {
  Python: `class Node:
    def __init__(self, key, value):
        self.key = key
        self.value = value
        self.next = None

class HashTable:
    def __init__(self, size):
        self.table_size = size
        self.table = [None] * size

    def get_hash_code(self, key):
        return key % self.table_size

    def insert(self, key, value):
        pos = self.get_hash_code(key)
        new_node = Node(key, value)

        if self.table[pos] is None:
            self.table[pos] = new_node
        else:
            current = self.table[pos]
            while current.next:
                current = current.next
            current.next = new_node

    def search(self, key):
        pos = self.get_hash_code(key)
        current = self.table[pos]
        while current:
            if current.key == key:
                return current.value
            current = current.next
        return "Not found"

    def remove(self, key):
        pos = self.get_hash_code(key)
        current = self.table[pos]
        prev = None
        while current:
            if current.key == key:
                if prev is None:
                    self.table[pos] = current.next
                else:
                    prev.next = current.next
                return
            prev = current
            current = current.next

hash_table = HashTable(6)
hash_table.insert(5, "apple")
hash_table.insert(11, "banana")
hash_table.insert(17, "orange")

print(hash_table.search(11))  # Output: banana
print(hash_table.search(22))  # Output: Not found

hash_table.remove(17)
print(hash_table.search(17))  # Output: Not found

  `,
  "C/C++": `
#include <stdio.h>
#include <stdlib.h>
  
#define TABLE_SIZE 6
  
struct Node {
    int key;
    char* value;
    struct Node* next;
};
  
struct HashTable {
    struct Node* table[TABLE_SIZE];
};
  
int getHashCode(int key) {
    return key % TABLE_SIZE;
}
  
void insert(struct HashTable* hashTable, int key, char* value) {
    int pos = getHashCode(key);
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->key = key;
    newNode->value = value;
    newNode->next = NULL;
  
    if (hashTable->table[pos] == NULL) {
        hashTable->table[pos] = newNode;
    } else {
        struct Node* current = hashTable->table[pos];
        while (current->next != NULL) {
            current = current->next;
        }
        current->next = newNode;
    }
}
  
char* search(struct HashTable* hashTable, int key) {
    int pos = getHashCode(key);
    struct Node* current = hashTable->table[pos];
    while (current != NULL) {
        if (current->key == key) {
            return current->value;
        }
        current = current->next;
    }
    return "Not found";
}
  
void removeNode(struct HashTable* hashTable, int key) {
    int pos = getHashCode(key);
    struct Node* current = hashTable->table[pos];
    struct Node* prev = NULL;
    while (current != NULL) {
        if (current->key == key) {
            if (prev == NULL) {
                hashTable->table[pos] = current->next;
            } else {
                prev->next = current->next;
            }
            free(current);
            return;
        }
        prev = current;
        current = current->next;
    }
}
  
int main() {
    struct HashTable hashTable;
    for (int i = 0; i < TABLE_SIZE; i++) {
        hashTable.table[i] = NULL;
    }
  
    insert(&hashTable, 5, "apple");
    insert(&hashTable, 11, "banana");
    insert(&hashTable, 17, "orange");
  
    printf("%s\n", search(&hashTable, 11)); // Output: banana
    printf("%s\n", search(&hashTable, 22)); // Output: Not found
  
    removeNode(&hashTable, 17);
    printf("%s\n", search(&hashTable, 17)); // Output: Not found
  
    return 0;
}
  
  
    `,
  JavaScript: `
class HashTable {
    constructor(size) {
        this.tableSize = size;
        this.index = new Array(size).fill(null);
    }
  
    getHashCode(key) {
        return key % this.tableSize;
    }
  
    insert(key, value) {
        const pos = this.getHashCode(key);
  
        if (!this.index[pos]) {
            this.index[pos] = [{ key, value }];
        } else {
            this.index[pos].push({ key, value });
        }
    }
  
    search(key) {
        const pos = this.getHashCode(key);
  
        if (!this.index[pos]) {
            return \`\${key} not found\`;
      }
  
        for (const item of this.index[pos]) {
            if (item.key === key) {
                return \`\${key} found at index \${pos}\`;
            }
        }
  
      return \`\${key} not found\`;
    }
  
    remove(key) {
        const pos = this.getHashCode(key);
  
        if (!this.index[pos]) {
            return \`\${key} not found\`;
        }
  
        for (let i = 0; i < this.index[pos].length; i++) {
            if (this.index[pos][i].key === key) {
                this.index[pos].splice(i, 1);
                return \`\${key} removed from index \${pos}\`;
            }
        }
  
        return \`\${key} not found\`;
    }
}
  
// Example Usage:
const hashTable = new HashTable(6);
hashTable.insert(5, "apple");
hashTable.insert(11, "banana");
hashTable.insert(17, "orange");
console.log(hashTable.search(11)); // Output: 11 found at index 5
console.log(hashTable.search(22)); // Output: 22 not found
console.log(hashTable.remove(17)); // Output: 17 removed from index 5
console.log(hashTable.remove(22)); // Output: 22 not found
  
      `,
};
