typedef struct node {
    int val;
    struct node * next;
} list_node;

/***
 * Remove/pop the first item out and return it's value
 * needs a double pointer because we are making changes to the original pointer. 
 */
int main(list_node ** head) {
    int returnValue = -1;
    list_node * next_node = NULL;

    /* If the list is empty just return -1 */
    if (*head == NULL) {
        return returnValue;
    }

    /* Store the current second node reference */
    next_node = (*head) -> next;
    /* grab the value from the current first node */
    returnValue = (*head) -> val;
    /* No longer need the memory allocated for the current node */
    free(*head);
    /* set the current head to the previous second node that we stored earlier */
    *head = next_node;

    return returnValue;
}