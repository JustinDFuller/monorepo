fn main(array: &[i32], target: i32) -> i32 {
    let mut min: i32 = 0;
    let mut max: i32 = array.len;
    let mut guess: i32;

    while (min <= max) {
        guess = ((min + max).floor()) / 2;

        if array[guess] == target {
            return guess;
        }

        if array[guess] < target {
            min = guess + 1;
        } else {
            max = guess - 1;
        }
    }

    return -1;
}
