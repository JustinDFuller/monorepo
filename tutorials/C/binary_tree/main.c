#include <stdio.h>
#include <stdlib.h>

typedef struct node {
  int val;
  struct node * left;
  struct node * right;
} tree_node;

void print(tree_node * current) {
  /* Recursively print left and right nodes */
  if (current->left != NULL) {
    print(current->left);
  }

  if (current->right != NULL) {
    print(current->right);
  }

  /* Actually print the value */
  if (current != NULL) {
    printf("%d\n", current->val);
  }
}

void print_tree(tree_node * current) {
  if (current != NULL) {
    printf("\n%d", current->val);
  }

  if (current->left != NULL) {
    printf("L%d", current->left->val);
  }

  if (current->right != NULL) {
    printf("L%d", current->right->val);
  }

  if (current->left != NULL) {
    print_tree(current->left);
  }

  if (current->right != NULL) {
    print_tree(current->right);
  }
}

void insert(tree_node * tree, int val) {
  if (tree->val == NULL) {
    tree->val = val;
  } else if (val < tree->val) {
    if (tree->left != NULL) {
      insert(tree->left, val);
    } else {
      tree->left = malloc(sizeof(tree_node));
      tree->left->val = val;
    }
  } else if (val >= tree-> val) {
    if (tree->right != NULL) {
      insert(tree->right, val);
    } else {
      tree->right = malloc(sizeof(tree_node));
      tree->right->val = val;
    }
  }
}

void main() {
  tree_node * test_list = malloc(sizeof(tree_node));
  insert(test_list, 5);
  insert(test_list, 8);
  insert(test_list, 4);
  insert(test_list, 3);
  print(test_list);
}