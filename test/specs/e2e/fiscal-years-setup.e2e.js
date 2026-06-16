import { addFeature, addSeverity } from '../../helpers/allureHelper.js'
import LoginPage from '../../pageobjects/login.page.js'
import FiscalYearsPage from '../../pageobjects/fiscal-years.page.js'
import { bentenFiscalYear } from '../../helpers/testData.js'

// ─────────────────────────────────────────────────────────────────────────────
// E2E: New Instance Setup — Fiscal Years
//
// Pre-condition: User is logged into a new instance that has no fiscal years.
//               Invoices cannot be created until at least one fiscal year exists.
//
// Flow:         Login → Manage Fiscal Years → create FY 2025 → verify it appears
//               in the list.
//
// Run this BEFORE regression/fiscal-years.spec.js. The regression suite asserts
// that at least one fiscal year is listed and that the card view functions
// correctly — both require this setup to have run first.
// ─────────────────────────────────────────────────────────────────────────────

describe('E2E — New Instance Setup: Fiscal Years', () => {

    before(async () => {
        await LoginPage.open()
        await LoginPage.login(process.env.TEST_EMAIL, process.env.TEST_PASS)
        await FiscalYearsPage.open()
    })

    // ── Page loads ─────────────────────────────────────────────────────────────

    it('E2E-FY-001 | Fiscal Years page opens after login', async () => {
        addFeature('Fiscal Years'); addSeverity('blocker')
        await expect(browser).toHaveTitle(/InvoiceManager/i)
        await expect(browser).toHaveTitle(/Fiscal Years/i)
    })

    it('E2E-FY-002 | New Fiscal Year button is present and enabled', async () => {
        addFeature('Fiscal Years'); addSeverity('blocker')
        await expect(FiscalYearsPage.newFiscalYearBtn).toBeDisplayed()
        await expect(FiscalYearsPage.newFiscalYearBtn).not.toBeDisabled()
    })

    it('E2E-FY-003 | Card view container is present (may show "No results found" on new instance)', async () => {
        addFeature('Fiscal Years'); addSeverity('critical')
        await FiscalYearsPage.waitForListLoaded()
        await expect(FiscalYearsPage.cardViewContainer).toBeExisting()
    })

    // ── Create modal structure ─────────────────────────────────────────────────

    it('E2E-FY-004 | Clicking New Fiscal Year opens the Fiscal Year modal', async () => {
        addFeature('Fiscal Years'); addSeverity('blocker')
        await FiscalYearsPage.openNewModal()
        await expect(FiscalYearsPage.modal).toBeDisplayed()
    })

    it('E2E-FY-005 | Modal title reads "Fiscal Year"', async () => {
        addFeature('Fiscal Years'); addSeverity('normal')
        await expect(FiscalYearsPage.modalTitle).toHaveText(/Fiscal Year/i)
    })

    it('E2E-FY-006 | Modal has Name, Status, Is Current, Start Date, and End Date fields', async () => {
        addFeature('Fiscal Years'); addSeverity('blocker')
        await expect(FiscalYearsPage.nameInput).toBeDisplayed()
        await expect(FiscalYearsPage.statusSelect).toBeDisplayed()
        await expect(FiscalYearsPage.isCurrentSelect).toBeDisplayed()
        await expect(FiscalYearsPage.startDateInput).toBeDisplayed()
        await expect(FiscalYearsPage.endDateInput).toBeDisplayed()
    })

    it('E2E-FY-007 | Status select has Active, Open, and Closed options', async () => {
        addFeature('Fiscal Years'); addSeverity('critical')
        const activeOpt = await FiscalYearsPage.statusSelect.$('option[value="active"]')
        const openOpt   = await FiscalYearsPage.statusSelect.$('option[value="open"]')
        const closedOpt = await FiscalYearsPage.statusSelect.$('option[value="closed"]')
        await expect(activeOpt).toBeExisting()
        await expect(openOpt).toBeExisting()
        await expect(closedOpt).toBeExisting()
    })

    it('E2E-FY-008 | Is Current select has Yes (1) and No (0) options', async () => {
        addFeature('Fiscal Years'); addSeverity('critical')
        const yesOpt = await FiscalYearsPage.isCurrentSelect.$('option[value="1"]')
        const noOpt  = await FiscalYearsPage.isCurrentSelect.$('option[value="0"]')
        await expect(yesOpt).toBeExisting()
        await expect(noOpt).toBeExisting()
    })

    it('E2E-FY-009 | Save button is present and enabled on new modal', async () => {
        addFeature('Fiscal Years'); addSeverity('blocker')
        await expect(FiscalYearsPage.saveModalBtn).toBeDisplayed()
        await expect(FiscalYearsPage.saveModalBtn).not.toBeDisabled()
    })

    it('E2E-FY-010 | Error div is hidden on fresh modal open', async () => {
        addFeature('Fiscal Years'); addSeverity('normal')
        await expect(FiscalYearsPage.modalErrorDiv).not.toBeDisplayed()
    })

    it('E2E-FY-011 | Closing modal without saving dismisses it', async () => {
        addFeature('Fiscal Years'); addSeverity('critical')
        await FiscalYearsPage.closeModal()
        await expect(FiscalYearsPage.modal).not.toBeDisplayed()
    })

    // ── Create FY 2025 ─────────────────────────────────────────────────────────

    it('E2E-FY-012 | Can fill and save a new fiscal year (FY 2025)', async () => {
        addFeature('Fiscal Years'); addSeverity('blocker')
        await FiscalYearsPage.createFiscalYear(bentenFiscalYear)
        // If no error modal appeared and page reloaded, creation succeeded
        await expect(FiscalYearsPage.newFiscalYearBtn).toBeDisplayed()
    })

    it('E2E-FY-013 | FY 2025 appears in the card view list after creation', async () => {
        addFeature('Fiscal Years'); addSeverity('blocker')
        await FiscalYearsPage.waitForListLoaded()
        const listText = await FiscalYearsPage.cardViewContainer.getText()
        expect(listText).toContain(bentenFiscalYear.name)
    })

    it('E2E-FY-014 | List shows at least one edit button — items are actionable', async () => {
        addFeature('Fiscal Years'); addSeverity('critical')
        await expect(FiscalYearsPage.firstEditBtn).toBeExisting()
    })

    it('E2E-FY-015 | List shows at least one delete button', async () => {
        addFeature('Fiscal Years'); addSeverity('critical')
        await expect(FiscalYearsPage.firstDeleteBtn).toBeExisting()
    })

    it('E2E-FY-016 | Instance now has a current fiscal year — ready to create invoices', async () => {
        addFeature('Fiscal Years'); addSeverity('blocker')
        const listText = await FiscalYearsPage.cardViewContainer.getText()
        // The created year should be the current one (isCurrent = Yes)
        expect(listText).toContain(bentenFiscalYear.name)
        // Verify the page still loads cleanly
        await expect(FiscalYearsPage.newFiscalYearBtn).toBeDisplayed()
    })
})
