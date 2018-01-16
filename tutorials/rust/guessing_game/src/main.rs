extern crate rand;

use std::io;
use std::cmp::Ordering;
use rand::Rng;

fn main() {
    start();
}

/// Runs a loop 5 times and allows you to guess a number
///
/// # How to use
///
/// Run the command `cargo run` and then type in your guess!
pub fn start () {
    let secret_number = rand::thread_rng().gen_range(1, 101);
    let mut guess_number = 0;

    println!("Guess the number!");

    loop {
        let mut guess = String::new();
        guess_number += 1;

        if guess_number == 6 {
            println!("You ran out of guesses, the number was: {}", secret_number);
            break;
        }

        println!("Please input your guess.");

        io::stdin()
            .read_line(&mut guess)
            .expect("Failed to read line");

        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };

        println!("You guessed: {}", guess);

        match guess.cmp(&secret_number) {
            Ordering::Less    => println!("Too small!"),
            Ordering::Greater => println!("Too big!"),
            Ordering::Equal   => {
                println!("You win!");
                break;
            },
        }
    }
}
