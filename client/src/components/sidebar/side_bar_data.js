import React from 'react';

import { FaAngleRight } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";

export const  LeftBarData = [
  {
    category: 'Data Structure',
    subCategories: [
      { name: 'Linear', items: ['Array', 'Stack', 'Queue', 'Linked List'] },
      { name: 'Non-linear', items: ['Binary Tree', 'BST', 'Hash Table', 'Graph'] },
    ],
  },
  {
    category: 'Algorithms',
    subCategories: [
      { name: 'Search', items: ['Linear Search', 'Binary Search'] },
      { name: 'Sorting', items: ['Bubble Sort', 'Insertion Sort', 'Selection Sort', 'Merge Sort', 'Quick Sort'] },
      { name: 'Graph Algorithm', items: ['Breadth First Search (BFS)', 'Depth First Search (DFS)'] },
    ],
  },
];
