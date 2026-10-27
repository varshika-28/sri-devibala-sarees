# User Product Requirements Document (PRD)

# 1. Project Title

**Sri Devibala Sarees: Responsive Online Retail Shopping Website (Version 1.0)**

| Field | Value |
|---|---|
| Document name | `USER_PRD.md` |
| Document version | 1.0 (Draft) |
| Project type | Responsive online catalogue and WhatsApp-ordering website |
| Developer | `[DEVELOPER_NAME_PLACEHOLDER]` |
| Business owner | `[SHOP_OWNER_NAME_PLACEHOLDER]` |
| Last updated | `[DATE_PLACEHOLDER]` |

**Requirement priority labels used in this document:**

| Label | Meaning |
|---|---|
| **[M]** | **Mandatory** for Version 1. The release is not complete without it. |
| **[O]** | **Optional improvement.** Implement only if all [M] items are finished and tested. |
| **[F]** | **Future enhancement.** Not part of Version 1. Do not implement. |

---

# 2. Document Purpose

This document defines what the Sri Devibala Sarees website must do, who it is for, and which business rules it must follow. It is written for:

- The developer (a B.Tech CSBS student) building the site.
- The AI coding assistant used inside the IDE, which should be able to implement the requirements without guessing.
- The shop owner, who reviews and approves the behaviour of the website.

If this document and any other document disagree, **this PRD is the source of truth for product behaviour**. `README.md` is the source of truth for setup and operating instructions.

---

# 3. Product Overview

Sri Devibala Sarees is a local Indian clothing and accessories retail shop. Version 1 of the website lets customers:

1. Browse and search the shop's products.
2. Filter by category.
3. Add items to a cart.
4. Enter their name, phone number, and local delivery address.
5. Open WhatsApp with a **prefilled order message** addressed to the shop.
6. Send that message **manually** to place an order request.

The shop then replies on WhatsApp to confirm availability, delivery charges, and order acceptance.

**Version 1 is a static front-end website.** It has:

- No backend server.
- No database.
- No user accounts or login.
- No payment gateway.
- No automated notifications.

Product data lives in a local data file inside the project. The cart is stored in the customer's browser using `localStorage`.

---

# 4. Problem Statement

- Local customers cannot see the shop's products without visiting in person or receiving individual photos on WhatsApp.
- The shop has no online presence where products, prices, and categories are listed in one place.
- Orders taken by chat are informal, so details such as product, size, colour, quantity, and address are easily missed or mistyped.
- The shop owner needs a low-cost, low-maintenance solution that fits how the shop already works (WhatsApp) and does not require online payments or a complex system.

---

# 5. Product Vision

A simple, fast, mobile-first catalogue where a local customer can find a saree, nightie, or accessory in a few taps, build a cart, and send a clear, complete order message to the shop on WhatsApp. The experience should feel like a trustworthy local shop, not a large marketplace.

---

# 6. Business Objectives

| ID | Objective | Priority |
|---|---|---|
| BO-1 | Establish an online presence displaying the shop's product range. | [M] |
| BO-2 | Let customers send structured, complete order requests through WhatsApp. | [M] |
| BO-3 | Reduce back-and-forth messages by capturing product, quantity, size/colour, name, phone, and address in one message. | [M] |
| BO-4 | Keep running cost minimal (free or low-cost static hosting, no backend). | [M] |
| BO-5 | Allow the owner or developer to update products, prices, images, and stock without writing new features. | [M] |
| BO-6 | Create a foundation that can later grow into a backend-supported system. | [F] |

---

# 7. Target Users and User Personas

## 7.1 User Types

| User type | Description |
|---|---|
| **Customer** | A local shopper using mostly a mobile phone to browse and order. |
| **Shop owner** | Runs the shop, receives orders on WhatsApp, confirms availability and delivery. |
| **Developer** | Maintains the code and the product data file. |

## 7.2 Personas

**Persona 1: Lakshmi (Customer, saree buyer)**
- Age about 45. Uses WhatsApp daily on an Android phone. Comfortable with simple apps; not comfortable with long forms.
- Wants to see saree photos with clear prices and place an order without visiting the shop.

**Persona 2: Priya (Customer, accessories buyer)**
- Age about 22. Browses on her phone, compares several items quickly, and uses search.
- Wants to find earrings or hair clips fast and order several small items together.

**Persona 3: Meena (Shop owner)**
- Runs the shop and receives orders by WhatsApp. Is not technical.
- Wants orders to arrive in a readable format and wants to control what is shown as available.

**Persona 4: The developer**
- A student maintaining the project through Git.
- Wants a small, understandable codebase and a single, clearly structured product data file.

---

# 8. User Needs and Pain Points

| Need | Current pain point | How Version 1 addresses it |
|---|---|---|
| See what the shop sells | Must visit the shop or ask for photos | Online catalogue with images, prices, categories |
| Find products quickly | Scrolling through chat photos | Search and category filter |
| Order several items together | Typing item lists manually | Shopping cart |
| Avoid ordering unavailable items | Discovering out-of-stock items after ordering | Stock shown and enforced in cart |
| Send correct address and phone | Missing or unclear details | Validated checkout form |
| Order without online payment | Many local customers prefer to confirm first | WhatsApp order request; payment arranged outside the site |
| Owner receives clear orders | Informal, incomplete messages | Structured, prefilled message with order reference |

---

# 9. Scope of the Initial Release

## 9.1 In Scope (Version 1)

