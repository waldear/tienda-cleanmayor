import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../controllers/cart_controller.dart';
import '../theme/app_theme.dart';
import '../utils/currency_formatter.dart';

class CartSummary extends StatelessWidget {
  const CartSummary({super.key});

  @override
  Widget build(BuildContext context) {
    final cart = context.watch<CartController>();

    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppTheme.surface,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        children: [
          _Row('Subtotal', formatPrice(cart.subtotal)),
          const SizedBox(height: 8),
          _Row('Tax (10%)', formatPrice(cart.tax)),
          const SizedBox(height: 8),
          _Row('Delivery', formatPrice(cart.delivery)),
          const Divider(height: 24),
          _Row(
            'Total',
            formatPrice(cart.total),
            bold: true,
            fontSize: 18,
          ),
        ],
      ),
    );
  }
}

class _Row extends StatelessWidget {
  final String label;
  final String value;
  final bool bold;
  final double fontSize;

  const _Row(
    this.label,
    this.value, {
    this.bold = false,
    this.fontSize = 14,
  });

  @override
  Widget build(BuildContext context) {
    final style = TextStyle(
      fontSize: fontSize,
      fontWeight: bold ? FontWeight.w700 : FontWeight.w400,
      color: bold ? AppTheme.textDark : AppTheme.textMuted,
    );
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label, style: style),
        Text(value,
            style: style.copyWith(
                color: bold ? AppTheme.textDark : AppTheme.textDark)),
      ],
    );
  }
}
