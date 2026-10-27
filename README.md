# Sri Devibala Sarees

A responsive online shopping website for **Sri Devibala Sarees**, a local Indian clothing and accessories retail shop. Customers browse products, add them to a cart, and send their order to the shop through a **prefilled WhatsApp message**.

> **Status:** Version 1.0 Implemented & Tested. Fully functioning React + Vite static boutique shopping website.
> Product requirements are documented in [`USER_PRD.md`](./USER_PRD.md).

---

## Table of Contents

1. [Project Purpose](#project-purpose)
2. [Key Features](#key-features)
3. [Product Categories](#product-categories)
4. [Screenshots](#screenshots)
5. [Technology Stack](#technology-stack)
6. [Website Architecture and Folder Structure](#website-architecture-and-folder-structure)
7. [Prerequisites](#prerequisites)
8. [Installation](#installation)
9. [Run the Development Server](#run-the-development-server)
10. [Build and Preview for Production](#build-and-preview-for-production)
11. [Environment and Configuration](#environment-and-configuration)
12. [Configure the Shop WhatsApp Number](#configure-the-shop-whatsapp-number)
13. [Add, Edit, or Remove Products](#add-edit-or-remove-products)
14. [Add Product Images](#add-product-images)
15. [How the Cart and WhatsApp Ordering Flow Works](#how-the-cart-and-whatsapp-ordering-flow-works)
16. [Git Initialization and GitHub Push](#git-initialization-and-github-push)
17. [Testing Checklist](#testing-checklist)
18. [Deploy to Vercel](#deploy-to-vercel)
19. [Troubleshooting](#troubleshooting)
20. [Privacy and Security Notes](#privacy-and-security-notes)
21. [Limitations of the Initial Version](#limitations-of-the-initial-version)
22. [Future Improvements](#future-improvements)
23. [Contributing](#contributing)
24. [License](#license)
25. [Author](#author)

---

## Project Purpose

Many local shops sell mainly through phone calls and WhatsApp chats. This project gives **Sri Devibala Sarees** a simple online catalogue so that customers can:

- See the shop's products, prices, and categories in one place.
- Build an order with the right sizes, colours, and quantities.
- Send a clear, complete order request to the shop on WhatsApp.

The shop then confirms product availability, delivery charges, and order acceptance on WhatsApp. **Version 1 does not take online payments.**

---

## Key Features

- Mobile-first responsive design (phones, tablets, desktops)
- Product catalogue with images, descriptions, and prices in INR (₹)
- Category filter and text search (they work together)
- Product detail view with size/colour options and quantity selection
- Shopping cart with quantity update, item removal, subtotal, and total
- Stock availability display and stock validation
- Cart saved in the browser (`localStorage`)
- Checkout form: name, phone number, delivery address, optional note
- Form validation (Indian 10-digit mobile number, address length, etc.)
- Order reference for each order message (format `SDS-YYYYMMDD-XXXX`)
- WhatsApp click-to-chat with a prefilled order message
- Clearly marked placeholders for shop details that the owner has not yet supplied

---

## Product Categories

- Sarees
- Nighties
- Inner skirts
- Chudidhar materials
- Hair clips
- Chains
- Earrings

---

## Screenshots

> Screenshots will be added after the user interface is built. Do not add screenshots that do not belong to this project.

| Screen | Screenshot |
|---|---|
| Home / product catalogue (mobile) | `[SCREENSHOT_PLACEHOLDER]` |
| Home / product catalogue (desktop) | `[SCREENSHOT_PLACEHOLDER]` |
| Product details | `[SCREENSHOT_PLACEHOLDER]` |
| Shopping cart | `[SCREENSHOT_PLACEHOLDER]` |
| Checkout form | `[SCREENSHOT_PLACEHOLDER]` |
| WhatsApp prefilled message | `[SCREENSHOT_PLACEHOLDER]` |

When you have real screenshots, save them in a `docs/screenshots/` folder and reference them like this:

```md
![Home page on mobile](docs/screenshots/home-mobile.png)
```

---

## Technology Stack

| Purpose | Technology |
|---|---|
| UI library | React |
| Build tool / dev server | Vite |
| Language | JavaScript |
| Styling | CSS |
| Routing (proposed) | React Router (`react-router-dom`) |
| Cart persistence | Browser `localStorage` |
| Product data (Version 1) | Local data file in the project |
| Order submission | WhatsApp click-to-chat (`wa.me` links) |
| Version control | Git and GitHub |
| Hosting (recommended) | Vercel (or another static hosting provider) |

**Not included in Version 1:** database, backend server, user login, payment gateway, automated notifications. Firebase or Supabase may be considered in the future.

---

## Website Architecture and Folder Structure

The site is a **static single-page application**. All logic runs in the browser. There is no server and no database.

```text
Product data file ──► React app ──► Cart (localStorage)
                                        │
                              Checkout form (in memory only)
                                        │
                          Build WhatsApp message + wa.me link
                                        │
                     Customer presses Send in WhatsApp (manual)
                                        │
                      Shop confirms availability and delivery
```

### Proposed folder structure

> This is a **proposed** structure. Adjust it to match the real project as you build.

```text
sri-devibala-sarees/
├── public/
│   └── images/
│       ├── placeholder-product.jpg
│       └── products/
│           ├── sarees/
│           ├── nighties/
│           ├── inner-skirts/
│           ├── chudidhar-materials/
│           ├── hair-clips/
│           ├── chains/
│           └── earrings/
├── src/
│   ├── components/        # Header, ProductCard, CategoryFilter, SearchBar, CartItem, Footer, etc.
│   ├── pages/             # HomePage, ProductPage, CartPage, CheckoutPage, NotFoundPage
│   ├── context/           # CartContext (cart state shared across pages)
│   ├── data/
│   │   └── products.js    # Product data (edit this to manage products)
│   ├── config/
│   │   ├── categories.js  # The seven categories
│   │   └── shopConfig.js  # Shop name, placeholder contact details, business constants
│   ├── utils/
│   │   ├── cart.js            # Cart calculations and stock validation
│   │   ├── validation.js      # Name, phone, address validation
│   │   ├── whatsapp.js        # Order reference and WhatsApp message/link builder
│   │   └── format.js          # Currency formatting
│   ├── styles/            # CSS files
│   ├── App.jsx
│   └── main.jsx
├── docs/
│   └── screenshots/
├── .env.example           # Example environment variables (safe to commit)
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── vercel.json            # Rewrites so page refresh works on Vercel
├── USER_PRD.md
└── README.md
```

---

## Prerequisites

Install these before starting:

| Tool | Notes | Check command |
|---|---|---|
| Node.js | Use a current LTS version. Check [vite.dev](https://vite.dev) for the minimum version required by the current Vite release. | `node -v` |
| npm | Comes with Node.js | `npm -v` |
| Git | For version control | `git --version` |
| GitHub account | To host the repository | n/a |
| Code editor | Antigravity IDE (or any editor, such as VS Code) | n/a |
| Vercel account | For deployment (free plan is available) | n/a |

---

## Installation

### Option A: The project code already exists (clone it)

Replace the placeholder with your own repository URL:

```bash
git clone <YOUR_REPOSITORY_URL>
cd sri-devibala-sarees
npm install
```

### Option B: Starting from scratch

```bash
npm create vite@latest sri-devibala-sarees -- --template react
cd sri-devibala-sarees
npm install
npm install react-router-dom
```

If the command asks questions in your terminal, choose **React** and **JavaScript**. Then copy `USER_PRD.md` and this `README.md` into the project root.

---

## Run the Development Server

```bash
npm run dev
```

Vite prints a local address in the terminal (usually `http://localhost:5173`). Open it in your browser. The page refreshes automatically when you save files.

**Test on your phone (same Wi-Fi network):**

```bash
npm run dev -- --host
```

Then open the "Network" address shown in the terminal on your phone.

Stop the server with `Ctrl + C`.

---

## Build and Preview for Production

```bash
npm run build      # creates the optimized "dist" folder
npm run preview    # serves the built site locally to check it
npm run lint       # checks code quality (if ESLint is set up by the template)
```

Always run `npm run build` successfully before deploying.

---

## Environment and Configuration

Vite reads environment variables from files such as `.env` and `.env.local`. Only variables that start with `VITE_` are available in the browser code.

> **Important:** Anything in a `VITE_` variable becomes part of the public website code. Never put passwords, API secrets, or private keys in it. The shop's WhatsApp number is public information, so it is fine here.

| Variable | Required | Description |
|---|---|---|
| `VITE_WHATSAPP_NUMBER` | Yes (before launch) | Shop WhatsApp number in international format, digits only (no `+`, spaces, or leading zeros) |

**Create your local environment file:**

`.env.example` (committed to Git, contains only a placeholder):

```bash
VITE_WHATSAPP_NUMBER=REPLACE_WITH_SHOP_NUMBER_IN_INTERNATIONAL_FORMAT
```

Copy it to a real local file:

```bash
# macOS / Linux / Git Bash
cp .env.example .env.local

# Windows PowerShell
Copy-Item .env.example .env.local
```

`.env.local` should be listed in `.gitignore` (the Vite template ignores `*.local` files by default; verify this).

After changing any environment variable, **stop and restart** `npm run dev`.

Other shop details (address, opening hours, delivery area) live in `src/config/shopConfig.js` as clearly marked placeholders:

```js
// src/config/shopConfig.js (proposed example)
export const SHOP = {
  name: "Sri Devibala Sarees",
  address: "[SHOP_ADDRESS_PLACEHOLDER]",
  phoneDisplay: "[SHOP_PHONE_PLACEHOLDER]",
  openingHours: "[OPENING_HOURS_PLACEHOLDER]",
  deliveryArea: "[DELIVERY_AREA_TO_BE_PROVIDED_BY_SHOP]",
};

export const LIMITS = {
  MAX_QTY_PER_PRODUCT: 10,
  MAX_CART_LINES: 20,
  MAX_MESSAGE_LENGTH: 1500,
};

export const CART_STORAGE_KEY = "sri-devibala-sarees-cart";
```

> Do **not** replace placeholders with guessed information. Replace them only with details given by the shop owner.

---

## Configure the Shop WhatsApp Number

1. Get the shop's WhatsApp number from the owner.
2. Convert it to **international format, digits only**. For an Indian number, this is `91` followed by the 10-digit mobile number.
   - Format: `91XXXXXXXXXX` (12 digits in total)
   - Do **not** include `+`, spaces, dashes, or a leading `0`.
3. Put it in `.env.local`:

   ```bash
   VITE_WHATSAPP_NUMBER=91XXXXXXXXXX
   ```

   (Replace `XXXXXXXXXX` with the real 10 digits.)
4. Restart the dev server.
5. On Vercel, add the same variable in **Project Settings → Environment Variables**, then redeploy (see [Deploy to Vercel](#deploy-to-vercel)).

**How the number is used in code (proposed example):**

```js
// src/utils/whatsapp.js (proposed example)
const number = import.meta.env.VITE_WHATSAPP_NUMBER;

// A valid Indian number here is "91" followed by 10 digits
export const isWhatsAppConfigured = /^91\d{10}$/.test(number ?? "");

export function buildWhatsAppLink(message) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
```

If the number is missing, still a placeholder, or not in the expected format, the website should show a "Shop WhatsApp number not configured" message instead of opening WhatsApp.

---

## Add, Edit, or Remove Products

All products are in one file: **`src/data/products.js`**.

### Product format

```js
{
  id: "saree-001",
  name: "Sample Cotton Saree",
  description: "Short description of the product.",
  category: "sarees",
  price: 1500,
  images: ["/images/products/sarees/saree-001-1.jpg"],
  sizes: [],
  colours: ["Red", "Green"],
  stock: 5,
  isActive: true
}
```

### Field rules

| Field | Rule |
|---|---|
| `id` | Unique, lowercase, letters/numbers/hyphens. **Never reuse or change an ID after publishing** (customers' saved carts use it). |
| `name` | Required text |
| `description` | Required short text |
| `category` | One of: `sarees`, `nighties`, `inner-skirts`, `chudidhar-materials`, `hair-clips`, `chains`, `earrings` |
| `price` | Whole number in rupees (no ₹ symbol, no commas, no decimals) |
| `images` | List of image paths; the first one is the main image |
| `sizes` | List of sizes, or `[]` if not applicable |
| `colours` | List of colours, or `[]` if not applicable |
| `stock` | Whole number, `0` or more. `0` shows "Out of stock" |
| `isActive` | `true` to show, `false` to hide |

### Common tasks

**Add a product:** copy an existing product object, give it a new unique `id`, update the fields, and save.

**Edit a product:** change the name, price, stock, or images and save.

**Mark as out of stock:** set `stock: 0`.

**Temporarily hide a product:** set `isActive: false` (recommended over deleting).

**Remove a product permanently:** delete its object from the list. Customers who had it in their saved cart will see it removed with a notice.

> Sample products must be clearly named as samples (for example "Sample Cotton Saree") until the owner provides real products. Do not invent real prices or stock levels.

After editing, check the site locally, then commit and push your changes so Vercel redeploys.

---

## Add Product Images

1. Take clear photos in good light with a plain background if possible.
2. Resize and compress them before adding. **Recommended:** about 800–1000 px on the longest side and under 200 KB per image (JPG or WebP). Free tools such as Squoosh can help.
3. Name files clearly, in lowercase with hyphens, for example `saree-001-1.jpg`.
4. Place them in the matching folder:

   ```text
   public/images/products/sarees/saree-001-1.jpg
   ```
5. Reference them in `products.js` **starting with `/images/...`** (not `/public/images/...`):

   ```js
   images: ["/images/products/sarees/saree-001-1.jpg"]
   ```
6. Keep a neutral fallback image at `public/images/placeholder-product.jpg`; the website uses it if an image is missing.

> Only upload photos that the shop owns or has permission to use.

---

## How the Cart and WhatsApp Ordering Flow Works

1. **Browse:** The customer searches or filters by category.
2. **Add to cart:** For products with sizes or colours, the customer must choose them first. Quantity cannot exceed available stock (or the maximum of 10 per product by default).
3. **Cart:** Each line shows price, quantity, and line total. The subtotal and total update instantly. The cart is saved in `localStorage`.
4. **Checkout:** The customer enters name, phone, and delivery address (note is optional). The form is validated.
5. **Order on WhatsApp:** The website re-checks stock, creates an order reference such as `SDS-20261027-K7M2`, builds the message, and opens a WhatsApp link: `https://wa.me/<shop number>?text=<encoded message>`
6. **Customer sends the message:** **The customer must press Send in WhatsApp.** Until then, no order has been sent to the shop.
7. **Shop confirms:** The shop replies on WhatsApp to confirm availability, delivery charges, and acceptance. Payment is arranged by the shop after confirmation.

**Example prefilled message:**

```text
Hello Sri Devibala Sarees, I would like to place an order.

Order Reference: SDS-20261027-K7M2
Date: 27 Oct 2026

CUSTOMER DETAILS
Name: Sample Customer
Phone: +91 9XXXXXXXXX
Delivery Address: Sample address line, Sample area
Note: None

ORDER ITEMS
1. Sample Cotton Saree (Colour: Red)
   Qty: 1 x ₹1,500 = ₹1,500
2. Sample Hair Clip
   Qty: 2 x ₹50 = ₹100

Subtotal: ₹1,600
Total (excluding delivery charges): ₹1,600

Please confirm availability, delivery charges, and the final amount. Thank you.
```

The message above is illustrative only; names, prices, and numbers are sample values.

For the complete business rules, see [`USER_PRD.md`](./USER_PRD.md) (Sections 13–16).

---

## Git Initialization and GitHub Push

### 1. Initialise Git (only if the project is not already a Git repository)

```bash
git init
git add .
git commit -m "Initial commit: project setup"
git branch -M main
```

> The Vite template usually creates a suitable `.gitignore`. Check that it contains `node_modules`, `dist`, and `*.local` (or `.env.local`).

### 2. Create an empty repository on GitHub

On github.com, click **New repository**, choose a name, and **do not** add a README, `.gitignore`, or license (you already have them locally). Copy the repository URL GitHub shows you.

### 3. Connect and push

```bash
git remote add origin <YOUR_REPOSITORY_URL>
git push -u origin main
```

### 4. Everyday workflow

```bash
git status
git add .
git commit -m "Describe what you changed"
git push
```

### Suggested commit messages

```text
Add product data and category constants
Implement cart calculations and stock validation
Add checkout form validation
Add WhatsApp message builder
Fix cart badge count after item removal
```

### Optional: work on branches

```bash
git checkout -b feature/cart
# ...make changes...
git add .
git commit -m "Add cart quantity controls"
git push -u origin feature/cart
```

Then open a Pull Request on GitHub.

---

## Testing Checklist

Version 1 has no automated tests by default. Test manually before every release. Business rules are in [`USER_PRD.md`](./USER_PRD.md).

### Catalogue, search, and filter
- [ ] All active products are shown; `isActive: false` products are hidden
- [ ] Each of the seven categories filters correctly; "All" shows everything
- [ ] Search is case-insensitive and ignores extra spaces
- [ ] Search and category filter work together
- [ ] "No products found" message appears when nothing matches
- [ ] Out-of-stock products show "Out of stock" and cannot be added
- [ ] Missing image shows the placeholder image

### Cart
- [ ] Add 1 item at ₹1,500: line total and total show ₹1,500
- [ ] Add 2 × ₹250 and 3 × ₹99: subtotal is ₹797
- [ ] Same product + same size/colour merges into one line
- [ ] Same product with different size/colour creates separate lines
- [ ] Quantity cannot go below 1 or above stock (or 10)
- [ ] Remove button deletes the line and updates totals
- [ ] Header cart badge matches the total quantity
- [ ] Cart persists after page refresh
- [ ] Setting stock lower in `products.js` reduces/removes saved cart items with a notice
- [ ] Empty cart shows empty state; checkout is disabled

### Checkout
- [ ] Empty name, invalid phone, and short address show errors and do not open WhatsApp
- [ ] Phone examples: `9876543210` ✅, `+91 98765 43210` ✅, `1234567890` ❌, `98765` ❌
- [ ] Valid form opens WhatsApp exactly once per click

### WhatsApp message
- [ ] Message contains order reference, name, phone, address, items, quantities, prices, and total
- [ ] Special characters in address (`&`, `#`, `%`, new lines) appear correctly
- [ ] Message total equals the checkout page total
- [ ] Missing/placeholder WhatsApp number shows a configuration message
- [ ] The site never says the order is "confirmed" or "placed" before the shop replies

### Responsive and general
- [ ] Layout works at 320, 360, 390, 768, 1024, and 1440 px without horizontal scrolling
- [ ] Tested on at least one real Android phone and one iPhone, if available
- [ ] Buttons are easy to tap on mobile
- [ ] `npm run build` and `npm run lint` pass
- [ ] No placeholder text remains visible by accident on the live site

---

## Deploy to Vercel

### 1. Prepare

- Make sure `npm run build` works locally.
- Push your latest code to GitHub (see [Git section](#git-initialization-and-github-push)).
- If you use React Router, add a `vercel.json` file in the project root so refreshing a page such as `/cart` does not give a 404 error:

  ```json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  }
  ```

### 2. Import the project

1. Log in to [vercel.com](https://vercel.com) (you can sign in with GitHub).
2. Click **Add New → Project**.
3. Select your GitHub repository (grant access if asked).
4. Vercel should detect **Vite** automatically. Verify these settings:

   | Setting | Value |
   |---|---|
   | Framework Preset | Vite |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |
   | Install Command | `npm install` |

### 3. Add environment variables

In **Environment Variables**, add:

| Name | Value |
|---|---|
| `VITE_WHATSAPP_NUMBER` | `91XXXXXXXXXX` (the real shop number, digits only) |

### 4. Deploy

Click **Deploy**. When it finishes, Vercel shows your website address.

### 5. Future updates

Push to your `main` branch (`git push`); Vercel redeploys automatically.

> **Environment variable changes need a redeploy.** Vite embeds these values at build time. After changing one in Vercel, trigger a new deployment (Deployments → ⋯ → Redeploy).

### 6. After deploying

- Open the live site on a real phone.
- Place a test order and check the WhatsApp message (do not press Send unless the shop owner agrees to receive a test message).
- Confirm all placeholders have either been replaced by owner-approved information or are intentionally left as agreed.

---

## Troubleshooting

| Problem | Likely cause | Fix |
|---|---|---|
| `npm: command not found` / `node: command not found` | Node.js not installed or not on PATH | Install Node.js LTS, then reopen the terminal |
| `npm install` fails with network or permission errors | Network issue, or running in a protected folder | Check internet; avoid system folders; re-run `npm install` |
| Vite complains about Node version | Node.js too old | Upgrade Node.js to a current LTS version |
| Port `5173` already in use | Another dev server is running | Vite normally switches to the next free port (for example `5174`); read the address printed in the terminal, or close the other terminal, or run `npm run dev -- --port 3000` |
| Blank white page | JavaScript error | Open browser DevTools → Console and read the first red error |
| `Failed to resolve import` | Wrong file path or missing package | Check spelling/case of the file path; run `npm install <package>` |
| Product image not showing | Wrong path or file name | Path must start with `/images/...` and match file name and letter case exactly; file must be inside `public/images/...` |
| Images work locally but not on Vercel | File names differ in letter case (Vercel is case-sensitive) | Make file names and `products.js` paths match exactly, in lowercase |
| WhatsApp opens with "invalid number" or wrong chat | Number format is wrong | Use digits only in international format: `91XXXXXXXXXX`; no `+`, spaces, or leading `0` |
| WhatsApp number change has no effect | Dev server not restarted, or Vercel not redeployed | Restart `npm run dev`; redeploy on Vercel |
| `import.meta.env.VITE_WHATSAPP_NUMBER` is `undefined` | Variable name lacks `VITE_` prefix, or file named wrongly | Use exactly `VITE_WHATSAPP_NUMBER` in `.env.local`; restart server |
| Message is cut off or WhatsApp does not open | Message too long, or pop-up blocked | Reduce cart size; allow pop-ups; use the manual "Open WhatsApp" link shown by the site |
| Cart does not save | Private browsing or storage blocked | Use a normal browser window; check browser storage settings |
| Old/corrupted cart causes odd behaviour | Bad data in `localStorage` | In DevTools → Application → Local Storage, delete the key `sri-devibala-sarees-cart` |
| 404 error when refreshing `/cart` on Vercel | Missing SPA rewrite | Add the `vercel.json` rewrite shown above and redeploy |
| `git push` rejected | Remote has commits you do not have | Run `git pull --rebase origin main`, resolve conflicts if any, then `git push` |
| `git push` asks for a password and fails | GitHub no longer accepts account passwords for Git over HTTPS | Sign in with a personal access token, GitHub CLI, or SSH key (see GitHub documentation) |
| Build fails on Vercel but works locally | Missing dependency in `package.json`, or case-sensitive file name issue | Run `npm install <package>` so it is saved; check import path capitalisation |

---

## Privacy and Security Notes

- Customer **name, phone number, and address are used only to prepare the WhatsApp message.** The website does not store them, and does not send them to any server run by this project.
- Only the cart (product IDs, options, quantities) is saved in the browser's `localStorage`.
- Once the customer presses Send, the message is handled by WhatsApp and received by the shop. Please refer to WhatsApp's own privacy policy for how it handles messages.
- No analytics, advertising scripts, or trackers are included in Version 1.
- Never commit passwords, API keys, or private tokens. `.env.local` should stay out of Git. Remember that `VITE_` variables are public in the built website.
- User-entered text must be displayed as plain text only (never inserted as HTML).
- Run `npm audit` periodically and keep dependencies updated.
- The live website is served over HTTPS by Vercel.

---

## Limitations of the Initial Version

- **No backend or database.** Orders are not saved anywhere by the website; they exist only as WhatsApp messages.
- **No automatic notifications.** The customer must manually press Send in WhatsApp; the website cannot know whether the message was sent.
- **No online payments.** Payment is arranged between the shop and the customer.
- **No delivery charge calculation.** The total shown excludes delivery charges, which the shop confirms. Delivery is local only.
- **Stock is edited manually** in `products.js` and is not reduced automatically when orders arrive. Availability is confirmed by the shop.
- **Stock is tracked per product**, not per size/colour.
- **No user accounts, order history, or order tracking.**
- **No admin panel.** Product changes require editing the data file (and redeploying).
- The cart is stored per browser and device; it does not sync between devices.
- English-only interface.
- Shop contact details, opening hours, and delivery area are placeholders until the owner provides them.

---

## Future Improvements

- Backend with Firebase or Supabase for products and orders
- Admin dashboard with login so the owner can manage products and stock without code
- Online payment options
- Order records, status updates, and tracking
- WhatsApp Business API automation
- Per-size/colour stock tracking
- Delivery area and charge rules
- Tamil language support
- Product sorting, price filters, and image galleries
- Offers and discount codes
- Wishlist and reviews
- Progressive Web App (installable, offline browsing)
- Automated tests (unit tests for cart and message logic, end-to-end tests)

---

## Contributing

This is a student project built for a real local shop. Suggestions and improvements are welcome.

1. **Open an issue first** to discuss bigger changes (bugs, ideas, questions).
2. **Fork** the repository and create a branch:

   ```bash
   git checkout -b feature/short-description
   ```
3. Make small, focused changes and follow the existing code style.
4. Run the checks before committing:

   ```bash
   npm run lint
   npm run build
   ```
5. Test the cart, checkout, and WhatsApp message manually (see the [Testing Checklist](#testing-checklist)).
6. Commit with a clear message and push your branch:

   ```bash
   git commit -m "Add short description of your change"
   git push -u origin feature/short-description
   ```
7. Open a **Pull Request** describing what you changed and why.

**Please do not:**
- Add real customer data, secrets, or private shop information to the repository.
- Add features marked out of scope in `USER_PRD.md` without discussing them first.
- Invent shop details, prices, inventory, or delivery promises.
- Upload images you do not have permission to use.

Be respectful and kind in all discussions.

---

## License

`[LICENSE_PLACEHOLDER]`

> No license has been chosen yet. Decide with the project owner whether the code will be open source or private, then add a `LICENSE` file and update this section. Until a license is added, the code is not automatically open source: by default, all rights remain with the author(s).
> A resource such as [choosealicense.com](https://choosealicense.com) can help you choose.

---

## Author

| Field | Details |
|---|---|
| Developer | `[AUTHOR_NAME_PLACEHOLDER]` |
| Institution / Course | `[B.Tech CSBS, COLLEGE_NAME_PLACEHOLDER]` |
| GitHub | `[GITHUB_PROFILE_URL_PLACEHOLDER]` |
| Email | `[EMAIL_PLACEHOLDER]` |
| Shop owner | `[SHOP_OWNER_NAME_PLACEHOLDER]` |
| Live website | `[DEPLOYED_WEBSITE_URL_PLACEHOLDER]` |

---

*Documentation for requirements and business rules: [`USER_PRD.md`](./USER_PRD.md)*
