export const codeStrings = {
  Python: `
def insertion_sort(arr):
    for i in range(1, len(arr)):
        currentValue = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > currentValue:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = currentValue

arr = [3, 1, 5, 3, 9, 0]
print("Original array:")
print(arr)

insertion_sort(arr)

print("Sorted array:")
print(arr)

  `,
  "C/C++": `
#include <stdio.h>

void insertion_sort(int arr[], int size) {
    for (int i = 1; i < size; i++) {
        int currentValue = arr[i];
        int j;
        for (j = i - 1; j >= 0 && arr[j] > currentValue; j--) {
            arr[j + 1] = arr[j];
        }

        arr[j + 1] = currentValue;
    }
}

int main() {
    int arr[] = {3, 1, 5, 3, 9, 0};
    int size = sizeof(arr) / sizeof(arr[0]);

    printf("Original array:\n");
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");

    insertion_sort(arr, size);

    printf("Sorted array:\n");
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");

    return 0;
}

  `,
  JavaScript: `
 
function insertion_sort(arr) {
    console.log(arr);
    for (let i = 1; i < arr.length; i++) {
        let currentValue = arr[i];
        for (var j = i - 1; j >= 0 && arr[j] > currentValue; j--) {
            arr[j + 1] = arr[j];
        }
    
        arr[j + 1] = currentValue;
    }
    return arr;
  }
let arr = [3, 1, 5, 3, 9, 0];
console.log(insertion_sort(arr));
  
  `,
};
