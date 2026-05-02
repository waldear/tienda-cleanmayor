# Flutter Mood Food UI Skill

## Purpose

This skill helps the agent build premium Flutter food delivery apps inspired by modern animated mobile UI demos. It focuses on product browsing, animated product details, cart logic, invoice screens and checkout-ready interfaces.

Use this skill when the user asks to create, improve, clone, redesign or extend a Flutter food ordering app, restaurant menu app, QR ordering system, delivery app or mobile commerce prototype.

## Core Objective

Build a Flutter mobile application called "Mood Food" with a premium UI, animated transitions, category-based product browsing, product detail pages, cart management, invoice calculation and checkout screen.

## App Concept

The app is a food ordering interface organized by mood/category:

- Pizza Mood
- Salad Mood
- Drink Mood

Each mood has a distinct visual identity, color palette and product list.

## Visual Style

Use a clean, premium and modern mobile UI style.

Design characteristics:

- White background
- Strong accent colors
- Rounded buttons
- Soft shadows
- Large product imagery
- Diagonal colored panels
- Minimal text
- Smooth animations
- iOS-like polished layout
- Commercial demo quality

Recommended category colors:

- Pizza Mood: yellow / amber
- Salad Mood: lime / green
- Drink Mood: red

## Required Flutter Structure

Create or maintain this structure:

```text
lib/
  main.dart
  app.dart
  models/
    product.dart
    cart_item.dart
  data/
    mock_products.dart
  controllers/
    cart_controller.dart
  screens/
    splash_screen.dart
    home_screen.dart
    product_detail_screen.dart
    invoice_screen.dart
    checkout_screen.dart
  widgets/
    product_card.dart
    mood_header.dart
    quantity_selector.dart
    cart_summary.dart
    primary_button.dart
  theme/
    app_theme.dart
  utils/
    currency_formatter.dart
```

## Architecture

- Use **Provider** for state management (CartController extends ChangeNotifier)
- Null safety enabled (Dart 3.x)
- Material 3 (`useMaterial3: true`)
- No external backend — mock data only unless instructed otherwise

## Cart Logic

CartController must expose:

- `addItem(Product product)`
- `removeItem(String productId)`
- `updateQuantity(String productId, int qty)`
- `List<CartItem> get items`
- `double get subtotal`
- `double get tax` — 10% of subtotal
- `double get delivery` — fixed $2.99
- `double get total` — subtotal + tax + delivery
- `int get itemCount`

## Animations

- Hero animations on product images (unique tag per product id)
- AnimatedOpacity for splash screen fade-in
- AnimatedContainer for quantity selector changes
- PageView or ListView with scroll physics for product carousels

## Screens Summary

| Screen | Key Elements |
|--------|-------------|
| SplashScreen | Logo, animated fade, 2s delay → HomeScreen |
| HomeScreen | Category filter chips, product grid, cart badge |
| ProductDetailScreen | Hero image, name, price, qty selector, favorites, mini carousel, Continue button |
| InvoiceScreen | Item list, qty, line price, subtotal, tax, delivery, total |
| CheckoutScreen | Pay with PayPal button, Apple Pay button, order confirmation |

## Dependencies (pubspec.yaml)

```yaml
dependencies:
  flutter:
    sdk: flutter
  provider: ^6.1.0
  google_fonts: ^6.1.0
  cached_network_image: ^3.3.0
```

## Validation Checklist

Before marking the task complete, verify:

- [ ] `flutter analyze` returns no errors
- [ ] Null safety: no `!` force-unwrap on nullable that could be null at runtime
- [ ] Cart calculates totals correctly
- [ ] Hero tags are unique per product
- [ ] UI is responsive on different screen sizes
- [ ] All screens are reachable via navigation
- [ ] Code is modular — no screen file exceeds ~300 lines
