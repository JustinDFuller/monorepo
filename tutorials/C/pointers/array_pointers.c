#include <stdio.h>
#include <stdlib.h>

void main() {
    int i, j;

    /*
     * Create an array 3 rows long.
     */
    int **pnumbers = (int **) malloc(3 * sizeof(int));

    /*
     * Each row in the array has an incrementing amount of columns.
     */
    pnumbers[0] = (int *) malloc(1 * sizeof(int));
    pnumbers[1] = (int *) malloc(2 * sizeof(int));
    pnumbers[2] = (int *) malloc(3 * sizeof(int));

    pnumbers[0][0] = 1;
    pnumbers[1][0] = 1;
    pnumbers[1][1] = 1;
    pnumbers[2][0] = 1;
    pnumbers[2][1] = 2;
    pnumbers[2][2] = 1;

    for (i = 0; i < 3; i++) {
        for (j = 0; j <= i; j++) {
            printf("%d ", pnumbers[i][j]);
        }
        printf("\n");
    }

    for (i = 0; i < 3; i++) {
        free(pnumbers[i]);
    }

    free(pnumbers);
}