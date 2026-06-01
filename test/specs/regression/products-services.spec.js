import { addFeature, addSeverity } from '../../helpers/allureHelper.js'
import LoginPage from '../../pageobjects/login.page.js'
import AdminPage from '../../pageobjects/admin.page.js'
import InvoicePage from '../../pageobjects/invoice.page.js'

describe('REGRESSION — Products & Services', () => {

    before(async () => {
        await LoginPage.open()
        await LoginPage.login(process.env.TEST_EMAIL, process.env.TEST_PASS)
    })

    it('REG-PS-001 | New product can be added with SKU, price, and tax flag', async () => {
        addFeature('Products & Services'); addSeverity('critical')
        await AdminPage.addProduct({ name: 'New Product', price: 25000, taxable: true })
        await expect(AdminPage.successToast).toBeDisplayed()
    })

    it('REG-PS-002 | Non-taxable product shows zero VAT on invoice', async () => {
        addFeature('Products & Services'); addSeverity('critical')
        await AdminPage.addProduct({ name: 'Exempt Product', price: 10000, taxable: false })
        await InvoicePage.openWizard()
        await InvoicePage.goToStep(2)
        await InvoicePage.addLineItem({ desc: 'Exempt Product', qty: 1, unitPrice: 10000, taxable: false })
        const vat = await InvoicePage.getVATAmount()
        expect(vat).toBe('0.00')
    })

    it('REG-PS-003 | Product added via invoice is automatically saved to the catalog', async () => {
        addFeature('Products & Services'); addSeverity('normal')
        const productName = `Auto-Save Product ${Date.now()}`
        await InvoicePage.openWizard()
        await InvoicePage.goToStep(2)
        await InvoicePage.addLineItem({ desc: productName, qty: 1, unitPrice: 5000 })
        await InvoicePage.finalizeAndSubmit()
        await browser.url('/products')
        await expect($(`[data-testid="product-name"][data-value="${productName}"]`)).toBeDisplayed()
    })

    it('REG-PS-004 | One-click adds a catalog product directly into the open invoice', async () => {
        addFeature('Products & Services'); addSeverity('normal')
        await InvoicePage.openWizard()
        await InvoicePage.goToStep(2)
        await $('[data-testid="catalog-product-btn"]').click()
        await expect($('[data-testid="line-item-row"]')).toBeDisplayed()
    })

    it('REG-PS-005 | Quantity on hand decreases after an invoice is committed', async () => {
        addFeature('Products & Services'); addSeverity('normal')
        await browser.url('/products')
        const initialQty = parseInt(
            await $('[data-testid="product-row"][data-name="New Product"] [data-testid="qty-on-hand"]').getText()
        )
        await InvoicePage.openWizard()
        await InvoicePage.fillStep1({ client: 'Test Client Ltd', type: 'Commercial Invoice' })
        await InvoicePage.fillStep2({ product: 'New Product', qty: 1, unitPrice: 25000, taxable: true })
        await InvoicePage.fillStep3()
        await InvoicePage.finalizeAndSubmit()
        await browser.url('/products')
        const updatedQty = parseInt(
            await $('[data-testid="product-row"][data-name="New Product"] [data-testid="qty-on-hand"]').getText()
        )
        expect(updatedQty).toBe(initialQty - 1)
    })
})
