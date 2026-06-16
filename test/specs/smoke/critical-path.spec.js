import { addFeature, addSeverity } from '../../helpers/allureHelper.js'
import LandingPage from '../../pageobjects/landing.page.js'
import SubscriptionsPage from '../../pageobjects/subscriptions.page.js'
import RegistrationPage from '../../pageobjects/registration.page.js'
import InstanceLandingPage from '../../pageobjects/instance-landing.page.js'
import LoginPage from '../../pageobjects/login.page.js'
import DashboardPage from '../../pageobjects/dashboard.page.js'
import SettingsPage from '../../pageobjects/settings.page.js'
import FiscalYearsPage from '../../pageobjects/fiscal-years.page.js'
import ProductsPage from '../../pageobjects/products.page.js'

describe('SMOKE — InvoiceManager Landing Page Critical Path', () => {

    before(async () => {
        await LandingPage.open()
    })

    it('SM-001 | Page loads with correct InvoiceManager title', async () => {
        addFeature('Landing Page'); addSeverity('blocker')
        await expect(browser).toHaveTitle(/InvoiceManager/i)
    })

    it('SM-002 | Header and navigation menu are visible', async () => {
        addFeature('Landing Page'); addSeverity('blocker')
        await expect(LandingPage.header).toBeDisplayed()
        await expect(LandingPage.navMenu).toBeDisplayed()
    })

    it('SM-003 | Hero section is displayed with main heading', async () => {
        addFeature('Landing Page'); addSeverity('critical')
        await expect(LandingPage.heroSection).toBeDisplayed()
        await expect(LandingPage.heroHeading).toHaveText(/Transform your Invoicing/i)
    })

    it('SM-004 | Primary CTA — Activate your TIN — is visible in hero', async () => {
        addFeature('Landing Page'); addSeverity('blocker')
        await expect(LandingPage.heroActivateCTA).toBeDisplayed()
        await expect(LandingPage.heroActivateCTA).toHaveText(/Activate your TIN/i)
    })

    it('SM-005 | Register for TIN and Get Started CTAs are both present', async () => {
        addFeature('Landing Page'); addSeverity('critical')
        await expect(LandingPage.registerForTINBtn).toBeDisplayed()
        await expect(LandingPage.getStartedBtn).toBeDisplayed()
    })

    it('SM-006 | Footer is visible with InvoiceManager branding', async () => {
        addFeature('Landing Page'); addSeverity('normal')
        await LandingPage.footer.scrollIntoView()
        await expect(LandingPage.footer).toBeDisplayed()
        await expect(LandingPage.footerSitename).toHaveText(/InvoiceManager/i)
    })
})

describe('SMOKE — Subscriptions Page Critical Path', () => {

    before(async () => {
        await SubscriptionsPage.open()
    })

    it('SM-007 | Subscriptions page loads with correct title', async () => {
        addFeature('Subscriptions'); addSeverity('blocker')
        await expect(browser).toHaveTitle(/InvoiceManager/)
        await expect(browser).toHaveTitle(/Subscriptions/i)
    })

    it('SM-008 | Three plan cards are displayed (SME Starter, Business Pro, Enterprise)', async () => {
        addFeature('Subscriptions'); addSeverity('blocker')
        await expect(SubscriptionsPage.smeStarterName).toBeDisplayed()
        await expect(SubscriptionsPage.businessProName).toBeDisplayed()
        await expect(SubscriptionsPage.enterpriseName).toBeDisplayed()
    })

    it('SM-009 | All three START NOW CTAs are present and linked correctly', async () => {
        addFeature('Subscriptions'); addSeverity('critical')
        const smeHref  = await SubscriptionsPage.smeStarterCTA.getAttribute('href')
        const proHref  = await SubscriptionsPage.businessProCTA.getAttribute('href')
        const entHref  = await SubscriptionsPage.enterpriseCTA.getAttribute('href')
        expect(smeHref).toContain('67a91caf')
        expect(proHref).toContain('062b6808')
        expect(entHref).toContain('6e98ca7b')
    })
})

describe('SMOKE — SME Starter Registration Form Critical Path', () => {

    before(async () => {
        await RegistrationPage.open()
    })

    it('SM-010 | Registration form page loads with correct heading', async () => {
        addFeature('Registration'); addSeverity('blocker')
        await expect(RegistrationPage.pageHeading).toBeDisplayed()
        await expect(RegistrationPage.pageHeading).toHaveText(/Complete Your Subscription/i)
    })

    it('SM-011 | Plan summary shows SME Starter FREE', async () => {
        addFeature('Registration'); addSeverity('blocker')
        await expect(RegistrationPage.planSummaryCard).toHaveText(/SME Starter/i)
        await expect(RegistrationPage.planPrice).toHaveText(/FREE/i)
    })

    it('SM-012 | All four required form fields are present', async () => {
        addFeature('Registration'); addSeverity('blocker')
        await expect(RegistrationPage.firstNameInput).toBeDisplayed()
        await expect(RegistrationPage.lastNameInput).toBeDisplayed()
        await expect(RegistrationPage.emailInput).toBeDisplayed()
        await expect(RegistrationPage.phoneInput).toBeDisplayed()
    })

    it('SM-013 | Subscribe Now button is present', async () => {
        addFeature('Registration'); addSeverity('blocker')
        await expect(RegistrationPage.submitBtn).toBeDisplayed()
        await expect(RegistrationPage.submitBtn).toHaveText(/Subscribe Now/i)
    })
})

