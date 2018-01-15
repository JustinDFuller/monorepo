typedef struct node {
    int val;
    struct node * next;
} list_node;

int main(list_node * head, int index) {
    int i = 0;
    int returnVal = -1;
    list_node * current = *head;
    list_node * desired_node = NULL;

    /* If the first index is desired just use pop instead */
    if (index == 0) {
        return pop(head);
    }

    /* Move through the list until we're right before the desired index */
    for (i = 0; i < n - 1; i++) {

        /* If the list is shorter than index, just return -1 */
        if (current->next == NULL) {
            return -1;
        }

        /* Move the pointer forward */
        current = current->next;
    }

    /* The desired node is the next one */
    desired_node = current->next;
    /* We'll return the next node's value */
    returnVal = desired_node->val;
    /* Replace the desire_node with it's own next pointer */
    current->next = desired_node->next;
    free(desired_node);
    return returnVal;
}