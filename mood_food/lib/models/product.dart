import 'package:flutter/material.dart';

enum CleanCategory { detergentes, desinfectantes, accesorios }

extension CleanCategoryX on CleanCategory {
  String get label {
    switch (this) {
      case CleanCategory.detergentes:
        return 'Detergentes';
      case CleanCategory.desinfectantes:
        return 'Desinfectantes';
      case CleanCategory.accesorios:
        return 'Accesorios';
    }
  }

  String get emoji {
    switch (this) {
      case CleanCategory.detergentes:
        return '🧴';
      case CleanCategory.desinfectantes:
        return '🫧';
      case CleanCategory.accesorios:
        return '🧽';
    }
  }

  Color get color {
    switch (this) {
      case CleanCategory.detergentes:
        return const Color(0xFF2563EB);
      case CleanCategory.desinfectantes:
        return const Color(0xFF0D9488);
      case CleanCategory.accesorios:
        return const Color(0xFFD97706);
    }
  }
}

class Product {
  final String id;
  final String name;
  final CleanCategory category;
  final double price;
  final double priceMayorista;
  final String imageUrl;
  final String description;

  const Product({
    required this.id,
    required this.name,
    required this.category,
    required this.price,
    required this.priceMayorista,
    required this.imageUrl,
    required this.description,
  });

  Color get color => category.color;

  double currentPrice(bool isMayorista) =>
      isMayorista ? priceMayorista : price;
}
