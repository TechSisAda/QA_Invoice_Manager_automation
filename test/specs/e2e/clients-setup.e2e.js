import { addFeature, addSeverity } from '../../helpers/allureHelper.js'
import LoginPage from '../../pageobjects/login.page.js'
import ClientsPage from '../../pageobjects/clients.page.js'
import { bentenClient } from '../../helpers/testData.js'

// ─────────────────────────────────────────────────────────────────────────────
// E2E: New Instance Setup — Clients
//
// Pre-condition: A fresh instance with no clients, or used to seed the first
//               client needed by invoice creation tests.
//
// Flow:         Login → Manage Your Clients → create one Client (Acme Nigeria)
//               → verify it appears in the list.
//
// Run this BEFORE regression/clients.spec.js. The regression suite asserts
// that at least one client is listed.
// ─────────────────────────────────────────────────────────────────────────────

describe('E2E — New Instance Setup: Clients', () => {

    before(async () => {
        await LoginPage.open()
        await LoginPage.login(process.env.TEST_EMAIL, process.env.TEST_PASS)
        await ClientsPage.open()
        await ClientsPage.waitForListLoaded()
    })

    // ── Page loads ─────────────────────────────────────────────────────────────

    it('E2E-CLT-001 | Client Management page opens after login', async () => {
        addFeature('Clients'); addSeverity('blocker')
        await expect(browser).toHaveTitle(/InvoiceManager/i)
        await expect(browser).toHaveTitle(/Client/i)
    })

    it('E2E-CLT-002 | New Client button is present and enabled', async () => {
        addFeature('Clients'); addSeverity('blocker')
        await expect(ClientsPage.newClientBtn).toBeDisplayed()
        await expect(ClientsPage.newClientBtn).not.toBeDisabled()
    })

    it('E2E-CLT-003 | Card view container renders on page load', async () => {
        addFeature('Clients'); addSeverity('critical')
        await expect(ClientsPage.cardViewContainer).toBeExisting()
    })

    // ── Create modal structure ─────────────────────────────────────────────────

    it('E2E-CLT-004 | Clicking New Client opens the client modal', async () => {
        addFeature('Clients'); addSeverity('blocker')
        await ClientsPage.openNewModal()
        await expect(ClientsPage.modal).toBeDisplayed()
    })

    it('E2E-CLT-005 | Modal title reads "Client" for a create action', async () => {
        addFeature('Clients'); addSeverity('normal')
        await expect(ClientsPage.modalTitle).toHaveText(/Client/i)
    })

    it('E2E-CLT-006 | Modal has Full Name, Short Name, Email, FIRS TaxID and CAC RC# fields', async () => {
        addFeature('Clients'); addSeverity('blocker')
        await expect(ClientsPage.nameInput).toBeDisplayed()
        await expect(ClientsPage.shortNameInput).toBeDisplayed()
        await expect(ClientsPage.emailInput).toBeDisplayed()
        await expect(ClientsPage.firsTaxIdInput).toBeDisplayed()
        await expect(ClientsPage.cacRcNumberInput).toBeDisplayed()
    })

    it('E2E-CLT-007 | Modal has Website, Street, Telephone, Town, State, LGA and Postal Code fields', async () => {
        addFeature('Clients'); addSeverity('critical')
        await expect(ClientsPage.websiteInput).toBeDisplayed()
        await expect(ClientsPage.addressStreetInput).toBeDisplayed()
        await expect(ClientsPage.telephoneInput).toBeDisplayed()
        await expect(ClientsPage.addressTownInput).toBeDisplayed()
        await expect(ClientsPage.addressStateSelect).toBeDisplayed()
        await expect(ClientsPage.lgaCodeSelect).toBeDisplayed()
        await expect(ClientsPage.postalCodeInput).toBeDisplayed()
    })

    it('E2E-CLT-008 | State dropdown has Nigerian state options', async () => {
        addFeature('Clients'); addSeverity('critical')
        await expect(ClientsPage.addressStateSelect.$('option[value="NG-LA"]')).toBeExisting()
        await expect(ClientsPage.addressStateSelect.$('option[value="NG-AN"]')).toBeExisting()
        await expect(ClientsPage.addressStateSelect.$('option[value="NG-FC"]')).toBeExisting()
    })

    it('E2E-CLT-009 | Save button is present and enabled on new modal', async () => {
        addFeature('Clients'); addSeverity('blocker')
        await expect(ClientsPage.saveModalBtn).toBeDisplayed()
        await expect(ClientsPage.saveModalBtn).not.toBeDisabled()
    })

    it('E2E-CLT-010 | Error div is hidden on fresh modal open', async () => {
        addFeature('Clients'); addSeverity('normal')
        await expect(ClientsPage.modalErrorDiv).not.toBeDisplayed()
    })

    it('E2E-CLT-011 | Selecting a state populates the LGA dropdown', async () => {
        addFeature('Clients'); addSeverity('critical')
        await ClientsPage.addressStateSelect.selectByAttribute('value', 'NG-AN')
        await browser.pause(500)
        const lgaCount = await ClientsPage.lgaCodeSelect.$$('option').length
        expect(lgaCount).toBeGreaterThan(1)
    })

    it('E2E-CLT-012 | LGA options for Anambra include "Onitsha North"', async () => {
        addFeature('Clients'); addSeverity('normal')
        const lgaOptions = await ClientsPage.lgaCodeSelect.$$('option')
        const texts = await Promise.all(lgaOptions.map(o => o.getText()))
        expect(texts).toContain('Onitsha North')
    })

    it('E2E-CLT-013 | Closing modal without saving dismisses it', async () => {
        addFeature('Clients'); addSeverity('critical')
        await ClientsPage.closeModal()
        await expect(ClientsPage.modal).not.toBeDisplayed()
    })

    // ── Create a Client ────────────────────────────────────────────────────────

    it('E2E-CLT-014 | Can fill and save a new Client (Acme Nigeria Ltd)', async () => {
        addFeature('Clients'); addSeverity('blocker')
        await ClientsPage.createClient(bentenClient)
        await expect(ClientsPage.newClientBtn).toBeDisplayed()
    })

    it('E2E-CLT-015 | "Acme Nigeria Ltd" appears in the card view list', async () => {
        addFeature('Clients'); addSeverity('blocker')
        await ClientsPage.waitForListLoaded()
        const listText = await ClientsPage.cardViewContainer.getText()
        expect(listText).toContain(bentenClient.name)
    })

    it('E2E-CLT-016 | Listed client has view, edit and delete action buttons', async () => {
        addFeature('Clients'); addSeverity('critical')
        await expect(ClientsPage.firstViewBtn).toBeExisting()
        await expect(ClientsPage.firstEditBtn).toBeExisting()
        await expect(ClientsPage.firstDeleteBtn).toBeExisting()
    })

    it('E2E-CLT-017 | Instance now has at least one client — ready for invoicing', async () => {
        addFeature('Clients'); addSeverity('blocker')
        const listText = await ClientsPage.cardViewContainer.getText()
        expect(listText).not.toContain('No results found')
        expect(listText).toContain(bentenClient.name)
    })

    it('E2E-CLT-018 | Search by client name returns the seeded client', async () => {
        addFeature('Clients'); addSeverity('critical')
        await ClientsPage.searchInput.setValue(bentenClient.name)
        await ClientsPage.searchBtn.click()
        await ClientsPage.waitForListLoaded()
        const listText = await ClientsPage.cardViewContainer.getText()
        expect(listText).toContain(bentenClient.name)
    })
})
