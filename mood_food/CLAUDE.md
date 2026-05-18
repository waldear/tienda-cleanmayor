# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Flutter mobile app for Clean Mayor (cleaning products store). Despite the package name `mood_food`, this is the Clean Mayor shopping app. It uses mock/hardcoded product data — there is no API integration yet.

## Commands

```bash
flutter pub get               # install dependencies
flutter run                   # run on connected device/emulator
flutter test                  # run all tests
flutter test test/widget_test.dart  # run a single test file
flutter analyze               # lint
```

## Architecture

State management is done with a single `CartController` (`ChangeNotifierProvider` at the app root). Screens read cart state via `context.watch<CartController>()`.

### Layer Overview

- **`lib/models/`** — Data models. `Product` holds both retail (`price`) and wholesale (`priceMayorista`) prices. `CleanCategory` enum drives category chips and per-category colors. `CartItem` wraps a `Product` with a mutable `quantity`.
- **`lib/data/`** — `mock_products.dart` is the only data source. Products are hardcoded lists grouped by `CleanCategory`. To connect to a real backend, replace `productsByCategory()` here.
- **`lib/controllers/`** — `CartController` is the single source of truth for cart state and the active pricelist (minorista/mayorista). It also builds the WhatsApp order message via `buildWhatsAppMessage()`.
- **`lib/screens/`** — Navigation is imperative (`Navigator.push`). Flow: `SplashScreen` → `HomeScreen` → `ProductDetailScreen` (detail) or `InvoiceScreen` (cart/checkout) → `CheckoutScreen` (final form).
- **`lib/theme/`** — `AppTheme` defines all colors and the `ThemeData`. Primary teal `#0D9488` matches the web store.
- **`lib/widgets/`** — Reusable stateless widgets: `ProductCard`, `QuantitySelector`, `CartSummary`, `PrimaryButton`, `MoodHeader`.

### Key Design Decisions

- Minorista/mayorista toggle lives in `CartController.isMayorista`; `Product.currentPrice(bool)` returns the right price for the active mode.
- The app opens WhatsApp directly with a pre-built message (via `url_launcher`) — no backend call is made.
- `cached_network_image` is used for all product images (Unsplash URLs in mock data).
