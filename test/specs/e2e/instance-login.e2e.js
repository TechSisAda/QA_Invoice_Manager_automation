import { addFeature, addSeverity } from '../../helpers/allureHelper.js'
import InstanceLandingPage from '../../pageobjects/instance-landing.page.js'
import LoginPage from '../../pageobjects/login.page.js'

// ─────────────────────────────────────────────────────────────────────────────
// E2E: Instance Login Flow — benten.invoicemanager.ng
//
// Flow:  benten.invoicemanager.ng  →  click Login button
//        →  benten.invoicemanager.ng/login  →  fill email + password
//        →  Log In  →  verify redirect to dashboard/app
//
// Requires in .env:
//   INSTANCE_URL=https://benten.invoicemanager.ng
//   TEST_EMAIL=<registered user email for benten instance>
//   TEST_PASS=<password>
// ─────────────────────────────────────────────────────────────────────────────

const credentials = {
    email:    process.env.TEST_EMAIL || 'qa@example.com',
    password: process.env.TEST_PASS  || 'password',
}

describe('E2E — Instance Landing to Login Flow (benten.invoicemanager.ng)', () => {

    // ── Step 1: Open the instance landing page ────────────────────────────────

    it('E2E-LGN-001 | User opens the benten instance landing page', async () => {
        addFeature('Login Flow'); addSeverity('blocker')
        await InstanceLandingPage.open()
        await expect(browser).toHaveTitle(/InvoiceManager/i)
        await expect(InstanceLandingPage.heroBusinessName).toHaveText(/Ben Ten Science Lab/i)
    })

    // ── Step 2: Click Login from the nav ─────────────────────────────────────

    it('E2E-LGN-002 | User clicks Login from the navigation bar', async () => {
        addFeature('Login Flow'); addSeverity('blocker')
        await InstanceLandingPage.clickNavLogin()
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/login'),
            { timeout: 10000, timeoutMsg: 'Did not navigate to login page' }
        )
        const url = await browser.getUrl()
        expect(url).toContain('benten.invoicemanager.ng/login')
    })

    // ── Step 3: Verify the login page loaded ──────────────────────────────────

    it('E2E-LGN-003 | Login page displays LOG IN heading and form', async () => {
        addFeature('Login Flow'); addSeverity('blocker')
        await expect(LoginPage.loginHeading).toBeDisplayed()
        await expect(LoginPage.emailInput).toBeDisplayed()
        await expect(LoginPage.passwordInput).toBeDisplayed()
        await expect(LoginPage.submitBtn).toBeDisplayed()
    })

    it('E2E-LGN-004 | Organization ID is pre-bound to benten instance', async () => {
        addFeature('Login Flow'); addSeverity('critical')
        const orgId = await LoginPage.orgIdHidden.getAttribute('value')
        expect(orgId).toBe('0d82d0e9-2e87-4ec9-8cb0-51d8849669a4')
    })

    // ── Step 4: Fill credentials ──────────────────────────────────────────────

    it('E2E-LGN-005 | User enters email address', async () => {
        addFeature('Login Flow'); addSeverity('blocker')
        await LoginPage.emailInput.setValue(credentials.email)
        await expect(LoginPage.emailInput).toHaveValue(credentials.email)
    })

    it('E2E-LGN-006 | User enters password', async () => {
        addFeature('Login Flow'); addSeverity('blocker')
        await LoginPage.passwordInput.setValue(credentials.password)
        // value hidden — just verify field is not empty
        const val = await LoginPage.passwordInput.getValue()
        expect(val.length).toBeGreaterThan(0)
    })

    // ── Step 5: Submit ────────────────────────────────────────────────────────

    it('E2E-LGN-007 | Log In button is enabled and user clicks it', async () => {
        addFeature('Login Flow'); addSeverity('blocker')
        await expect(LoginPage.submitBtn).toBeEnabled()
        await LoginPage.submitBtn.click()
    })

    // ── Step 6: Post-login verification ───────────────────────────────────────

    it('E2E-LGN-008 | User is redirected away from login page after submitting', async () => {
        addFeature('Login Flow'); addSeverity('blocker')
        await browser.waitUntil(
            async () => !(await browser.getUrl()).endsWith('/login'),
            { timeout: 20000, timeoutMsg: 'Still on login page after 20 seconds' }
        )
        const url = await browser.getUrl()
        expect(url).not.toContain('/login')
        expect(url).toContain('benten.invoicemanager.ng')
    })

    it('E2E-LGN-009 | Post-login page does not show a login error message', async () => {
        addFeature('Login Flow'); addSeverity('blocker')
        const hasError = await $('*=These credentials do not match').isExisting()
            .catch(() => false)
        expect(hasError).toBe(false)
    })
})
