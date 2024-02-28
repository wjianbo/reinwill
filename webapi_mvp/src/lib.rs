fn add(mut n: u64, mut m: u64) -> u64 {
    n + m
}

#[cfg(test)]
#[allow(non_snake_case)]
mod mathテスト {
    use super::*;

    #[test]
    fn add関数は2つの引数の加算を計算する() {
        assert_eq!(add(1, 2), 3);
    }
}