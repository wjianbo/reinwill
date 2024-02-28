# install rust
curl https://sh.rustup.rs -sSf | sh -s -- -y 
source "$HOME/.cargo/env"

sudo apt update
sudo apt install postgresql postgresql-contrib
apt install libpq-dev
cargo install diesel_cli --no-default-features --features postgres