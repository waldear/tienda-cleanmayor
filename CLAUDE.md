# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static-file e-commerce store for "Clean Mayor" (a cleaning products wholesaler). There is no build system — `index.html`, `admin.html`, and `index-kiosco.html` are opened directly in a browser or hosted as-is. The backend is Google Apps Script.

## Development

No build, install, or test commands exist for the main store. Open HTML files directly in a browser for local development.

For the Flutter sub-project in `mood_food/`:
```bash
cd mood_food
flutter pub get           # install dependencies
flutter run               # run on connected device/emulator
flutter test              # run tests
flutter test test/widget_test.dart  # run a single test file
```

## Architecture

### Main Store (root directory)

The store is split across three files:

- **`index.html`** — Customer-facing storefront. On load, fetches product catalog from Google Sheets via `SCRIPT_URL` (a `doGet` call). Cart state is held in a JS `items` object. On checkout, `sendOrder()` POSTs the order to the same Apps Script URL and redirects to a pre-built WhatsApp message.
- **`admin.html`** — Owner dashboard showing order stats. Accessed by triple-clicking the logo on `index.html` and entering the admin PIN. Fetches orders via `?action=pedidos` on `SCRIPT_URL`.
- **`index-kiosco.html`** — Alternative kiosk-style variant with amber/orange branding, same backend wiring.
- **`google-apps-script.gs`** — The entire backend. `doGet` returns products (default) or orders (`?action=pedidos`). `doPost` saves the order row to the Pedidos sheet, generates a PDF invoice from a Google Docs template, and returns the Drive PDF URL + a WhatsApp redirect URL.

### Backend Data Flow

```
Browser → fetch(SCRIPT_URL)         → doGet  → Google Sheets (products)
Browser → fetch(SCRIPT_URL, POST)   → doPost → Google Sheets (orders)
                                             → Google Drive (PDF copy of Docs template)
                                             → returns WhatsApp URL with order summary
```

### Key Configuration Points

**In `google-apps-script.gs` (`CONFIG` object):**
- `PRODUCTOS_SS_ID` — Google Sheets ID for the product catalog
- `PEDIDOS_SS_ID` — Google Sheets ID where orders are saved
- `DOC_TEMPLATE_ID` — Google Docs template ID used to generate PDF invoices
- `PDF_FOLDER_ID` — Google Drive folder ID where PDFs are stored
- `WHATSAPP_NUMBER` — WhatsApp number for order notifications

**In `index.html` and `admin.html`:**
- `SCRIPT_URL` / `GOOGLE_SCRIPT_URL` — The deployed Google Apps Script `/exec` URL. Must end in `/exec`, not `/dev`.

**Admin PIN:** Hardcoded in the `checkPin()` function in `index.html`. Triple-click the logo to open the PIN modal.

### Deployment

After editing `google-apps-script.gs`, a **new deployment** must be created in the Apps Script editor (not just saved) — see `DESPLIEGUE_APPS_SCRIPT.md`. The new `/exec` URL must then be updated in `index.html` and `admin.html`.

The HTML files can be hosted anywhere (GitHub Pages, any web server, or opened locally). No server-side rendering is needed.

### `tienda-template/` subdirectory

A reusable version of the same store pattern, intended as a template to clone for new clients. It mirrors the root structure (`index.html`, `admin.html`, `google-apps-script.gs`) but uses placeholder IDs.

### `mood_food/` subdirectory

An unrelated Flutter app in the same repo. Uses `provider` for state management and `cached_network_image` / `url_launcher`. Entry point is `mood_food/lib/main.dart`.