- Home / catalogue page with product grid.
- Category filter and text search.
- Product detail view with images, description, price, options, stock status, quantity selector.
- Shopping cart with quantity update and removal.
- Checkout form (name, phone, delivery address, optional note).
- WhatsApp click-to-chat order submission with a prefilled message.
- Cart persistence in `localStorage`.
- Responsive layout (mobile, tablet, desktop).
- Placeholder shop information clearly marked until supplied by the owner.
- Product data stored in a local data file editable by the owner or developer.
- Deployment to a static hosting provider (Vercel recommended).

## 9.2 Out of Scope

See Section 25.

---

# 10. Features and Functional Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | Display a catalogue of products loaded from a local data file. | [M] |
| FR-02 | Display products grouped or filterable by the seven defined categories. | [M] |
| FR-03 | Provide a search box to find products by text. | [M] |
| FR-04 | Provide a product detail view with images, description, price, options, stock, and quantity selection. | [M] |
| FR-05 | Allow adding products to the cart with chosen options and quantity. | [M] |
| FR-06 | Allow updating cart quantities and removing cart items. | [M] |
| FR-07 | Show cart subtotal and total. | [M] |
| FR-08 | Collect customer name, phone number, and delivery address at checkout. | [M] |
| FR-09 | Validate checkout fields before allowing order submission. | [M] |
| FR-10 | Generate a unique order reference per order attempt. | [M] |
| FR-11 | Generate a prefilled WhatsApp message and open WhatsApp click-to-chat. | [M] |
| FR-12 | Persist the cart in `localStorage` and restore it on reload. | [M] |
| FR-13 | Show stock status and prevent ordering more than available stock. | [M] |
| FR-14 | Show clear placeholder text for unknown shop information. | [M] |
| FR-15 | Show a "How ordering works" explanation so customers know they must send the WhatsApp message manually. | [M] |
| FR-16 | Sort products by price (low to high, high to low). | [O] |
| FR-17 | "Only a few left" indicator when stock is low. | [O] |
| FR-18 | Image gallery with multiple images per product. | [O] |
| FR-19 | "Clear cart" button with confirmation. | [O] |
| FR-20 | Remember the customer's name/phone/address for next time. | [F] |
| FR-21 | Admin dashboard, login, online payment, order database. | [F] |

---

# 11. Product Catalogue and Category Requirements

## 11.1 Categories (fixed for Version 1)

| Category ID (code value) | Display name |
|---|---|
| `sarees` | Sarees |
| `nighties` | Nighties |
| `inner-skirts` | Inner Skirts |
| `chudidhar-materials` | Chudidhar Materials |
| `hair-clips` | Hair Clips |
| `chains` | Chains |
| `earrings` | Earrings |

**Rules:**

- **CAT-1 [M]:** Every product must belong to exactly one of these categories.
- **CAT-2 [M]:** The category list is defined in one place in the code (a constants/config file) and reused by the filter, product cards, and data validation.
- **CAT-3 [M]:** Adding a new category requires only a code-level change in that single place plus product data; it is not an end-user feature.

## 11.2 Product Display Requirements

- **CP-1 [M]:** The product card shows: primary image, name, price in INR, category label, and stock status (In stock / Out of stock).
- **CP-2 [M]:** Products with `stock = 0` are **still displayed**, marked "Out of stock", and cannot be added to the cart.
- **CP-3 [M]:** Products with `isActive = false` are **not displayed anywhere** and cannot be searched.
- **CP-4 [M]:** Prices are shown in Indian rupees with the ₹ symbol and Indian digit grouping, for example `₹1,250` (`toLocaleString('en-IN')`).
- **CP-5 [M]:** If a product image fails to load or is missing, a neutral placeholder image is shown instead of a broken image.
- **CP-6 [M]:** Product options (sizes/colours) are shown only when the product defines them.
- **CP-7 [M]:** Empty catalogue (no active products) shows a friendly message, not a blank page.

---

# 12. Search and Filtering Requirements

| ID | Requirement | Priority |
|---|---|---|
| SF-1 | Search is **case-insensitive** and ignores leading/trailing spaces. | [M] |
| SF-2 | Search matches against product **name**, **description**, and **category display name**. | [M] |
| SF-3 | Search results update as the user types (no page reload). | [M] |
| SF-4 | Category filter shows "All" plus the seven categories. Default is "All". | [M] |
| SF-5 | Search and category filter work **together** (a product must match both). | [M] |
| SF-6 | When no products match, show "No products found" with a button to clear search and filters. | [M] |
| SF-7 | The currently selected category is visibly highlighted. | [M] |
| SF-8 | Show the number of products currently displayed. | [O] |
| SF-9 | Sort by price low-to-high and high-to-low. | [O] |
| SF-10 | Filter by price range, colour, or size. | [F] |

**Acceptance criteria:**

- Searching `SAREE` and `saree` returns the same results.
- Searching `"  earring  "` returns the same results as `earring`.
- Selecting "Chains" and searching "gold" shows only products in Chains that contain "gold" in name, description, or category name.
- Search of a term matching nothing shows the empty-state message and does not crash.

---

# 13. Shopping Cart Requirements

## 13.1 Cart Line Definition

A **cart line** is uniquely identified by the combination: `productId + selectedSize + selectedColour`.
The same product with a different size or colour is a **separate line**. Adding the same product with the **same** size and colour **increases the quantity** of the existing line (it does not create a duplicate line).

## 13.2 Requirements

