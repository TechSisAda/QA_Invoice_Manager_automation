import { addFeature, addSeverity } from '../../helpers/allureHelper.js'
import LoginPage from '../../pageobjects/login.page.js'
import FiscalYearsPage from '../../pageobjects/fiscal-years.page.js'
import { bentenFiscalYear } from '../../helpers/testData.js'

// ─────────────────────────────────────────────────────────────────────────────
// REGRESSION — Manage Fiscal Years
//
// Pre-condition: At least one fiscal year (FY 2025) has been created on this
// instance. For a brand-new instance with no fiscal years, run
// test/specs/e2e/fiscal-years-setup.e2e.js FIRST, then run this suite.
// ─────────────────────────────────────────────────────────────────────────────

describe('REGRESSION — Manage Fiscal Years', () => {

    before(async () => {
        await LoginPage.open()
        await LoginPage.login(process.env.TEST_EMAIL, process.env.TEST_PASS)
        await FiscalYearsPage.open()
        await FiscalYearsPage.waitForListLoaded()
    })

    // ── Page Structure ─────────────────────────────────────────────────────────

    it('REG-FY-001 | Fiscal Years page loads with correct title', async () => {
        addFeature('Fiscal Years'); addSeverity('blocker')
        await expect(browser).toHaveTitle(/InvoiceManager/i)
        await expect(browser).toHaveTitle(/Fiscal Years/i)
    })

    it('REG-FY-002 | Breadcrumb shows "Operations" title', async () => {
        addFeature('Fiscal Years'); addSeverity('critical')
        await expect(FiscalYearsPage.breadcrumbTitle).toHaveText(/Operations/i)
    })

    it('REG-FY-003 | Breadcrumb subtitle shows "Fiscal Years"', async () => {
        addFeature('Fiscal Years'); addSeverity('normal')
        await expect(FiscalYearsPage.breadcrumbSubtitle).toHaveText(/Fiscal Years/i)
    })

    it('REG-FY-004 | Back to Dashboard link is present and links to dashboard', async () => {
        addFeature('Fiscal Years'); addSeverity('normal')
        await expect(FiscalYearsPage.backToDashboardLink).toBeDisplayed()
        const href = await FiscalYearsPage.backToDashboardLink.getAttribute('href')
        expect(href).toContain('dashboard')
    })

    it('REG-FY-005 | New Fiscal Year button is visible and enabled', async () => {
        addFeature('Fiscal Years'); addSeverity('blocker')
        await expect(FiscalYearsPage.newFiscalYearBtn).toBeDisplayed()
        await expect(FiscalYearsPage.newFiscalYearBtn).not.toBeDisabled()
    })

    it('REG-FY-006 | New Fiscal Year button label is correct', async () => {
        addFeature('Fiscal Years'); addSeverity('normal')
        await expect(FiscalYearsPage.newFiscalYearBtn).toHaveText(/New Fiscal Year/i)
    })

    // ── Search and Filter Controls ─────────────────────────────────────────────

    it('REG-FY-007 | Search input is present with correct placeholder', async () => {
        addFeature('Fiscal Years'); addSeverity('critical')
        await expect(FiscalYearsPage.searchInput).toBeDisplayed()
        const placeholder = await FiscalYearsPage.searchInput.getAttribute('placeholder')
        expect(placeholder).toMatch(/Search Fiscal Years/i)
    })

    it('REG-FY-008 | Search button is present and enabled', async () => {
        addFeature('Fiscal Years'); addSeverity('critical')
        await expect(FiscalYearsPage.searchBtn).toBeDisplayed()
        await expect(FiscalYearsPage.searchBtn).not.toBeDisabled()
    })

    it('REG-FY-009 | "All" filter button is present', async () => {
        addFeature('Fiscal Years'); addSeverity('critical')
        await expect(FiscalYearsPage.filterAllBtn).toBeDisplayed()
    })

    it('REG-FY-010 | "Open" filter button is present', async () => {
        addFeature('Fiscal Years'); addSeverity('critical')
        await expect(FiscalYearsPage.filterOpenBtn).toBeDisplayed()
    })

    it('REG-FY-011 | "Closed" filter button is present', async () => {
        addFeature('Fiscal Years'); addSeverity('critical')
        await expect(FiscalYearsPage.filterClosedBtn).toBeDisplayed()
    })

    it('REG-FY-012 | Pagination limit button shows default of 20 items', async () => {
        addFeature('Fiscal Years'); addSeverity('normal')
        await expect(FiscalYearsPage.paginationLimitBtn).toBeDisplayed()
        const label = await FiscalYearsPage.paginationLimitBtn.getText()
        expect(label).toContain('20')
    })

    // ── Card View Results ──────────────────────────────────────────────────────

    it('REG-FY-013 | Card view container is present on page', async () => {
        addFeature('Fiscal Years'); addSeverity('blocker')
        await expect(FiscalYearsPage.cardViewContainer).toBeExisting()
    })

    it('REG-FY-014 | Card view shows at least one fiscal year (pre-condition: FY 2025 exists)', async () => {
        addFeature('Fiscal Years'); addSeverity('blocker')
        const listText = await FiscalYearsPage.cardViewContainer.getText()
        expect(listText).not.toContain('No results found')
        expect(listText.trim().length).toBeGreaterThan(0)
    })

    it('REG-FY-015 | FY 2025 appears in the card view', async () => {
        addFeature('Fiscal Years'); addSeverity('blocker')
        const listText = await FiscalYearsPage.cardViewContainer.getText()
        expect(listText).toContain(bentenFiscalYear.name)
    })

    it('REG-FY-016 | Each listed fiscal year has an edit button', async () => {
        addFeature('Fiscal Years'); addSeverity('critical')
        await expect(FiscalYearsPage.firstEditBtn).toBeExisting()
    })

    it('REG-FY-017 | Each listed fiscal year has a delete button', async () => {
        addFeature('Fiscal Years'); addSeverity('critical')
        await expect(FiscalYearsPage.firstDeleteBtn).toBeExisting()
    })

    // ── Search Functionality ───────────────────────────────────────────────────

    it('REG-FY-018 | Searching by name "FY 2025" returns a matching result', async () => {
        addFeature('Fiscal Years'); addSeverity('critical')
        await FiscalYearsPage.searchInput.setValue(bentenFiscalYear.name)
        await FiscalYearsPage.searchBtn.click()
        await FiscalYearsPage.waitForListLoaded()
        const listText = await FiscalYearsPage.cardViewContainer.getText()
        expect(listText).toContain(bentenFiscalYear.name)
    })

    it('REG-FY-019 | Searching by a non-existent term shows "No results found"', async () => {
        addFeature('Fiscal Years'); addSeverity('normal')
        await FiscalYearsPage.searchInput.setValue('ZZZNOMATCH9999')
        await FiscalYearsPage.searchBtn.click()
        await FiscalYearsPage.waitForListLoaded()
        const listText = await FiscalYearsPage.cardViewContainer.getText()
        expect(listText).toContain('No results found')
    })

    it('REG-FY-020 | Clearing search and clicking All filter restores full list', async () => {
        addFeature('Fiscal Years'); addSeverity('critical')
        await FiscalYearsPage.searchInput.setValue('')
        await FiscalYearsPage.filterAllBtn.click()
        await FiscalYearsPage.waitForListLoaded()
        const listText = await FiscalYearsPage.cardViewContainer.getText()
        expect(listText).toContain(bentenFiscalYear.name)
    })

    // ── Filter Buttons ─────────────────────────────────────────────────────────

    it('REG-FY-021 | Clicking "Open" filter loads (possibly empty) filtered results without error', async () => {
        addFeature('Fiscal Years'); addSeverity('normal')
        await FiscalYearsPage.filterOpenBtn.click()
        await FiscalYearsPage.waitForListLoaded()
        await expect(FiscalYearsPage.cardViewContainer).toBeExisting()
    })

    it('REG-FY-022 | Clicking "Closed" filter loads (possibly empty) filtered results without error', async () => {
        addFeature('Fiscal Years'); addSeverity('normal')
        await FiscalYearsPage.filterClosedBtn.click()
        await FiscalYearsPage.waitForListLoaded()
        await expect(FiscalYearsPage.cardViewContainer).toBeExisting()
    })

    it('REG-FY-023 | Clicking "All" filter after Closed restores the full list', async () => {
        addFeature('Fiscal Years'); addSeverity('critical')
        await FiscalYearsPage.filterAllBtn.click()
        await FiscalYearsPage.waitForListLoaded()
        const listText = await FiscalYearsPage.cardViewContainer.getText()
        expect(listText).toContain(bentenFiscalYear.name)
    })

    // ── Create Modal ───────────────────────────────────────────────────────────

    it('REG-FY-024 | Clicking New Fiscal Year opens the create modal', async () => {
        addFeature('Fiscal Years'); addSeverity('blocker')
        await FiscalYearsPage.openNewModal()
        await expect(FiscalYearsPage.modal).toBeDisplayed()
    })

    it('REG-FY-025 | Modal title is "Fiscal Year"', async () => {
        addFeature('Fiscal Years'); addSeverity('normal')
        await expect(FiscalYearsPage.modalTitle).toHaveText(/Fiscal Year/i)
    })

    it('REG-FY-026 | Name input is present and empty on new modal', async () => {
        addFeature('Fiscal Years'); addSeverity('critical')
        await expect(FiscalYearsPage.nameInput).toBeDisplayed()
        const val = await FiscalYearsPage.nameInput.getValue()
        expect(val).toBe('')
    })

    it('REG-FY-027 | Status select defaults to "active"', async () => {
        addFeature('Fiscal Years'); addSeverity('normal')
        await expect(FiscalYearsPage.statusSelect).toBeDisplayed()
        const val = await FiscalYearsPage.statusSelect.getValue()
        expect(val).toBe('active')
    })

    it('REG-FY-028 | Is Current select defaults to "1" (Yes)', async () => {
        addFeature('Fiscal Years'); addSeverity('normal')
        await expect(FiscalYearsPage.isCurrentSelect).toBeDisplayed()
        const val = await FiscalYearsPage.isCurrentSelect.getValue()
        expect(val).toBe('1')
    })

    it('REG-FY-029 | Start Date and End Date inputs are present and empty on new modal', async () => {
        addFeature('Fiscal Years'); addSeverity('critical')
        await expect(FiscalYearsPage.startDateInput).toBeDisplayed()
        await expect(FiscalYearsPage.endDateInput).toBeDisplayed()
        expect(await FiscalYearsPage.startDateInput.getValue()).toBe('')
        expect(await FiscalYearsPage.endDateInput.getValue()).toBe('')
    })

    it('REG-FY-030 | Save button is present and enabled on new modal', async () => {
        addFeature('Fiscal Years'); addSeverity('blocker')
        await expect(FiscalYearsPage.saveModalBtn).toBeDisplayed()
        await expect(FiscalYearsPage.saveModalBtn).not.toBeDisabled()
    })

    it('REG-FY-031 | Error div is hidden when modal first opens', async () => {
        addFeature('Fiscal Years'); addSeverity('normal')
        await expect(FiscalYearsPage.modalErrorDiv).not.toBeDisplayed()
    })

    it('REG-FY-032 | Closing modal without saving dismisses it', async () => {
        addFeature('Fiscal Years'); addSeverity('critical')
        await FiscalYearsPage.closeModal()
        await expect(FiscalYearsPage.modal).not.toBeDisplayed()
    })

    // ── Edit Modal ─────────────────────────────────────────────────────────────

    it('REG-FY-033 | Clicking edit on the first fiscal year opens the modal in edit mode', async () => {
        addFeature('Fiscal Years'); addSeverity('critical')
        await FiscalYearsPage.firstEditBtn.click()
        await FiscalYearsPage.modal.waitForDisplayed({ timeout: 5000 })
        // Edit mode: spinner shows while loading, then hides
        await browser.waitUntil(
            async () => !(await FiscalYearsPage.modalSpinner.isDisplayed()),
            { timeout: 10000 }
        )
        await expect(FiscalYearsPage.modal).toBeDisplayed()
    })

    it('REG-FY-034 | Edit modal pre-populates Name with a non-empty value', async () => {
        addFeature('Fiscal Years'); addSeverity('critical')
        const name = await FiscalYearsPage.nameInput.getValue()
        expect(name.trim().length).toBeGreaterThan(0)
    })

    it('REG-FY-035 | Edit modal pre-populates Status with a valid value', async () => {
        addFeature('Fiscal Years'); addSeverity('critical')
        const status = await FiscalYearsPage.statusSelect.getValue()
        expect(['active', 'open', 'closed']).toContain(status)
    })

    it('REG-FY-036 | Edit modal pre-populates Start Date with a non-empty date', async () => {
        addFeature('Fiscal Years'); addSeverity('critical')
        const startDate = await FiscalYearsPage.startDateInput.getValue()
        expect(startDate.trim().length).toBeGreaterThan(0)
    })

    it('REG-FY-037 | Edit modal pre-populates End Date with a non-empty date', async () => {
        addFeature('Fiscal Years'); addSeverity('critical')
        const endDate = await FiscalYearsPage.endDateInput.getValue()
        expect(endDate.trim().length).toBeGreaterThan(0)
    })

    it('REG-FY-038 | Hidden primary ID is set to a non-zero value in edit mode', async () => {
        addFeature('Fiscal Years'); addSeverity('normal')
        const id = await FiscalYearsPage.hiddenPrimaryId.getValue()
        expect(id).not.toBe('0')
        expect(id.trim().length).toBeGreaterThan(0)
    })

    it('REG-FY-039 | Save button is enabled after edit modal loads', async () => {
        addFeature('Fiscal Years'); addSeverity('critical')
        await expect(FiscalYearsPage.saveModalBtn).not.toBeDisabled()
    })

    it('REG-FY-040 | Closing edit modal without saving dismisses it', async () => {
        addFeature('Fiscal Years'); addSeverity('critical')
        await FiscalYearsPage.closeModal()
        await expect(FiscalYearsPage.modal).not.toBeDisplayed()
    })

    // ── Info Panel ─────────────────────────────────────────────────────────────

    it('REG-FY-041 | Info panel card is present with "More Information" heading', async () => {
        addFeature('Fiscal Years'); addSeverity('normal')
        await expect(FiscalYearsPage.infoPanelCard).toBeDisplayed()
        await expect(FiscalYearsPage.infoPanelCard).toHaveText(/More Information/i)
    })

    it('REG-FY-042 | Info panel describes fiscal year purpose', async () => {
        addFeature('Fiscal Years'); addSeverity('normal')
        const panelText = await FiscalYearsPage.infoPanelCard.getText()
        expect(panelText).toMatch(/fiscal year/i)
    })
})
