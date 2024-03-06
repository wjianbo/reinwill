CREATE TABLE menu_items(
    id BIGSERIAL PRIMARY KEY,
    --------
    name VARCHAR NOT NULL,
    url_name VARCHAR NOT NULL UNIQUE
);

INSERT INTO menu_items (name, url_name) VALUES
  ('文脉', 'cultrue'),
  ('社区', 'community'),
  ('壬吾', 'reinwill');