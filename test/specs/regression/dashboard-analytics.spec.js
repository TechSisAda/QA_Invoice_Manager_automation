import { addFeature, addSeverity } from '../../helpers/allureHelper.js'
import LoginPage from '../../pageobjects/login.page.js'
import DashboardPage from '../../pageobjects/dashboard.page.js'

const INSTANCE = process.env.INSTANCE_URL || 'https://benten.invoicemanager.ng'

describe('REGRESSION — Dashboard & Analytics', () => {

    before(async () => {
        await LoginPage.open()
        await LoginPage.login(process.env.TEST_EMAIL, process.env.TEST_PASS)
        await DashboardPage.open()
    })

    // ── Page Structure ─────────────────────────────────────────────────────────

    it('REG-DASH-001 | Dashboard page title includes "InvoiceManager" and "Dashboard"', async () => {
        addFeature('Dashboard'); addSeverity('blocker')
        await expect(browser).toHaveTitle(/InvoiceManager/i)
        await expect(browser).toHaveTitle(/Dashboard/i)
    })

    it('REG-DASH-002 | Breadcrumb title reads "Dashboard"', async () => {
        addFeature('Dashboard'); addSeverity('critical')
        await expect(DashboardPage.breadcrumbTitle).toBeDisplayed()
        await expect(DashboardPage.breadcrumbTitle).toHaveText(/Dashboard/i)
    })

    it('REG-DASH-003 | Logged-in user name is shown in breadcrumb', async () => {
        addFeature('Dashboard'); addSeverity('normal')
        await expect(DashboardPage.breadcrumbUser).toBeDisplayed()
        const name = await DashboardPage.breadcrumbUser.getText()
        expect(name.trim().length).toBeGreaterThan(0)
    })

    // ── Welcome Banner ─────────────────────────────────────────────────────────

    it('REG-DASH-004 | Welcome banner is displayed after login', async () => {
        addFeature('Dashboard'); addSeverity('critical')
        await expect(DashboardPage.welcomeBanner).toBeDisplayed()
    })

    it('REG-DASH-005 | Welcome banner heading contains "InvoiceManager Online Portal"', async () => {
        addFeature('Dashboard'); addSeverity('normal')
        await expect(DashboardPage.welcomeHeading).toHaveText(/InvoiceManager Online Portal/i)
    })

    it('REG-DASH-006 | Welcome banner message contains a greeting', async () => {
        addFeature('Dashboard'); addSeverity('normal')
        const msg = await DashboardPage.welcomeMessage.getText()
        expect(msg.toLowerCase()).toContain('welcome')
    })

    // ── KPI Summary Cards ──────────────────────────────────────────────────────

    it('REG-DASH-007 | KPI summary cards section is displayed', async () => {
        addFeature('Dashboard'); addSeverity('critical')
        await expect(DashboardPage.summaryCardsSection).toBeDisplayed()
    })

    it('REG-DASH-008 | Total Sales KPI card shows a monetary value (₦)', async () => {
        addFeature('Dashboard'); addSeverity('critical')
        const total = await DashboardPage.totalSalesValue.getText()
        expect(total).toContain('₦')
    })

    it('REG-DASH-009 | Outstanding (unpaid) KPI card shows a monetary value (₦)', async () => {
        addFeature('Dashboard'); addSeverity('critical')
        const unpaid = await DashboardPage.outstandingValue.getText()
        expect(unpaid).toContain('₦')
    })

    it('REG-DASH-010 | Collected (paid) KPI card shows a monetary value (₦)', async () => {
        addFeature('Dashboard'); addSeverity('critical')
        const paid = await DashboardPage.collectedValue.getText()
        expect(paid).toContain('₦')
    })

    it('REG-DASH-011 | All three KPI cards are simultaneously visible', async () => {
        addFeature('Dashboard'); addSeverity('critical')
        await expect(DashboardPage.totalSalesValue).toBeDisplayed()
        await expect(DashboardPage.outstandingValue).toBeDisplayed()
        await expect(DashboardPage.collectedValue).toBeDisplayed()
    })

    // ── Charts ─────────────────────────────────────────────────────────────────

    it('REG-DASH-012 | Financial Overview chart container is rendered', async () => {
        addFeature('Dashboard'); addSeverity('critical')
        await expect(DashboardPage.financialOverviewChart).toBeDisplayed()
    })

    it('REG-DASH-013 | Sales Activity chart container is rendered', async () => {
        addFeature('Dashboard'); addSeverity('critical')
        await expect(DashboardPage.salesActivityChart).toBeDisplayed()
    })

    it('REG-DASH-014 | Month selector is present and has selectable options', async () => {
        addFeature('Dashboard'); addSeverity('normal')
        await expect(DashboardPage.monthSelector).toBeDisplayed()
        const options = await DashboardPage.monthSelector.$$('option')
        expect(options.length).toBeGreaterThan(0)
    })

    it('REG-DASH-015 | View selector offers Daily and Weekly options', async () => {
        addFeature('Dashboard'); addSeverity('normal')
        await expect(DashboardPage.viewSelector).toBeDisplayed()
        const options = await DashboardPage.viewSelector.$$('option')
        const texts = await Promise.all(options.map(o => o.getText()))
        expect(texts.join(' ')).toContain('Daily')
        expect(texts.join(' ')).toContain('Weekly')
    })

    it('REG-DASH-016 | Changing view selector does not crash the page', async () => {
        addFeature('Dashboard'); addSeverity('normal')
        await DashboardPage.viewSelector.selectByVisibleText('Weekly')
        await expect(DashboardPage.salesActivityChart).toBeDisplayed()
        await DashboardPage.viewSelector.selectByVisibleText('Daily')
        await expect(DashboardPage.salesActivityChart).toBeDisplayed()
    })

    // ── Invoice Status Donut ───────────────────────────────────────────────────

    it('REG-DASH-017 | Invoice Status donut chart is rendered', async () => {
        addFeature('Dashboard'); addSeverity('critical')
        await expect(DashboardPage.statusDonutChart).toBeDisplayed()
    })

    it('REG-DASH-018 | "New Invoice" CTA button is present within the donut section', async () => {
        addFeature('Dashboard'); addSeverity('critical')
        await expect(DashboardPage.newInvoiceBtn).toBeDisplayed()
        const href = await DashboardPage.newInvoiceBtn.getAttribute('href')
        expect(href).toContain('start-invoice-creation')
    })

    it('REG-DASH-019 | "All Invoices" button links to /invoice-manager/invoices', async () => {
        addFeature('Dashboard'); addSeverity('normal')
        await expect(DashboardPage.allInvoicesBtn).toBeDisplayed()
        const href = await DashboardPage.allInvoicesBtn.getAttribute('href')
        expect(href).toContain('/invoice-manager/invoices')
    })

    // ── Recent Invoices ────────────────────────────────────────────────────────

    it('REG-DASH-020 | Recent Invoices list is displayed', async () => {
        addFeature('Dashboard'); addSeverity('critical')
        await expect(DashboardPage.recentInvoicesList).toBeDisplayed()
    })

    it('REG-DASH-021 | Recent Invoices list contains at least one row', async () => {
        addFeature('Dashboard'); addSeverity('normal')
        const count = await DashboardPage.getRecentInvoiceCount()
        expect(count).toBeGreaterThan(0)
    })

    it('REG-DASH-022 | Each recent invoice row links to an individual invoice detail page', async () => {
        addFeature('Dashboard'); addSeverity('normal')
        const items = await DashboardPage.recentInvoiceItems
        const href = await items[0].getAttribute('href')
        expect(href).toContain('/invoice-manager/invoice/')
    })

    it('REG-DASH-023 | "See all" link navigates to All Invoices page', async () => {
        addFeature('Dashboard'); addSeverity('normal')
        await expect(DashboardPage.recentInvoicesSeeAll).toBeDisplayed()
        const href = await DashboardPage.recentInvoicesSeeAll.getAttribute('href')
        expect(href).toContain('/invoice-manager/invoices')
    })

    // ── Navigation — Sidebar ───────────────────────────────────────────────────

    it('REG-DASH-024 | Sidebar is present with InvoiceManager branding', async () => {
        addFeature('Dashboard'); addSeverity('critical')
        await expect(DashboardPage.sidebar).toBeDisplayed()
        await expect(DashboardPage.sidebarLogoText).toHaveText(/InvoiceManager/i)
    })

    it('REG-DASH-025 | Sidebar menu is rendered', async () => {
        addFeature('Dashboard'); addSeverity('critical')
        await expect(DashboardPage.sidebarMenu).toBeDisplayed()
    })

    it('REG-DASH-026 | "Create New Invoice" nav link is present with correct href', async () => {
        addFeature('Dashboard'); addSeverity('critical')
        await expect(DashboardPage.navCreateInvoice).toBeDisplayed()
        const href = await DashboardPage.navCreateInvoice.getAttribute('href')
        expect(href).toContain('start-invoice-creation')
    })

    it('REG-DASH-027 | "Point of Sale Invoice" nav link is present with correct href', async () => {
        addFeature('Dashboard'); addSeverity('critical')
        await expect(DashboardPage.navPOS).toBeDisplayed()
        const href = await DashboardPage.navPOS.getAttribute('href')
        expect(href).toContain('start-invoice-checkout')
    })

    it('REG-DASH-028 | Invoices submenu parent link is present', async () => {
        addFeature('Dashboard'); addSeverity('normal')
        await expect(DashboardPage.navInvoicesMenu).toBeDisplayed()
    })

    it('REG-DASH-029 | Administration submenu parent link is present', async () => {
        addFeature('Dashboard'); addSeverity('normal')
        await expect(DashboardPage.navAdminMenu).toBeDisplayed()
    })

    // ── Top Header — User Controls ─────────────────────────────────────────────

    it('REG-DASH-030 | Top header is rendered', async () => {
        addFeature('Dashboard'); addSeverity('critical')
        await expect(DashboardPage.topHeader).toBeDisplayed()
    })

    it('REG-DASH-031 | User dropdown displays the logged-in user name', async () => {
        addFeature('Dashboard'); addSeverity('critical')
        await expect(DashboardPage.userDropdown).toBeDisplayed()
        const name = await DashboardPage.userNameDisplay.getText()
        expect(name.trim().length).toBeGreaterThan(0)
    })

    it('REG-DASH-032 | Notifications bell is present in the header', async () => {
        addFeature('Dashboard'); addSeverity('normal')
        await expect(DashboardPage.notificationsBell).toBeDisplayed()
    })

    it('REG-DASH-033 | Hidden email placeholder contains a valid email address', async () => {
        addFeature('Dashboard'); addSeverity('normal')
        const email = await DashboardPage.hiddenUserEmail.getValue()
        expect(email).toContain('@')
    })

    it('REG-DASH-034 | Profile link is accessible from user dropdown', async () => {
        addFeature('Dashboard'); addSeverity('normal')
        await expect(DashboardPage.profileLink).toBeExisting()
        const href = await DashboardPage.profileLink.getAttribute('href')
        expect(href).toContain('fc/profile')
    })

    it('REG-DASH-035 | Logout form exists and targets the correct logout endpoint', async () => {
        addFeature('Dashboard'); addSeverity('blocker')
        await expect(DashboardPage.logoutForm).toBeExisting()
        const action = await DashboardPage.logoutForm.getAttribute('action')
        expect(action).toContain('/logout')
    })
})
