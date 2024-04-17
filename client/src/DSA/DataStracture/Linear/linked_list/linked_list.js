import React from "react";

import { Box, Container, Typography } from "@mui/material";

import Operation from "./logic/Operation";
import CodeTemplate from "./code/CodeTemplate";

const useStyles = {
  root: {
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "24px",
    marginBottom: "24px",
  },
  title: {
    fontWeight: "bold",
    marginBottom: "16px",
  },
  paragraph: {
    marginBottom: "24px",
  },
  posted: {
    marginBottom: "24px",
    backgroundColor: "#ffcdd2",
    padding: "20px",
  },
  subTitle: {
    fontWeight: "bold",
    marginBottom: "8px",
  },
  section: {
    marginBottom: "24px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    padding: "16px",
  },
};
function Linked_list() {
  return (
    <Container maxWidth="lg">
      <Box sx={useStyles.section}>
        <Box sx={useStyles.root}>
          <Typography variant="h6" sx={useStyles.title}>
            Introduction
          </Typography>
          <Typography variant="body1" sx={useStyles.paragraph}>
            Linked lists and arrays are similar since they both store
            collections of data. Array is the most common data structure used to
            store collections of elements. Arrays are convenient to declare and
            provide the easy syntax to access any element by its index number.
            Once the array is set up, access to any element is convenient and
            fast. The disadvantages of arrays are:
            <ul>
              <li>
                The size of the array is fixed. Most often this size is
                specified at compile time. This makes the programmers to
                allocate arrays, which seems "large enough" than required.
              </li>
              <li>
                Inserting new elements at the front is potentially expensive
                because existing elements need to be shifted over to make room.
              </li>
              <li>
                Deleting an element from an array is very difficult and costy
              </li>
            </ul>
            Linked lists have their own strengths and weaknesses, but they
            happen to be strong where arrays are weak. Generally array's
            allocates the memory for all its elements in one block whereas
            linked lists use an entirely different strategy. Linked lists
            allocate memory for each element separately and only when necessary.
            <br />
            <br />A linked list is a non-sequential collection of data items. It
            is a dynamic data structure. For every data item in a linked list,
            there is an associated pointer that would give the memory location
            of the next data item in the linked list.
            <br />
            <br />
            The data items in the linked list are not in consecutive memory
            locations. They may be anywhere, but the accessing of these data
            items is easier as each data item contains the address of the next
            data item.
            <br />
            <br />
            <Typography sx={useStyles.subTitle}>
              Advantages of linked lists:
            </Typography>
            Linked lists have many advantages. Some of the very important
            advantages are:
            <ol>
              <li>
                Linked lists are dynamic data structures. i.e., they can grow or
                shrink during the execution of a program.
              </li>
              <li>
                Linked lists have efficient memory utilization. Here, memory
                isnot preallocated. Memory is allocated whenever it is required
                and it is de-allocated (removed) when it is no longer needed.
              </li>
              <li>
                Insertion and Deletions are easier and efficient. Linked lists
                provide flexibility in inserting a data item at a specified
                position and deletion of the data item from the given position.
              </li>
              <li>
                Many complex applications can be easily carried out with linked
                lists.
              </li>
            </ol>
            <Typography sx={useStyles.subTitle}>
              Disadvantages of linked lists:
            </Typography>
            <ol>
              <li>
                It consumes more space because every node requires a additional
                pointer to store address of the next node.
              </li>
              <li>
                Searching a particular element in list is difficult and also
                time consuming.
              </li>
            </ol>
            <Typography sx={useStyles.subTitle}>
              Types of Linked Lists
            </Typography>
            Basically we can put linked lists into the following four items:
            <ol>
              <li>Singly Linked List.</li>
              <li>Doubly Linked List</li>
              <li>Circular Linked List.</li>
              <li>Doubly Circular Linked List.</li>
            </ol>
            In this chapter we will focus on Singly Linked list
          </Typography>
        </Box>

        <Box sx={useStyles.root}>
          <Typography variant="h6" sx={useStyles.title}>
            Operations of linked list
          </Typography>
          <Typography variant="body1" sx={useStyles.paragraph}>
            <ol>
              <li style={{ fontSize: "29px" }}>
                <Typography variant="h6" sx={useStyles.subTitle}>
                  Linked list node insertion
                </Typography>
              </li>
              <br />
              <Typography>
                It means to add or insert a node at any point in the link.
                Insertion can be at the beginning, at the end, or any selected
                position in the link.
                <ul>
                  <li style={{ fontSize: "29px" }}>
                    <Typography variant="h6" sx={useStyles.subTitle}>
                      At the beginning
                    </Typography>
                    <Typography>
                      When inserting at the beginning of the link it is not
                      important to find the link. If the link is empty then the
                      new node is inserted as the head of the link, and when the
                      new node is added to an existing link the new node
                      replaces it as the head of the link.
                      <Typography sx={useStyles.subTitle}>
                        Algorithm to insert at the beginning:
                      </Typography>
                      <Typography>
                        <pre>
                          {`void insertBG(Node *head,int val)
{
  Node *temp=new Node(val);
  if(head==NULL)
    head=temp;
  else
  {
    temp->next=head;
    head=temp;
  }
}`}
                        </pre>
                      </Typography>
                    </Typography>
                  </li>
                  <li style={{ fontSize: "29px" }}>
                    <Typography variant="h6" sx={useStyles.subTitle}>
                      At the end
                    </Typography>
                    <Typography>
                      When inserting at the end of the link, the user has to
                      access all the nodes present to find the endpoint. In case
                      the list is empty the inserted node acts as both the first
                      and the last node of the link.
                      <Typography sx={useStyles.subTitle}>
                        Algorithm to insert at the end:
                      </Typography>
                      <Typography>
                        <pre>
                          {`
                          void insertEND(Node *head,int val)

                          {
                          
                                 Node *temp=head;
                          
                                 Node *temp1=new Node(val);
                          
                                 
                          
                                 if(head==NULL)
                          
                                  head=temp1;
                          
                                 else
                          
                                 {
                          
                                        while(temp->next!=NULL)
                          
                                                   temp=temp->next;
                          
                                        
                          
                                        temp->next=temp1;
                          
                                 }
                          
                          }
                          `}
                        </pre>
                      </Typography>
                    </Typography>
                  </li>
                  <li style={{ fontSize: "29px" }}>
                    <Typography variant="h6" sx={useStyles.subTitle}>
                      At index
                    </Typography>
                    <Typography>
                      When inserting at any given position, the link is accessed
                      to find the point where the node is to be added. The new
                      node is inserted after the given position. If the address
                      is not given to the previous node, you can traverse the
                      link to find the desired point.
                      <Typography sx={useStyles.subTitle}>
                        Algorithm to insert at the given positino:
                      </Typography>
                      <Typography>
                        <pre>
                          {`
      void insert_POS(Node *head,int pos,int val)
      {
        Node *temp=head;
        for(int i=0;i<pos-2;i++)
          temp=temp->next;  

       Node *temp1=new Node(val);  // insert value of the node

       temp1->next=temp->next;

       temp->next=temp1;


       {
                          
        Node *temp=head;
 
        Node *temp1=new Node(val);
 
        
 
        if(head==NULL)
 
         head=temp1;
 
        else
 
        {
 
               while(temp->next!=NULL)
 
                          temp=temp->next;
 
               
 
               temp->next=temp1;
 
        }
 
 }
 `}
                        </pre>
                      </Typography>
                    </Typography>
                  </li>
                  <li style={{ fontSize: "29px" }}>
                    <Typography variant="h6" sx={useStyles.subTitle}>
                      At index
                    </Typography>
                    <Typography>
                      When inserting at any given position, the link is accessed
                      to find the point where the node is to be added. The new
                      node is inserted after the given position. If the address
                      is not given to the previous node, you can traverse the
                      link to find the desired point.
                      <Typography sx={useStyles.subTitle}>
                        Algorithm to insert at the given positino:
                      </Typography>
                      <Typography>
                        <pre>
                          {`
        void insert_POS(Node *head,int pos,int val)
        {
          Node *temp=head;
          for(int i=0;i<pos-2;i++)
            temp=temp->next;
            Node *temp1=new Node(val);  // insert value of the node
            temp1->next=temp->next;
            temp->next=temp1;

        }`}
                        </pre>
                      </Typography>
                    </Typography>
                  </li>
                </ul>
              </Typography>
              <li style={{ fontSize: "29px" }}>
                <Typography variant="h6" sx={useStyles.subTitle}>
                  Linked list node deletion
                </Typography>
              </li>
              <br />
              <Typography>
                Another primitive operation that can be done in a singly linked
                list is the deletion of a node. Memory is to be released for the
                node to be deleted. A node can be deleted from the list from
                three different places namely.
                <ul>
                  <li style={{ fontSize: "29px" }}>
                    <Typography variant="h6" sx={useStyles.subTitle}>
                      Deleting a node from the beginning
                    </Typography>
                    <Typography>
                      The following steps are followed, to delete a node at the
                      beginning of the list:
                      <ul>
                        <li>
                          <Typography>
                            If list is empty then display "Empty list" message
                          </Typography>
                        </li>
                        <li>
                          <Typography>
                            If the list is not empty, follow the steps given
                            below:
                            <pre>
                              {`
     
temp = start; 
start = start -> next;
free(temp);
    `}
                            </pre>
                          </Typography>
                        </li>
                      </ul>
                      <Typography sx={useStyles.subTitle}>
                        Algorithm to delete from the beginning:
                      </Typography>
                      <Typography>
                        <pre>
                          {`
    void delete_at_beg()
    {
      node *temp;
      if(start == NULL)
      {
        printf("\\n No nodes are exist..");
        return ;
      }
      else
      {
        temp = start;
        start = temp -> next;
        free(temp);
        printf("\\n Node deleted ");
      }
    }
  `}
                        </pre>
                      </Typography>
                    </Typography>
                  </li>
                  <li style={{ fontSize: "29px" }}>
                    <Typography variant="h6" sx={useStyles.subTitle}>
                      Deleting a node from the end
                    </Typography>
                    <Typography>
                      The following steps are followed to delete a node at the
                      end of the list
                      <ul>
                        <li>
                          <Typography>
                            If list is empty then display "Empty list" message
                          </Typography>
                        </li>
                        <li>
                          <Typography>
                            If the list is not empty, follow the steps given
                            below
                            <pre>
                              {`
  temp = prev = start;
  while(temp -> next != NULL)
  {
    prev = temp;
    temp = temp -> next;
  }
  prev -> next = NULL;
  free(temp);
    
`}
                            </pre>
                          </Typography>
                        </li>
                      </ul>
                    </Typography>
                  </li>
                </ul>
              </Typography>
            </ol>
          </Typography>
          <Operation />
        </Box>
        <Box sx={useStyles.root}>
          <Typography variant="h6" sx={useStyles.title}>
            Implementation
          </Typography>
          <CodeTemplate />
        </Box>
      </Box>
    </Container>
  );
}

export default Linked_list;
