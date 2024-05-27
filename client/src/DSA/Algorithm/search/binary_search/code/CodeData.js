export const codeStrings = {
  Python: `
def binary_search(arr, item):
    first = 0
    last = len(arr) - 1
    while first <= last:
        mid = (first + last) // 2
        if arr[mid] < item:
            first = mid + 1
        elif arr[mid] > item:
            last = mid - 1
        else:
            return mid
    return -1

print(binary_search([2, 4, 6, 7, 9, 9], 9))

  `,
  "C/C++": `
#include <stdio.h>

int binary_search(int arr[], int size, int item) {
    int first = 0;
    int last = size - 1;
    while (first <= last) {
        int mid = (first + last) / 2;
        if (arr[mid] < item) {
            first = mid + 1;
        } else if (arr[mid] > item) {
            last = mid - 1;
        } else {
            return mid;
        }
    }
    return -1;
}
  
int main() {
    int arr[] = {2, 4, 6, 7, 9, 9};
    int size = sizeof(arr) / sizeof(arr[0]);
    int item = 9;
    printf("%d\n", binary_search(arr, size, item));
    return 0;
}
  
  `,
  JavaScript: `
function binary_search(arr, item) {
    let first = 0;
    let last = arr.length - 1;
    while (first <= last) {
        var mid = Math.floor((first + last) / 2);
        if (arr[mid] < item) {
            first = mid + 1;
        } else if (arr[mid] > item) {
            last = mid - 1;
        } else {
            return mid;
        }
    }
    return -1;
}
  
console.log(binary_search([2, 4, 6, 7, 9, 9], 9));
  
`,
};
