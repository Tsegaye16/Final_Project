export const codeStrings = {
  Python:`def Linear_Search(list1,value):
    list2=[]
    flag=True
    for i in range(len(list1)):
        if value==list1[i]:
            flag=False
            list2.append(i)
  
  
    if flag==False:
        print("The value is found at the index of :")
        for j in list2:
            print(j,end=" ")`,
            'C/C++':`#include <stdio.h>

    void LinearSearch(int list1[], int value) {
        int size = sizeof(list1) / sizeof(list1[0]);
        int list2[size];
        int flag = 1; // True
    
        for (int i = 0; i < size; i++) {
            if (value == list1[i]) {
                flag = 0; // False
                list2[i] = 1; // Mark index as found
            }
            else {
                list2[i] = 0; // Mark index as not found
            }
        }
    
        if (flag == 0) {
            printf("The value is found at the index of: ");
            for (int j = 0; j < size; j++) {
                if (list2[j] == 1) {
                    printf("%d ", j);
                }
            }
        } else {
            printf("The value is not found in the list.");
        }
    }
    
    int main() {
        int list1[] = { /* Your list here */ };
        int value = /* Your value to search here */;
    
        LinearSearch(list1, value);
    
        return 0;
    }`,
    JavaScript: `
    function linear_search(arr, item) {
      let flag = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == item) {
          flag.push(i);
        }
      }
      if (!flag[0]) {
        console.log("the item is not found in the list");
      } else {
        for (let j = 0; j < flag.length; j++) {
          console.log(\`the item \${item} is found at the index \${flag}\`);
        }
      }
    }
    linear_search([3, 6, 9, 2, 0, -5, 9], 10);
  `
}