| ID | Requirement | Priority |
|---|---|---|
| CART-1 | Customer can add an in-stock product to the cart with a chosen quantity (default 1). | [M] |
| CART-2 | If a product defines sizes, a size **must** be selected before adding. If it defines colours, a colour **must** be selected before adding. If a product defines neither, no option selection is shown. | [M] |
| CART-3 | Customer can increase or decrease line quantity using +/- controls. Minimum quantity is 1. | [M] |
| CART-4 | Customer can remove a line using a remove button. Decreasing below 1 does not remove the item (use the remove button). | [M] |
| CART-5 | Cart shows for each line: image, name, selected options, unit price, quantity, line total. | [M] |
| CART-6 | Cart shows **Subtotal** (sum of line totals) and **Total**. In Version 1 **Total equals Subtotal** because delivery charges are not known by the website. | [M] |
| CART-7 | The cart shows the note: "Delivery charges, if any, will be confirmed by the shop on WhatsApp." | [M] |
| CART-8 | A cart icon/badge in the header shows the **total quantity of items** in the cart. | [M] |
| CART-9 | The cart persists in `localStorage` and is restored after refresh or browser restart. | [M] |
| CART-10 | An empty cart shows a friendly message and a link back to the catalogue. The checkout button is hidden or disabled. | [M] |
| CART-11 | The cart stores only `productId`, `size`, `colour`, and `quantity`. Name, price, image, and stock are always read from the current product data. | [M] |
| CART-12 | On load, the cart is **re-validated** against current product data (see 13.4). | [M] |
| CART-13 | "Clear cart" button with confirmation prompt. | [O] |

## 13.3 Calculation Rules

- All prices in the data file are **whole rupees (integers)**. No paise in Version 1.
- `lineTotal = unitPrice × quantity`
- `subtotal = sum(all lineTotal)`
- `total = subtotal` (Version 1)
- Calculations use integers only to avoid floating-point errors.

**Calculation acceptance criteria (must all pass):**

| # | Cart contents | Expected result |
|---|---|---|
| C1 | 1 × ₹1,500 | Line total ₹1,500; subtotal ₹1,500; total ₹1,500 |
| C2 | 2 × ₹250 + 3 × ₹99 | Line totals ₹500 and ₹297; subtotal ₹797; total ₹797 |
| C3 | Same product, same size/colour added twice (qty 1 then qty 2) | One line with quantity 3 |
| C4 | Same product, sizes M and L | Two separate lines |
| C5 | Quantity increased from 2 to 3 on a ₹400 item | Line total changes from ₹800 to ₹1,200 and subtotal updates immediately |
| C6 | A line removed | Subtotal decreases by that line's total; header badge updates |
| C7 | Empty cart | Subtotal ₹0; checkout disabled; empty-state shown |

## 13.4 Stock Validation Rules

The `stock` field is the number of units available for a product, shared across all of its size/colour variants (Version 1 does not track stock per variant).

- **STK-1 [M]:** The **total quantity in the cart for one product** (across all its size/colour lines) must never exceed that product's `stock`.
- **STK-2 [M]:** A configurable constant `MAX_QTY_PER_PRODUCT` (default `10`) additionally caps the total quantity per product. The effective maximum is `min(stock, MAX_QTY_PER_PRODUCT)`.
- **STK-3 [M]:** When the maximum is reached, the "+" control is disabled and a message such as "Only N available" is shown. The website never silently changes a quantity without telling the user.
- **STK-4 [M]:** Products with `stock = 0` cannot be added.
- **STK-5 [M]:** On cart load and again at checkout submission, each line is re-validated:
  - If the product no longer exists or is inactive: remove the line and show a notice.
  - If `stock = 0`: remove the line and show a notice.
  - If the quantity exceeds the effective maximum: reduce to the maximum and show a notice.
  - If a stored size or colour is no longer offered: remove the line and show a notice.
  - Notices must name the affected product.
- **STK-6 [M]:** If validation changes the cart at checkout submission, the WhatsApp link is **not opened**; the user sees the notice and must review the cart again.
- **STK-7 [M]:** A cart may contain at most **20 distinct lines** (`MAX_CART_LINES = 20`), to keep the WhatsApp message a safe length.

**Stock acceptance criteria:**

| # | Scenario | Expected result |
|---|---|---|
| S1 | Product stock = 3; user tries to add 4 | Only up to 3 allowed; message "Only 3 available" |
| S2 | Product stock = 5, cart already has M × 3; user adds L × 3 | Rejected or capped so total is at most 5; message shown |
| S3 | Product stock = 0 | "Out of stock" label; add button disabled |
| S4 | Cart saved with qty 4; owner later sets stock to 2; page reloaded | Quantity reduced to 2 with notice naming the product |
| S5 | Stock 50, `MAX_QTY_PER_PRODUCT` = 10 | Maximum selectable total is 10 |
| S6 | Product removed from the data file after being added to cart | Line removed on next load with notice |

---

# 14. Checkout and Customer Information Requirements

## 14.1 Fields

| Field | Required | Rules |
|---|---|---|
| Full name | Yes | Trimmed; 2–60 characters; letters, spaces, dots, and apostrophes allowed |
| Phone number | Yes | See 14.2 |
| Delivery address | Yes | Trimmed; 10–300 characters; multi-line allowed |
| Order note | No | 0–200 characters (for example colour preferences or delivery time) |

## 14.2 Phone Number Rules

- Accept an Indian mobile number entered as: `9876543210`, `+91 9876543210`, `91 98765 43210`, or `098765 43210`.
- Normalisation: remove spaces, hyphens, and parentheses; remove a leading `+91`, `91` (only if the remainder is 10 digits), or `0`.
- After normalisation the number must be **exactly 10 digits** and the **first digit must be 6, 7, 8, or 9**.
- The message uses the normalised format `+91 XXXXXXXXXX`.

**Phone acceptance criteria:**

