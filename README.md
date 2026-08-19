# Yappi AI (tryyappi.com) - Shopify AI Sales & FAQ Landing Page

Production website and high-deliverability domain infrastructure for **Yappi AI** (`tryyappi.com`).

[![Deploy to Cloudflare Pages](https://github.com/luke-nguyen990/tryyappi/actions/workflows/deploy.yml/badge.svg)](https://github.com/luke-nguyen990/tryyappi/actions/workflows/deploy.yml)

## 🚀 Shopify App Listing
* **Official App Store URL**: [https://apps.shopify.com/yappi-ai-sales-chatbot-faq](https://apps.shopify.com/yappi-ai-sales-chatbot-faq)

## 📦 Features
* **Deliverability & Trust Signals**: Structured JSON-LD metadata, complete Privacy Policy, Terms of Service, and verified business contacts (`support@tryyappi.com`, `luke@tryyappi.com`).
* **Live Simulated Storefront Demo**: Interactive customer-journey scenarios (FAQ, cart recovery, live DHL/FedEx tracking).
* **Dynamic ROI Calculator**: Instant math calculations demonstrating merchant conversion lift.
* **Cloudflare Native**: Configured with `_headers` (CSP, HSTS, X-Content-Type-Options) and `_redirects`.

## 🛠️ Development & Build

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Build production bundle for Cloudflare Pages
npm run build

# Preview build locally
npm run preview
```

## ☁️ Cloudflare CI/CD Deployment

This repository is ready for automatic deployment to Cloudflare Pages via:
1. **GitHub Actions Workflow** (`.github/workflows/deploy.yml`): Runs on every push to `main`.
2. **Cloudflare Pages Direct Integration**: Connect the GitHub repository directly in Cloudflare Pages dashboard (Build command: `npm run build`, Output directory: `dist`).
