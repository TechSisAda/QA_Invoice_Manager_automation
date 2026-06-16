import { addFeature, addSeverity } from '../../helpers/allureHelper.js'
import { urls } from '../../helpers/testData.js'
import LoginPage from '../../pageobjects/login.page.js'
import DashboardPage from '../../pageobjects/dashboard.page.js'
import InvoicePage from '../../pageobjects/invoice.page.js'

describe('SMOKE — InvoiceManager Critical Path', () => {

    // SM-001: Landing page
    it('SM-001 | Landing page loads with InvoiceManager title', async () => {
        addFeature('Landing Page'); addSeverity('blocker')
        await browser.url('/')
        await expect(browser).toHaveTitle(/InvoiceManager/i)
        // "Activate your TIN" CTA must be visible
        const cta = await $('a[href*="link-tin"]')
        await expect(cta).toBeDisplayed()
    })

    // SM-002: Navigate to Register page
    it('SM-002 | Register link navigates to subscription/registration page', async () => {
        addFeature('Registration'); addSeverity('blocker')
        await browser.url(urls.register)
        await expect(browser).toHaveUrl(/plm\/subscriptions/i)
    })

    // SM-003: Navigate to TIN activation
    it('SM-003 | Activate TIN link navigates to TIN linking page', async () => {
        addFeature('TIN Activation'); addSeverity('blocker')
        await browser.url(urls.linkTIN)
        await expect(browser).toHaveUrl(/ivm\/link-tin/i)
    })

    // SM-004: Login and reach dashboard
    it('SM-004 | User can log in and reach the dashboard', async () => {
        addFeature('Account & Setup'); addSeverity('blocker')
        await LoginPage.open()
        await LoginPage.login(process.env.TEST_EMAIL, process.env.TEST_PASS)
        await expect(DashboardPage.welcomeBanner).toBeDisplayed()
    })

    // SM-005: Dashboard metric tiles
    it('SM-005 | Dashboard loads with key financial metric tiles', async () => {
        addFeature('Dashboard'); addSeverity('critical')
        await expect(DashboardPage.totalInvoicesTile).toBeDisplayed()
        await expect(DashboardPage.unpaidInvoicesTile).toBeDisplayed()
        await expect(DashboardPage.totalReceivablesTile).toBeDisplayed()
    })

    // SM-006: Invoice list
    it('SM-006 | Invoice list page loads and displays records', async () => {
        addFeature('Invoice Management'); addSeverity('critical')
        await InvoicePage.openInvoiceList()
        await expect(InvoicePage.invoiceTable).toBeDisplayed()
    })

    // SM-007: Logout
    it('SM-007 | User can log out successfully', async () => {
        addFeature('Account & Setup'); addSeverity('normal')
        await DashboardPage.logout()
        // Should redirect back to landing or login
        await expect(browser).toHaveUrl(/invoicemanager\.ng/i)
    })
})
