#include <stdio.h>

void main() {
  int test = 5;
  int * pointerTest = &test;
  int nonPointerTest = test;
  int ** doublePointerTest = &test;
  int * accessDoublePointer = doublePointerTest;
  test = 6;

  printf("test %d\n", test);
  printf("test %p\n", &test);

  printf("pointerTest %d\n", *pointerTest);
  printf("pointerTest %p\n", pointerTest);

  printf("nonPointerTest %d\n", nonPointerTest);
  printf("nonPointerTest %p\n", &nonPointerTest);

  printf("doublePointerTest %p\n", doublePointerTest);
  printf("doublePointerTest %p\n", &doublePointerTest);
  
  printf("accessDoublePointer %p\n", accessDoublePointer);
}
