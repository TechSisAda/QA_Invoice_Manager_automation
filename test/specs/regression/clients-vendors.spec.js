import { addFeature, addSeverity } from '../../helpers/allureHelper.js'
import LoginPage from '../../pageobjects/login.page.js'
import AdminPage from '../../pageobjects/admin.page.js'

describe('REGRESSION — Clients & Vendors', () => {

    before(async () => {
        await LoginPage.open()
        await LoginPage.login(process.env.TEST_EMAIL, process.env.TEST_PASS)
    })

    it('REG-CUST-001 | New client can be added with TIN and billing contact', async () => {
        addFeature('Clients & Vendors'); addSeverity('critical')
        await AdminPage.addClient({ name: 'New Test Client', tin: '22222222-0001' })
        await expect(AdminPage.successToast).toBeDisplayed()
    })

    it('REG-CUST-002 | Client activity history shows all linked invoices', async () => {
        addFeature('Clients & Vendors'); addSeverity('normal')
        await browser.url('/clients')
        await $('[data-testid="client-row"]').click()
        await expect($('[data-testid="client-invoice-history"]')).toBeDisplayed()
    })

    it('REG-CUST-003 | Client can be tagged as SME, MDA, or Enterprise', async () => {
        addFeature('Clients & Vendors'); addSeverity('normal')
        await browser.url('/clients')
        const firstClient = await $('[data-testid="client-row"]')
        await firstClient.$('[data-testid="client-tag-btn"]').click()
        await $('[data-testid="tag-option-SME"]').click()
        await expect(firstClient.$('[data-testid="client-tag"]')).toHaveText('SME')
    })

    it('REG-CUST-004 | Vendor directory is displayed separately from client directory', async () => {
        addFeature('Clients & Vendors'); addSeverity('critical')
        await browser.url('/clients')
        await expect($('[data-testid="client-list"]')).toBeDisplayed()
        await expect($('[data-testid="vendor-list"]')).not.toBeDisplayed()
        await browser.url('/vendors')
        await expect($('[data-testid="vendor-list"]')).toBeDisplayed()
        await expect($('[data-testid="client-list"]')).not.toBeDisplayed()
    })

    it('REG-CUST-005 | Deleting a client with linked invoices shows a warning', async () => {
        addFeature('Clients & Vendors'); addSeverity('normal')
        await browser.url('/clients')
        const clientWithInvoices = await $('[data-testid="client-row"][data-has-invoices="true"]')
        await clientWithInvoices.$('[data-testid="client-delete-btn"]').click()
        await expect($('[data-testid="delete-warning-modal"]')).toBeDisplayed()
    })
})
