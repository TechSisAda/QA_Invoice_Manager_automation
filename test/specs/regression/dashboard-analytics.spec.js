import { addFeature, addSeverity } from '../../helpers/allureHelper.js'
import LoginPage from '../../pageobjects/login.page.js'
import DashboardPage from '../../pageobjects/dashboard.page.js'

describe('REGRESSION — Dashboard & Analytics', () => {

    before(async () => {
        await LoginPage.open()
        await LoginPage.login(process.env.TEST_EMAIL, process.env.TEST_PASS)
        await DashboardPage.open()
    })

    it('REG-DASH-001 | Revenue vs Expenses chart renders with monthly data points', async () => {
        addFeature('Dashboard'); addSeverity('critical')
        await expect(DashboardPage.revenueExpenseChart).toBeDisplayed()
        const points = await $$('[data-testid="chart-data-point"]')
        expect(points.length).toBe(12)
    })

    it('REG-DASH-002 | Period filter updates chart data when toggled', async () => {
        addFeature('Dashboard'); addSeverity('normal')
        const before = await DashboardPage.revenueExpenseChart.getAttribute('data-period')
        await DashboardPage.selectPeriod('Weekly')
        const after = await DashboardPage.revenueExpenseChart.getAttribute('data-period')
        expect(before).not.toBe(after)
    })

    it('REG-DASH-003 | VAT (Clients) and VAT (Vendors) trend lines are separately rendered', async () => {
        addFeature('Dashboard'); addSeverity('critical')
        await expect(DashboardPage.vatClientsLine).toBeDisplayed()
        await expect(DashboardPage.vatVendorsLine).toBeDisplayed()
        const clientId = await DashboardPage.vatClientsLine.getAttribute('data-series')
        const vendorId = await DashboardPage.vatVendorsLine.getAttribute('data-series')
        expect(clientId).not.toBe(vendorId)
    })

    it('REG-DASH-004 | Recent invoice feed shows client name, invoice number, amount and date', async () => {
        addFeature('Dashboard'); addSeverity('normal')
        const firstEntry = await $('[data-testid="invoice-feed-item"]')
        await expect(firstEntry.$('[data-testid="feed-client"]')).toBeDisplayed()
        await expect(firstEntry.$('[data-testid="feed-invoice-no"]')).toBeDisplayed()
        await expect(firstEntry.$('[data-testid="feed-amount"]')).toBeDisplayed()
        await expect(firstEntry.$('[data-testid="feed-date"]')).toBeDisplayed()
    })

    it('REG-DASH-005 | Feed entries are correctly labelled as Client (revenue) or Vendor (expense)', async () => {
        addFeature('Dashboard'); addSeverity('normal')
        const entries = await $$('[data-testid="invoice-feed-item"]')
        for (const entry of entries.slice(0, 5)) {
            const type = await entry.$('[data-testid="feed-entity-type"]').getText()
            expect(['Client', 'Vendor']).toContain(type)
        }
    })
})
