import { addFeature, addSeverity } from '../../helpers/allureHelper.js'
import SubscriptionsPage from '../../pageobjects/subscriptions.page.js'

describe('REGRESSION — Subscriptions / Register Page', () => {

    before(async () => {
        await SubscriptionsPage.open()
    })

    // ── Page Load ─────────────────────────────────────────────────────────────

    describe('Page Load', () => {

        it('REG-SUB-001 | Page loads with InvoiceManager Subscriptions title', async () => {
            addFeature('Subscriptions'); addSeverity('blocker')
            await expect(browser).toHaveTitle(/InvoiceManager/)
            await expect(browser).toHaveTitle(/Subscriptions/i)
        })

        it('REG-SUB-002 | Header and navigation are visible', async () => {
            addFeature('Subscriptions'); addSeverity('critical')
            await expect(SubscriptionsPage.header).toBeDisplayed()
            await expect(SubscriptionsPage.navMenu).toBeDisplayed()
        })

        it('REG-SUB-003 | "Available Options" section heading is displayed', async () => {
            addFeature('Subscriptions'); addSeverity('critical')
            await expect(SubscriptionsPage.availableOptionsHeading).toBeDisplayed()
        })

        it('REG-SUB-004 | Three subscription plan cards are rendered', async () => {
            addFeature('Subscriptions'); addSeverity('critical')
            const cards = await SubscriptionsPage.allPlanCards
            expect(cards.length).toBeGreaterThanOrEqual(3)
        })
    })

    // ── SME Starter Plan ─────────────────────────────────────────────────────

    describe('SME Starter Plan', () => {

        it('REG-SUB-005 | SME Starter plan name is visible', async () => {
            addFeature('Subscriptions'); addSeverity('critical')
            await expect(SubscriptionsPage.smeStarterName).toBeDisplayed()
        })

        it('REG-SUB-006 | SME Starter price is FREE', async () => {
            addFeature('Subscriptions'); addSeverity('critical')
            await expect(SubscriptionsPage.smeStarterPrice).toBeDisplayed()
            await expect(SubscriptionsPage.smeStarterPrice).toHaveText(/FREE/i)
        })

        it('REG-SUB-007 | SME Starter "START NOW" CTA is displayed', async () => {
            addFeature('Subscriptions'); addSeverity('critical')
            await expect(SubscriptionsPage.smeStarterCTA).toBeDisplayed()
        })

        it('REG-SUB-008 | SME Starter CTA links to the correct plan UUID', async () => {
            addFeature('Subscriptions'); addSeverity('critical')
            const href = await SubscriptionsPage.smeStarterCTA.getAttribute('href')
            expect(href).toContain('67a91caf-a7d2-4530-97ef-b6bf8327f4bb')
        })

        it('REG-SUB-009 | SME Starter CTA links to /plm/subscriptions path', async () => {
            addFeature('Subscriptions'); addSeverity('normal')
            const href = await SubscriptionsPage.smeStarterCTA.getAttribute('href')
            expect(href).toContain('plm/subscriptions')
        })
    })

    // ── Business Pro Plan ─────────────────────────────────────────────────────

    describe('Business Pro Plan', () => {

        it('REG-SUB-010 | Business Pro plan name is visible', async () => {
            addFeature('Subscriptions'); addSeverity('critical')
            await expect(SubscriptionsPage.businessProName).toBeDisplayed()
        })

        it('REG-SUB-011 | Business Pro "START NOW" CTA is displayed', async () => {
            addFeature('Subscriptions'); addSeverity('critical')
            await expect(SubscriptionsPage.businessProCTA).toBeDisplayed()
        })

        it('REG-SUB-012 | Business Pro CTA links to the correct plan UUID', async () => {
            addFeature('Subscriptions'); addSeverity('critical')
            const href = await SubscriptionsPage.businessProCTA.getAttribute('href')
            expect(href).toContain('062b6808-7f1e-4618-94ad-72a2424c2b29')
        })

        it('REG-SUB-013 | Business Pro shows a discount badge', async () => {
            addFeature('Subscriptions'); addSeverity('normal')
            const badges = await SubscriptionsPage.discountBadges
            const texts = await Promise.all(badges.map(b => b.getText()))
            expect(texts.some(t => t.includes('OFF'))).toBe(true)
        })
    })

    // ── Business Enterprise Plan ──────────────────────────────────────────────

    describe('Business Enterprise Plan', () => {

        it('REG-SUB-014 | Business Enterprise plan name is visible', async () => {
            addFeature('Subscriptions'); addSeverity('critical')
            await expect(SubscriptionsPage.enterpriseName).toBeDisplayed()
        })

        it('REG-SUB-015 | Business Enterprise "START NOW" CTA is displayed', async () => {
            addFeature('Subscriptions'); addSeverity('critical')
            await expect(SubscriptionsPage.enterpriseCTA).toBeDisplayed()
        })

        it('REG-SUB-016 | Business Enterprise CTA links to the correct plan UUID', async () => {
            addFeature('Subscriptions'); addSeverity('critical')
            const href = await SubscriptionsPage.enterpriseCTA.getAttribute('href')
            expect(href).toContain('6e98ca7b-d13f-4cd8-bea0-a5aff156e768')
        })

        it('REG-SUB-017 | Business Enterprise shows a discount badge', async () => {
            addFeature('Subscriptions'); addSeverity('normal')
            const badges = await SubscriptionsPage.discountBadges
            expect(badges.length).toBeGreaterThanOrEqual(1)
        })
    })

    // ── Plan Comparison ───────────────────────────────────────────────────────

    describe('Plan Comparison', () => {

        it('REG-SUB-018 | All three plan names are present on the page', async () => {
            addFeature('Subscriptions'); addSeverity('critical')
            await expect(SubscriptionsPage.smeStarterName).toExist()
            await expect(SubscriptionsPage.businessProName).toExist()
            await expect(SubscriptionsPage.enterpriseName).toExist()
        })

        it('REG-SUB-019 | All three START NOW CTAs are present', async () => {
            addFeature('Subscriptions'); addSeverity('critical')
            await expect(SubscriptionsPage.smeStarterCTA).toExist()
            await expect(SubscriptionsPage.businessProCTA).toExist()
            await expect(SubscriptionsPage.enterpriseCTA).toExist()
        })

        it('REG-SUB-020 | Most Popular badges are shown on plan cards', async () => {
            addFeature('Subscriptions'); addSeverity('normal')
            const badges = await SubscriptionsPage.mostPopularBadges
            expect(badges.length).toBeGreaterThanOrEqual(1)
        })

        it('REG-SUB-021 | Paid plans display a 50% OFF discount badge', async () => {
            addFeature('Subscriptions'); addSeverity('normal')
            const badges = await SubscriptionsPage.discountBadges
            const texts = await Promise.all(badges.map(b => b.getText()))
            const fiftyOffCount = texts.filter(t => t.includes('50% OFF')).length
            expect(fiftyOffCount).toBeGreaterThanOrEqual(2)
        })
    })

    // ── Navigation ────────────────────────────────────────────────────────────

    describe('Navigation', () => {

        it('REG-SUB-022 | Activate your TIN nav CTA is present', async () => {
            addFeature('Subscriptions'); addSeverity('normal')
            await expect(SubscriptionsPage.navActivateTIN).toBeDisplayed()
            const href = await SubscriptionsPage.navActivateTIN.getAttribute('href')
            expect(href).toContain('link-tin')
        })

        it('REG-SUB-023 | Mobile nav toggle is present in the DOM', async () => {
            addFeature('Subscriptions'); addSeverity('normal')
            await expect(SubscriptionsPage.mobileNavToggle).toExist()
        })
    })

    // ── Sidebar ───────────────────────────────────────────────────────────────

    describe('Sidebar', () => {

        it('REG-SUB-024 | Sidebar logo image is visible', async () => {
            addFeature('Subscriptions'); addSeverity('normal')
            await expect(SubscriptionsPage.sidebarLogo).toBeDisplayed()
        })

        it('REG-SUB-025 | Sidebar tagline mentions Smart Invoicing', async () => {
            addFeature('Subscriptions'); addSeverity('normal')
            await expect(SubscriptionsPage.sidebarTagline).toBeDisplayed()
        })

        it('REG-SUB-026 | Sidebar Activate your TIN button is present', async () => {
            addFeature('Subscriptions'); addSeverity('normal')
            await expect(SubscriptionsPage.sidebarActivateBtn).toBeDisplayed()
            const href = await SubscriptionsPage.sidebarActivateBtn.getAttribute('href')
            expect(href).toContain('link-tin')
        })
    })

    // ── Help & Support ────────────────────────────────────────────────────────

    describe('Help & Support', () => {

        it('REG-SUB-027 | Help & Support section is visible', async () => {
            addFeature('Subscriptions'); addSeverity('normal')
            await expect(SubscriptionsPage.helpSupportSection).toBeDisplayed()
        })

        it('REG-SUB-028 | Support email address is correct', async () => {
            addFeature('Subscriptions'); addSeverity('normal')
            await expect(SubscriptionsPage.supportEmail).toBeDisplayed()
            await expect(SubscriptionsPage.supportEmail).toHaveText('support@invoicemanager.ng')
        })

        it('REG-SUB-029 | WhatsApp link points to correct number (+2348071324704)', async () => {
            addFeature('Subscriptions'); addSeverity('normal')
            const href = await SubscriptionsPage.whatsappLink.getAttribute('href')
            expect(href).toContain('2348071324704')
        })
    })

    // ── Footer ────────────────────────────────────────────────────────────────

    describe('Footer', () => {

        before(async () => {
            await SubscriptionsPage.footer.scrollIntoView()
        })

        it('REG-SUB-030 | Footer displays InvoiceManager sitename', async () => {
            addFeature('Subscriptions'); addSeverity('normal')
            await expect(SubscriptionsPage.footerSitename).toHaveText(/InvoiceManager/i)
        })

        it('REG-SUB-031 | Footer phone number link is correct (02013309579)', async () => {
            addFeature('Subscriptions'); addSeverity('normal')
            const href = await SubscriptionsPage.footerPhone.getAttribute('href')
            expect(href).toBe('tel:02013309579')
        })

        it('REG-SUB-032 | Footer email link is correct (info@invoicemanager.ng)', async () => {
            addFeature('Subscriptions'); addSeverity('normal')
            const href = await SubscriptionsPage.footerEmail.getAttribute('href')
            expect(href).toBe('mailto:info@invoicemanager.ng')
        })

        it('REG-SUB-033 | Footer copyright text is present', async () => {
            addFeature('Subscriptions'); addSeverity('normal')
            await expect(SubscriptionsPage.footerCopyright).toHaveText(/InvoiceManager/i)
            await expect(SubscriptionsPage.footerCopyright).toHaveText(/All Rights Reserved/i)
        })

        it('REG-SUB-034 | Terms of Use link is present in footer', async () => {
            addFeature('Subscriptions'); addSeverity('normal')
            await expect(SubscriptionsPage.footerTerms).toBeDisplayed()
            const href = await SubscriptionsPage.footerTerms.getAttribute('href')
            expect(href).toContain('/terms')
        })
    })
})
