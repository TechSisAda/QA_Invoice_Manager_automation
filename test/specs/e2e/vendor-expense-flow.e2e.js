import { addFeature, addSeverity } from '../../helpers/allureHelper.js'
import LoginPage from '../../pageobjects/login.page.js'
import DashboardPage from '../../pageobjects/dashboard.page.js'
import InvoicePage from '../../pageobjects/invoice.page.js'

describe('E2E — Vendor Expense Invoice Full Flow', () => {

    before(async () => {
        await LoginPage.open()
        await LoginPage.login(process.env.TEST_EMAIL, process.env.TEST_PASS)
    })

    it('E2E-004 | Record vendor invoice → dashboard reflects updated expense and input VAT', async () => {
        addFeature('Vendor Expense Flow'); addSeverity('normal')

        await InvoicePage.openWizard()
        await InvoicePage.selectDirection('Vendor')
        await InvoicePage.fillStep1({ vendor: 'Supplier Ltd', type: 'Commercial Invoice' })
        await InvoicePage.fillStep2({ product: 'Raw Materials', qty: 50, unitPrice: 10000, taxable: true })
        await InvoicePage.fillStep3()
        await InvoicePage.finalizeAndSubmit()

        // Verify dashboard reflects the new vendor expense
        await DashboardPage.open()
        const vatVendors = await DashboardPage.getVATVendorsValue()
        expect(vatVendors).toBeGreaterThan(0)

        // Verify invoice appears in list tagged as Vendor
        await InvoicePage.openInvoiceList()
        const lastEntry = await InvoicePage.getLastInvoiceEntry()
        await expect(lastEntry.entityType).toHaveText('Vendor')
    })
})
