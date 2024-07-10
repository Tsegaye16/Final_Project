export const codeStrings = {
  Python: `
class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None

    def insert(self, val):
        if self.root is None:
            self.root = Node(val)
            return self.root
        current = self.root
        while True:
            if val < current.val:
                if current.left is None:
                    current.left = Node(val)
                    return self.root
                else:
                    current = current.left
            elif val > current.val:
                if current.right is None:
                    current.right = Node(val)
                    return self.root
                else:
                    current = current.right

    def find_min_node(self, node):
        current = node
        while current.left:
            current = current.left
        return current

    def delete(self, val):
        self.root = self.delete_node(self.root, val)

    def delete_node(self, root, key):
        if root is None:
            return root
        if key < root.val:
            root.left = self.delete_node(root.left, key)
        elif key > root.val:
            root.right = self.delete_node(root.right, key)
        else:
            if root.left is None:
                return root.right
            elif root.right is None:
                return root.left
            temp = self.find_min_node(root.right)
            root.val = temp.val
            root.right = self.delete_node(root.right, temp.val)
        return root

    def bfs(self):
        data = []
        queue = []
        if self.root is None:
            return data
        queue.append(self.root)
        while queue:
            node = queue.pop(0)
            data.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        return data

    def dfs_pre_order(self):
        data = []
        def traverse(node):
            data.append(node.val)
            if node.left:
                traverse(node.left)
            if node.right:
                traverse(node.right)
        traverse(self.root)
        return data

    def dfs_post_order(self):
        data = []
        def traverse(node):
            if node.left:
                traverse(node.left)
            if node.right:
                traverse(node.right)
            data.append(node.val)
        traverse(self.root)
        return data

    def dfs_in_order(self):
        data = []
        def traverse(node):
            if node.left:
                traverse(node.left)
            data.append(node.val)
            if node.right:
                traverse(node.right)
        traverse(self.root)
        return data

# Example usage
tree = BST()
tree.insert(50)
tree.insert(30)
tree.insert(70)
tree.insert(20)
tree.insert(40)
tree.insert(60)
tree.insert(80)

print("BFS Traversal:", tree.bfs())
print("DFS Pre-order Traversal:", tree.dfs_pre_order())
print("DFS Post-order Traversal:", tree.dfs_post_order())
print("DFS In-order Traversal:", tree.dfs_in_order())

  `,
  "C/C++": `
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int val;
    struct Node* left;
    struct Node* right;
};

struct Node* createNode(int val) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->val = val;
    newNode->left = NULL;
    newNode->right = NULL;
    return newNode;
}

struct Node* insert(struct Node* root, int val) {
    if (root == NULL) {
        return createNode(val);
    }
    if (val < root->val) {
        root->left = insert(root->left, val);
    } else if (val > root->val) {
        root->right = insert(root->right, val);
    }
    return root;
}

struct Node* findMinNode(struct Node* node) {
    struct Node* current = node;
    while (current->left != NULL) {
        current = current->left;
    }
    return current;
}

struct Node* deleteNode(struct Node* root, int key) {
    if (root == NULL) {
        return root;
    }
    if (key < root->val) {
        root->left = deleteNode(root->left, key);
    } else if (key > root->val) {
        root->right = deleteNode(root->right, key);
    } else {
        if (root->left == NULL) {
            struct Node* temp = root->right;
            free(root);
            return temp;
        } else if (root->right == NULL) {
            struct Node* temp = root->left;
            free(root);
            return temp;
        }
        struct Node* temp = findMinNode(root->right);
        root->val = temp->val;
        root->right = deleteNode(root->right, temp->val);
    }
    return root;
}

void BFS(struct Node* root) {
    if (root == NULL) {
        return;
    }
    struct Node* queue[100];
    int front = 0, rear = 0;
    queue[rear++] = root;
    while (front < rear) {
        struct Node* node = queue[front++];
        printf("%d ", node->val);
        if (node->left != NULL) {
            queue[rear++] = node->left;
        }
        if (node->right != NULL) {
            queue[rear++] = node->right;
        }
    }
}

void dfsPreOrder(struct Node* root) {
    if (root == NULL) {
        return;
    }
    printf("%d ", root->val);
    dfsPreOrder(root->left);
    dfsPreOrder(root->right);
}

void dfsPostOrder(struct Node* root) {
    if (root == NULL) {
        return;
    }
    dfsPostOrder(root->left);
    dfsPostOrder(root->right);
    printf("%d ", root->val);
}

void dfsInOrder(struct Node* root) {
    if (root == NULL) {
        return;
    }
    dfsInOrder(root->left);
    printf("%d ", root->val);
    dfsInOrder(root->right);
}

int main() {
    struct Node* root = NULL;
    root = insert(root, 50);
    root = insert(root, 30);
    root = insert(root, 70);
    root = insert(root, 20);
    root = insert(root, 40);
    root = insert(root, 60);
    root = insert(root, 80);

    printf("BFS Traversal: ");
    BFS(root);
    printf("\n");

    printf("DFS Pre-order Traversal: ");
    dfsPreOrder(root);
    printf("\n");

    printf("DFS Post-order Traversal: ");
    dfsPostOrder(root);
    printf("\n");

    printf("DFS In-order Traversal: ");
    dfsInOrder(root);
    printf("\n");

    return 0;
}

  `,
  JavaScript: `
    class Node {
        constructor(val) {
            this.val = val;
            this.left = null;
            this.right = null;
        }
      }
    class BST {
        constructor() {
            this.root = null;
        }
        insert(val) {
            let newNode = new Node(val);
        
            if (!this.root) {
                this.root = newNode;
                return this;
            } else {
                let current = this.root;
                while (true) {
                if (current.val === val) {
                    return undefined;
                }
                if (val < current.val) {
                    if (current.left === null) {
                    current.left = newNode;
                    return this;
                    } else {
                    current = current.left;
                    }
                } else if (val > current.val) {
                    if (current.right === null) {
                    current.right = newNode;
                    return this;
                    } else {
                    current = current.right;
                    }
                }
                }
            }
        }
      
        findMinNode(node) {
            let current = node;
            while (current.left) {
                current = current.left;
            }
            return current;
        }
      
        delete(val) {
            this.root = this.deleteNode(this.root, val);
        }
      
        deleteNode(root, key) {
            if (root === null) {
                return root;
            }
        
            if (key < root.val) {
                root.left = this.deleteNode(root.left, key);
            } else if (key > root.val) {
                root.right = this.deleteNode(root.right, key);
            } else {
                if (root.left === null) {
                return root.right;
                } else if (root.right === null) {
                return root.left;
                }
        
                let temp = this.findMinNode(root.right);
                root.val = temp.val;
        
                root.right = this.deleteNode(root.right, temp.val);
            }
            return root;
        }
      
        BFS() {
            let node = this.root,
                data = [],
                queue = [];
            queue.push(node);
            while (queue.length) {
                node = queue.shift();
                data.push(node.val);
                if (node.left) {
                queue.push(node.left);
                }
                if (node.right) {
                queue.push(node.right);
                }
            }
            return data;
        }
        dfsPreOrder() {
            let data = [];
            function traverse(node) {
                data.push(node.val);
                if (node.left) {
                traverse(node.left);
                }
                if (node.right) {
                traverse(node.right);
                }
            }
            traverse(this.root);
            return data;
        }
        dfsPostOrder() {
            let data = [];
            function traverse(node) {
                if (node.left) {
                traverse(node.left);
                }
                if (node.right) {
                traverse(node.right);
                }
                data.push(node.val);
            }
            traverse(this.root);
            return data;
        }
        dfsInOrder() {
            let data = [];
            function traverse(node) {
                if (node.left) {
                traverse(node.left);
                }
                data.push(node.val);
                if (node.right) {
                traverse(node.right);
                }
            }
            traverse(this.root);
            return data;
            }
      }
      const tree = new BST();
      
    `,
};
