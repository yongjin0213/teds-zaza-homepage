insert into products (id, name, price, image, link, badge)
values
  (
    'stone-slab',
    'Crisp Edge Pizza Stone',
    '$42.00',
    '/images/products/pizza-stone.svg',
    'https://www.amazon.com',
    'Ted Approved'
  ),
  (
    'steel-pan',
    'Puff Crust Steel Pan',
    '$58.00',
    '/images/products/steel-pan.svg',
    'https://www.amazon.com',
    'Most Wanted'
  ),
  (
    'sauce-ladle',
    'Sauce Swirl Ladle',
    '$14.00',
    '/images/products/ladle.svg',
    'https://www.amazon.com',
    'Budget Pick'
  ),
  (
    'cheese-shredder',
    'Mountain Cheese Shredder',
    '$26.00',
    '/images/products/shredder.svg',
    'https://www.amazon.com',
    'Fan Favorite'
  )
on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  image = excluded.image,
  link = excluded.link,
  badge = excluded.badge;
