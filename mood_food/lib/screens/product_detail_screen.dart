import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../controllers/cart_controller.dart';
import '../data/mock_products.dart';
import '../models/product.dart';
import '../theme/app_theme.dart';
import '../utils/currency_formatter.dart';
import '../widgets/primary_button.dart';
import '../widgets/quantity_selector.dart';
import 'invoice_screen.dart';

class ProductDetailScreen extends StatefulWidget {
  final Product product;

  const ProductDetailScreen({super.key, required this.product});

  @override
  State<ProductDetailScreen> createState() => _ProductDetailScreenState();
}

class _ProductDetailScreenState extends State<ProductDetailScreen> {
  int _quantity = 1;
  bool _isFavorite = false;

  void _decrement() {
    if (_quantity > 1) setState(() => _quantity--);
  }

  void _increment() => setState(() => _quantity++);

  void _addToCart() {
    final cart = context.read<CartController>();
    for (var i = 0; i < _quantity; i++) {
      cart.addItem(widget.product);
    }
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('${widget.product.name} added to cart'),
        backgroundColor: widget.product.color,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        duration: const Duration(seconds: 1),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final related = productsByCategory(widget.product.category)
        .where((p) => p.id != widget.product.id)
        .toList();
    final color = widget.product.color;

    return Scaffold(
      backgroundColor: Colors.white,
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            expandedHeight: 320,
            pinned: true,
            backgroundColor: Colors.white,
            foregroundColor: AppTheme.textDark,
            actions: [
              IconButton(
                icon: AnimatedSwitcher(
                  duration: const Duration(milliseconds: 300),
                  child: Icon(
                    _isFavorite ? Icons.favorite : Icons.favorite_border,
                    key: ValueKey(_isFavorite),
                    color: _isFavorite ? Colors.red : AppTheme.textMuted,
                  ),
                ),
                onPressed: () => setState(() => _isFavorite = !_isFavorite),
              ),
              const SizedBox(width: 8),
            ],
            flexibleSpace: FlexibleSpaceBar(
              background: Hero(
                tag: 'product-${widget.product.id}',
                child: Image.network(
                  widget.product.imageUrl,
                  fit: BoxFit.cover,
                  errorBuilder: (_, __, ___) => Container(
                    color: color.withValues(alpha: 0.15),
                    child: Icon(Icons.fastfood, size: 80, color: color),
                  ),
                ),
              ),
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: color.withValues(alpha: 0.15),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Text(
                          widget.product.category.label,
                          style: TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w600,
                            color: color,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Text(
                    widget.product.name,
                    style: const TextStyle(
                      fontSize: 26,
                      fontWeight: FontWeight.w800,
                      color: AppTheme.textDark,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    widget.product.description,
                    style: const TextStyle(
                      fontSize: 14,
                      color: AppTheme.textMuted,
                      height: 1.5,
                    ),
                  ),
                  const SizedBox(height: 24),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        formatPrice(widget.product.price),
                        style: TextStyle(
                          fontSize: 28,
                          fontWeight: FontWeight.w800,
                          color: color,
                        ),
                      ),
                      QuantitySelector(
                        quantity: _quantity,
                        onDecrement: _decrement,
                        onIncrement: _increment,
                      ),
                    ],
                  ),
                  const SizedBox(height: 24),
                  if (related.isNotEmpty) ...[
                    const Text(
                      'You might also like',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w700,
                        color: AppTheme.textDark,
                      ),
                    ),
                    const SizedBox(height: 12),
                    SizedBox(
                      height: 90,
                      child: ListView.separated(
                        scrollDirection: Axis.horizontal,
                        itemCount: related.length,
                        separatorBuilder: (_, __) => const SizedBox(width: 12),
                        itemBuilder: (context, i) => GestureDetector(
                          onTap: () => Navigator.pushReplacement(
                            context,
                            MaterialPageRoute(
                              builder: (_) =>
                                  ProductDetailScreen(product: related[i]),
                            ),
                          ),
                          child: ClipRRect(
                            borderRadius: BorderRadius.circular(12),
                            child: Hero(
                              tag: 'mini-${related[i].id}',
                              child: Image.network(
                                related[i].imageUrl,
                                width: 90,
                                height: 90,
                                fit: BoxFit.cover,
                                errorBuilder: (_, __, ___) => Container(
                                  width: 90,
                                  height: 90,
                                  color: related[i].color.withValues(alpha: 0.2),
                                  child: Icon(Icons.fastfood,
                                      color: related[i].color),
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 24),
                  ],
                  PrimaryButton(
                    label: 'Continue',
                    backgroundColor: color,
                    onPressed: () {
                      _addToCart();
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (_) => const InvoiceScreen()),
                      );
                    },
                  ),
                  const SizedBox(height: 16),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
