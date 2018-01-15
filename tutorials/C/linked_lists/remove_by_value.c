typedef struct node {
    int val;
    struct node * next;
} list_node;

int main(list_node ** head, int value) {
    int returnValue = -1;
    int index;
    int selected = NULL;
    list_node * current = head;

    /* If the list is empty just stop and return */
    if (current == NULL) {
        return returnValue;
    }

    /* If the current value is the one, just pop instead */
    if (current->val == value) {
        return pop(head);
    }

    /** 
     * Loop throught the list until the end 
     * Or until the desired value is found 
     **/
    while (selected == NULL) {
        /* If you get to the end and it's not found */
        if (current->next == NULL) {
            return returnValue;
        }
        
        if (current->next->val == value) {
            /* When you find the value, store the node to remove it later */
            selected = current->next;
            break;
        }
        /* If nothing was found then continue on */
        current = current->next;
    }

    /* Replace the current next with selected's next, removing selected. */
    current->next = selected->next;
    /* Grab the val from selected to return it */
    returnValue = selected->val;
    free(selected);
    return returnValue;
}