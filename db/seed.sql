insert into recipes (id, title, image, tag, summary, video_image, story, ingredients, steps)
values
  (
    'margherita-cloud',
    'Margherita Cloud',
    'https://teds-zaza-website.s3.us-east-1.amazonaws.com/Screenshot+2025-12-21+at+12.00.24%E2%80%AFAM.png',
    'Classic',
    'A blistered, airy crust topped with bright tomato and fresh basil.',
    '/images/recipes/tiktok-placeholder.svg',
    '["This one is Ted''s tribute to late-night slices from the corner shop, but puffier and way more dramatic.","The goal is a light, pillowy crust that still snaps on the edge, so the dough gets a slow rise and a hot pan.","Fresh basil comes in at the last second for the most aromatic bite."]',
    '["Pizza dough (24-hour cold rise)","Crushed San Marzano tomatoes","Fresh mozzarella","Basil leaves","Olive oil","Sea salt"]',
    '["Stretch the dough into a puffy round and press into a hot oiled pan.","Spoon tomato sauce in a spiral and add torn mozzarella.","Bake until the edges blister and the cheese bubbles.","Finish with basil, olive oil, and a pinch of sea salt."]'
  ),
  (
    'pepperoni-drip',
    'Pepperoni Drip',
    'https://teds-zaza-website.s3.us-east-1.amazonaws.com/Screenshot+2025-12-21+at+12.00.24%E2%80%AFAM.png',
    'Best Seller',
    'Crispy pepperoni cups, spicy oil, and a cheese blanket that stretches forever.',
    '/images/recipes/tiktok-placeholder.svg',
    '["Ted built this one for the sound of sizzling pepperoni grease hitting the pan.","The trick is layering cheese under and over the pepperoni so the edges crisp while the center stays gooey.","A quick honey drizzle turns the heat into a sweet finish."]',
    '["Pizza dough","Tomato sauce","Low-moisture mozzarella","Cup-and-char pepperoni","Hot honey","Crushed red pepper"]',
    '["Stretch the dough and spread sauce to the edges.","Layer mozzarella, then pepperoni, then a second thin layer of cheese.","Bake until pepperoni cups and release oil.","Drizzle hot honey and add chili flakes before serving."]'
  ),
  (
    'hot-honey',
    'Hot Honey Thunder',
    'https://teds-zaza-website.s3.us-east-1.amazonaws.com/Screenshot+2025-12-21+at+12.00.24%E2%80%AFAM.png',
    'Sweet Heat',
    'A sweet-spicy glaze over ricotta and charred salami.',
    '/images/recipes/tiktok-placeholder.svg',
    '["This pizza was born from Ted''s obsession with sweet heat on everything.","Ricotta gives it a creamy base, while the charred salami brings smoke.","The final hot honey pour is what makes the whole thing sing."]',
    '["Pizza dough","Ricotta","Mozzarella","Spicy salami","Hot honey","Lemon zest"]',
    '["Spread ricotta across the dough and top with mozzarella.","Add salami and bake until the crust is golden.","Finish with hot honey and a quick lemon zest hit.","Slice and serve immediately for max gooeyness."]'
  ),
  (
    'pesto-surge',
    'Pesto Surge',
    'https://teds-zaza-website.s3.us-east-1.amazonaws.com/Screenshot+2025-12-21+at+12.00.24%E2%80%AFAM.png',
    'Herby',
    'Bright basil pesto with roasted tomatoes and burrata swirls.',
    '/images/recipes/tiktok-placeholder.svg',
    '["Ted wanted a green pizza that still felt indulgent, so pesto became the base.","Roasted tomatoes add sweet pops, while burrata melts into creamy pockets.","Finish with extra pesto for that deep herb aroma."]',
    '["Pizza dough","Basil pesto","Roasted cherry tomatoes","Burrata","Parmesan","Black pepper"]',
    '["Spread pesto over the dough and add tomatoes.","Bake until crust rises and pesto darkens slightly.","Tear burrata across the top and return to the oven briefly.","Finish with parmesan and black pepper."]'
  ),
  (
    'smoked-mushroom',
    'Smoked Mushroom Riot',
    'https://teds-zaza-website.s3.us-east-1.amazonaws.com/Screenshot+2025-12-21+at+12.00.24%E2%80%AFAM.png',
    'Earthy',
    'Smoky mushrooms, garlic oil, and a peppery arugula finish.',
    '/images/recipes/tiktok-placeholder.svg',
    '["This one is all about deep umami and a slightly smoky aroma.","Ted chars the mushrooms hard so they stay juicy without watering the crust.","A quick arugula toss adds freshness right before the plate."]',
    '["Pizza dough","Garlic oil","Smoked mushrooms","Mozzarella","Arugula","Lemon juice"]',
    '["Brush garlic oil over the dough and add mozzarella.","Scatter smoked mushrooms and bake until bubbling.","Toss arugula with lemon juice and top the pizza.","Slice and serve while hot."]'
  ),
  (
    'four-cheese',
    'Four Cheese Fever',
    'https://teds-zaza-website.s3.us-east-1.amazonaws.com/Screenshot+2025-12-21+at+12.00.24%E2%80%AFAM.png',
    'Cheesy',
    'A molten blend of mozz, provolone, fontina, and parmesan.',
    '/images/recipes/tiktok-placeholder.svg',
    '["Ted designed this one for pure cheese pull and minimal toppings.","The mix of melt and sharpness keeps every bite interesting.","A little oregano at the end gives it a nostalgic pizzeria vibe."]',
    '["Pizza dough","Mozzarella","Provolone","Fontina","Parmesan","Dried oregano"]',
    '["Blend the cheeses and spread evenly over the dough.","Bake until the top browns and bubbles.","Finish with oregano and a drizzle of olive oil.","Let it rest for one minute before slicing."]'
  )
on conflict (id) do update set
  title = excluded.title,
  image = excluded.image,
  tag = excluded.tag,
  summary = excluded.summary,
  video_image = excluded.video_image,
  story = excluded.story,
  ingredients = excluded.ingredients,
  steps = excluded.steps;