describe('SMOKE — Instance Landing Page (benten.invoicemanager.ng)', () => {

    before(async () => {
        await InstanceLandingPage.open()
    })

    it('SM-014 | Instance landing page loads with InvoiceManager title', async () => {
        addFeature('Instance Landing'); addSeverity('blocker')
        await expect(browser).toHaveTitle(/InvoiceManager/i)
    })

    it('SM-015 | Hero shows business name and Login button', async () => {
        addFeature('Instance Landing'); addSeverity('blocker')
        await expect(InstanceLandingPage.heroBusinessName).toHaveText(/Ben Ten Science Lab/i)
        await expect(InstanceLandingPage.heroLoginBtn).toBeDisplayed()
    })

    it('SM-016 | Nav Login button links to /login on the instance', async () => {
        addFeature('Instance Landing'); addSeverity('blocker')
        const href = await InstanceLandingPage.navLoginBtn.getAttribute('href')
        expect(href).toContain('benten.invoicemanager.ng/login')
    })
})

describe('SMOKE — Instance Login Page (benten.invoicemanager.ng/login)', () => {

    before(async () => {
        await LoginPage.open()
    })

    it('SM-017 | Login page loads with LOG IN heading', async () => {
        addFeature('Login'); addSeverity('blocker')
        await expect(LoginPage.loginHeading).toBeDisplayed()
        await expect(LoginPage.loginHeading).toHaveText(/LOG IN/i)
    })

    it('SM-018 | Email and Password fields are present', async () => {
        addFeature('Login'); addSeverity('blocker')
        await expect(LoginPage.emailInput).toBeDisplayed()
        await expect(LoginPage.passwordInput).toBeDisplayed()
    })

    it('SM-019 | Log In submit button is present', async () => {
        addFeature('Login'); addSeverity('blocker')
        await expect(LoginPage.submitBtn).toBeDisplayed()
        await expect(LoginPage.submitBtn).toHaveText(/Log In/i)
    })

    it('SM-020 | Forgot Password link is present', async () => {
        addFeature('Login'); addSeverity('normal')
        await expect(LoginPage.forgotPasswordLink).toBeDisplayed()
    })
})

describe('SMOKE — Dashboard Critical Path (benten.invoicemanager.ng/dashboard)', () => {

    before(async () => {
        await LoginPage.open()
        await LoginPage.login(process.env.TEST_EMAIL, process.env.TEST_PASS)
        await DashboardPage.open()
    })

    it('SM-021 | Dashboard loads with correct page title after login', async () => {
        addFeature('Dashboard'); addSeverity('blocker')
        await expect(browser).toHaveTitle(/InvoiceManager/i)
        await expect(browser).toHaveTitle(/Dashboard/i)
    })

    it('SM-022 | Welcome banner is displayed confirming successful authentication', async () => {
        addFeature('Dashboard'); addSeverity('blocker')
        await expect(DashboardPage.welcomeBanner).toBeDisplayed()
    })

    it('SM-023 | KPI summary cards section renders with at least Total Sales visible', async () => {
        addFeature('Dashboard'); addSeverity('blocker')
        await expect(DashboardPage.summaryCardsSection).toBeDisplayed()
        await expect(DashboardPage.totalSalesValue).toBeDisplayed()
    })

    it('SM-024 | Sidebar navigation is present and Create New Invoice link is accessible', async () => {
        addFeature('Dashboard'); addSeverity('critical')
        await expect(DashboardPage.sidebar).toBeDisplayed()
        await expect(DashboardPage.navCreateInvoice).toBeDisplayed()
    })

    it('SM-025 | Logout form exists ensuring user can end session', async () => {
        addFeature('Dashboard'); addSeverity('blocker')
        await expect(DashboardPage.logoutForm).toBeExisting()
    })
})

