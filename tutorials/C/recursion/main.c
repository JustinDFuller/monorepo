#include <stdio.h>

int factorial(unsigned int number) {
    int sum = number;

    if (sum > 1) {
        sum *= factorial(number - 1);
    }

    return sum;
}

void main() {
    /* testing code */
    printf("1! = %i\n", factorial(1));
    printf("3! = %i\n", factorial(3));
    printf("5! = %i\n", factorial(5));
}