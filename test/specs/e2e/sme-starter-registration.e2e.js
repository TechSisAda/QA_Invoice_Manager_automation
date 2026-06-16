import { addFeature, addSeverity } from '../../helpers/allureHelper.js'
import SubscriptionsPage from '../../pageobjects/subscriptions.page.js'
import RegistrationPage from '../../pageobjects/registration.page.js'

// ─────────────────────────────────────────────────────────────────────────────
// E2E: SME Starter Free Subscription Registration Flow
//
// Flow:  /plm/subscriptions  →  click SME Starter START NOW
//        →  /plm/subscriptions/<uuid>  →  fill form  →  Subscribe Now
//        →  verify post-submit state (redirect or success message)
//
// NOTE: This test submits the real registration form and creates an instance.
//       Run against staging only. Use a dedicated test email address set in
//       .env (TEST_EMAIL / TEST_PASS).
// ─────────────────────────────────────────────────────────────────────────────

const testUser = {
    firstName: process.env.TEST_FIRST_NAME || 'QA',
    lastName:  process.env.TEST_LAST_NAME  || 'Automation',
    email:     process.env.TEST_EMAIL      || 'qa-automation@example.com',
    phone:     process.env.TEST_PHONE      || '+2348000000000',
}

describe('E2E — SME Starter Free Instance Registration', () => {

    // ── Step 1: Land on subscriptions page ───────────────────────────────────

    it('E2E-REG-001 | User navigates to the subscriptions page', async () => {
        addFeature('Registration Flow'); addSeverity('blocker')
        await SubscriptionsPage.open()
        await expect(browser).toHaveTitle(/Subscriptions/i)
        await expect(SubscriptionsPage.smeStarterName).toBeDisplayed()
    })

    // ── Step 2: Click SME Starter START NOW ──────────────────────────────────

    it('E2E-REG-002 | User clicks START NOW on the SME Starter (FREE) plan', async () => {
        addFeature('Registration Flow'); addSeverity('blocker')
        await SubscriptionsPage.smeStarterCTA.click()
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('67a91caf'),
            { timeout: 10000, timeoutMsg: 'Did not navigate to SME Starter registration page' }
        )
        const url = await browser.getUrl()
        expect(url).toContain('/plm/subscriptions/67a91caf-a7d2-4530-97ef-b6bf8327f4bb')
    })

    // ── Step 3: Verify the registration form loaded correctly ─────────────────

    it('E2E-REG-003 | Registration form loads with correct plan summary', async () => {
        addFeature('Registration Flow'); addSeverity('blocker')
        await expect(RegistrationPage.pageHeading).toBeDisplayed()
        await expect(RegistrationPage.planSummaryCard).toHaveText(/SME Starter/i)
        await expect(RegistrationPage.planPrice).toHaveText(/FREE/i)
    })

    it('E2E-REG-004 | All four form fields are present and empty', async () => {
        addFeature('Registration Flow'); addSeverity('critical')
        await expect(RegistrationPage.firstNameInput).toBeDisplayed()
        await expect(RegistrationPage.lastNameInput).toBeDisplayed()
        await expect(RegistrationPage.emailInput).toBeDisplayed()
        await expect(RegistrationPage.phoneInput).toBeDisplayed()
        await expect(RegistrationPage.firstNameInput).toHaveValue('')
        await expect(RegistrationPage.lastNameInput).toHaveValue('')
        await expect(RegistrationPage.emailInput).toHaveValue('')
        await expect(RegistrationPage.phoneInput).toHaveValue('')
    })

    // ── Step 4: Fill in user details ──────────────────────────────────────────

    it('E2E-REG-005 | User fills in First Name', async () => {
        addFeature('Registration Flow'); addSeverity('critical')
        await RegistrationPage.firstNameInput.setValue(testUser.firstName)
        await expect(RegistrationPage.firstNameInput).toHaveValue(testUser.firstName)
    })

    it('E2E-REG-006 | User fills in Last Name', async () => {
        addFeature('Registration Flow'); addSeverity('critical')
        await RegistrationPage.lastNameInput.setValue(testUser.lastName)
        await expect(RegistrationPage.lastNameInput).toHaveValue(testUser.lastName)
    })

    it('E2E-REG-007 | User fills in Email Address', async () => {
        addFeature('Registration Flow'); addSeverity('critical')
        await RegistrationPage.emailInput.setValue(testUser.email)
        await expect(RegistrationPage.emailInput).toHaveValue(testUser.email)
    })

    it('E2E-REG-008 | User fills in Phone Number', async () => {
        addFeature('Registration Flow'); addSeverity('critical')
        await RegistrationPage.phoneInput.setValue(testUser.phone)
        await expect(RegistrationPage.phoneInput).toHaveValue(testUser.phone)
    })

    // ── Step 5: Submit ────────────────────────────────────────────────────────

    it('E2E-REG-009 | Subscribe Now button is enabled with all fields filled', async () => {
        addFeature('Registration Flow'); addSeverity('blocker')
        await expect(RegistrationPage.submitBtn).toBeEnabled()
        await expect(RegistrationPage.submitBtn).toHaveText(/Subscribe Now/i)
    })

    it('E2E-REG-010 | User submits the registration form', async () => {
        addFeature('Registration Flow'); addSeverity('blocker')
        await RegistrationPage.submitBtn.click()
        // Wait for navigation or DOM change indicating the form was accepted
        await browser.waitUntil(
            async () => {
                const url = await browser.getUrl()
                const title = await browser.getTitle()
                // Accept either a redirect away from the registration page
                // or a success message appearing on the same page
                const navigatedAway = !url.includes('67a91caf-a7d2-4530-97ef-b6bf8327f4bb')
                const successOnPage = await $('*=success').isExisting()
                    .catch(() => false)
                return navigatedAway || successOnPage
            },
            { timeout: 20000, timeoutMsg: 'Form did not submit or redirect within 20 seconds' }
        )
    })

    // ── Step 6: Verify post-submission state ──────────────────────────────────

    it('E2E-REG-011 | Post-submission: user is redirected or a success state is shown', async () => {
        addFeature('Registration Flow'); addSeverity('blocker')
        const url = await browser.getUrl()
        // Either redirected away from the registration page, or still on a
        // confirmation variant of it — both are valid success states.
        const isRedirected = !url.includes('67a91caf-a7d2-4530-97ef-b6bf8327f4bb')
        const hasSuccessMsg = await $('*=success').isExisting().catch(() => false)
        const hasErrorMsg   = await $('*=error').isExisting().catch(() => false)
        expect(isRedirected || hasSuccessMsg).toBe(true)
        expect(hasErrorMsg).toBe(false)
    })
})
