export const codeStrings = {
  Python: `MAX_SIZE = 100  # Adjust as needed

  arr = []
  
  # Function implementations
  def insert_beginning(data):
      if len(arr) >= MAX_SIZE:
          print("Overflow!")
          return
  
      arr.insert(0, data)  # Efficiently inserts at the beginning
  
  def insert_end(data):
      if len(arr) >= MAX_SIZE:
          print("Overflow!")
          return
  
      arr.append(data)  # Efficiently inserts at the end
  
  def insert_at(index, data):
      if not (0 <= index <= len(arr)):
          print("Invalid index!")
          return
  
      if len(arr) >= MAX_SIZE:
          print("Overflow!")
          return
  
      arr.insert(index, data)  # Inserts at the specified index
  
  def delete_element(index):
      if not (0 <= index < len(arr)):
          print("Invalid index!")
          return
  
      del arr[index]  # Removes one element at the specified index
  
  def update_element(index, data):
      if not (0 <= index < len(arr)):
          print("Invalid index!")
          return
  
      arr[index] = data  # Updates the element at the specified index
  
  def display_array():
      if not arr:
          print("Array is empty.")
          return
  
      print(*arr, sep=" ")  # Efficiently prints elements with spaces
  
  # Example usage
  insert_end(10)
  insert_beginning(5)
  insert_at(1, 15)
  print("Array after insertions:", display_array())
  
  delete_element(0)
  update_element(1, 20)
  print("Array after deletions and updates:", display_array())`,
  "C/C++": `#include <stdio.h>
  #include <stdlib.h>
  
  #define MAX_SIZE 100 // Adjust as needed
  
  int arr[MAX_SIZE];
  int size = 0; // Current size of the array
  
  // Function prototypes
  void insert_beginning(int data);
  void insert_end(int data);
  void insert_at(int index, int data);
  void delete_element(int index);
  void update_element(int index, int data);
  void display_array();
  
  int main() {
      insert_end(10);
      insert_beginning(5);
      insert_at(1, 15);
      printf("Array after insertions: ");
      display_array();
  
      delete_element(0);
      update_element(1, 20);
      printf("Array after deletions and updates: ");
      display_array();
  
      return 0;
  }
  
  void insert_beginning(int data) {
      if (size >= MAX_SIZE) {
          printf("Overflow!\n");
          return;
      }
  
      // Shift elements to the right
      for (int i = size - 1; i >= 0; i--) {
          arr[i + 1] = arr[i];
      }
  
      arr[0] = data;
      size++;
  }
  
  void insert_end(int data) {
      if (size >= MAX_SIZE) {
          printf("Overflow!\n");
          return;
      }
  
      arr[size] = data;
      size++;
  }
  
  void insert_at(int index, int data) {
      if (index < 0 || index > size) {
          printf("Invalid index!\n");
          return;
      }
  
      if (size >= MAX_SIZE) {
          printf("Overflow!\n");
          return;
      }
  
      // Shift elements to the right from the insertion index
      for (int i = size - 1; i >= index; i--) {
          arr[i + 1] = arr[i];
      }
  
      arr[index] = data;
      size++;
  }
  
  void delete_element(int index) {
      if (index < 0 || index >= size) {
          printf("Invalid index!\n");
          return;
      }
  
      // Shift elements to the left from the deletion index
      for (int i = index; i < size - 1; i++) {
          arr[i] = arr[i + 1];
      }
  
      size--;
  }
  
  void update_element(int index, int data) {
      if (index < 0 || index >= size) {
          printf("Invalid index!\n");
          return;
      }
  
      arr[index] = data;
  }
  
  void display_array() {
      if (size == 0) {
          printf("Array is empty.\n");
          return;
      }
  
      for (int i = 0; i < size; i++) {
          printf("%d ", arr[i]);
      }
      printf("\n");
  }`,
  JavaScript: `
  const MAX_SIZE = 100; // Adjust as needed

  let arr = [];
  
  // Function implementations
  function insertBeginning(data) {
    if (arr.length >= MAX_SIZE) {
      console.error("Overflow!");
      return;
    }
  
    arr.unshift(data); // Efficiently inserts at the beginning
  }
  
  function insertEnd(data) {
    if (arr.length >= MAX_SIZE) {
      console.error("Overflow!");
      return;
    }
  
    arr.push(data); // Efficiently inserts at the end
  }
  
  function insertAt(index, data) {
    if (index < 0 || index > arr.length) {
      console.error("Invalid index!");
      return;
    }
  
    if (arr.length >= MAX_SIZE) {
      console.error("Overflow!");
      return;
    }
  
    arr.splice(index, 0, data); // Inserts at the specified index
  }
  
  function deleteElement(index) {
    if (index < 0 || index >= arr.length) {
      console.error("Invalid index!");
      return;
    }
  
    arr.splice(index, 1); // Removes one element at the  given index
  }
    function updateElement(index, data) {
        if (index < 0 || index >= arr.length) {
          console.error("Invalid index!");
          return;
        }
      
        arr[index] = data;
      }
      
      function displayArray() {
        if (arr.length === 0) {
          console.log("Array is empty.");
          return;
        }
      
        console.log(arr.join(" ")); // Efficiently joins elements with spaces
      }
      
      // Example usage
      insertEnd(10);
      insertBeginning(5);
      insertAt(1, 15);
      console.log("Array after insertions:", displayArray());
      
      deleteElement(0);
      updateElement(1, 20);
      console.log("Array after deletions and updates:", displayArray());
    `,
};
