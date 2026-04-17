# Coza fashion - e-commerce website

## About this project

This is a **fashion e‑commerce style front-end**: a branded storefront experience for browsing clothing and accessories. It focuses on **presentation and discovery** (catalog, storytelling, and brand pages) rather than a full checkout flow. The UI is built to feel like a **modern fashion retailer or lifestyle brand** site: hero banner, category entry points, product grid, and a blog for editorial content.

Shop by audience, filter the catalog, read product and article detail pages, and search across products and blog posts — all backed by a simple mock API for development.

## Features

- **Home** — Promotional banner, **Women / Men** category shortcuts into the shop, featured products and featured blog posts.
- **Shop** — Product listing with **filters** (All, Women, Men) and **search** within products; links from the home page can pre-select a category (e.g. `?category=women`).
- **Product detail** — Single product page with description and related items.
- **Blog** — Article listing and individual post pages.
- **Search** — Global search across **products** and **blog** posts by query string.
- **About** — Brand / company story content (static copy served from mock data).

## Tech stack

- **Next.js 14** (App Router), **React 18**, **TypeScript**
- **json-server** + `db.json` as a mock REST API
- **Bootstrap 5** and custom CSS 
- **Font Awesome** & icon fonts 

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended, e.g. 18+)
- npm (comes with Node)

## Getting Started

You need **two terminals**: one for the app, one for the API server.

**Terminal 1 — App**
```bash
git clone https://github.com/cekovskaa/coza-fashion-webiste.git
cd coza-fashion-webiste
npm install
npm run dev
```

**Terminal 2 — API Server**
```bash
cd coza-fashion-webiste
npm run server
```