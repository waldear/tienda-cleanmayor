import '../models/product.dart';

final List<Product> mockProducts = [
  // Detergentes
  const Product(
    id: 'd1',
    name: 'Detergente Limón 500ml',
    category: CleanCategory.detergentes,
    price: 850,
    priceMayorista: 720,
    imageUrl: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&q=80',
    description: 'Fórmula concentrada con esencia de limón. Biodegradable y suave con las manos.',
  ),
  const Product(
    id: 'd2',
    name: 'Detergente Industrial 1L',
    category: CleanCategory.detergentes,
    price: 1500,
    priceMayorista: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1563453392-00f0a0e7e7be?w=400&q=80',
    description: 'Alta potencia para uso profesional y gastronómico. Elimina grasa extrema.',
  ),
  const Product(
    id: 'd3',
    name: 'Lavavajillas en Polvo 1kg',
    category: CleanCategory.detergentes,
    price: 1200,
    priceMayorista: 950,
    imageUrl: 'https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=400&q=80',
    description: 'Elimina grasa y sarro en loza, cubiertos y ollas. Rinde 3x más que el líquido.',
  ),

  // Desinfectantes
  const Product(
    id: 'ds1',
    name: 'Lavandina Concentrada 1L',
    category: CleanCategory.desinfectantes,
    price: 680,
    priceMayorista: 540,
    imageUrl: 'https://images.unsplash.com/photo-1584465736146-b23f46609b26?w=400&q=80',
    description: 'Concentración 55g/L. Higieniza pisos, baños y superficies con máxima eficacia.',
  ),
  const Product(
    id: 'ds2',
    name: 'Desinfectante Multiuso 500ml',
    category: CleanCategory.desinfectantes,
    price: 920,
    priceMayorista: 780,
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80',
    description: 'Elimina el 99.9% de bacterias y virus. Aroma fresco, secado rápido.',
  ),
  const Product(
    id: 'ds3',
    name: 'Alcohol en Gel 500ml',
    category: CleanCategory.desinfectantes,
    price: 750,
    priceMayorista: 600,
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80',
    description: 'Fórmula al 70% en gel. Secado rápido, no pegajoso, con hidratantes.',
  ),

  // Accesorios
  const Product(
    id: 'a1',
    name: 'Esponja Doble Faz Pack x3',
    category: CleanCategory.accesorios,
    price: 450,
    priceMayorista: 360,
    imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4057?w=400&q=80',
    description: 'Cara suave para vajilla delicada, cara abrasiva para incrustaciones. Duran 3x más.',
  ),
  const Product(
    id: 'a2',
    name: 'Trapo de Piso Reforzado',
    category: CleanCategory.accesorios,
    price: 380,
    priceMayorista: 300,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    description: 'Microfibra 100%. Absorción extra, lavable hasta 500 veces y ultra durable.',
  ),
  const Product(
    id: 'a3',
    name: 'Balde con Escurridor 10L',
    category: CleanCategory.accesorios,
    price: 1800,
    priceMayorista: 1500,
    imageUrl: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&q=80',
    description: 'Plástico ABS resistente con escurridor integrado y ruedas para fácil traslado.',
  ),
];

List<Product> productsByCategory(CleanCategory category) =>
    mockProducts.where((p) => p.category == category).toList();
