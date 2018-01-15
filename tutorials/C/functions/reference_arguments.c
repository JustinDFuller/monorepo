#include <stdio.h>

typedef struct {
    char * name;
    int age;
} person;

void birthday(person * p) {
    p -> age++;
}

void main() {
    person justin;
    john.name = "Justin";
    john.age = 24;
    printf("%s is %d years old.\n", justin.name, justin.age);
    birthday(&justin);
    printf("Happy Birthday! %s is now %d years old!\n", justin.name, justin.age);
}