extern crate time;
use time::PreciseTime;

fn main () {
    let mut count = 0i16;
    let start = PreciseTime::now();

    while count < 1000 {
        count += 1;

        if count % 3 == 0 {
            println!("Hey!");
            continue;
        }

        if count == 1000 {
            println!("{} seconds for this loop.", start.to(PreciseTime::now()));
        }
    }
}
