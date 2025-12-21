insert into about_paragraphs (content, position)
values
  (
    'Tedszaza is the pizza-obsessed TikToker known for chaotic cooking videos, camera-ready crust flips, and sauce-stained one-liners. What started as a late-night dough experiment turned into a daily ritual of wild toppings, nostalgic flavors, and kitchen science.',
    0
  ),
  (
    'This site is a snapshot of his current recipe roster, plus the gear he uses on set. Expect new drops, behind-the-scenes tips, and a little comedic commentary baked in.',
    1
  )
on conflict do nothing;
