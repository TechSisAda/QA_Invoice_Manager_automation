import { addFeature, addSeverity } from '../../helpers/allureHelper.js'
import LoginPage from '../../pageobjects/login.page.js'
import ClientsPage from '../../pageobjects/clients.page.js'
import { bentenClient, regClient } from '../../helpers/testData.js'

// ─────────────────────────────────────────────────────────────────────────────
// REGRESSION — Clients
//
// Pre-condition: At least one client (Acme Nigeria Ltd) has been created.
// For a brand-new empty instance, run test/specs/e2e/clients-setup.e2e.js
// FIRST, then run this suite.
// ─────────────────────────────────────────────────────────────────────────────

describe('REGRESSION — Clients', () => {

    before(async () => {
        await LoginPage.open()
        await LoginPage.login(process.env.TEST_EMAIL, process.env.TEST_PASS)
        await ClientsPage.open()
        await ClientsPage.waitForListLoaded()
    })

    // ── Page Structure ─────────────────────────────────────────────────────────

    it('REG-CLT-001 | Client Management page loads with correct title', async () => {
        addFeature('Clients'); addSeverity('blocker')
        await expect(browser).toHaveTitle(/InvoiceManager/i)
        await expect(browser).toHaveTitle(/Client/i)
    })

    it('REG-CLT-002 | Breadcrumb title shows "Client"', async () => {
        addFeature('Clients'); addSeverity('critical')
        await expect(ClientsPage.breadcrumbTitle).toHaveText(/Client/i)
    })

    it('REG-CLT-003 | Breadcrumb subtitle shows "Management"', async () => {
        addFeature('Clients'); addSeverity('normal')
        await expect(ClientsPage.breadcrumbSubtitle).toHaveText(/Management/i)
    })

    it('REG-CLT-004 | Back to Dashboard link is present and points to dashboard', async () => {
        addFeature('Clients'); addSeverity('normal')
        await expect(ClientsPage.backToDashboardLink).toBeDisplayed()
        const href = await ClientsPage.backToDashboardLink.getAttribute('href')
        expect(href).toContain('dashboard')
    })

    it('REG-CLT-005 | New Client button is visible and enabled', async () => {
        addFeature('Clients'); addSeverity('blocker')
        await expect(ClientsPage.newClientBtn).toBeDisplayed()
        await expect(ClientsPage.newClientBtn).not.toBeDisabled()
    })

    it('REG-CLT-006 | New Client button label reads "New Client"', async () => {
        addFeature('Clients'); addSeverity('normal')
        await expect(ClientsPage.newClientBtn).toHaveText(/New Client/i)
    })

    // ── Search and Filter Controls ─────────────────────────────────────────────

    it('REG-CLT-007 | Search input is present with "Search Clients" placeholder', async () => {
        addFeature('Clients'); addSeverity('critical')
        await expect(ClientsPage.searchInput).toBeDisplayed()
        const placeholder = await ClientsPage.searchInput.getAttribute('placeholder')
        expect(placeholder).toMatch(/Search Clients/i)
    })

    it('REG-CLT-008 | Search button is present and enabled', async () => {
        addFeature('Clients'); addSeverity('critical')
        await expect(ClientsPage.searchBtn).toBeDisplayed()
        await expect(ClientsPage.searchBtn).not.toBeDisabled()
    })

    it('REG-CLT-009 | "All" group filter button is present', async () => {
        addFeature('Clients'); addSeverity('critical')
        await expect(ClientsPage.filterAllBtn).toBeDisplayed()
    })

    it('REG-CLT-010 | Filter button is present and opens the filter modal', async () => {
        addFeature('Clients'); addSeverity('critical')
        await expect(ClientsPage.filterBtn).toBeDisplayed()
        await ClientsPage.filterBtn.click()
        await ClientsPage.filterModal.waitForDisplayed({ timeout: 5000 })
        await expect(ClientsPage.filterModal).toBeDisplayed()
    })

    it('REG-CLT-011 | Filter modal contains a State dropdown', async () => {
        addFeature('Clients'); addSeverity('normal')
        await expect(ClientsPage.stateFilterSelect).toBeDisplayed()
    })

    it('REG-CLT-012 | Filter modal has Apply and Reset buttons', async () => {
        addFeature('Clients'); addSeverity('normal')
        await expect(ClientsPage.applyFilterBtn).toBeDisplayed()
        await expect(ClientsPage.resetFilterBtn).toBeDisplayed()
    })

    it('REG-CLT-013 | Resetting filter closes modal and restores full list', async () => {
        addFeature('Clients'); addSeverity('critical')
        await ClientsPage.resetFilterBtn.click()
        await ClientsPage.filterModal.waitForDisplayed({ reverse: true, timeout: 5000 })
        await ClientsPage.waitForListLoaded()
        const listText = await ClientsPage.cardViewContainer.getText()
        expect(listText).toContain(bentenClient.name)
    })

    it('REG-CLT-014 | Pagination limit button shows default of 20 items', async () => {
        addFeature('Clients'); addSeverity('normal')
        await expect(ClientsPage.paginationLimitBtn).toBeDisplayed()
        const label = await ClientsPage.paginationLimitBtn.getText()
        expect(label).toContain('20')
    })

    // ── Card View Results ──────────────────────────────────────────────────────

    it('REG-CLT-015 | Card view container is present on page', async () => {
        addFeature('Clients'); addSeverity('blocker')
        await expect(ClientsPage.cardViewContainer).toBeExisting()
    })

    it('REG-CLT-016 | Card view shows at least one client (pre-condition: seeded client exists)', async () => {
        addFeature('Clients'); addSeverity('blocker')
        const listText = await ClientsPage.cardViewContainer.getText()
        expect(listText).not.toContain('No results found')
        expect(listText.trim().length).toBeGreaterThan(0)
    })

    it('REG-CLT-017 | "Acme Nigeria Ltd" client appears in the card view', async () => {
        addFeature('Clients'); addSeverity('blocker')
        const listText = await ClientsPage.cardViewContainer.getText()
        expect(listText).toContain(bentenClient.name)
    })

    it('REG-CLT-018 | Listed clients have view buttons', async () => {
        addFeature('Clients'); addSeverity('critical')
        await expect(ClientsPage.firstViewBtn).toBeExisting()
    })

    it('REG-CLT-019 | Listed clients have edit buttons', async () => {
        addFeature('Clients'); addSeverity('critical')
        await expect(ClientsPage.firstEditBtn).toBeExisting()
    })

    it('REG-CLT-020 | Listed clients have delete buttons', async () => {
        addFeature('Clients'); addSeverity('critical')
        await expect(ClientsPage.firstDeleteBtn).toBeExisting()
    })

    // ── Search Functionality ───────────────────────────────────────────────────

    it('REG-CLT-021 | Searching by client name returns the client', async () => {
        addFeature('Clients'); addSeverity('critical')
        await ClientsPage.searchInput.setValue(bentenClient.name)
        await ClientsPage.searchBtn.click()
        await ClientsPage.waitForListLoaded()
        const listText = await ClientsPage.cardViewContainer.getText()
        expect(listText).toContain(bentenClient.name)
    })

    it('REG-CLT-022 | Searching by short name returns the client', async () => {
        addFeature('Clients'); addSeverity('critical')
        await ClientsPage.searchInput.setValue(bentenClient.shortName)
        await ClientsPage.searchBtn.click()
        await ClientsPage.waitForListLoaded()
        const listText = await ClientsPage.cardViewContainer.getText()
        expect(listText).toContain(bentenClient.name)
    })

    it('REG-CLT-023 | Searching by a non-existent term shows "No results found"', async () => {
        addFeature('Clients'); addSeverity('normal')
        await ClientsPage.searchInput.setValue('ZZZNOMATCH9999')
        await ClientsPage.searchBtn.click()
        await ClientsPage.waitForListLoaded()
        const listText = await ClientsPage.cardViewContainer.getText()
        expect(listText).toContain('No results found')
    })

    it('REG-CLT-024 | Clearing search and clicking All restores full list', async () => {
        addFeature('Clients'); addSeverity('critical')
        await ClientsPage.searchInput.setValue('')
        await ClientsPage.filterAllBtn.click()
        await ClientsPage.waitForListLoaded()
        const listText = await ClientsPage.cardViewContainer.getText()
        expect(listText).toContain(bentenClient.name)
    })

    it('REG-CLT-025 | Keyup search (typing) triggers dynamic filtering', async () => {
        addFeature('Clients'); addSeverity('normal')
        await ClientsPage.searchInput.setValue('Acme')
        await browser.pause(600)
        await ClientsPage.waitForListLoaded()
        const listText = await ClientsPage.cardViewContainer.getText()
        expect(listText).toContain(bentenClient.name)
        // clean up
        await ClientsPage.searchInput.setValue('')
        await ClientsPage.filterAllBtn.click()
        await ClientsPage.waitForListLoaded()
    })

    // ── Create Modal (New Client) ──────────────────────────────────────────────

    it('REG-CLT-026 | Clicking New Client opens the create modal', async () => {
        addFeature('Clients'); addSeverity('blocker')
        await ClientsPage.openNewModal()
        await expect(ClientsPage.modal).toBeDisplayed()
    })

    it('REG-CLT-027 | Full Name and Short Name inputs are empty on new modal', async () => {
        addFeature('Clients'); addSeverity('critical')
        expect(await ClientsPage.nameInput.getValue()).toBe('')
        expect(await ClientsPage.shortNameInput.getValue()).toBe('')
    })

    it('REG-CLT-028 | Email and FIRS TaxID inputs are empty on new modal', async () => {
        addFeature('Clients'); addSeverity('critical')
        expect(await ClientsPage.emailInput.getValue()).toBe('')
        expect(await ClientsPage.firsTaxIdInput.getValue()).toBe('')
    })

    it('REG-CLT-029 | CAC RC# input is empty on new modal', async () => {
        addFeature('Clients'); addSeverity('critical')
        expect(await ClientsPage.cacRcNumberInput.getValue()).toBe('')
    })

    it('REG-CLT-030 | State select defaults to empty on new modal', async () => {
        addFeature('Clients'); addSeverity('normal')
        const val = await ClientsPage.addressStateSelect.getValue()
        expect(val).toBe('')
    })

    it('REG-CLT-031 | State dropdown includes all 36 states plus FCT', async () => {
        addFeature('Clients'); addSeverity('critical')
        const options = await ClientsPage.addressStateSelect.$$('option')
        expect(options.length).toBeGreaterThan(36)
    })

    it('REG-CLT-032 | Selecting Anambra state populates the LGA dropdown', async () => {
        addFeature('Clients'); addSeverity('critical')
        await ClientsPage.addressStateSelect.selectByAttribute('value', 'NG-AN')
        await browser.pause(500)
        const lgaCount = await ClientsPage.lgaCodeSelect.$$('option').length
        expect(lgaCount).toBeGreaterThan(1)
    })

    it('REG-CLT-033 | LGA options for Anambra contain "Onitsha North"', async () => {
        addFeature('Clients'); addSeverity('normal')
        const lgaOptions = await ClientsPage.lgaCodeSelect.$$('option')
        const texts = await Promise.all(lgaOptions.map(o => o.getText()))
        expect(texts).toContain('Onitsha North')
    })

    it('REG-CLT-034 | Changing state to Lagos repopulates LGA with Lagos LGAs', async () => {
        addFeature('Clients'); addSeverity('normal')
        await ClientsPage.addressStateSelect.selectByAttribute('value', 'NG-LA')
        await browser.pause(500)
        const lgaOptions = await ClientsPage.lgaCodeSelect.$$('option')
        const texts = await Promise.all(lgaOptions.map(o => o.getText()))
        expect(texts.some(t => /Ikeja|Lagos|Surulere/i.test(t))).toBe(true)
    })

    it('REG-CLT-035 | Save button is present and enabled on new modal', async () => {
        addFeature('Clients'); addSeverity('blocker')
        await expect(ClientsPage.saveModalBtn).toBeDisplayed()
        await expect(ClientsPage.saveModalBtn).not.toBeDisabled()
    })

    it('REG-CLT-036 | Error div is hidden when modal first opens', async () => {
        addFeature('Clients'); addSeverity('normal')
        await expect(ClientsPage.modalErrorDiv).not.toBeDisplayed()
    })

    it('REG-CLT-037 | Full Name field is marked as required', async () => {
        addFeature('Clients'); addSeverity('critical')
        const required = await ClientsPage.nameInput.getAttribute('required')
        expect(required).not.toBeNull()
    })

    it('REG-CLT-038 | Email field is marked as required', async () => {
        addFeature('Clients'); addSeverity('critical')
        const required = await ClientsPage.emailInput.getAttribute('required')
        expect(required).not.toBeNull()
    })

    it('REG-CLT-039 | FIRS TaxID field is marked as required', async () => {
        addFeature('Clients'); addSeverity('critical')
        const required = await ClientsPage.firsTaxIdInput.getAttribute('required')
        expect(required).not.toBeNull()
    })

    it('REG-CLT-040 | CAC RC# field is marked as required', async () => {
        addFeature('Clients'); addSeverity('critical')
        const required = await ClientsPage.cacRcNumberInput.getAttribute('required')
        expect(required).not.toBeNull()
    })

    it('REG-CLT-041 | Closing modal without saving dismisses it', async () => {
        addFeature('Clients'); addSeverity('critical')
        await ClientsPage.closeModal()
        await expect(ClientsPage.modal).not.toBeDisplayed()
    })

    // ── View Modal ─────────────────────────────────────────────────────────────

    it('REG-CLT-042 | Clicking view on the first client opens the modal in view mode', async () => {
        addFeature('Clients'); addSeverity('critical')
        await ClientsPage.firstViewBtn.click()
        await ClientsPage.modal.waitForDisplayed({ timeout: 5000 })
        await browser.waitUntil(
            async () => !(await ClientsPage.modalSpinner.isDisplayed()),
            { timeout: 10000, interval: 300 }
        )
        await expect(ClientsPage.modal).toBeDisplayed()
    })

    it('REG-CLT-043 | View modal shows email span with a value', async () => {
        addFeature('Clients'); addSeverity('critical')
        const text = await ClientsPage.viewEmail.getText()
        expect(text.trim().length).toBeGreaterThan(0)
    })

    it('REG-CLT-044 | View modal Save button is hidden (view-only mode)', async () => {
        addFeature('Clients'); addSeverity('normal')
        const saveFooter = await ClientsPage.saveModalBtn
        const isDisabled = await saveFooter.getAttribute('disabled')
        expect(isDisabled).not.toBeNull()
    })

    it('REG-CLT-045 | Closing view modal dismisses it', async () => {
        addFeature('Clients'); addSeverity('critical')
        await ClientsPage.closeModal()
        await expect(ClientsPage.modal).not.toBeDisplayed()
    })

    // ── Edit Modal ─────────────────────────────────────────────────────────────

    it('REG-CLT-046 | Clicking edit on the first client opens the modal in edit mode', async () => {
        addFeature('Clients'); addSeverity('critical')
        await ClientsPage.firstEditBtn.click()
        await ClientsPage.modal.waitForDisplayed({ timeout: 5000 })
        await browser.waitUntil(
            async () => !(await ClientsPage.modalSpinner.isDisplayed()),
            { timeout: 10000, interval: 300 }
        )
        await expect(ClientsPage.modal).toBeDisplayed()
    })

    it('REG-CLT-047 | Edit modal pre-populates Full Name with a non-empty value', async () => {
        addFeature('Clients'); addSeverity('critical')
        const name = await ClientsPage.nameInput.getValue()
        expect(name.trim().length).toBeGreaterThan(0)
    })

    it('REG-CLT-048 | Edit modal pre-populates Email with a non-empty value', async () => {
        addFeature('Clients'); addSeverity('critical')
        const email = await ClientsPage.emailInput.getValue()
        expect(email.trim().length).toBeGreaterThan(0)
    })

    it('REG-CLT-049 | Edit modal pre-populates FIRS TaxID with a non-empty value', async () => {
        addFeature('Clients'); addSeverity('critical')
        const taxId = await ClientsPage.firsTaxIdInput.getValue()
        expect(taxId.trim().length).toBeGreaterThan(0)
    })

    it('REG-CLT-050 | Closing edit modal without saving dismisses it', async () => {
        addFeature('Clients'); addSeverity('critical')
        await ClientsPage.closeModal()
        await expect(ClientsPage.modal).not.toBeDisplayed()
    })

    // ── Info Panel ─────────────────────────────────────────────────────────────

    it('REG-CLT-051 | Info panel is present with "More Details" heading', async () => {
        addFeature('Clients'); addSeverity('normal')
        await expect(ClientsPage.infoPanelCard).toBeDisplayed()
        await expect(ClientsPage.infoPanelCard).toHaveText(/More Details/i)
    })

    it('REG-CLT-052 | Info panel contains descriptive text about clients', async () => {
        addFeature('Clients'); addSeverity('normal')
        const text = await ClientsPage.infoPanelCard.getText()
        expect(text.toLowerCase()).toMatch(/client/i)
    })

    // ── Create → Verify → Delete Cycle ────────────────────────────────────────

    it('REG-CLT-053 | Can create a regression-only client (REG Test Corp)', async () => {
        addFeature('Clients'); addSeverity('blocker')
        await ClientsPage.createClient(regClient)
        await expect(ClientsPage.newClientBtn).toBeDisplayed()
    })

    it('REG-CLT-054 | Newly created regression client appears in the card view', async () => {
        addFeature('Clients'); addSeverity('blocker')
        await ClientsPage.searchInput.setValue(regClient.name)
        await ClientsPage.searchBtn.click()
        await ClientsPage.waitForListLoaded()
        const listText = await ClientsPage.cardViewContainer.getText()
        expect(listText).toContain(regClient.name)
    })

    it('REG-CLT-055 | Can delete the regression client — swal confirm dialog appears and is accepted', async () => {
        addFeature('Clients'); addSeverity('blocker')
        // firstDeleteBtn targets the only result currently shown (filtered to regClient)
        await ClientsPage.deleteFirstClient()
        await expect(ClientsPage.newClientBtn).toBeDisplayed()
    })

    it('REG-CLT-056 | Deleted regression client no longer appears in the card view', async () => {
        addFeature('Clients'); addSeverity('blocker')
        await ClientsPage.searchInput.setValue(regClient.name)
        await ClientsPage.searchBtn.click()
        await ClientsPage.waitForListLoaded()
        const listText = await ClientsPage.cardViewContainer.getText()
        expect(listText).toContain('No results found')
    })
})
