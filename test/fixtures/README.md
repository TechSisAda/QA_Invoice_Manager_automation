# Test Fixtures

Place the following files in this directory before running tests:

| File | Used by | Description |
|------|---------|-------------|
| `sample-invoices.csv` | REG-AI-001 | CSV with at least 2 invoice rows (vendor name, date, amount, VAT) |
| `sample-invoice.pdf` | REG-AI-002, REG-AI-004, REG-AI-005, E2E-003 | A single-page PDF invoice with line items and VAT |
| `scanned-invoice.pdf` | E2E-003 | A scanned/image-based invoice PDF |
| `large-file-over-10mb.pdf` | REG-AI-003 | Any PDF over 10MB to test the file size rejection |

These files are excluded from git via `.gitignore` to avoid committing potentially sensitive test data.
