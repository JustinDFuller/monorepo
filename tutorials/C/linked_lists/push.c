typedef struct node {
    int val;
    struct node * next;
} list_node;

void main(list_node * head, int val) {
    /* Create a new pointer that points to the head */
    list_node * current = head;

    /* Get to the end */
    while (current -> next != NULL) {
        current = current -> next;
    }

    /* Add the new value */
    current -> next = malloc(sizeof(list_node));
    current -> next -> val = val;
    current -> next -> next = NULL;
}