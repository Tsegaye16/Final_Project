export const codeStrings = {
  Python: `
def merging_array(list1, list2):
    i = 0
    j = 0
    result = []
    while i < len(list1) and j < len(list2):
        if list1[i] < list2[j]:
            result.append(list1[i])
            i += 1
        else:
            result.append(list2[j])
            j += 1
    while i < len(list1):
        result.append(list1[i])
        i += 1
    while j < len(list2):
        result.append(list2[j])
        j += 1
    return result

def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merging_array(left, right)

list3 = [3, 2, 5, 8, 9, 5]
print("Sorted array:", merge_sort(list3))

  `,
  "C/C++": `
#include <stdio.h>
#include <stdlib.h>
  
void merging_array(int list1[], int list2[], int size1, int size2, int result[]) {
    int i = 0, j = 0, k = 0;
  
    while (i < size1 && j < size2) {
        if (list1[i] < list2[j]) {
            result[k++] = list1[i++];
        } else {
            result[k++] = list2[j++];
        }
    }
  
    while (i < size1) {
        result[k++] = list1[i++];
    }
  
    while (j < size2) {
        result[k++] = list2[j++];
    }
}
  
void merge_sort(int arr[], int size) {
    if (size <= 1) {
        return;
    }
  
    int mid = size / 2;
  
    int left[mid];
    int right[size - mid];
  
    for (int i = 0; i < mid; i++) {
        left[i] = arr[i];
    }
  
    for (int i = mid; i < size; i++) {
        right[i - mid] = arr[i];
    }
  
    merge_sort(left, mid);
    merge_sort(right, size - mid);
  
    merging_array(left, right, mid, size - mid, arr);
}
  
int main() {
    int list3[] = {3, 2, 5, 8, 9, 5};
    int size = sizeof(list3) / sizeof(list3[0]);
  
    merge_sort(list3, size);
  
    printf("Sorted array: ");
    for (int i = 0; i < size; i++) {
        printf("%d ", list3[i]);
    }
    printf("\n");
  
    return 0;
}
  
  `,
  JavaScript: `
function merging_array(list1, list2) {
    let i = 0;
    let j = 0;
    let result = [];
    while (i < list1.length && j < list2.length) {
        if (list2[j] > list1[i]) {
            result.push(list1[i]);
            i++;
        } else {
            result.push(list2[j]);
            j++;
        }
    }
    while (i < list1.length) {
        result.push(list1[i]);
        i++;
    }
    while (j < list2.length) {
        result.push(list2[j]);
        j++;
    }
    return result;
  }
  
function merge_sort(list3) {
    if (list3.length <= 1) {
        return list3;
    }
    let mid = Math.floor(list3.length / 2);
    let left = merge_sort(list3.slice(0, mid));
    let right = merge_sort(list3.slice(mid));
  
    return merging_array(left, right);
  }
let list3 = [3, 2, 5, 8, 9, 5];
console.log(merge_sort(list3));
  
  
  `,
};
