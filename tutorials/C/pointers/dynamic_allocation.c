#include <stdio.h>

typedef struct {
    int x;
    int y;
} point;

void main() {
    point * mypoint = malloc(sizeof(point));
    mypoint -> x = 10;
    mypoint -> y = 5;
    printf("mypoint coordinates: %d, %d\n", mypoint -> x, mypoint -> y);
    free(mypoint);
}