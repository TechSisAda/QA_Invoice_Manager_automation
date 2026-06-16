import { addFeature, addSeverity } from '../../helpers/allureHelper.js'
import LandingPage from '../../pageobjects/landing.page.js'

describe('REGRESSION — Landing Page', () => {

    before(async () => {
        await LandingPage.open()
    })

    // ── Navigation ──────────────────────────────────────────────────────────

    describe('Navigation', () => {

        it('REG-LP-001 | Logo is displayed and links to home page', async () => {
            addFeature('Landing Page'); addSeverity('normal')
            await expect(LandingPage.logo).toBeDisplayed()
            const href = await LandingPage.logo.getAttribute('href')
            expect(href).toMatch(/^\/$|invoicemanager\.ng\/?$/)
        })

        it('REG-LP-002 | Register nav link points to /plm/subscriptions', async () => {
            addFeature('Landing Page'); addSeverity('critical')
            await expect(LandingPage.navRegister).toBeDisplayed()
            const href = await LandingPage.navRegister.getAttribute('href')
            expect(href).toContain('plm/subscriptions')
        })

        it('REG-LP-003 | How It Works nav link points to correct page', async () => {
            addFeature('Landing Page'); addSeverity('normal')
            await expect(LandingPage.navHowItWorks).toBeDisplayed()
            const href = await LandingPage.navHowItWorks.getAttribute('href')
            expect(href).toContain('how-it-works')
        })

        it('REG-LP-004 | FIRS E-Invoicing nav link points to correct page', async () => {
            addFeature('Landing Page'); addSeverity('normal')
            await expect(LandingPage.navFIRS).toBeDisplayed()
            const href = await LandingPage.navFIRS.getAttribute('href')
            expect(href).toContain('firs-e-invoicing')
        })

        it('REG-LP-005 | FAQ nav link points to tawk.help support page', async () => {
            addFeature('Landing Page'); addSeverity('normal')
            await expect(LandingPage.navFAQ).toBeDisplayed()
            const href = await LandingPage.navFAQ.getAttribute('href')
            expect(href).toContain('tawk.help')
        })

        it('REG-LP-006 | Compliance Mgr nav link points to compliance subdomain', async () => {
            addFeature('Landing Page'); addSeverity('normal')
            await expect(LandingPage.navCompliance).toBeDisplayed()
            const href = await LandingPage.navCompliance.getAttribute('href')
            expect(href).toContain('compliance.invoicemanager')
        })

        it('REG-LP-007 | Activate your TIN nav CTA points to /ivm/link-tin', async () => {
            addFeature('Landing Page'); addSeverity('critical')
            await expect(LandingPage.navActivateTIN).toBeDisplayed()
            const href = await LandingPage.navActivateTIN.getAttribute('href')
            expect(href).toContain('link-tin')
        })

        it('REG-LP-008 | Mobile nav toggle button is present in the DOM', async () => {
            addFeature('Landing Page'); addSeverity('normal')
            await expect(LandingPage.mobileNavToggle).toExist()
        })
    })

    // ── Hero Section ─────────────────────────────────────────────────────────

    describe('Hero Section', () => {

        it('REG-LP-009 | Hero heading reads "Transform your Invoicing"', async () => {
            addFeature('Landing Page'); addSeverity('critical')
            await expect(LandingPage.heroHeading).toHaveText(/Transform your Invoicing/i)
        })

        it('REG-LP-010 | Hero subtext mentions FIRS compliance', async () => {
            addFeature('Landing Page'); addSeverity('normal')
            await expect(LandingPage.heroSubtext).toHaveText(/FIRS compliance/i)
        })

        it('REG-LP-011 | Hero Activate your TIN CTA links to /ivm/link-tin', async () => {
            addFeature('Landing Page'); addSeverity('critical')
            const href = await LandingPage.heroActivateCTA.getAttribute('href')
            expect(href).toContain('link-tin')
        })
    })

    // ── Action Buttons ────────────────────────────────────────────────────────

    describe('Main CTAs', () => {

        it('REG-LP-012 | "Register for TIN" button links to compliance.invoicemanager.ng', async () => {
            addFeature('Landing Page'); addSeverity('critical')
            const href = await LandingPage.registerForTINBtn.getAttribute('href')
            expect(href).toContain('compliance.invoicemanager.ng')
        })

        it('REG-LP-013 | "Get Started with your TIN" button links to /ivm/link-tin', async () => {
            addFeature('Landing Page'); addSeverity('critical')
            const href = await LandingPage.getStartedBtn.getAttribute('href')
            expect(href).toContain('ivm/link-tin')
        })
    })

    // ── Service Cards ─────────────────────────────────────────────────────────

    describe('Service Feature Cards', () => {

        it('REG-LP-014 | Three service cards are displayed', async () => {
            addFeature('Landing Page'); addSeverity('normal')
            const cards = await LandingPage.serviceItems
            expect(cards.length).toBe(3)
        })

        it('REG-LP-015 | "Smart Invoicing" service card is visible', async () => {
            addFeature('Landing Page'); addSeverity('normal')
            await expect(LandingPage.smartInvoicingCard).toBeDisplayed()
        })

        it('REG-LP-016 | "Faster Payments" service card is visible', async () => {
            addFeature('Landing Page'); addSeverity('normal')
            await expect(LandingPage.fasterPaymentsCard).toBeDisplayed()
        })

        it('REG-LP-017 | "Total Compliance" service card is visible', async () => {
            addFeature('Landing Page'); addSeverity('normal')
            await expect(LandingPage.totalComplianceCard).toBeDisplayed()
        })
    })

    // ── Sidebar ───────────────────────────────────────────────────────────────

    describe('Sidebar', () => {

        it('REG-LP-018 | Sidebar logo image is visible', async () => {
            addFeature('Landing Page'); addSeverity('normal')
            await expect(LandingPage.sidebarLogo).toBeDisplayed()
        })

        it('REG-LP-019 | Sidebar Activate your TIN button is present', async () => {
            addFeature('Landing Page'); addSeverity('normal')
            await expect(LandingPage.sidebarActivateBtn).toBeDisplayed()
        })

        it('REG-LP-020 | Quick Links section is visible', async () => {
            addFeature('Landing Page'); addSeverity('normal')
            await expect(LandingPage.quickLinksSection).toBeDisplayed()
        })
    })

    // ── Help & Support ────────────────────────────────────────────────────────

    describe('Help & Support', () => {

        it('REG-LP-021 | Help & Support section is visible', async () => {
            addFeature('Landing Page'); addSeverity('normal')
            await expect(LandingPage.helpSupportSection).toBeDisplayed()
        })

        it('REG-LP-022 | Support email address is correct', async () => {
            addFeature('Landing Page'); addSeverity('normal')
            await expect(LandingPage.supportEmail).toBeDisplayed()
            await expect(LandingPage.supportEmail).toHaveText('support@invoicemanager.ng')
        })

        it('REG-LP-023 | WhatsApp link points to correct number (+2348071324704)', async () => {
            addFeature('Landing Page'); addSeverity('normal')
            const href = await LandingPage.whatsappLink.getAttribute('href')
            expect(href).toContain('2348071324704')
        })
    })

    // ── Footer ────────────────────────────────────────────────────────────────

    describe('Footer', () => {

        before(async () => {
            await LandingPage.footer.scrollIntoView()
        })

        it('REG-LP-024 | Footer displays InvoiceManager sitename', async () => {
            addFeature('Landing Page'); addSeverity('normal')
            await expect(LandingPage.footerSitename).toHaveText(/InvoiceManager/i)
        })

        it('REG-LP-025 | Footer phone number link is correct (02013309579)', async () => {
            addFeature('Landing Page'); addSeverity('normal')
            await expect(LandingPage.footerPhone).toBeDisplayed()
            const href = await LandingPage.footerPhone.getAttribute('href')
            expect(href).toBe('tel:02013309579')
        })

        it('REG-LP-026 | Footer email link is correct (info@invoicemanager.ng)', async () => {
            addFeature('Landing Page'); addSeverity('normal')
            await expect(LandingPage.footerEmail).toBeDisplayed()
            const href = await LandingPage.footerEmail.getAttribute('href')
            expect(href).toBe('mailto:info@invoicemanager.ng')
        })

        it('REG-LP-027 | Footer Facebook social link opens to correct profile', async () => {
            addFeature('Landing Page'); addSeverity('minor')
            const href = await LandingPage.footerFacebook.getAttribute('href')
            expect(href).toContain('facebook.com')
        })

        it('REG-LP-028 | Footer Instagram link is present', async () => {
            addFeature('Landing Page'); addSeverity('minor')
            const href = await LandingPage.footerInstagram.getAttribute('href')
            expect(href).toContain('instagram.com')
        })

        it('REG-LP-029 | Footer LinkedIn link is present', async () => {
            addFeature('Landing Page'); addSeverity('minor')
            const href = await LandingPage.footerLinkedIn.getAttribute('href')
            expect(href).toContain('linkedin.com')
        })

        it('REG-LP-030 | Footer WhatsApp link points to correct number', async () => {
            addFeature('Landing Page'); addSeverity('minor')
            const href = await LandingPage.footerWhatsApp.getAttribute('href')
            expect(href).toContain('2348071324704')
        })

        it('REG-LP-031 | Footer copyright text is present', async () => {
            addFeature('Landing Page'); addSeverity('normal')
            await expect(LandingPage.footerCopyright).toHaveText(/InvoiceManager/i)
            await expect(LandingPage.footerCopyright).toHaveText(/All Rights Reserved/i)
        })

        it('REG-LP-032 | Terms of Use link is present in footer', async () => {
            addFeature('Landing Page'); addSeverity('normal')
            await expect(LandingPage.footerTerms).toBeDisplayed()
            const href = await LandingPage.footerTerms.getAttribute('href')
            expect(href).toContain('/terms')
        })
    })
})
