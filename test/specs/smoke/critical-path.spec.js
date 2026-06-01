import { addFeature, addSeverity } from '../../helpers/allureHelper.js'
import LoginPage from '../../pageobjects/login.page.js'
import DashboardPage from '../../pageobjects/dashboard.page.js'
import InvoicePage from '../../pageobjects/invoice.page.js'

describe('SMOKE — InvoiceManager Critical Path', () => {

    before(async () => {
        await LoginPage.open()
    })

    it('SM-001 | App loads and login page is accessible', async () => {
        addFeature('Account & Setup'); addSeverity('blocker')
        await expect(LoginPage.loginForm).toBeDisplayed()
        await expect(browser).toHaveTitle(/InvoiceManager/i)
    })

    it('SM-002 | User can log in with valid credentials', async () => {
        addFeature('Account & Setup'); addSeverity('blocker')
        await LoginPage.login(process.env.TEST_EMAIL, process.env.TEST_PASS)
        await expect(DashboardPage.welcomeBanner).toBeDisplayed()
    })

    it('SM-003 | Dashboard loads with key financial metric tiles', async () => {
        addFeature('Dashboard'); addSeverity('critical')
        await expect(DashboardPage.totalInvoicesTile).toBeDisplayed()
        await expect(DashboardPage.unpaidInvoicesTile).toBeDisplayed()
        await expect(DashboardPage.totalReceivablesTile).toBeDisplayed()
    })

    it('SM-004 | Invoice creation wizard opens from dashboard CTA', async () => {
        addFeature('E-Invoicing Core'); addSeverity('blocker')
        await DashboardPage.clickCreateInvoice()
        await expect(InvoicePage.wizardStep1).toBeDisplayed()
    })

    it('SM-005 | Invoice list page loads and displays existing records', async () => {
        addFeature('Invoice Management'); addSeverity('critical')
        await InvoicePage.openInvoiceList()
        await expect(InvoicePage.invoiceTable).toBeDisplayed()
    })

    it('SM-006 | POS checkout page loads with product catalog', async () => {
        addFeature('POS'); addSeverity('critical')
        await browser.url('/pos')
        await expect($('.product-catalog-grid')).toBeDisplayed()
    })

    it('SM-007 | User can log out successfully', async () => {
        addFeature('Account & Setup'); addSeverity('normal')
        await DashboardPage.logout()
        await expect(LoginPage.loginForm).toBeDisplayed()
    })
})