describe('SMOKE — Manage Settings Critical Path (benten.invoicemanager.ng/invoice-manager/firs-settings)', () => {

    before(async () => {
        await LoginPage.open()
        await LoginPage.login(process.env.TEST_EMAIL, process.env.TEST_PASS)
        await SettingsPage.open()
    })

    it('SM-026 | Settings page loads after login with correct title', async () => {
        addFeature('Settings'); addSeverity('blocker')
        await expect(browser).toHaveTitle(/InvoiceManager/i)
        await expect(browser).toHaveTitle(/Settings/i)
    })

    it('SM-027 | Settings tab is active and business name is visible', async () => {
        addFeature('Settings'); addSeverity('blocker')
        await expect(SettingsPage.settingsPane).toBeDisplayed()
        await expect(SettingsPage.businessNameInput).toBeDisplayed()
    })

    it('SM-028 | FIRS TIN field is populated (prerequisite for invoice signing)', async () => {
        addFeature('Settings'); addSeverity('blocker')
        const tin = await SettingsPage.tinInput.getValue()
        expect(tin.trim().length).toBeGreaterThan(0)
    })

    it('SM-029 | FIRS tab is present and opens without error', async () => {
        addFeature('Settings'); addSeverity('blocker')
        await SettingsPage.clickFIRSTab()
        await expect(SettingsPage.firsPane).toBeDisplayed()
        await expect(SettingsPage.firsBaseUrlInput).toBeDisplayed()
    })

    it('SM-030 | FIRS Base URL and FIRS Key are both populated', async () => {
        addFeature('Settings'); addSeverity('blocker')
        const baseUrl = await SettingsPage.firsBaseUrlInput.getValue()
        const key = await SettingsPage.firsKeyInput.getValue()
        expect(baseUrl).toContain('http')
        expect(key.trim().length).toBeGreaterThan(0)
    })
})

describe('SMOKE — Manage Fiscal Years Critical Path (benten.invoicemanager.ng/be/fiscalYears)', () => {

    before(async () => {
        await LoginPage.open()
        await LoginPage.login(process.env.TEST_EMAIL, process.env.TEST_PASS)
        await FiscalYearsPage.open()
        await FiscalYearsPage.waitForListLoaded()
    })

    it('SM-031 | Fiscal Years page loads with correct title after login', async () => {
        addFeature('Fiscal Years'); addSeverity('blocker')
        await expect(browser).toHaveTitle(/InvoiceManager/i)
        await expect(browser).toHaveTitle(/Fiscal Years/i)
    })

    it('SM-032 | New Fiscal Year button is present and enabled', async () => {
        addFeature('Fiscal Years'); addSeverity('blocker')
        await expect(FiscalYearsPage.newFiscalYearBtn).toBeDisplayed()
        await expect(FiscalYearsPage.newFiscalYearBtn).not.toBeDisabled()
    })

    it('SM-033 | Card view container is present and list has loaded', async () => {
        addFeature('Fiscal Years'); addSeverity('blocker')
        await expect(FiscalYearsPage.cardViewContainer).toBeExisting()
    })

    it('SM-034 | All three filter buttons (All, Open, Closed) are present', async () => {
        addFeature('Fiscal Years'); addSeverity('critical')
        await expect(FiscalYearsPage.filterAllBtn).toBeDisplayed()
        await expect(FiscalYearsPage.filterOpenBtn).toBeDisplayed()
        await expect(FiscalYearsPage.filterClosedBtn).toBeDisplayed()
    })

    it('SM-035 | At least one fiscal year is listed (instance has an active fiscal year)', async () => {
        addFeature('Fiscal Years'); addSeverity('blocker')
        const listText = await FiscalYearsPage.cardViewContainer.getText()
        expect(listText).not.toContain('No results found')
        expect(listText.trim().length).toBeGreaterThan(0)
    })
})

describe('SMOKE — Products & Services Critical Path (benten.invoicemanager.ng/be/inventoryItems)', () => {

    before(async () => {
        await LoginPage.open()
        await LoginPage.login(process.env.TEST_EMAIL, process.env.TEST_PASS)
        await ProductsPage.open()
        await ProductsPage.waitForListLoaded()
    })

    it('SM-036 | Products & Services page loads with correct title after login', async () => {
        addFeature('Products & Services'); addSeverity('blocker')
        await expect(browser).toHaveTitle(/InvoiceManager/i)
        await expect(browser).toHaveTitle(/Products/i)
    })

    it('SM-037 | New Item button is present and enabled', async () => {
        addFeature('Products & Services'); addSeverity('blocker')
        await expect(ProductsPage.newItemBtn).toBeDisplayed()
        await expect(ProductsPage.newItemBtn).not.toBeDisabled()
    })

    it('SM-038 | Total Products and Total Services KPI cards are displayed', async () => {
        addFeature('Products & Services'); addSeverity('blocker')
        await expect(ProductsPage.totalProductsCard).toBeDisplayed()
        await expect(ProductsPage.totalServicesCard).toBeDisplayed()
    })

    it('SM-039 | Filter buttons (All, Products, Services) are present', async () => {
        addFeature('Products & Services'); addSeverity('critical')
        await expect(ProductsPage.filterAllBtn).toBeDisplayed()
        await expect(ProductsPage.filterProductsBtn).toBeDisplayed()
        await expect(ProductsPage.filterServicesBtn).toBeDisplayed()
    })

    it('SM-040 | At least one item is listed in the card view', async () => {
        addFeature('Products & Services'); addSeverity('blocker')
        const listText = await ProductsPage.cardViewContainer.getText()
        expect(listText).not.toContain('No results found')
        expect(listText.trim().length).toBeGreaterThan(0)
    })
})