| Input | Result |
|---|---|
| `9876543210` | Valid |
| `+91 98765 43210` | Valid → `+91 9876543210` |
| `098765-43210` | Valid → `+91 9876543210` |
| `1234567890` | Invalid (does not start with 6–9) |
| `98765` | Invalid (too short) |
| `98765abcde` | Invalid (non-digits) |

## 14.3 Behaviour Rules

- **CHK-1 [M]:** Validation runs on submit. Fields with errors show a specific message beneath the field. Errors also clear when the user corrects the field.
- **CHK-2 [M]:** The "Order on WhatsApp" button is disabled when the cart is empty.
- **CHK-3 [M]:** All text inputs are trimmed before use in the message.
- **CHK-4 [M]:** The checkout page shows an order summary (lines, subtotal, total) and the delivery/payment notes from Section 16.
- **CHK-5 [M]:** The checkout page must state: "Your order is **not placed** until you send the WhatsApp message to the shop."
- **CHK-6 [M]:** Customer details are **not** saved to `localStorage` or sent to any server by the website in Version 1.
- **CHK-7 [M]:** The form uses correct input types and attributes (`type="tel"`, `inputMode="numeric"` for phone, `autocomplete` hints) for mobile keyboards.

**Checkout validation acceptance criteria:**

- Submitting with an empty name shows "Please enter your name." and does not open WhatsApp.
- Submitting with an invalid phone shows "Please enter a valid 10-digit mobile number." and does not open WhatsApp.
- Submitting with an address shorter than 10 characters shows an address error and does not open WhatsApp.
- A name of only spaces is treated as empty.
- Submitting with all valid fields and a valid cart opens WhatsApp exactly once per click.

---

# 15. WhatsApp Ordering Workflow

## 15.1 Step-by-Step Flow

1. Customer browses and adds products to the cart.
2. Customer opens the cart, reviews lines, subtotal, and total.
3. Customer proceeds to checkout and fills in name, phone, address, and an optional note.
4. Customer clicks **"Order on WhatsApp"**.
5. The website validates the form and re-validates the cart against stock (STK-5).
6. The website generates the **order reference** and the **message text**.
7. The website opens the WhatsApp click-to-chat link in a new tab/window (or the WhatsApp app on mobile) with the message prefilled.
8. **The customer reviews the message and must manually press Send in WhatsApp.**
9. The shop reads the message and replies to confirm availability, delivery charges, and acceptance.
10. Payment and delivery details are arranged between the shop and the customer outside the website.

## 15.2 Technical Rules

- **WA-1 [M]:** The shop's WhatsApp number is stored in **one place** (configuration/environment variable, see README). It is in **international format without `+`, spaces, or leading zeros** (example format: `91XXXXXXXXXX`). Until the owner provides it, a clearly marked placeholder is used and the order button shows a "Shop WhatsApp number not configured" message instead of opening a link to an invalid number.
- **WA-2 [M]:** The link format is `https://wa.me/<SHOP_NUMBER>?text=<URL-ENCODED MESSAGE>`, built using `encodeURIComponent` on the full message.
- **WA-3 [M]:** The website must not claim the order has been "placed", "confirmed", or "sent". Allowed wording: "Order request prepared", "Open WhatsApp to send your order".
- **WA-4 [M]:** After opening WhatsApp, the website shows a message such as: "WhatsApp should now be open. Please press Send to share your order with the shop. The shop will confirm availability and delivery charges." It must not clear the cart automatically, because the website cannot know whether the customer sent the message.
- **WA-5 [M]:** A separate button, "I have sent the order, clear cart", lets the customer empty the cart manually. [O] A "Back to cart" option must also remain.
- **WA-6 [M]:** Total message length (before encoding) must stay under **1,500 characters**. If the generated message exceeds this, show: "Your order is too long for one message. Please remove some items or send it in two orders." Do not truncate silently.
- **WA-7 [M]:** The order reference is generated **per button click** (not saved).

## 15.3 Order Reference Format

`SDS-YYYYMMDD-XXXX`

- `SDS` = Sri Devibala Sarees.
- `YYYYMMDD` = current date from the customer's device.
- `XXXX` = 4 random characters from `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` (no `I`, `O`, `0`, `1`, to avoid confusion).
- Example: `SDS-20261027-K7M2`.
- The reference is for conversation tracking only. It is not guaranteed globally unique, because there is no database in Version 1.

## 15.4 Message Template (exact structure)

```text
Hello Sri Devibala Sarees, I would like to place an order.

Order Reference: SDS-20261027-K7M2
Date: 27 Oct 2026

CUSTOMER DETAILS
Name: <name>
Phone: +91 <10-digit number>
Delivery Address: <address>
Note: <note, or "None">

ORDER ITEMS
1. <Product name> (Size: <size>, Colour: <colour>)
   Qty: <qty> x ₹<unit price> = ₹<line total>
2. <Product name>
   Qty: <qty> x ₹<unit price> = ₹<line total>

Subtotal: ₹<subtotal>
Total (excluding delivery charges): ₹<total>

Please confirm availability, delivery charges, and the final amount. Thank you.
```

**Template rules:**

- The "(Size: …, Colour: …)" part includes only the options that exist for that product.
- Prices use Indian digit grouping, for example `₹12,500`.
- Items are numbered starting from 1, in cart order.
- Line breaks are preserved (encoded as `%0A`).
- The message contains **no** invented shop details.

**WhatsApp message acceptance criteria:**

