import '../models/product.dart';

final List<Product> mockProducts = [
  // Pizza Mood
  const Product(
    id: 'p1',
    name: 'Margherita Classic',
    category: MoodCategory.pizza,
    price: 12.99,
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
    description: 'Tomato, mozzarella, fresh basil, extra virgin olive oil.',
  ),
  const Product(
    id: 'p2',
    name: 'Pepperoni Fire',
    category: MoodCategory.pizza,
    price: 14.99,
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
    description: 'Double pepperoni, smoked cheddar, spicy tomato sauce.',
  ),
  const Product(
    id: 'p3',
    name: 'BBQ Chicken',
    category: MoodCategory.pizza,
    price: 15.99,
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
    description: 'Grilled chicken, caramelised onion, BBQ sauce, jalapeños.',
  ),

  // Salad Mood
  const Product(
    id: 's1',
    name: 'Caesar Supreme',
    category: MoodCategory.salad,
    price: 9.99,
    imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
    description: 'Romaine, croutons, parmesan, classic Caesar dressing.',
  ),
  const Product(
    id: 's2',
    name: 'Greek Bowl',
    category: MoodCategory.salad,
    price: 10.99,
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
    description: 'Tomatoes, cucumber, olives, feta cheese, oregano.',
  ),
  const Product(
    id: 's3',
    name: 'Avocado Zen',
    category: MoodCategory.salad,
    price: 11.99,
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400',
    description: 'Avocado, quinoa, cherry tomato, lime vinaigrette.',
  ),

  // Drink Mood
  const Product(
    id: 'd1',
    name: 'Berry Blast',
    category: MoodCategory.drink,
    price: 5.99,
    imageUrl: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400',
    description: 'Mixed berries, banana, almond milk, chia seeds.',
  ),
  const Product(
    id: 'd2',
    name: 'Mango Sunrise',
    category: MoodCategory.drink,
    price: 6.49,
    imageUrl: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=400',
    description: 'Mango, orange juice, ginger, turmeric, honey.',
  ),
  const Product(
    id: 'd3',
    name: 'Mint Lemonade',
    category: MoodCategory.drink,
    price: 4.99,
    imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
    description: 'Fresh mint, lemon, sparkling water, cane sugar.',
  ),
];

List<Product> productsByCategory(MoodCategory category) =>
    mockProducts.where((p) => p.category == category).toList();
