import 'package:flutter/material.dart';

enum MoodCategory { pizza, salad, drink }

extension MoodCategoryX on MoodCategory {
  String get label {
    switch (this) {
      case MoodCategory.pizza:
        return 'Pizza Mood';
      case MoodCategory.salad:
        return 'Salad Mood';
      case MoodCategory.drink:
        return 'Drink Mood';
    }
  }

  Color get color {
    switch (this) {
      case MoodCategory.pizza:
        return const Color(0xFFFFC107);
      case MoodCategory.salad:
        return const Color(0xFF8BC34A);
      case MoodCategory.drink:
        return const Color(0xFFE53935);
    }
  }
}

class Product {
  final String id;
  final String name;
  final MoodCategory category;
  final double price;
  final String imageUrl;
  final String description;

  const Product({
    required this.id,
    required this.name,
    required this.category,
    required this.price,
    required this.imageUrl,
    required this.description,
  });

  Color get color => category.color;
}
