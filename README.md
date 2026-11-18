# Chêne clone — Next.js base (front-end only)

Single-page, static clone of the Chêne homepage. No backend, no CMS, no dependencies beyond Next.js and React.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Where to edit

| What                          | Where                                  |
| ----------------------------- | -------------------------------------- |
| All text, prices, links, data | `lib/data.js`                          |
| Section layout / markup       | `components/*.jsx`                     |
| All styling + colour tokens   | `app/globals.css` (`:root` at the top) |
| Fonts                         | `app/layout.js`                        |
| Logo                          | `components/Logo.jsx`                  |

Brand colours: tan `--tan: #c4ab83`, dark tan `--tan-dark: #7a6648`, black/ink, light gray `--gray: #f1f1ef`.

**Fonts:** I matched these by eye from screenshots (I couldn't inspect the site's CSS).
Headings/nav/buttons = **Montserrat** (600/700, wide letter-spacing, uppercase). Body = **Nunito**.
If you find the real fonts in the live site's DevTools, swap them in `app/layout.js`.

## Images

Images are intentionally missing. Until a file exists, the spot shows a gray placeholder.
Save each file into `public/images/` using the **exact filename** below (any extension works if you also
update the path in `lib/data.js`). Sizes are suggestions.

### Hero (full-bleed, ~2400×1200, landscape — text overlays the LEFT side, so keep the subject on the right)

| Filename | Used at | Search / shoot |
| --- | --- | --- |
| `hero-1.jpg` | Hero slide 1 (brand collab with a dog-gear brand) | A bearded hunter in camo waders and olive jacket wearing a baseball cap, holding/hugging a black Labrador retriever wearing a camo neoprene dog vest, standing next to a white pickup truck (Ford F-150 style) with the door open, misty overcast field, golden-grass horizon, muted desaturated tones |
| `hero-2.jpg` | Hero slide 2 | Duck hunter wading through murky flooded timber, holding two mallard ducks by the feet, camo waders, splashing water, big cypress/tupelo tree trunks, moody overcast light |

### Shop by category (5 cards, portrait 3:4, ~900×1200)

| Filename | Search / shoot |
| --- | --- |
| `category-waders.jpg` | Hunter in an olive hooded insulated jacket and waders, mud/frost on the bibs, hooded and face covered, near water |
| `category-jackets.jpg` | Bearded man in a black technical hunting jacket (zip up, chest pocket) in a flooded timber, waterfowl hunt |
| `category-footwear.jpg` | Man sitting on a rusty tractor tire/truck bed wearing khaki work pants and tan leather boots, brown tee, hay bale in background (crop to legs) |
| `category-pants-bibs.jpg` | Man in tan/brown insulated canvas bibs holding a duck call lanyard (several calls hanging), holding a mallard drake, dry reed field at sunset |
| `category-tees-hats.jpg` | Man in a gray camo-print graphic tee and light trucker cap, sitting on an ATV/side-by-side, green foliage background, jeans |

### Flagship + best sellers (product cut-outs on light-gray/white, transparent PNG preferred, ~1200×1200)

| Filename | Used at | Search / shoot |
| --- | --- | --- |
| `flagship-wader.png` | "The Flagship" block | Olive-green chest wader, front view, boot-foot, brown center zipper, shoulder straps, studio shot on light gray |
| `product-scout-deck-boot.png` | Best sellers #1 | Pair of brown rubber ankle deck boots with tan stripe, black sole, neoprene collar, pull loops |
| `product-grove-boot.png` | Best sellers #2 | Pair of tan/camel leather Chelsea-style boots, elastic side gore, crepe sole, brand tab |
| `product-sixty-series-fleece.png` | Best sellers #3 | Dark gray grid-fleece half-zip hoodie with chest pocket, front flat lay or ghost mannequin |
| `product-scout-vest.png` | Best sellers #4 | Camo (bottomland-style) zip-up windproof vest with chest pocket, ghost mannequin |

### Founders' Reserve — new season (split section)

| Filename | Search / shoot |
| --- | --- |
| `founders-reserve.jpg` | Portrait ~1200×1500: hunter in a waxed-cotton olive/brown jacket calling ducks with a mouth call in a bare winter forest, waxed canvas game bag hanging on a tree, shotgun in hand, two duck decoys at the base of the tree, overcast |

### New arrivals (4 cut-outs on **white**, square ~1000×1000)

| Filename | Search / shoot |
| --- | --- |
| `new-jac-shirt.png` | Olive/khaki waxed-cotton shirt jacket (jac-shirt) with two chest flap pockets, buttoned, front view |
| `new-waxed-bib.png` | Khaki/tan waxed-canvas work bib overalls with brown suspenders, front view |
| `new-down-vest.png` | Dark brown quilted waxed-canvas down vest, stand collar, two large lower flap pockets |
| `new-wading-jacket.png` | Dark olive-brown waxed wading jacket with hood, chest zip, large lower flap pockets, cinched cuffs |

### Stores — "Built Better" (3 cards, landscape 4:3, ~1200×900)

| Filename | Search / shoot |
| --- | --- |
| `store-memphis.jpg` | Close-up of an outdoor retail/HQ building sign (brand name on a tan wood/metal canopy) at an angle, sunlit, greenery below |
| `store-stuttgart.jpg` | Large timber-slat roofed retail store exterior on a rainy day with a crowd/line of customers out front (grand opening vibe) |
| `store-atlanta.jpg` | Boutique store interior: mounted waterfowl taxidermy display in a forest-style set, big brand sign, bright screen/wall |

### Community (3 cards, landscape 16:9, ~1200×675)

| Filename | Search / shoot |
| --- | --- |
| `community-underground.jpg` | Silhouette of a group of hunters raising arms/cheering at sunset, orange-yellow horizon, deep blue sky |
| `community-film-tour.jpg` | Black-and-white photo of people in a dark theater watching a big screen showing a hunting film |
| `community-cribs.jpg` | Hunters relaxing in a rustic wood-paneled cabin ("hunting lodge") on a camo couch, coffee table, duck gear, neon sign on wall |

### Optional

- Logo: currently drawn in text + SVG chevron in `components/Logo.jsx`. Replace with your own SVG at `public/images/logo.svg`.
- Favicon: drop `icon.png` into `app/`.
- Review quotes in `lib/data.js` (`fieldReviews`) are copied from the original — **replace with your own** before launch.

## Behaviour included

Rotating announcement bar, auto-crossfading hero, scroll-snap carousels with prev/next buttons (Shop by category, From the field), sticky black header, mobile menu (<1100px), dismissible "Be the first to know" side tab, floating accessibility button, responsive layout.
Not included (static only): cart, search, account, real product pages, forms that submit.
