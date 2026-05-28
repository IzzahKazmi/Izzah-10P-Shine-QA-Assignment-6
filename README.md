# SauceDemo Cypress Automation Project

End-to-end UI test automation for [SauceDemo](https://www.saucedemo.com/) built with Cypress. Covers login flows, inventory validation, and product navigation using Page Object Model (POM) and reusable custom commands.

---

## Tech Stack

- **Cypress** — E2E testing framework
- **JavaScript** — Programming language
- **Node.js** — Runtime environment
- **Page Object Model** — Test architecture pattern

---

## Project Structure

```
saucedemo-cypress/
├── cypress/
│   ├── e2e/
│   │   ├── login.cy.js          # Login failure + success tests
│   │   ├── inventory.cy.js      # Product listing + sorting tests
│   │   └── product.cy.js        # Product detail page tests
│   ├── pages/
│   │   ├── LoginPage.js         # POM class for login page
│   │   ├── InventoryPage.js     # POM class for inventory page
│   │   └── ProductPage.js       # POM class for product detail page
│   ├── support/
│   │   ├── commands.js          # Custom reusable Cypress commands
│   │   └── e2e.js               # Global support file
│   └── fixtures/
│       └── users.json           # Test credentials
├── cypress.config.js            # Cypress configuration
├── package.json                 # Project dependencies
└── .gitignore
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

---

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/IzzahKazmi/Izzah-10P-Shine-QA-Assignment-6.git
cd IzzahKazmi/Izzah-10P-Shine-QA-Assignment-6
npm install
```

---

## Running Tests

**Open Cypress Test Runner (visual/interactive mode):**
```bash
npm run cy:open
```

**Run all tests headless (terminal output only):**
```bash
npm run cy:run
```

**Run in Chrome specifically:**
```bash
npm run cy:run:chrome
```

**Run a single test file:**
```bash
npx cypress run --spec "cypress/e2e/login.cy.js"
```

---

## Test Coverage

### Task 1 — Cypress Setup
- Initialized Node.js project
- Installed Cypress and configured `cypress.config.js`
- Set `baseUrl` to `https://www.saucedemo.com`
- Structured folders: `e2e/`, `pages/`, `support/`, `fixtures/`

### Task 2 — Login Failure Scenarios
**File:** `cypress/e2e/login.cy.js`

| Test | Description |
|------|-------------|
| Empty credentials | Verifies error shown when no input is given |
| Empty password | Verifies error when only username is entered |
| Wrong credentials | Verifies error for invalid username/password |
| Locked out user | Verifies locked account error message |
| Close error message | Verifies the X button dismisses the error |

### Task 3 — Login Success & Homepage Validation
**File:** `cypress/e2e/login.cy.js`

| Test | Description |
|------|-------------|
| Successful login | Verifies redirect to `/inventory.html` |
| Products visible | Verifies inventory list loads after login |
| Cart icon visible | Verifies shopping cart icon is present |
| Logout flow | Verifies user can log out via hamburger menu |

### Task 4 — Product Navigation & Validation
**Files:** `cypress/e2e/inventory.cy.js`, `cypress/e2e/product.cy.js`

| Test | Description |
|------|-------------|
| Product count | Verifies exactly 6 products are displayed |
| Product names | Verifies every product has a visible name |
| Product prices | Verifies every price matches `$X.XX` format |
| Add to Cart buttons | Verifies all 6 buttons are present |
| Sort by price | Verifies low-to-high price sort is correct |
| Sort by name | Verifies A-to-Z name sort is correct |
| Product detail page | Verifies clicking a product loads detail page |
| Price on detail page | Verifies price is shown on product detail |
| Description shown | Verifies product description is visible |
| Back button | Verifies back button returns to inventory |

### Task 5 — Custom Commands
**File:** `cypress/support/commands.js`

| Command | Description |
|---------|-------------|
| `cy.login(username, password)` | Visits login page and logs in with given credentials |
| `cy.loginAsStandardUser()` | Shortcut to log in as `standard_user` |
| `cy.loginFromFixture(userType)` | Logs in using credentials from `users.json` |
| `cy.verifyOnInventoryPage()` | Asserts URL and inventory list are correct |
| `cy.verifyErrorMessage(text)` | Asserts error message contains given text |
| `cy.goToProduct(index)` | Clicks product by index on inventory page |
| `cy.goBackToInventory()` | Clicks back button and verifies return |
| `cy.openMenu()` | Opens the hamburger side menu |
| `cy.logout()` | Logs out via hamburger menu |
| `cy.addFirstProductToCart()` | Adds first product to cart |
| `cy.verifyCartCount(count)` | Verifies cart badge shows expected number |

### Task 6 — Page Object Model (POM)
**Files:** `cypress/pages/LoginPage.js`, `cypress/pages/InventoryPage.js`, `cypress/pages/ProductPage.js`

Each page class contains:
- **Selectors** as getter properties (e.g. `get usernameInput()`)
- **Action methods** (e.g. `login()`, `sortBy()`, `goBack()`)
- **Assertion methods** (e.g. `shouldShowError()`, `shouldBeVisible()`)

All three test files (`login.cy.js`, `inventory.cy.js`, `product.cy.js`) use both POM classes and custom commands together.

---

## Test Credentials

Credentials are stored in `cypress/fixtures/users.json`.

SauceDemo is a public test site with documented credentials:

| User Type | Username | Password |
|-----------|----------|----------|
| Standard user | `standard_user` | `secret_sauce` |
| Locked out user | `locked_out_user` | `secret_sauce` |
| Invalid user | `wrong_user` | `wrong_pass` |

---

## Key Design Decisions

**Why Page Object Model?**
Separates page selectors and actions from test logic. If SauceDemo changes a selector, you update it in one place (the page class) instead of every test file.

**Why Custom Commands?**
Eliminates repeated code like the login steps that would otherwise appear in the `beforeEach` of every test suite. Makes tests shorter and easier to read.

**Why Fixtures?**
Keeps test data out of test code. Credentials and other data live in `users.json` so they can be updated without touching test logic.
