import { addFeature, addSeverity } from '../../helpers/allureHelper.js'
import LandingPage from '../../pageobjects/landing.page.js'

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