| # | Scenario | Expected result |
|---|---|---|
| W1 | Valid 2-line cart, valid details | URL starts with `https://wa.me/<number>?text=`; decoded text contains the reference, name, phone, address, both products with quantities, line totals, and total |
| W2 | Product with size and colour | Line includes `(Size: M, Colour: Red)` |
| W3 | Product with no options | No parentheses shown |
| W4 | Address contains `&`, `#`, `%`, newline | Characters survive encoding and appear correctly in the decoded message |
| W5 | Empty note | Message shows `Note: None` |
| W6 | Total shown in message | Equals the total shown on the checkout page |
| W7 | Shop number not configured | WhatsApp is not opened; configuration message shown |
| W8 | Message longer than 1,500 characters | Not opened; "too long" message shown |
| W9 | Two clicks | Two different order references |

---

# 16. Delivery and Payment Rules

## 16.1 Delivery

- **DEL-1 [M]:** Version 1 supports **local delivery only**, as arranged by the shop.
- **DEL-2 [M]:** The website does **not** calculate delivery charges, delivery areas, or delivery times.
- **DEL-3 [M]:** The website must **not** promise delivery dates, free delivery, or delivery areas. Use only: "Delivery availability and charges will be confirmed by the shop on WhatsApp."
- **DEL-4 [M]:** The delivery coverage area is shown as a placeholder: `[DELIVERY_AREA_TO_BE_PROVIDED_BY_SHOP]`.

## 16.2 Payment

- **PAY-1 [M]:** Version 1 has **no online payment**.
- **PAY-2 [M]:** The website must not collect card, UPI, or bank details.
- **PAY-3 [M]:** The website must not state any payment method as accepted. Use only: "Payment options will be shared by the shop after your order is confirmed."
- **PAY-4 [M]:** Prices shown are listed shop prices in INR and may be subject to confirmation by the shop.

## 16.3 Order Acceptance

- The shop decides whether to accept the order after reading the WhatsApp message.
- Order acceptance, rejection, substitutions, and delivery charges are communicated by the shop on WhatsApp, outside the website.

---

# 17. User Stories with Acceptance Criteria

## 17.1 Customer Stories

| ID | Story | Acceptance criteria | Priority |
|---|---|---|---|
| US-01 | As a customer, I want to browse all products, so that I can see what the shop sells. | Product grid shows all active products with image, name, price, stock status. Loads without login. | [M] |
| US-02 | As a customer, I want to filter products by category, so that I can quickly find the type of item I need. | Seven categories plus "All" available. Selecting one shows only that category's active products. Selected category is highlighted. | [M] |
| US-03 | As a customer, I want to search for products, so that I can find a specific item by name. | Search is case-insensitive, trims spaces, matches name/description/category, and updates as I type. Empty result shows a message. | [M] |
| US-04 | As a customer, I want to view product details, so that I can decide whether to buy. | Detail view shows images, name, description, price, category, stock, and available sizes/colours. | [M] |
| US-05 | As a customer, I want to choose size, colour, and quantity, so that I order exactly what I want. | Required options must be chosen before adding. Quantity cannot exceed effective maximum. | [M] |
| US-06 | As a customer, I want to add products to a cart, so that I can order multiple items together. | Added item appears in cart; header badge updates; same product with same options merges. | [M] |
| US-07 | As a customer, I want to change quantities or remove items, so that I can correct my order. | +/- changes quantity within 1 and effective maximum; remove deletes the line; totals update instantly. | [M] |
| US-08 | As a customer, I want to see the subtotal and total, so that I know approximately how much I will pay. | Calculations match Section 13.3 test cases. Delivery note is shown. | [M] |
| US-09 | As a customer, I want my cart to be saved, so that I do not lose it if I refresh or close the page. | Cart restored after refresh. Re-validated against current stock. | [M] |
| US-10 | As a customer, I want to enter my name, phone, and delivery address, so that the shop knows where to deliver. | Validation per Section 14. Errors are specific and shown beside the field. | [M] |
| US-11 | As a customer, I want to send my order through WhatsApp with a prefilled message, so that I do not have to type it. | WhatsApp opens with the message matching Section 15.4. I can edit and must press Send. | [M] |
| US-12 | As a customer, I want to be told clearly that my order is not final until the shop confirms, so that I do not assume it is placed. | Notice displayed at cart, checkout, and after opening WhatsApp. No "order confirmed" wording anywhere. | [M] |
| US-13 | As a customer, I want out-of-stock items clearly marked, so that I do not waste time on unavailable items. | "Out of stock" label displayed; Add button disabled. | [M] |
| US-14 | As a customer using a phone, I want the site to be easy to use with my thumb, so that ordering is comfortable. | All controls usable at 360px width; tap targets at least 44×44px. | [M] |
| US-15 | As a customer, I want to sort products by price, so that I can find items in my budget. | Sort low→high and high→low work with active filters. | [O] |
| US-16 | As a customer, I want to see several images of a product, so that I can judge it better. | Image gallery with thumbnails. | [O] |

## 17.2 Shop Owner and Developer Stories

| ID | Story | Acceptance criteria | Priority |
|---|---|---|---|
| US-20 | As a shop owner, I want to receive orders in a clear, structured message, so that I can process them quickly. | Message matches Section 15.4 with reference, customer details, items, quantities, prices, and total. | [M] |
| US-21 | As a shop owner, I want to confirm availability and delivery charges myself, so that I stay in control. | The website never states these are confirmed. Notices direct customers to wait for the shop. | [M] |
| US-22 | As a shop owner or developer, I want to edit product names, images, prices, and stock in one data file, so that updates are simple. | Changing a value in the data file and redeploying/refreshing updates the website; no other code changes needed. | [M] |
| US-23 | As a shop owner, I want to hide a product without deleting it, so that I can temporarily remove it. | Setting `isActive: false` hides it everywhere. | [M] |
| US-24 | As a developer, I want the shop WhatsApp number in one configuration location, so that changing it is safe. | Changing the config value updates every WhatsApp link. | [M] |
| US-25 | As a developer, I want clear placeholders for unknown business information, so that no false information is published. | All unknown shop info appears as `[..._PLACEHOLDER]` text in one config file. | [M] |

