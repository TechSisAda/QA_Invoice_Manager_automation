# InvoiceManager — QA Automation Suite

WebdriverIO test automation for the [InvoiceManager](https://app.invoicemanager.ng) platform.

**Stack:** WebdriverIO · Mocha · Spec Reporter · Allure Reporter · Claude AI Agent

---

## Suites

| Suite | Files | Count | When |
|-------|-------|-------|------|
| Smoke | `test/specs/smoke/` | 7 | Every deploy |
| Regression | `test/specs/regression/` | ~40 | Every PR merge |
| E2E | `test/specs/e2e/` | 4 | Nightly |

---

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy and fill environment variables
cp .env.example .env
```

Fill `.env`:
```
BASE_URL=https://app.invoicemanager.ng
TEST_EMAIL=your-test-user@example.com
TEST_PASS=your-password
ANTHROPIC_API_KEY=your-key   # only needed for the AI agent
```

Add test fixture files — see `test/fixtures/README.md`.

---

## Running Tests

```bash
npm run test:smoke        # Smoke suite
npm run test:regression   # Regression suite
npm run test:e2e          # E2E suite
npm run test:all          # Everything
```

## Reports

```bash
npm run report:generate   # Build Allure HTML report from results
npm run report:open       # Open it in the browser
```

---

## AI Test Agent

The agent runs tests, reads Allure results, and auto-fixes test-code failures.

```bash
# Run smoke tests and auto-fix failures
node agent/test-runner-agent.js "Run smoke tests and fix any failures"

# Run regression suite and report
node agent/test-runner-agent.js "Run regression tests and summarise what failed and why"

# Diagnose a specific test
node agent/test-runner-agent.js "Why is REG-FIRS-001 failing? Read the spec and the Allure result."
```

---

## Project Structure

```
test/
├── specs/
│   ├── smoke/            # SM-001 to SM-007
│   ├── regression/       # REG-AS, REG-TIN, REG-INV, REG-FIRS, REG-POS, REG-AI, REG-DASH, REG-CUST, REG-PS
│   └── e2e/              # E2E-001 to E2E-004
├── pageobjects/          # Page Object Model classes
├── helpers/              # Allure helpers, test data
└── fixtures/             # Sample CSV, PDF files (not committed)
agent/
└── test-runner-agent.js  # Claude-powered test agent
.github/workflows/ci.yml  # GitHub Actions CI pipeline
```

---

## CI / GitHub Actions

- **Push / PR to main:** Smoke → Regression (sequential, regression only runs if smoke passes)
- **Nightly (01:00 UTC):** AI agent runs the full E2E suite and posts a report

Add these secrets to your GitHub repository:
- `STAGING_URL`
- `TEST_EMAIL`
- `TEST_PASS`
- `ANTHROPIC_API_KEY`
