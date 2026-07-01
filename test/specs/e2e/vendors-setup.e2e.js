import { addFeature, addSeverity } from '../../helpers/allureHelper.js'
import LoginPage from '../../pageobjects/login.page.js'
import VendorsPage from '../../pageobjects/vendors.page.js'
import { bentenVendor } from '../../helpers/testData.js'

// ─────────────────────────────────────────────────────────────────────────────
// E2E: New Instance Setup — Vendors
//
// Pre-condition: User is logged into a new instance that has no vendors.
//
// Flow:         Login → Manage Vendors → create one Vendor (Beta Supplies Ltd)
//               → verify it appears in the list.
//
// Run this BEFORE regression/vendors.spec.js. The regression suite asserts
// that at least one vendor is listed.
// ─────────────────────────────────────────────────────────────────────────────

describe('E2E — New Instance Setup: Vendors', () => {

    before(async () => {
        await LoginPage.open()
        await LoginPage.login(process.env.TEST_EMAIL, process.env.TEST_PASS)
        await VendorsPage.open()
        await VendorsPage.waitForListLoaded()
    })

    // ── Page loads ─────────────────────────────────────────────────────────────

    it('E2E-VND-001 | Vendor Management page opens after login', async () => {
        addFeature('Vendors'); addSeverity('blocker')
        await expect(browser).toHaveTitle(/InvoiceManager/i)
        await expect(browser).toHaveTitle(/Vendor/i)
    })

    it('E2E-VND-002 | New Vendor button is present and enabled', async () => {
        addFeature('Vendors'); addSeverity('blocker')
        await expect(VendorsPage.newVendorBtn).toBeDisplayed()
        await expect(VendorsPage.newVendorBtn).not.toBeDisabled()
    })

    it('E2E-VND-003 | Card view container renders on page load', async () => {
        addFeature('Vendors'); addSeverity('critical')
        await expect(VendorsPage.cardViewContainer).toBeExisting()
    })

    // ── Create modal structure ─────────────────────────────────────────────────

    it('E2E-VND-004 | Clicking New Vendor opens the vendor modal', async () => {
        addFeature('Vendors'); addSeverity('blocker')
        await VendorsPage.openNewModal()
        await expect(VendorsPage.modal).toBeDisplayed()
    })

    it('E2E-VND-005 | Modal title reads "New Vendor" for a create action', async () => {
        addFeature('Vendors'); addSeverity('normal')
        await expect(VendorsPage.modalTitle).toHaveText(/New Vendor/i)
    })

    it('E2E-VND-006 | Modal has Vendor Name, Email, RC Number, Telephone and FIRS TIN fields', async () => {
        addFeature('Vendors'); addSeverity('blocker')
        await expect(VendorsPage.nameInput).toBeDisplayed()
        await expect(VendorsPage.emailInput).toBeDisplayed()
        await expect(VendorsPage.rcNumberInput).toBeDisplayed()
        await expect(VendorsPage.telephoneInput).toBeDisplayed()
        await expect(VendorsPage.firsTinInput).toBeDisplayed()
    })

    it('E2E-VND-007 | Modal has optional IRR Number, Website, Street, Town, State, LGA and Postal Code fields', async () => {
        addFeature('Vendors'); addSeverity('critical')
        await expect(VendorsPage.irrNumberInput).toBeDisplayed()
        await expect(VendorsPage.websiteInput).toBeDisplayed()
        await expect(VendorsPage.addressStreetInput).toBeDisplayed()
        await expect(VendorsPage.addressTownInput).toBeDisplayed()
        await expect(VendorsPage.addressStateSelect).toBeDisplayed()
        await expect(VendorsPage.lgaCodeSelect).toBeDisplayed()
        await expect(VendorsPage.postalCodeInput).toBeDisplayed()
    })

    it('E2E-VND-008 | State dropdown has Nigerian state options', async () => {
        addFeature('Vendors'); addSeverity('critical')
        await expect(VendorsPage.addressStateSelect.$('option[value="NG-LA"]')).toBeExisting()
        await expect(VendorsPage.addressStateSelect.$('option[value="NG-AN"]')).toBeExisting()
        await expect(VendorsPage.addressStateSelect.$('option[value="NG-FC"]')).toBeExisting()
    })

    it('E2E-VND-009 | Save button is present and enabled on new modal', async () => {
        addFeature('Vendors'); addSeverity('blocker')
        await expect(VendorsPage.saveModalBtn).toBeDisplayed()
        await expect(VendorsPage.saveModalBtn).not.toBeDisabled()
    })

    it('E2E-VND-010 | Error div is hidden on fresh modal open', async () => {
        addFeature('Vendors'); addSeverity('normal')
        await expect(VendorsPage.modalErrorDiv).not.toBeDisplayed()
    })

    it('E2E-VND-011 | Selecting a state populates the LGA dropdown', async () => {
        addFeature('Vendors'); addSeverity('critical')
        await VendorsPage.addressStateSelect.selectByAttribute('value', 'NG-AN')
        await browser.pause(500)
        const lgaCount = await VendorsPage.lgaCodeSelect.$$('option').length
        expect(lgaCount).toBeGreaterThan(1)
    })

    it('E2E-VND-012 | LGA options for Anambra include "Awka South"', async () => {
        addFeature('Vendors'); addSeverity('normal')
        const texts = await VendorsPage.getLgaOptionTexts()
        expect(texts).toContain('Awka South')
    })

    it('E2E-VND-013 | Closing modal without saving dismisses it', async () => {
        addFeature('Vendors'); addSeverity('critical')
        await VendorsPage.closeModal()
        await expect(VendorsPage.modal).not.toBeDisplayed()
    })

    // ── Create a Vendor ────────────────────────────────────────────────────────

    it('E2E-VND-014 | Can fill and save a new Vendor (Beta Supplies Ltd)', async () => {
        addFeature('Vendors'); addSeverity('blocker')
        await VendorsPage.createVendor(bentenVendor)
        await expect(VendorsPage.newVendorBtn).toBeDisplayed()
    })

    it('E2E-VND-015 | "Beta Supplies Ltd" appears in the card view list', async () => {
        addFeature('Vendors'); addSeverity('blocker')
        await VendorsPage.waitForListLoaded()
        const listText = await VendorsPage.cardViewContainer.getText()
        expect(listText).toContain(bentenVendor.name)
    })

    it('E2E-VND-016 | Listed vendor has view, edit and delete action buttons', async () => {
        addFeature('Vendors'); addSeverity('critical')
        await expect(VendorsPage.firstViewBtn).toBeExisting()
        await expect(VendorsPage.firstEditBtn).toBeExisting()
        await expect(VendorsPage.firstDeleteBtn).toBeExisting()
    })

    it('E2E-VND-017 | Instance now has at least one vendor — ready for purchasing', async () => {
        addFeature('Vendors'); addSeverity('blocker')
        const listText = await VendorsPage.cardViewContainer.getText()
        expect(listText).not.toContain('No results found')
        expect(listText).toContain(bentenVendor.name)
    })

    it('E2E-VND-018 | Search by vendor name returns the seeded vendor', async () => {
        addFeature('Vendors'); addSeverity('critical')
        await VendorsPage.searchInput.setValue(bentenVendor.name)
        await VendorsPage.searchBtn.click()
        await VendorsPage.waitForListLoaded()
        const listText = await VendorsPage.cardViewContainer.getText()
        expect(listText).toContain(bentenVendor.name)
    })
})
