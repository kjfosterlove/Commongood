# AGENTS.md — Common Good App

## Project purpose

Build a mobile-friendly web application/PWA that serves as the operating system for Common Good, a self-service refillery, curated glass shop, Pantry Ready product line, small-batch manufacturing operation, and market business.

The app must remain exceptionally simple for customers while allowing deep operational functionality behind secure authentication.

## Primary design rule

A first-time customer should be able to complete a purchase without prior explanation.

Use:
- One primary decision per screen
- Large touch-friendly controls
- Plain language
- Minimal required typing
- Clear back/reset actions
- Strong confirmation before completing payment
- Warm, calm, practical visual design

Avoid:
- Gamification
- Excessive popups
- Technical terminology
- Requiring customer accounts
- Making customers understand the entire system before shopping

## Brand

Name: Common Good

Working colors:
- Cream: #ffefd3
- Olive brown: #6C5C2C

Visual direction:
- Warm, natural, useful, lived-in
- Earthy and minimal
- Editorial but not staged
- Beautiful enough to feel intentional, practical enough for everyday life
- Avoid generic “eco store” clichés and overly commercial farmhouse styling

## Customer-facing app

Public access, no password required.

Main shopping paths:
1. Refill
2. Pantry Ready
3. Glass Collection
4. Cart / Checkout

Customers may:
- Bring their own suitable container, including plastic
- Purchase Common Good-provided containers, which must be glass
- Purchase a Pantry Ready product and transfer it into a glass jar at home
- Combine refills, Pantry Ready goods, glass, and accessories in one cart

Accounts are optional.

Optional customer account feature:
- “My Containers”
- Saves photo/name, tare weight, preferred product, and purchase/refill history
- Must never be required to complete checkout

## Refill workflow

1. Choose product
2. Choose container source:
   - Brought my own
   - Common Good glass
   - Saved container
3. Establish tare:
   - Enter/weigh empty brought-from-home container
   - Retrieve preloaded tare for Common Good glass
   - Retrieve tare from saved customer container
4. Enter/read filled weight
5. Calculate net product weight
6. Calculate refill price
7. Add refill and purchased container, when applicable, to cart
8. Continue shopping or checkout
9. Print/apply product label in a later version

## Payment methods

Initial:
- Cash
- Check
- Venmo

Future:
- Card

Cash screen:
- Display exact total
- Instruct customer to place cash inside a silicone envelope
- Deposit sealed envelope in cash box
- Final handling/change policy is not yet decided

Check screen:
- Display exact total and payee
- Instruct customer to use silicone envelope and cash box
- Returned-check fee language must remain configurable and must be legally reviewed before launch

Venmo screen:
- Display exact total
- Show verified Common Good Venmo business QR code
- Offer tap-to-open Venmo where technically possible
- Do not treat “I paid” as verified payment without a future verification mechanism

## Staff and owner modes

Role-based access:
- Customer: public shopping only
- Staff: shopping, label printing, returns, inventory adjustments
- Production: recipes, batch scaling, manufacturing, lot records, inventory usage
- Marketing: approved assets, AI studio, content calendar
- Owner: complete access, costs, margins, reports, settings

## Product system

Every product should have one central “Product Notebook” record.

Product Notebook areas:
- Overview
- Status and SKU
- Recipe/formula
- Batch scaling
- COGS
- Pricing
- Packaging
- Supplier links
- Labels
- Compliance and warnings
- Inventory
- Manufacturing/batch history
- Marketing copy
- Approved photos
- AI image rules
- Customer FAQs
- Sales and market notes
- Revision history

Entering or updating an ingredient or packaging cost should update all affected product costs and margins.

## AI Marketing Studio

The AI tool must be connected to approved product records and a permanent Brand Brain.

Brand Brain stores:
- Logos
- Colors
- Fonts
- Photography rules
- Composition rules
- Lighting rules
- Prop/background rules
- Brand voice
- Approved wording
- Prohibited wording
- Product dimensions
- Approved label files
- Example images that fit
- Examples that do not fit

Critical accuracy rule:
Do not ask an image generator to recreate small label text. Generate the scene and product presentation, then place the approved label artwork as a locked composited overlay whenever feasible.

Outputs may include:
- Social image
- Caption
- Short caption
- Story text
- Alt text
- Suggested content category
- Status: draft, approved, revise, rejected, posted

## Launch product data

Initial products discussed:
- Laundry Detergent Powder
- Wool Dryer Balls
- Dishwasher Detergent Powder
- Tough Dish Soak
- Solid Tallow Dish Soap
- All-Purpose Cleaner
- Glass Cleaner
- Room & Linen Spray
- Miswak Toothbrushes
- Beard Oil Cream
- Magnesium product
- Tallow Lotion
- Lip Balm
- Callus/Cuticle Balm

Merchandise:
- Jars, glassware, and containers of many kinds
- Common Good refill containers are glass only
- Mason jar lids: spray, pour, shaker
- Seed packets
- Drying herbs
- Harvest baskets

## Physical merchandising concept

For each applicable product:
- Upper shelf: Pantry Ready
- Main/eye-level shelf: bulk refill
- Lower table/shelf: recommended glass containers

The separate Glass Collection can also include one-of-a-kind estate-sale glass.

## Engineering priorities

Build incrementally.

Phase 1:
- Public refill calculator
- Pantry Ready and glass catalog
- Combined cart
- Cash/check/Venmo instruction flows
- Optional saved containers
- Secure owner authentication
- Product records

Phase 2:
- Recipe and batch calculators
- COGS and pricing
- Packaging/supplier records
- Inventory

Phase 3:
- Batch manufacturing and lot tracking
- Thermal label printing
- Scale integration
- Market inventory allocation
- Sales reporting

Phase 4:
- AI Marketing Studio
- Brand Brain
- Approved asset compositing
- Content calendar

Phase 5:
- Verified digital payments
- Multi-location support
- More advanced customer accounts

## Development expectations

- Preserve existing working functionality.
- Favor clear, maintainable code over clever abstractions.
- Never place secrets or payment credentials in the repository.
- Add tests for calculation and checkout logic.
- Clearly label placeholders and unfinished legal/payment features.
- Ask before making irreversible architectural changes.
