typedef struct node {
    int val;
    struct node * next;
} list_node;

int main(list_node * head) {
    int returnValue = 0;

    /* Remove the node if it's the only one */
    if (head->next == NULL) {
        returnValue = head->val;
        free(head);
        return returnValue;
    }

    list_node * current = head;

    /**
     * Move the pointer to right before the last node
     */
    while (current->next->next != NULL) {
        current = current->next;
    }

    /* Return value is the last value */
    returnValue = current->next->val;
    free(current->next);
    current->next = NULL;
    return returnValue;
}