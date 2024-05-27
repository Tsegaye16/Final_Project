export const codeStrings = {
  Python: `
def bubble_sort(arr):
    print("Initial list")
    print(arr)
    print("Starting sorting......")

    for i in range(len(arr)):
        for j in range(len(arr) - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
            print(arr)

print("final answer")
print(arr)

def optimized_bubble_sort(arr):
    print("Initial list")
    print(arr)
    print("Starting sorting......")

    no_swap = False
    for i in range(len(arr)):
        no_swap = True
        for j in range(len(arr) - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                no_swap = False
            print(arr)
        if no_swap:
            break

    print("final answer")
    print(arr)

array = [4, 3, 2, 1]
bubble_sort(array)

ar1 = [9, 1, 2, 6, 3, 4, 5, 7, 8]
optimized_bubble_sort(ar1)

  `,
  "C/C++": `
#include <stdio.h>

void bubble_sort(int arr[], int size) {
    printf("Initial list\n");
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
     printf("\nStarting sorting......\n");
  
    for (int i = 0; i < size; i++) {
        for (int j = 0; j < size - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
            for (int k = 0; k < size; k++) {
                printf("%d ", arr[k]);
            }
            printf("\n");
        }
    }
  
    printf("final answer\n");
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}
  
void optimized_bubble_sort(int arr[], int size) {
    printf("Initial list\n");
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\nStarting sorting......\n");
  
    int noSwap;
    for (int i = 0; i < size; i++) {
        noSwap = 1;
        for (int j = 0; j < size - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                noSwap = 0;
            }
            for (int k = 0; k < size; k++) {
                printf("%d ", arr[k]);
            }
            printf("\n");
        }
        if (noSwap) {
            break;
        }
    }
  
    printf("final answer\n");
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}
  
int main() {
    int array[] = {4, 3, 2, 1};
    int size = sizeof(array) / sizeof(array[0]);
    bubble_sort(array, size);
  
    int ar1[] = {9, 1, 2, 6, 3, 4, 5, 7, 8};
    size = sizeof(ar1) / sizeof(ar1[0]);
    optimized_bubble_sort(ar1, size);
  
    return 0;
}
  
  `,
  JavaScript: `

function bubble_sort(arr) {
    console.log("Initial list");
    console.log(arr);
    console.log("Starting sorting......");
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
            }
            console.log(arr, arr[j], arr[j + 1]);
        }
    }
    console.log("final answer");
    console.log(arr);
  }
let array = [4, 3, 2, 1];
bubble_sort(array);
  
//Optimized code for bubble sort
  
function opt_bubble_sort(arr) {
    console.log("Initial list");
    console.log(arr);
    console.log("Starting sorting......");
    var noSwap;
    for (let i = 0; i < arr.length; i++) {
        noSwap = true;
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
            noSwap = false;
            }
            console.log(arr, arr[j], arr[j + 1]);
        }
        if (noSwap) {
            break;
        }
    }
    console.log("final answer");
    console.log(arr);
  }
let ar1 = [9, 1, 2, 6, 3, 4, 5, 7, 8];
opt_bubble_sort(ar1);
  
  `,
};
