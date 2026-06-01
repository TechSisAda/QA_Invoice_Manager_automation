import { addFeature, addSeverity } from '../../helpers/allureHelper.js'
import LoginPage from '../../pageobjects/login.page.js'
import InvoicePage from '../../pageobjects/invoice.page.js'

describe('REGRESSION — Invoice Creation Wizard', () => {

    before(async () => {
        await LoginPage.open()
        await LoginPage.login(process.env.TEST_EMAIL, process.env.TEST_PASS)
    })

    beforeEach(async () => {
        await InvoicePage.openWizard()
    })

    it('REG-INV-001 | Step 1 invoice type dropdown contains Proforma, Quotation, Commercial Invoice', async () => {
        addFeature('E-Invoicing Core'); addSeverity('critical')
        const types = await InvoicePage.getInvoiceTypeOptions()
        expect(types).toEqual(expect.arrayContaining(['Proforma', 'Quotation', 'Commercial Invoice']))
    })

    it('REG-INV-002 | Quick Add (+) creates new client without leaving the wizard', async () => {
        addFeature('E-Invoicing Core'); addSeverity('normal')
        await InvoicePage.clickQuickAddClient()
        await InvoicePage.fillNewClient({ name: 'Quick Client Ltd', tin: '11111111-0001' })
        await InvoicePage.confirmQuickAdd()
        await expect(InvoicePage.clientDropdown).toHaveTextContaining('Quick Client Ltd')
    })

    it('REG-INV-003 | Line item total recalculates when quantity changes', async () => {
        addFeature('E-Invoicing Core'); addSeverity('critical')
        await InvoicePage.goToStep(2)
        await InvoicePage.addLineItem({ desc: 'Consulting', qty: 2, unitPrice: 50000 })
        const total = await InvoicePage.getLineTotal(0)
        expect(total).toBe('100,000.00')
    })

    it('REG-INV-004 | VAT is calculated at 7.5% on taxable line items', async () => {
        addFeature('E-Invoicing Core'); addSeverity('blocker')
        await InvoicePage.goToStep(2)
        await InvoicePage.addLineItem({ desc: 'Taxable Service', qty: 1, unitPrice: 100000, taxable: true })
        const vat = await InvoicePage.getVATAmount()
        expect(vat).toBe('7,500.00')
    })

    it('REG-INV-005 | Invoice can be saved as draft and resumed later', async () => {
        addFeature('E-Invoicing Core'); addSeverity('normal')
        await InvoicePage.saveAsDraft()
        const draftId = await InvoicePage.getLastDraftId()
        await browser.url('/invoices')
        await InvoicePage.openDraft(draftId)
        await expect(InvoicePage.wizardStep1).toBeDisplayed()
    })

    it('REG-INV-006 | Help sidebar shows tips relevant to the currently focused field', async () => {
        addFeature('E-Invoicing Core'); addSeverity('minor')
        await InvoicePage.focusField('invoiceTitle')
        await expect(InvoicePage.helpSidebar).toHaveTextContaining(/title/i)
    })

    it('REG-INV-007 | Recurring invoice can be configured with a billing cycle', async () => {
        addFeature('E-Invoicing Core'); addSeverity('normal')
        await InvoicePage.enableRecurring()
        await InvoicePage.selectBillingCycle('Monthly')
        await expect(InvoicePage.nextBillingDate).toBeDisplayed()
    })

    it('REG-INV-008 | Selecting Vendor direction shows vendor dropdown and hides client dropdown', async () => {
        addFeature('E-Invoicing Core'); addSeverity('critical')
        await InvoicePage.selectDirection('Vendor')
        await expect(InvoicePage.vendorDropdown).toBeDisplayed()
        await expect(InvoicePage.clientDropdown).not.toBeDisplayed()
    })
})