---

# 18. Non-Functional Requirements

| ID | Category | Requirement | Priority |
|---|---|---|---|
| NFR-01 | Performance | Initial page should become usable within about 3 seconds on a typical 4G mobile connection. | [M] |
| NFR-02 | Performance | Product images are compressed (target under 200 KB each, maximum 1000 px on the longest side for listing images) and lazy-loaded below the fold. | [M] |
| NFR-03 | Compatibility | Works on the latest two versions of Chrome, Safari, Firefox, and Edge, and on Android Chrome and iOS Safari. | [M] |
| NFR-04 | Accessibility | Meets reasonable WCAG 2.1 AA practices: sufficient colour contrast, keyboard operable, visible focus, labelled form fields, meaningful `alt` text on images. | [M] |
| NFR-05 | Usability | A first-time customer can complete cart-to-WhatsApp in under 3 minutes without help. | [M] |
| NFR-06 | Reliability | The site must not crash when `localStorage` is unavailable, full, or contains corrupted data; it falls back to an empty in-memory cart. | [M] |
| NFR-07 | Maintainability | Product data, shop configuration, categories, and business constants are separated from UI components. Cart and message logic is placed in plain functions that can be tested. | [M] |
| NFR-08 | Hosting | Deployable as a static site with no server code. | [M] |
| NFR-09 | Code quality | ESLint runs without errors; consistent formatting. | [M] |
| NFR-10 | Language | Interface language is English in Version 1. | [M] |
| NFR-11 | SEO basics | Page title, meta description, and viewport tag are set. | [M] |
| NFR-12 | Language | Tamil language support. | [F] |
| NFR-13 | Offline | Offline use (PWA). | [F] |

---

# 19. Responsive Design Requirements

| Device class | Width | Product grid | Navigation |
|---|---|---|---|
| Small mobile | 320–479 px | 2 columns (or 1 for very narrow cards) | Compact header with search, cart icon; category chips scroll horizontally |
| Large mobile | 480–767 px | 2 columns | Same as above |
| Tablet | 768–1023 px | 3 columns | Header with search and categories visible |
| Desktop | 1024 px and above | 4 columns, max content width about 1200 px | Full header; sidebar or top bar category filter |

**Rules:**

- **RES-1 [M]:** Design **mobile-first**; the smallest supported width is **320 px** with no horizontal scrolling.
- **RES-2 [M]:** Tap targets are at least **44 × 44 px**.
- **RES-3 [M]:** Body text is at least **16 px** on mobile (also prevents iOS auto-zoom on inputs).
- **RES-4 [M]:** Images keep their aspect ratio and use a fixed aspect-ratio container (for example 3:4) to avoid layout shift.
- **RES-5 [M]:** The cart icon is always reachable from any page.
- **RES-6 [M]:** The checkout form is a single column on all devices.
- **RES-7 [M]:** Test on at least widths 360, 390, 768, 1024, and 1440 px.
- **RES-8 [O]:** Sticky "Order on WhatsApp" button at the bottom of the cart on mobile.

---

# 20. UI/UX Design Guidelines

- **Tone:** Warm, trustworthy, local boutique feel. Avoid a marketplace look.
- **Colours:** Choose a restrained palette (for example one primary traditional-inspired colour, one accent, neutral background). Final colours are chosen by the developer and approved by the owner. Ensure contrast ratio of at least 4.5:1 for body text.
- **Typography:** One readable web-safe or Google font pair. Keep headings clear and prices prominent.
- **Imagery:** Product photos should be the visual focus. Use consistent aspect ratios and clean backgrounds where possible.
- **Navigation:** Header with shop name, search, and cart icon with item-count badge. Category chips under the header.
- **Pages/views (Version 1):**
  1. Home / catalogue
  2. Product detail
  3. Cart
  4. Checkout
  5. Not-found page
  Shop information (about/contact placeholders) may be a section of the home page or footer.
- **Feedback:** Show immediate, non-blocking feedback when an item is added (for example a small toast or button state change).
- **Buttons:** One clear primary action per screen ("Add to cart", "Proceed to checkout", "Order on WhatsApp").
- **Messages:** Plain, friendly English, no technical jargon.
- **Footer:** Contains placeholders for shop address, phone, opening hours, and a short note on how ordering works. All unknown values are marked clearly, for example `[SHOP_ADDRESS_PLACEHOLDER]`.
- **Placeholders must be visually obvious** during development so they are not forgotten before launch.

---

# 21. Data Requirements and Product Data Structure

## 21.1 Storage in Version 1

| Data | Where stored | Notes |
|---|---|---|
| Products | Local JavaScript/JSON data file in the project | Edited by owner/developer |
| Shop configuration | Config file and environment variable | Includes placeholders |
| Cart | Browser `localStorage` | Key: `sri-devibala-sarees-cart` |
| Customer details | **Not stored** | Held in memory only while the form is open |
| Orders | **Not stored** | Orders exist only in WhatsApp conversations |

## 21.2 Product Object

