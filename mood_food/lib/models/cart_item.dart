import 'product.dart';

class CartItem {
  final Product product;
  int quantity;

  CartItem({required this.product, this.quantity = 1});

  double lineTotal(bool isMayorista) =>
      product.currentPrice(isMayorista) * quantity;
}
