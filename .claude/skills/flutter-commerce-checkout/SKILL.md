# Flutter Commerce Checkout Skill

## Purpose

This skill helps the agent build complete e-commerce cart, invoice, and checkout flows in Flutter. Use it when the user needs shopping cart logic, order summary screens, payment button UIs, or price calculation in a Flutter app.

## Trigger

Use this skill when:
- User asks to build a cart, basket, or order system in Flutter
- User needs invoice, order summary, or receipt screens
- User wants checkout with PayPal, Apple Pay, Stripe, or custom payment buttons
- User needs price calculation (subtotal, tax, delivery, total, discounts)
- User asks to clone a food delivery, e-commerce, or marketplace app in Flutter

## Cart Data Models

### Product

```dart
class Product {
  final String id;
  final String name;
  final String category;
  final double price;
  final String imageUrl;
  final Color color;

  const Product({
    required this.id,
    required this.name,
    required this.category,
    required this.price,
    required this.imageUrl,
    required this.color,
  });
}
```

### CartItem

```dart
class CartItem {
  final Product product;
  int quantity;

  CartItem({required this.product, this.quantity = 1});

  double get lineTotal => product.price * quantity;
}
```

## CartController (Provider)

```dart
class CartController extends ChangeNotifier {
  final List<CartItem> _items = [];

  List<CartItem> get items => List.unmodifiable(_items);
  int get itemCount => _items.fold(0, (sum, item) => sum + item.quantity);

  double get subtotal =>
      _items.fold(0.0, (sum, item) => sum + item.lineTotal);

  double get tax => subtotal * 0.10;          // 10%
  double get delivery => _items.isEmpty ? 0.0 : 2.99;
  double get total => subtotal + tax + delivery;

  void addItem(Product product) {
    final index = _items.indexWhere((i) => i.product.id == product.id);
    if (index >= 0) {
      _items[index].quantity++;
    } else {
      _items.add(CartItem(product: product));
    }
    notifyListeners();
  }

  void removeItem(String productId) {
    _items.removeWhere((i) => i.product.id == productId);
    notifyListeners();
  }

  void updateQuantity(String productId, int qty) {
    if (qty <= 0) {
      removeItem(productId);
      return;
    }
    final index = _items.indexWhere((i) => i.product.id == productId);
    if (index >= 0) {
      _items[index].quantity = qty;
      notifyListeners();
    }
  }

  void clear() {
    _items.clear();
    notifyListeners();
  }
}
```

## Invoice Screen Layout

Structure the invoice as a scrollable Column:

```
AppBar: "Your Order"
─────────────────────
[Product row] × N
  - Thumbnail | Name | Qty | Line price
─────────────────────
Divider
Subtotal:    $XX.XX
Tax (10%):   $X.XX
Delivery:    $2.99
─────────────────────
Total:       $XX.XX
─────────────────────
[Checkout Button]
```

## Checkout Screen Layout

```
AppBar: "Checkout"
Order summary badge (total items + total price)
─────────────────────
[Pay with PayPal]  ← blue button, PayPal logo
[Apple Pay]        ← black button, Apple Pay logo
─────────────────────
"Secure payment powered by Stripe" (small text)
```

## Payment Button Styles

```dart
// PayPal button
ElevatedButton.icon(
  style: ElevatedButton.styleFrom(
    backgroundColor: const Color(0xFF003087),
    foregroundColor: Colors.white,
    minimumSize: const Size(double.infinity, 56),
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(28)),
  ),
  icon: const Icon(Icons.payment),
  label: const Text('Pay with PayPal'),
  onPressed: () => _handlePayPal(context),
)

// Apple Pay button
ElevatedButton(
  style: ElevatedButton.styleFrom(
    backgroundColor: Colors.black,
    foregroundColor: Colors.white,
    minimumSize: const Size(double.infinity, 56),
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(28)),
  ),
  child: const Text('Apple Pay',
      style: TextStyle(fontFamily: 'SF Pro', fontSize: 18)),
  onPressed: () => _handleApplePay(context),
)
```

## Price Formatting

```dart
// utils/currency_formatter.dart
import 'package:intl/intl.dart';

final _formatter = NumberFormat.currency(symbol: '\$', decimalDigits: 2);

String formatPrice(double price) => _formatter.format(price);
```

Package: `intl: ^0.19.0`

## Recommended Packages

```yaml
dependencies:
  provider: ^6.1.0
  intl: ^0.19.0
  # For real payments (optional):
  # flutter_stripe: ^10.0.0
  # pay: ^2.0.0   (Apple Pay / Google Pay)
```

## Validation Checklist

- [ ] Cart persists across screen navigation (Provider at app root)
- [ ] `delivery` returns 0.0 when cart is empty
- [ ] `total` = `subtotal` + `tax` + `delivery` (not subtotal × 1.10 + delivery)
- [ ] Updating qty to 0 removes the item
- [ ] InvoiceScreen shows correct line totals per item
- [ ] `clear()` is called after successful checkout
- [ ] All prices formatted with currency symbol and 2 decimal places
