import { addFeature, addSeverity } from '../../helpers/allureHelper.js'
import LoginPage from '../../pageobjects/login.page.js'
import VendorsPage from '../../pageobjects/vendors.page.js'
import { bentenVendor, regVendor } from '../../helpers/testData.js'

// ─────────────────────────────────────────────────────────────────────────────
// REGRESSION — Vendors
//
// Pre-condition: At least one vendor (Beta Supplies Ltd) has been created.
// For a brand-new empty instance, run test/specs/e2e/vendors-setup.e2e.js
// FIRST, then run this suite.
// ─────────────────────────────────────────────────────────────────────────────

describe('REGRESSION — Vendors', () => {

    before(async () => {
        await LoginPage.open()
        await LoginPage.login(process.env.TEST_EMAIL, process.env.TEST_PASS)
        await VendorsPage.open()
        await VendorsPage.waitForListLoaded()
    })

    // ── Page Structure ─────────────────────────────────────────────────────────

    it('REG-VND-001 | Vendor Management page loads with correct title', async () => {
        addFeature('Vendors'); addSeverity('blocker')
        await expect(browser).toHaveTitle(/InvoiceManager/i)
        await expect(browser).toHaveTitle(/Vendor/i)
    })

    it('REG-VND-002 | Breadcrumb title shows "Vendor"', async () => {
        addFeature('Vendors'); addSeverity('critical')
        await expect(VendorsPage.breadcrumbTitle).toHaveText(/Vendor/i)
    })

    it('REG-VND-003 | Breadcrumb subtitle shows "Managements"', async () => {
        addFeature('Vendors'); addSeverity('normal')
        await expect(VendorsPage.breadcrumbSubtitle).toHaveText(/Managements/i)
    })

    it('REG-VND-004 | Back to Dashboard link is present and points to dashboard', async () => {
        addFeature('Vendors'); addSeverity('normal')
        await expect(VendorsPage.backToDashboardLink).toBeDisplayed()
        const href = await VendorsPage.backToDashboardLink.getAttribute('href')
        expect(href).toContain('dashboard')
    })

    it('REG-VND-005 | New Vendor button is visible and enabled', async () => {
        addFeature('Vendors'); addSeverity('blocker')
        await expect(VendorsPage.newVendorBtn).toBeDisplayed()
        await expect(VendorsPage.newVendorBtn).not.toBeDisabled()
    })

    it('REG-VND-006 | New Vendor button label reads "New Vendor"', async () => {
        addFeature('Vendors'); addSeverity('normal')
        await expect(VendorsPage.newVendorBtn).toHaveText(/New Vendor/i)
    })

    // ── Search and Filter Controls ─────────────────────────────────────────────

    it('REG-VND-007 | Search input is present', async () => {
        addFeature('Vendors'); addSeverity('critical')
        await expect(VendorsPage.searchInput).toBeDisplayed()
    })

    it('REG-VND-008 | Search button is present and enabled', async () => {
        addFeature('Vendors'); addSeverity('critical')
        await expect(VendorsPage.searchBtn).toBeDisplayed()
        await expect(VendorsPage.searchBtn).not.toBeDisabled()
    })

    it('REG-VND-009 | Filter button is present and opens the filter modal', async () => {
        addFeature('Vendors'); addSeverity('critical')
        await expect(VendorsPage.filterBtn).toBeDisplayed()
        await VendorsPage.filterBtn.click()
        await VendorsPage.filterModal.waitForDisplayed({ timeout: 5000 })
        await expect(VendorsPage.filterModal).toBeDisplayed()
    })

    it('REG-VND-010 | Filter modal contains a State dropdown', async () => {
        addFeature('Vendors'); addSeverity('normal')
        await expect(VendorsPage.stateFilterSelect).toBeDisplayed()
    })

    it('REG-VND-011 | Filter modal contains a Date Onboarded start-date input', async () => {
        addFeature('Vendors'); addSeverity('normal')
        await expect(VendorsPage.dateFilterStart).toBeDisplayed()
    })

    it('REG-VND-012 | Filter modal contains a Date Onboarded end-date input', async () => {
        addFeature('Vendors'); addSeverity('normal')
        await expect(VendorsPage.dateFilterEnd).toBeDisplayed()
    })

    it('REG-VND-013 | Filter modal has Apply and Reset buttons', async () => {
        addFeature('Vendors'); addSeverity('normal')
        await expect(VendorsPage.applyFilterBtn).toBeDisplayed()
        await expect(VendorsPage.resetFilterBtn).toBeDisplayed()
    })

    it('REG-VND-014 | Resetting filter closes modal and restores full list', async () => {
        addFeature('Vendors'); addSeverity('critical')
        await VendorsPage.resetFilterBtn.click()
        await VendorsPage.filterModal.waitForDisplayed({ reverse: true, timeout: 5000 })
        await VendorsPage.waitForListLoaded()
        const listText = await VendorsPage.cardViewContainer.getText()
        expect(listText).toContain(bentenVendor.name)
    })

    it('REG-VND-015 | Pagination limit button shows default of 20 items', async () => {
        addFeature('Vendors'); addSeverity('normal')
        await expect(VendorsPage.paginationLimitBtn).toBeDisplayed()
        const label = await VendorsPage.paginationLimitBtn.getText()
        expect(label).toContain('20')
    })

    // ── Card View Results ──────────────────────────────────────────────────────

    it('REG-VND-016 | Card view container is present on page', async () => {
        addFeature('Vendors'); addSeverity('blocker')
        await expect(VendorsPage.cardViewContainer).toBeExisting()
    })

    it('REG-VND-017 | Card view shows at least one vendor (pre-condition: seeded vendor exists)', async () => {
        addFeature('Vendors'); addSeverity('blocker')
        const listText = await VendorsPage.cardViewContainer.getText()
        expect(listText).not.toContain('No results found')
        expect(listText.trim().length).toBeGreaterThan(0)
    })

    it('REG-VND-018 | "Beta Supplies Ltd" vendor appears in the card view', async () => {
        addFeature('Vendors'); addSeverity('blocker')
        const listText = await VendorsPage.cardViewContainer.getText()
        expect(listText).toContain(bentenVendor.name)
    })

    it('REG-VND-019 | Listed vendors have view buttons', async () => {
        addFeature('Vendors'); addSeverity('critical')
        await expect(VendorsPage.firstViewBtn).toBeExisting()
    })

    it('REG-VND-020 | Listed vendors have edit buttons', async () => {
        addFeature('Vendors'); addSeverity('critical')
        await expect(VendorsPage.firstEditBtn).toBeExisting()
    })

    it('REG-VND-021 | Listed vendors have delete buttons', async () => {
        addFeature('Vendors'); addSeverity('critical')
        await expect(VendorsPage.firstDeleteBtn).toBeExisting()
    })

    // ── Search Functionality ───────────────────────────────────────────────────

    it('REG-VND-022 | Searching by vendor name returns the vendor', async () => {
        addFeature('Vendors'); addSeverity('critical')
        await VendorsPage.searchInput.setValue(bentenVendor.name)
        await VendorsPage.searchBtn.click()
        await VendorsPage.waitForListLoaded()
        const listText = await VendorsPage.cardViewContainer.getText()
        expect(listText).toContain(bentenVendor.name)
    })

    it('REG-VND-023 | Searching by a non-existent term shows "No results found"', async () => {
        addFeature('Vendors'); addSeverity('normal')
        await VendorsPage.searchInput.setValue('ZZZNOMATCH9999')
        await VendorsPage.searchBtn.click()
        await VendorsPage.waitForListLoaded()
        const listText = await VendorsPage.cardViewContainer.getText()
        expect(listText).toContain('No results found')
    })

    it('REG-VND-024 | Clearing search and reloading restores full list', async () => {
        addFeature('Vendors'); addSeverity('critical')
        await VendorsPage.searchInput.setValue('')
        await VendorsPage.searchBtn.click()
        await VendorsPage.waitForListLoaded()
        const listText = await VendorsPage.cardViewContainer.getText()
        expect(listText).toContain(bentenVendor.name)
    })

    it('REG-VND-025 | Keyup search (typing) triggers dynamic filtering', async () => {
        addFeature('Vendors'); addSeverity('normal')
        await VendorsPage.searchInput.setValue('Beta')
        await browser.pause(600)
        await VendorsPage.waitForListLoaded()
        const listText = await VendorsPage.cardViewContainer.getText()
        expect(listText).toContain(bentenVendor.name)
        // clean up
        await VendorsPage.searchInput.setValue('')
        await VendorsPage.searchBtn.click()
        await VendorsPage.waitForListLoaded()
    })

    // ── Create Modal (New Vendor) ──────────────────────────────────────────────

    it('REG-VND-026 | Clicking New Vendor opens the create modal', async () => {
        addFeature('Vendors'); addSeverity('blocker')
        await VendorsPage.openNewModal()
        await expect(VendorsPage.modal).toBeDisplayed()
    })

    it('REG-VND-027 | Modal title prefix reads "New" for create action', async () => {
        addFeature('Vendors'); addSeverity('critical')
        const prefix = await VendorsPage.modalTitlePrefix.getText()
        expect(prefix.trim()).toBe('New')
    })

    it('REG-VND-028 | All required inputs are empty on new modal', async () => {
        addFeature('Vendors'); addSeverity('critical')
        expect(await VendorsPage.nameInput.getValue()).toBe('')
        expect(await VendorsPage.emailInput.getValue()).toBe('')
        expect(await VendorsPage.rcNumberInput.getValue()).toBe('')
        expect(await VendorsPage.telephoneInput.getValue()).toBe('')
        expect(await VendorsPage.firsTinInput.getValue()).toBe('')
    })

    it('REG-VND-029 | State select defaults to empty on new modal', async () => {
        addFeature('Vendors'); addSeverity('normal')
        const val = await VendorsPage.addressStateSelect.getValue()
        expect(val).toBe('')
    })

    it('REG-VND-030 | State dropdown includes all 36 states plus FCT', async () => {
        addFeature('Vendors'); addSeverity('critical')
        const options = await VendorsPage.addressStateSelect.$$('option')
        expect(options.length).toBeGreaterThan(36)
    })

    it('REG-VND-031 | Selecting Anambra state populates the LGA dropdown', async () => {
        addFeature('Vendors'); addSeverity('critical')
        await VendorsPage.addressStateSelect.selectByAttribute('value', 'NG-AN')
        await browser.pause(500)
        const lgaCount = await VendorsPage.lgaCodeSelect.$$('option').length
        expect(lgaCount).toBeGreaterThan(1)
    })

    it('REG-VND-032 | LGA options for Anambra contain "Awka South"', async () => {
        addFeature('Vendors'); addSeverity('normal')
        const lgaOptions = await VendorsPage.lgaCodeSelect.$$('option')
        const texts = await Promise.all(lgaOptions.map(o => o.getText()))
        expect(texts).toContain('Awka South')
    })

    it('REG-VND-033 | Changing state to Lagos repopulates LGA with Lagos LGAs', async () => {
        addFeature('Vendors'); addSeverity('normal')
        await VendorsPage.addressStateSelect.selectByAttribute('value', 'NG-LA')
        await browser.pause(500)
        const lgaOptions = await VendorsPage.lgaCodeSelect.$$('option')
        const texts = await Promise.all(lgaOptions.map(o => o.getText()))
        expect(texts.some(t => /Ikeja|Lagos|Surulere/i.test(t))).toBe(true)
    })

    it('REG-VND-034 | Save button is present and enabled on new modal', async () => {
        addFeature('Vendors'); addSeverity('blocker')
        await expect(VendorsPage.saveModalBtn).toBeDisplayed()
        await expect(VendorsPage.saveModalBtn).not.toBeDisabled()
    })

    it('REG-VND-035 | Error div is hidden when modal first opens', async () => {
        addFeature('Vendors'); addSeverity('normal')
        await expect(VendorsPage.modalErrorDiv).not.toBeDisplayed()
    })

    it('REG-VND-036 | Vendor Name field is marked as required', async () => {
        addFeature('Vendors'); addSeverity('critical')
        const required = await VendorsPage.nameInput.getAttribute('required')
        expect(required).not.toBeNull()
    })

    it('REG-VND-037 | Email field is marked as required', async () => {
        addFeature('Vendors'); addSeverity('critical')
        const required = await VendorsPage.emailInput.getAttribute('required')
        expect(required).not.toBeNull()
    })

    it('REG-VND-038 | RC Number field is marked as required', async () => {
        addFeature('Vendors'); addSeverity('critical')
        const required = await VendorsPage.rcNumberInput.getAttribute('required')
        expect(required).not.toBeNull()
    })

    it('REG-VND-039 | FIRS TIN field is marked as required', async () => {
        addFeature('Vendors'); addSeverity('critical')
        const required = await VendorsPage.firsTinInput.getAttribute('required')
        expect(required).not.toBeNull()
    })

    it('REG-VND-040 | Telephone field is marked as required', async () => {
        addFeature('Vendors'); addSeverity('critical')
        const required = await VendorsPage.telephoneInput.getAttribute('required')
        expect(required).not.toBeNull()
    })

    it('REG-VND-041 | Closing modal without saving dismisses it', async () => {
        addFeature('Vendors'); addSeverity('critical')
        await VendorsPage.closeModal()
        await expect(VendorsPage.modal).not.toBeDisplayed()
    })

    // ── View Modal ─────────────────────────────────────────────────────────────

    it('REG-VND-042 | Clicking view on the first vendor opens the modal in view mode', async () => {
        addFeature('Vendors'); addSeverity('critical')
        await VendorsPage.firstViewBtn.click()
        await VendorsPage.modal.waitForDisplayed({ timeout: 5000 })
        await browser.waitUntil(
            async () => !(await VendorsPage.modalSpinner.isDisplayed()),
            { timeout: 10000, interval: 300 }
        )
        await expect(VendorsPage.modal).toBeDisplayed()
    })

    it('REG-VND-043 | View modal shows email span with a value', async () => {
        addFeature('Vendors'); addSeverity('critical')
        const text = await VendorsPage.viewEmail.getText()
        expect(text.trim().length).toBeGreaterThan(0)
    })

    it('REG-VND-044 | View modal shows telephone span with a value', async () => {
        addFeature('Vendors'); addSeverity('normal')
        const text = await VendorsPage.viewTelephone.getText()
        expect(text.trim().length).toBeGreaterThan(0)
    })

    it('REG-VND-045 | Closing view modal dismisses it', async () => {
        addFeature('Vendors'); addSeverity('critical')
        await VendorsPage.closeModal()
        await expect(VendorsPage.modal).not.toBeDisplayed()
    })

    // ── Edit Modal ─────────────────────────────────────────────────────────────

    it('REG-VND-046 | Clicking edit on the first vendor opens the modal in edit mode', async () => {
        addFeature('Vendors'); addSeverity('critical')
        await VendorsPage.firstEditBtn.click()
        await VendorsPage.modal.waitForDisplayed({ timeout: 5000 })
        await browser.waitUntil(
            async () => !(await VendorsPage.modalSpinner.isDisplayed()),
            { timeout: 10000, interval: 300 }
        )
        await expect(VendorsPage.modal).toBeDisplayed()
    })

    it('REG-VND-047 | Edit modal title prefix reads "Edit"', async () => {
        addFeature('Vendors'); addSeverity('critical')
        const prefix = await VendorsPage.modalTitlePrefix.getText()
        expect(prefix.trim()).toBe('Edit')
    })

    it('REG-VND-048 | Edit modal pre-populates Vendor Name with a non-empty value', async () => {
        addFeature('Vendors'); addSeverity('critical')
        const name = await VendorsPage.nameInput.getValue()
        expect(name.trim().length).toBeGreaterThan(0)
    })

    it('REG-VND-049 | Edit modal pre-populates Email with a non-empty value', async () => {
        addFeature('Vendors'); addSeverity('critical')
        const email = await VendorsPage.emailInput.getValue()
        expect(email.trim().length).toBeGreaterThan(0)
    })

    it('REG-VND-050 | Edit modal pre-populates FIRS TIN with a non-empty value', async () => {
        addFeature('Vendors'); addSeverity('critical')
        const tin = await VendorsPage.firsTinInput.getValue()
        expect(tin.trim().length).toBeGreaterThan(0)
    })

    it('REG-VND-051 | Closing edit modal without saving dismisses it', async () => {
        addFeature('Vendors'); addSeverity('critical')
        await VendorsPage.closeModal()
        await expect(VendorsPage.modal).not.toBeDisplayed()
    })

    // ── Info Panel ─────────────────────────────────────────────────────────────

    it('REG-VND-052 | Info panel is present with "More Details" heading', async () => {
        addFeature('Vendors'); addSeverity('normal')
        await expect(VendorsPage.infoPanelCard).toBeDisplayed()
        await expect(VendorsPage.infoPanelCard).toHaveText(/More Details/i)
    })

    it('REG-VND-053 | Info panel contains descriptive text about vendors', async () => {
        addFeature('Vendors'); addSeverity('normal')
        const text = await VendorsPage.infoPanelCard.getText()
        expect(text.toLowerCase()).toMatch(/vendor/i)
    })

    // ── Create → Verify → Delete Cycle ────────────────────────────────────────

    it('REG-VND-054 | Can create a regression-only vendor (REG Test Vendor Ltd)', async () => {
        addFeature('Vendors'); addSeverity('blocker')
        await VendorsPage.createVendor(regVendor)
        await expect(VendorsPage.newVendorBtn).toBeDisplayed()
    })

    it('REG-VND-055 | Newly created regression vendor appears in the card view', async () => {
        addFeature('Vendors'); addSeverity('blocker')
        await VendorsPage.searchInput.setValue(regVendor.name)
        await VendorsPage.searchBtn.click()
        await VendorsPage.waitForListLoaded()
        const listText = await VendorsPage.cardViewContainer.getText()
        expect(listText).toContain(regVendor.name)
    })

    it('REG-VND-056 | Can delete the regression vendor — swal confirm dialog is accepted', async () => {
        addFeature('Vendors'); addSeverity('blocker')
        await VendorsPage.firstDeleteBtn.click()
        await VendorsPage.confirmSwal()
        await VendorsPage.confirmSwal()
        await VendorsPage.newVendorBtn.waitForDisplayed({ timeout: 20000 })
        await VendorsPage.waitForListLoaded()
        await expect(VendorsPage.newVendorBtn).toBeDisplayed()
    })

    it('REG-VND-057 | Deleted regression vendor no longer appears in the card view', async () => {
        addFeature('Vendors'); addSeverity('blocker')
        await VendorsPage.searchInput.setValue(regVendor.name)
        await VendorsPage.searchBtn.click()
        await VendorsPage.waitForListLoaded()
        const listText = await VendorsPage.cardViewContainer.getText()
        expect(listText).toContain('No results found')
    })
})
