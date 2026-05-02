import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../controllers/cart_controller.dart';
import '../data/mock_products.dart';
import '../models/product.dart';
import '../theme/app_theme.dart';
import '../widgets/product_card.dart';
import 'invoice_screen.dart';
import 'product_detail_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  MoodCategory _selected = MoodCategory.pizza;

  @override
  Widget build(BuildContext context) {
    final cart = context.watch<CartController>();
    final products = productsByCategory(_selected);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Mood Food'),
        actions: [
          Stack(
            clipBehavior: Clip.none,
            children: [
              IconButton(
                icon: const Icon(Icons.shopping_bag_outlined),
                onPressed: () => Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (_) => const InvoiceScreen()),
                ),
              ),
              if (cart.itemCount > 0)
                Positioned(
                  right: 6,
                  top: 6,
                  child: Container(
                    width: 18,
                    height: 18,
                    decoration: const BoxDecoration(
                      color: AppTheme.primary,
                      shape: BoxShape.circle,
                    ),
                    child: Center(
                      child: Text(
                        '${cart.itemCount}',
                        style: const TextStyle(
                          fontSize: 10,
                          fontWeight: FontWeight.w700,
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ),
                ),
            ],
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _CategoryChips(
            selected: _selected,
            onSelect: (cat) => setState(() => _selected = cat),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(20, 16, 20, 8),
            child: Text(
              _selected.label,
              style: const TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.w800,
                color: AppTheme.textDark,
              ),
            ),
          ),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: GridView.builder(
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  crossAxisSpacing: 12,
                  mainAxisSpacing: 12,
                  childAspectRatio: 0.75,
                ),
                itemCount: products.length,
                itemBuilder: (context, i) => ProductCard(
                  product: products[i],
                  onTap: () => Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (_) =>
                          ProductDetailScreen(product: products[i]),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _CategoryChips extends StatelessWidget {
  final MoodCategory selected;
  final ValueChanged<MoodCategory> onSelect;

  const _CategoryChips({required this.selected, required this.onSelect});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 56,
      child: ListView(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        children: MoodCategory.values.map((cat) {
          final isSelected = cat == selected;
          return Padding(
            padding: const EdgeInsets.only(right: 8),
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 250),
              child: ChoiceChip(
                label: Text(cat.label),
                selected: isSelected,
                onSelected: (_) => onSelect(cat),
                selectedColor: cat.color,
                labelStyle: TextStyle(
                  color: isSelected ? Colors.white : AppTheme.textMuted,
                  fontWeight: FontWeight.w600,
                ),
                backgroundColor: AppTheme.surface,
              ),
            ),
          );
        }).toList(),
      ),
    );
  }
}