```js
{
  id: "saree-001",                    // string, unique, lowercase letters/digits/hyphens, never reused
  name: "Sample Cotton Saree",        // string, required
  description: "Short description.",  // string, required
  category: "sarees",                 // one of the seven category IDs
  price: 1500,                        // integer, whole rupees, greater than 0
  images: ["/images/products/sarees/saree-001-1.jpg"], // array of at least 1 path
  sizes: [],                          // array of strings; empty = no size option
  colours: ["Red", "Green"],          // array of strings; empty = no colour option
  stock: 5,                           // integer, 0 or more
  isActive: true                      // boolean; false hides the product
}
```

## 21.3 Field Rules

| Field | Rule |
|---|---|
| `id` | Required, unique across all products, stable once published (carts refer to it) |
| `name` | Required, 3–100 characters |
| `description` | Required, up to 500 characters |
| `category` | Required, must match a defined category ID |
| `price` | Required, positive integer in INR |
| `images` | Required, at least one; first image is the primary image |
| `sizes` | Optional array. If non-empty, the customer must choose one |
| `colours` | Optional array. If non-empty, the customer must choose one |
| `stock` | Required, non-negative integer |
| `isActive` | Required boolean |

## 21.4 Data Validation

- **DATA-1 [M]:** A development-time check (a function run on app start in development, or a script) logs a clear console error for duplicate IDs, unknown categories, non-integer or non-positive prices, missing images, and negative stock.
- **DATA-2 [M]:** The app must not crash because of one malformed product; the faulty product is skipped and logged in development.
- **DATA-3 [M]:** **Sample/demo products must be clearly labelled as sample data** (for example names starting with "Sample") until the owner supplies real inventory. No real stock, price, or product claims may be invented.

## 21.5 Cart Storage Format

```json
{
  "version": 1,
  "lines": [
    { "productId": "saree-001", "size": null, "colour": "Red", "quantity": 2 }
  ]
}
```

---

# 22. Privacy and Security Requirements

| ID | Requirement | Priority |
|---|---|---|
| SEC-1 | The website collects name, phone, and address only to build the WhatsApp message. They are not sent to any server owned by the project and are not stored by the website. | [M] |
| SEC-2 | No analytics, advertising trackers, or third-party scripts that collect personal data in Version 1. | [M] |
| SEC-3 | Do not commit secrets. The shop WhatsApp number is public information and is not a secret, but is kept in configuration so it can be changed safely. | [M] |
| SEC-4 | Render all user-entered text as plain text. Never insert it as HTML (no `dangerouslySetInnerHTML`). | [M] |
| SEC-5 | Serve the production site over HTTPS (provided by the hosting platform). | [M] |
| SEC-6 | `localStorage` stores only the cart structure in 21.5, no personal data. | [M] |
| SEC-7 | Include a short privacy notice stating: customer details are used only to prepare the WhatsApp order message; once sent, the message is handled by WhatsApp and the shop. | [M] |
| SEC-8 | External links (WhatsApp) open with `rel="noopener noreferrer"` when opened in a new tab. | [M] |
| SEC-9 | Keep dependencies minimal and run `npm audit` before release. | [M] |
| SEC-10 | Do not expose any admin function in the front end. | [M] |

---

# 23. Error Handling and Edge Cases

