import { addFeature, addSeverity } from '../../helpers/allureHelper.js'
import InstanceLandingPage from '../../pageobjects/instance-landing.page.js'

const INSTANCE_BASE = process.env.INSTANCE_URL || 'https://benten.invoicemanager.ng'

describe('REGRESSION — Instance Landing Page (benten.invoicemanager.ng)', () => {

    before(async () => {
        await InstanceLandingPage.open()
    })

    // ── Page Load ─────────────────────────────────────────────────────────────

    describe('Page Load', () => {

        it('REG-IL-001 | Page loads with InvoiceManager title', async () => {
            addFeature('Instance Landing'); addSeverity('blocker')
            await expect(browser).toHaveTitle(/InvoiceManager/i)
        })

        it('REG-IL-002 | Header and navigation are visible', async () => {
            addFeature('Instance Landing'); addSeverity('critical')
            await expect(InstanceLandingPage.header).toBeDisplayed()
            await expect(InstanceLandingPage.navMenu).toBeDisplayed()
        })
    })

    // ── Navigation ────────────────────────────────────────────────────────────

    describe('Navigation', () => {

        it('REG-IL-003 | Logo is displayed and links to home', async () => {
            addFeature('Instance Landing'); addSeverity('normal')
            await expect(InstanceLandingPage.logo).toBeDisplayed()
        })

        it('REG-IL-004 | Home nav link is present', async () => {
            addFeature('Instance Landing'); addSeverity('normal')
            await expect(InstanceLandingPage.navHome).toBeDisplayed()
        })

        it('REG-IL-005 | Register nav link points to /plm/subscriptions', async () => {
            addFeature('Instance Landing'); addSeverity('normal')
            const href = await InstanceLandingPage.navRegister.getAttribute('href')
            expect(href).toContain('plm/subscriptions')
        })

        it('REG-IL-006 | How It Works nav link is present', async () => {
            addFeature('Instance Landing'); addSeverity('normal')
            await expect(InstanceLandingPage.navHowItWorks).toBeDisplayed()
        })

        it('REG-IL-007 | FIRS E-Invoicing nav link is present', async () => {
            addFeature('Instance Landing'); addSeverity('normal')
            await expect(InstanceLandingPage.navFIRS).toBeDisplayed()
        })

        it('REG-IL-008 | Login nav button links to /login on this instance', async () => {
            addFeature('Instance Landing'); addSeverity('critical')
            await expect(InstanceLandingPage.navLoginBtn).toBeDisplayed()
            const href = await InstanceLandingPage.navLoginBtn.getAttribute('href')
            expect(href).toContain('benten.invoicemanager.ng/login')
        })

        it('REG-IL-009 | Mobile nav toggle is present in the DOM', async () => {
            addFeature('Instance Landing'); addSeverity('normal')
            await expect(InstanceLandingPage.mobileNavToggle).toExist()
        })
    })

    // ── Hero Section ─────────────────────────────────────────────────────────

    describe('Hero Section', () => {

        it('REG-IL-010 | Hero section is displayed', async () => {
            addFeature('Instance Landing'); addSeverity('critical')
            await expect(InstanceLandingPage.heroSection).toBeDisplayed()
        })

        it('REG-IL-011 | Hero shows the business name "Ben Ten Science Lab"', async () => {
            addFeature('Instance Landing'); addSeverity('critical')
            await expect(InstanceLandingPage.heroBusinessName).toBeDisplayed()
            await expect(InstanceLandingPage.heroBusinessName).toHaveText(/Ben Ten Science Lab/i)
        })

        it('REG-IL-012 | Hero Login button links to /login', async () => {
            addFeature('Instance Landing'); addSeverity('blocker')
            await expect(InstanceLandingPage.heroLoginBtn).toBeDisplayed()
            const href = await InstanceLandingPage.heroLoginBtn.getAttribute('href')
            expect(href).toContain('benten.invoicemanager.ng/login')
        })
    })

    // ── Content Section ───────────────────────────────────────────────────────

    describe('Content', () => {

        it('REG-IL-013 | "Ready to Transform Your Invoicing?" heading is visible', async () => {
            addFeature('Instance Landing'); addSeverity('normal')
            await expect(InstanceLandingPage.transformHeading).toBeDisplayed()
        })

        it('REG-IL-014 | Three service cards are displayed', async () => {
            addFeature('Instance Landing'); addSeverity('normal')
            const cards = await InstanceLandingPage.serviceItems
            expect(cards.length).toBeGreaterThanOrEqual(3)
        })

        it('REG-IL-015 | "Smart Invoicing" service card is visible', async () => {
            addFeature('Instance Landing'); addSeverity('normal')
            await expect(InstanceLandingPage.smartInvoicingCard).toBeDisplayed()
        })

        it('REG-IL-016 | "Faster Payments" service card is visible', async () => {
            addFeature('Instance Landing'); addSeverity('normal')
            await expect(InstanceLandingPage.fasterPaymentsCard).toBeDisplayed()
        })

        it('REG-IL-017 | "Total Compliance" service card is visible', async () => {
            addFeature('Instance Landing'); addSeverity('normal')
            await expect(InstanceLandingPage.totalComplianceCard).toBeDisplayed()
        })
    })

    // ── Sidebar ───────────────────────────────────────────────────────────────

    describe('Sidebar', () => {

        it('REG-IL-018 | Sidebar logo image is visible', async () => {
            addFeature('Instance Landing'); addSeverity('normal')
            await expect(InstanceLandingPage.sidebarLogo).toBeDisplayed()
        })

        it('REG-IL-019 | Sidebar tagline mentions Smart Invoicing', async () => {
            addFeature('Instance Landing'); addSeverity('normal')
            await expect(InstanceLandingPage.sidebarTagline).toBeDisplayed()
        })

        it('REG-IL-020 | Sidebar Login button links to /login', async () => {
            addFeature('Instance Landing'); addSeverity('critical')
            await expect(InstanceLandingPage.sidebarLoginBtn).toBeDisplayed()
            const href = await InstanceLandingPage.sidebarLoginBtn.getAttribute('href')
            expect(href).toContain('benten.invoicemanager.ng/login')
        })

        it('REG-IL-021 | Quick Links section is visible', async () => {
            addFeature('Instance Landing'); addSeverity('normal')
            await expect(InstanceLandingPage.quickLinksSection).toBeDisplayed()
        })

        it('REG-IL-022 | Quick Link to FIRS E-Invoicing is present', async () => {
            addFeature('Instance Landing'); addSeverity('normal')
            await expect(InstanceLandingPage.quickLinkFIRS).toBeDisplayed()
            const href = await InstanceLandingPage.quickLinkFIRS.getAttribute('href')
            expect(href).toContain('firs-e-invoicing')
        })

        it('REG-IL-023 | Quick Link to How It Works is present', async () => {
            addFeature('Instance Landing'); addSeverity('normal')
            await expect(InstanceLandingPage.quickLinkHowItWorks).toBeDisplayed()
            const href = await InstanceLandingPage.quickLinkHowItWorks.getAttribute('href')
            expect(href).toContain('how-it-works')
        })
    })

    // ── Footer ────────────────────────────────────────────────────────────────

    describe('Footer', () => {

        before(async () => {
            await InstanceLandingPage.footer.scrollIntoView()
        })

        it('REG-IL-024 | Footer displays InvoiceManager sitename', async () => {
            addFeature('Instance Landing'); addSeverity('normal')
            await expect(InstanceLandingPage.footerSitename).toHaveText(/InvoiceManager/i)
        })

        it('REG-IL-025 | Footer phone number is instance-specific (02018891798)', async () => {
            addFeature('Instance Landing'); addSeverity('normal')
            await expect(InstanceLandingPage.footerPhone).toBeDisplayed()
            const href = await InstanceLandingPage.footerPhone.getAttribute('href')
            expect(href).toBe('tel:02018891798')
        })

        it('REG-IL-026 | Footer email link is correct', async () => {
            addFeature('Instance Landing'); addSeverity('normal')
            const href = await InstanceLandingPage.footerEmail.getAttribute('href')
            expect(href).toBe('mailto:info@invoicemanager.ng')
        })

        it('REG-IL-027 | Footer Facebook link is present', async () => {
            addFeature('Instance Landing'); addSeverity('minor')
            const href = await InstanceLandingPage.footerFacebook.getAttribute('href')
            expect(href).toContain('facebook.com')
        })

        it('REG-IL-028 | Footer Instagram link is present', async () => {
            addFeature('Instance Landing'); addSeverity('minor')
            const href = await InstanceLandingPage.footerInstagram.getAttribute('href')
            expect(href).toContain('instagram.com')
        })

        it('REG-IL-029 | Footer LinkedIn link is present', async () => {
            addFeature('Instance Landing'); addSeverity('minor')
            const href = await InstanceLandingPage.footerLinkedIn.getAttribute('href')
            expect(href).toContain('linkedin.com')
        })

        it('REG-IL-030 | Footer copyright text is present', async () => {
            addFeature('Instance Landing'); addSeverity('normal')
            await expect(InstanceLandingPage.footerCopyright).toHaveText(/InvoiceManager/i)
            await expect(InstanceLandingPage.footerCopyright).toHaveText(/All Rights Reserved/i)
        })

        it('REG-IL-031 | Terms of Use link is present in footer', async () => {
            addFeature('Instance Landing'); addSeverity('normal')
            await expect(InstanceLandingPage.footerTerms).toBeDisplayed()
            const href = await InstanceLandingPage.footerTerms.getAttribute('href')
            expect(href).toContain('/terms')
        })
    })
})
