import 'package:flutter/foundation.dart';
import '../models/cart_item.dart';
import '../models/product.dart';

class CartController extends ChangeNotifier {
  final List<CartItem> _items = [];
  bool _isMayorista = false;

  List<CartItem> get items => List.unmodifiable(_items);
  bool get isMayorista => _isMayorista;

  int get itemCount => _items.fold(0, (sum, item) => sum + item.quantity);

  double get subtotal =>
      _items.fold(0.0, (sum, item) => sum + item.lineTotal(_isMayorista));

  double get tax => 0.0;

  double get delivery => _items.isEmpty ? 0.0 : 0.0;

  double get total => subtotal + tax + delivery;

  void togglePricelist(bool mayorista) {
    _isMayorista = mayorista;
    notifyListeners();
  }

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

  String buildWhatsAppMessage(String name, String address, String notes) {
    final sb = StringBuffer();
    sb.writeln('👋 *¡Hola Clean Mayor!*');
    sb.writeln('Quisiera realizar el siguiente pedido:\n');
    for (final item in _items) {
      final price = item.product.currentPrice(_isMayorista);
      sb.writeln(
          '• ${item.product.name} (x${item.quantity}) — \$${(price * item.quantity).toStringAsFixed(0)}');
    }
    sb.writeln('\n💰 *Total: \$${total.toStringAsFixed(0)}*');
    sb.writeln('📋 *Lista de precios: ${_isMayorista ? 'Mayorista' : 'Minorista'}*');
    if (address.isNotEmpty) sb.writeln('📍 *Entrega:* $address');
    sb.writeln('👤 *Cliente:* $name');
    if (notes.isNotEmpty) sb.writeln('📝 *Notas:* $notes');
    return sb.toString();
  }
}