| # | Situation | Required behaviour |
|---|---|---|
| E1 | `localStorage` disabled, full, or throws | Cart works in memory for the session; show a small notice that the cart will not be saved |
| E2 | Corrupted or unparsable cart JSON | Discard it, start with an empty cart, do not crash |
| E3 | Cart contains unknown product ID | Remove the line with a notice |
| E4 | Product image fails to load | Show placeholder image |
| E5 | Search with special characters (`(`, `*`, `\`) | Treated as plain text, no crash (do not build regular expressions from raw input) |
| E6 | Shop WhatsApp number missing or invalid | Order button shows a configuration message; no broken link opened |
| E7 | Pop-up blocked when opening WhatsApp | Show a visible "Open WhatsApp" link/button the user can tap manually |
| E8 | WhatsApp not installed on desktop | `wa.me` opens WhatsApp Web or a download page; this is acceptable |
| E9 | Price or stock missing in the data | Product is skipped and logged in development |
| E10 | User opens checkout directly with an empty cart | Redirect to cart or show the empty-state with a link to the catalogue |
| E11 | Unknown URL | Friendly "Page not found" with a link to home |
| E12 | Double-click on the order button | Only one WhatsApp window opened per intended action (debounce or brief disabled state) |
| E13 | Same cart open in two browser tabs | Cart state reloads from `localStorage` on tab focus or via the `storage` event [O] |
| E14 | Very long product name | Truncated on cards with ellipsis; fully visible on detail page |
| E15 | Quantity input typed manually | Non-numbers rejected; values clamped to 1..effective maximum |
| E16 | Cart exceeds 20 lines | Add is rejected with a message |
| E17 | Message over 1,500 characters | Blocked with message (WA-6) |
| E18 | Stock reduced after item added | Handled by STK-5 |

---

# 24. Success Metrics and Acceptance Criteria

## 24.1 Success Metrics (to review about 1–3 months after launch)

Because Version 1 has no backend or analytics, metrics are collected manually:

| Metric | How measured | Initial target (to be agreed with owner) |
|---|---|---|
| Orders received through the website | Owner counts WhatsApp messages containing an `SDS-` reference | `[TARGET_TO_BE_AGREED]` |
| Message completeness | Owner checks sample orders for missing details | At least 95% complete |
| Customer feedback | Informal feedback from customers | Mostly positive |
| Owner effort | Owner reports whether updating products is manageable | "Manageable" |
| Mobile usability | Manual test on 3+ real phones | No blocking problems |

## 24.2 Version 1 Release Acceptance Criteria

Version 1 is accepted when **all** of the following are true:

1. All [M] requirements are implemented.
2. All acceptance-criteria tables in Sections 12–15 pass in manual testing (C1–C7, S1–S6, phone cases, W1–W9).
3. The site is usable at 320, 360, 390, 768, 1024, and 1440 px widths with no horizontal scrolling.
4. A real test order (using a test phone number or the owner's confirmed number) produces a correctly prefilled WhatsApp message.
5. All placeholders are either replaced with owner-supplied information or intentionally left visible as agreed with the owner.
6. `npm run build` completes without errors; `npm run lint` shows no errors.
7. The site is deployed over HTTPS, and the deployed site behaves the same as local.
8. No invented shop information, delivery promises, payment claims, or fake inventory is presented as real.
9. The owner has reviewed and approved the content, product data, and message format.

---

# 25. Out-of-Scope Features (Version 1)

The following must **not** be implemented in Version 1:

- Online payment (UPI gateway, cards, wallets, net banking).
- User registration, login, profiles, wishlists.
- Admin panel or product-editing web interface.
- Backend server, database, or API.
- Order history or order tracking.
- Automated WhatsApp sending (WhatsApp Business API), SMS, or email notifications.
- Automatic delivery charge calculation, pincode checks, or courier integration.
- Discount codes, offers, loyalty points.
- Product reviews and ratings.
- Multi-language support.
- Inventory auto-decrement after orders (stock is edited manually).
- Analytics and tracking tools.
- Native mobile apps.

---

# 26. Future Enhancements

| ID | Enhancement | Notes |
|---|---|---|
| FE-1 | Backend (Firebase or Supabase) for products and orders | Allows persistent order records |
| FE-2 | Admin dashboard with authentication | Owner edits products and stock without touching code |
| FE-3 | Online payments | Requires payment provider and compliance review |
| FE-4 | Order tracking and status updates | Needs database |
| FE-5 | WhatsApp Business API automation | Requires business verification |
| FE-6 | Per-variant stock (size/colour level) | Requires data structure change |
| FE-7 | Delivery area and charge rules | Needs owner-defined rules |
| FE-8 | Tamil language interface | Translations needed |
| FE-9 | Wishlist, product reviews | After accounts exist |
| FE-10 | Offers and discount codes | Business rules required |
| FE-11 | Analytics (privacy-respecting) | Requires privacy notice update |
| FE-12 | Progressive Web App / offline browsing | After core features are stable |
| FE-13 | Automated tests (unit + end-to-end) | Recommended as the project grows |

---

# 27. Assumptions, Constraints, and Risks

## 27.1 Assumptions

- Customers have WhatsApp installed on their phones.
- The owner will provide: shop WhatsApp number, address, opening hours, delivery area, product photos, prices, and stock.
- The owner is comfortable asking the developer to update the product data file, or can edit it with guidance.
- Customers are comfortable sending an order as a WhatsApp message.
- Order volume in Version 1 is small enough to be handled manually.

## 27.2 Constraints

- Static front-end only, no backend.
- Built with React, Vite, JavaScript, and CSS.
- Free or low-cost hosting.
- Developed by one student part-time, with AI assistance.
- Stock changes require editing the data file and redeploying.

## 27.3 Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Stock on website becomes outdated because it is edited manually | Customers order unavailable items | Shop confirms availability on WhatsApp; owner updates stock regularly; clear notice that availability is confirmed by the shop |
| Customer does not press Send in WhatsApp | Order never reaches the shop | Clear instructions and post-click reminder (WA-4) |
| Fake or incorrect orders (no authentication or payment) | Wasted time | Shop confirms by WhatsApp before processing |
| Product photos are large and slow the site | Poor mobile experience | Compress images; lazy-load; size guideline (NFR-02) |
| Owner information never supplied | Placeholders go live | Release checklist item 5 (Section 24.2) |
| `localStorage` cleared by the browser | Cart lost | Acceptable limitation; communicated in README |
| AI-generated code contains bugs | Wrong totals or messages | Manual testing against the acceptance tables; keep logic in small testable functions |
| Prices or product details out of sync between photos and data | Customer confusion | Owner reviews data before launch |
| WhatsApp URL length limits | Truncated message | Message length and cart line caps (WA-6, STK-7) |

---

# 28. Release Milestones

| Milestone | Deliverables | Exit criteria |
|---|---|---|
| **M0: Project setup** | Repository created, React + Vite scaffold, folder structure, ESLint, README and PRD committed | `npm run dev` works; first commit pushed to GitHub |
| **M1: Data and catalogue** | Category constants, sample product data (clearly labelled sample), product grid, product detail view, placeholder image | Products render responsively; inactive products hidden |
| **M2: Search and filter** | Search box, category filter, empty state | Section 12 acceptance criteria pass |
| **M3: Cart** | Cart logic, `localStorage` persistence, quantity controls, stock validation, header badge | C1–C7 and S1–S6 pass |
| **M4: Checkout and WhatsApp** | Checkout form and validation, order reference, message builder, WhatsApp link | Phone cases and W1–W9 pass |
| **M5: Polish and responsive QA** | Styling, accessibility pass, error states, privacy notice, placeholders for shop info | Tested at all required widths on real devices |
| **M6: Owner review** | Owner replaces/approves content, real product data and photos, WhatsApp number | Owner sign-off |
| **M7: Deployment (Version 1.0 release)** | Deployed to Vercel over HTTPS, final test order | Release acceptance criteria (24.2) all met |
| **M8: Post-launch review** | Collect owner and customer feedback; decide on future enhancements | Feedback summary written |

---

*End of USER_PRD.md*
