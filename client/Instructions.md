# Renelle Skin API Integration Plan

## Objective

We are migrating the frontend from hardcoded constants to the live WooCommerce API.

The goal is to **remove all hardcoded product/kit data** and have every page consume data from the API located in `lib/api`.

Do **NOT** redesign the UI.

Do **NOT** refactor unrelated components.

Do **NOT** change the visual appearance.

Only replace data sources while preserving the existing UX.

---

# API Base

```

```

The frontend already contains API utilities under:

```
lib/api
```

Use those instead of creating duplicate fetch logic.

---

# Current API Routes

## Kits

```
GET /kits
GET /kits/:id
```

Returns the complete kit including:

- metadata
- hero
- colors
- benefits
- routine steps
- pricing
- trial tier
- essential tier
- retail tier
- products

---

## Products

```
GET /products
GET /products/:slug
```

Supports:

```
?page=1
?per_page=20
?category=cleanser
```

Returns pagination information.

---

# API Response Shape

Every Kit follows this structure:

```ts
interface Kit {
  id: number;

  name: string;

  thumbnail: string | null;

  code: string;

  slug: string;

  skin_concern: string;

  tagline: string;

  colors: {
    primary: string;
    secondary: string;
  };

  hero: {
    description: string;
    image: string | null;
  };

  benefits: string;

  routine_steps: string;

  tiers: {
    trial: Tier;

    essential: Tier;

    retail: Tier;
  };
}

interface Tier {
  subscribable: boolean;

  pricing: {
    one_time: string | number | null;

    subscribe: string | number | null;
  };

  products: Product[];
}

interface Product {
  id: number;

  name: string;

  slug: string;

  pricing: {
    regular: number | null;

    subscribe: number | null;
  };

  stock_status: string;

  purchasable: boolean;

  purchase_options: {
    one_time: boolean;

    subscribe: boolean;
  };

  image: {
    url: string | null;
  };
}
```

---

# Existing API

Current endpoints:

```
GET /kits
GET /kits/:id

GET /products
GET /products/:slug
```

---

# Product Line Codes

Each kit belongs to one of these lines:

```
DSMO
IDHTFT
ITCTC
ELGOM
LDIT
UNIVERSAL
```

Do not hardcode these anywhere unless absolutely necessary.

Always consume them from the API.

---

# What Needs To Be Done

Search the project for every place where product or kit data is hardcoded.

Especially inspect:

```
KitDetailsPage
ProductsPage
ProductDetailPage
SubscriptionPage
```

Also search for:

```
constants/
mock/
dummy/
fixtures/
sampleData/
productData/
kitData/
```

and any arrays containing products or kits.

You do NOT need to inspect every single component.

Only replace places that currently depend on hardcoded product/kit data.

---

# Kit Details Page

Replace every usage of hardcoded kit objects.

Load the kit from:

```
GET /kits/:id
```

The page should use:

```
hero
colors
tagline
skin_concern
benefits
routine_steps
tiers
```

Every displayed product inside each tier should come directly from:

```
tiers.trial.products

tiers.essential.products

tiers.retail.products
```

Never recreate these arrays manually.

---

# Products Page

Replace static product arrays.

Load:

```
GET /products
```

Support existing pagination.

Support existing category filtering.

Use the API pagination response instead of calculating pages manually.

---

# Product Detail Page

Replace hardcoded lookup.

Load:

```
GET /products/:slug
```

using the slug from the router.

---

# Subscription Page

Any pricing currently hardcoded should instead come from the API.

Use:

```
tier.pricing.subscribe

tier.pricing.one_time
```

Never hardcode subscription pricing.

---

# Pricing Rules

Display prices from:

```
pricing.regular

pricing.subscribe
```

If either value is null, preserve the existing UI behavior.

Do not invent fallback prices.

---

# Purchase State

Respect:

```
purchasable

purchase_options.one_time

purchase_options.subscribe

stock_status
```

Use these values to determine:

- button states
- disabled state
- purchase options
- availability

Do not recreate this logic.

---

# Images

Use:

```
image.url
```

If null, preserve the existing placeholder behavior.

---

# Colors

Every kit provides:

```
colors.primary

colors.secondary
```

Replace any switch statements or manually mapped colors with these values.

---

# Hero Section

Use:

```
hero.image

hero.description
```

instead of static assets.

---

# Benefits

Render directly from:

```
benefits
```

---

# Routine

Render directly from:

```
routine_steps
```

---

# Keep Existing UI

Do NOT redesign:

- layouts
- spacing
- typography
- animations
- transitions
- responsiveness

The objective is **data migration**, not a UI rewrite.

---

# Code Quality

- Reuse existing API functions in `lib/api`.
- Create new API functions where needed
- If needed we can use zustand to manage the global data state, just put the hooks under the lib/hooks folder
- No page relies on hardcoded kit data.
- Do not duplicate fetch logic.
- Keep components as presentational as possible.
- Remove obsolete hardcoded constants once they are no longer referenced.
- Preserve TypeScript typings where possible.
- Handle loading and error states using the project's existing patterns.

---

# Success Criteria

After this task:

- No page relies on hardcoded kit data.
- No page relies on hardcoded product data.
- Product listings come from `/products`.
- Product details come from `/products/:slug`.
- Kit details come from `/kits/:id`.
- Subscription pricing comes from the API.
- Tier products come directly from the API.
- Existing UI remains visually identical.
- Existing UX remains unchanged.