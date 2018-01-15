#include <stdio.h>

typedef struct node {
    int val;
    struct node * next;
} list_node;

/**
 * Given a pointer to head it will 
 * move the pointer and print the val until the end 
 **/
void main(list_node * head) {
    list_node * current = head;

    while (current != NULL) {
        printf("%d\n", current -> val);
        current = current -> next;
    }
}