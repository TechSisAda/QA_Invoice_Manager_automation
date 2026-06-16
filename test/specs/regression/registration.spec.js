import { addFeature, addSeverity } from '../../helpers/allureHelper.js'
import RegistrationPage from '../../pageobjects/registration.page.js'

describe('REGRESSION — SME Starter Registration Form', () => {

    before(async () => {
        await RegistrationPage.open()
    })

    // ── Page Load ─────────────────────────────────────────────────────────────

    describe('Page Load', () => {

        it('REG-REG-001 | Page loads with InvoiceManager Subscriptions title', async () => {
            addFeature('Registration'); addSeverity('blocker')
            await expect(browser).toHaveTitle(/InvoiceManager/)
            await expect(browser).toHaveTitle(/Subscriptions/i)
        })

        it('REG-REG-002 | Header and navigation are visible', async () => {
            addFeature('Registration'); addSeverity('critical')
            await expect(RegistrationPage.header).toBeDisplayed()
            await expect(RegistrationPage.navMenu).toBeDisplayed()
        })

        it('REG-REG-003 | "Complete Your Subscription" heading is displayed', async () => {
            addFeature('Registration'); addSeverity('critical')
            await expect(RegistrationPage.pageHeading).toBeDisplayed()
            await expect(RegistrationPage.pageHeading).toHaveText(/Complete Your Subscription/i)
        })
    })

    // ── Plan Summary Card ─────────────────────────────────────────────────────

    describe('Plan Summary Card', () => {

        it('REG-REG-004 | Plan summary shows SME Starter name', async () => {
            addFeature('Registration'); addSeverity('critical')
            await expect(RegistrationPage.planSummaryCard).toBeDisplayed()
            await expect(RegistrationPage.planSummaryCard).toHaveText(/SME Starter/i)
        })

        it('REG-REG-005 | Plan summary shows "yearly" billing period', async () => {
            addFeature('Registration'); addSeverity('normal')
            await expect(RegistrationPage.planPeriod).toBeDisplayed()
            await expect(RegistrationPage.planPeriod).toHaveText(/yearly/i)
        })

        it('REG-REG-006 | Plan summary shows FREE price', async () => {
            addFeature('Registration'); addSeverity('critical')
            await expect(RegistrationPage.planPrice).toBeDisplayed()
            await expect(RegistrationPage.planPrice).toHaveText(/FREE/i)
        })
    })

    // ── Form Structure ────────────────────────────────────────────────────────

    describe('Form Structure', () => {

        it('REG-REG-007 | "Your Information" section heading is visible', async () => {
            addFeature('Registration'); addSeverity('normal')
            await expect(RegistrationPage.yourInfoHeading).toBeDisplayed()
        })

        it('REG-REG-008 | Form POSTs to /plm/subscriptions endpoint', async () => {
            addFeature('Registration'); addSeverity('critical')
            const action = await RegistrationPage.form.getAttribute('action')
            expect(action).toContain('plm/subscriptions')
        })

        it('REG-REG-009 | First Name input is present and required', async () => {
            addFeature('Registration'); addSeverity('critical')
            await expect(RegistrationPage.firstNameInput).toBeDisplayed()
            const required = await RegistrationPage.firstNameInput.getAttribute('required')
            expect(required).not.toBeNull()
        })

        it('REG-REG-010 | First Name input has correct placeholder', async () => {
            addFeature('Registration'); addSeverity('normal')
            const ph = await RegistrationPage.firstNameInput.getAttribute('placeholder')
            expect(ph).toBe('John')
        })

        it('REG-REG-011 | Last Name input is present and required', async () => {
            addFeature('Registration'); addSeverity('critical')
            await expect(RegistrationPage.lastNameInput).toBeDisplayed()
            const required = await RegistrationPage.lastNameInput.getAttribute('required')
            expect(required).not.toBeNull()
        })

        it('REG-REG-012 | Last Name input has correct placeholder', async () => {
            addFeature('Registration'); addSeverity('normal')
            const ph = await RegistrationPage.lastNameInput.getAttribute('placeholder')
            expect(ph).toBe('Doe')
        })

        it('REG-REG-013 | Email Address input is present, required, and type="email"', async () => {
            addFeature('Registration'); addSeverity('critical')
            await expect(RegistrationPage.emailInput).toBeDisplayed()
            const required = await RegistrationPage.emailInput.getAttribute('required')
            const type    = await RegistrationPage.emailInput.getAttribute('type')
            expect(required).not.toBeNull()
            expect(type).toBe('email')
        })

        it('REG-REG-014 | Email input has correct placeholder', async () => {
            addFeature('Registration'); addSeverity('normal')
            const ph = await RegistrationPage.emailInput.getAttribute('placeholder')
            expect(ph).toBe('john.doe@example.com')
        })

        it('REG-REG-015 | Phone Number input is present and required', async () => {
            addFeature('Registration'); addSeverity('critical')
            await expect(RegistrationPage.phoneInput).toBeDisplayed()
            const required = await RegistrationPage.phoneInput.getAttribute('required')
            expect(required).not.toBeNull()
        })

        it('REG-REG-016 | Phone input has correct placeholder', async () => {
            addFeature('Registration'); addSeverity('normal')
            const ph = await RegistrationPage.phoneInput.getAttribute('placeholder')
            expect(ph).toContain('+234')
        })

        it('REG-REG-017 | Hidden subscription_id carries SME Starter UUID', async () => {
            addFeature('Registration'); addSeverity('critical')
            const val = await RegistrationPage.subscriptionIdHidden.getAttribute('value')
            expect(val).toBe('67a91caf-a7d2-4530-97ef-b6bf8327f4bb')
        })

        it('REG-REG-018 | "Subscribe Now" submit button is displayed', async () => {
            addFeature('Registration'); addSeverity('critical')
            await expect(RegistrationPage.submitBtn).toBeDisplayed()
            await expect(RegistrationPage.submitBtn).toHaveText(/Subscribe Now/i)
        })

        it('REG-REG-019 | First Name input gets focus on page load (autofocus)', async () => {
            addFeature('Registration'); addSeverity('normal')
            const autofocus = await RegistrationPage.firstNameInput.getAttribute('autofocus')
            expect(autofocus).not.toBeNull()
        })
    })

    // ── Form Interaction ──────────────────────────────────────────────────────

    describe('Form Interaction', () => {

        it('REG-REG-020 | User can type into First Name field', async () => {
            addFeature('Registration'); addSeverity('critical')
            await RegistrationPage.firstNameInput.setValue('Test')
            await expect(RegistrationPage.firstNameInput).toHaveValue('Test')
            await RegistrationPage.firstNameInput.clearValue()
        })

        it('REG-REG-021 | User can type into Last Name field', async () => {
            addFeature('Registration'); addSeverity('critical')
            await RegistrationPage.lastNameInput.setValue('User')
            await expect(RegistrationPage.lastNameInput).toHaveValue('User')
            await RegistrationPage.lastNameInput.clearValue()
        })

        it('REG-REG-022 | User can type into Email field', async () => {
            addFeature('Registration'); addSeverity('critical')
            await RegistrationPage.emailInput.setValue('test@example.com')
            await expect(RegistrationPage.emailInput).toHaveValue('test@example.com')
            await RegistrationPage.emailInput.clearValue()
        })

        it('REG-REG-023 | User can type into Phone Number field', async () => {
            addFeature('Registration'); addSeverity('critical')
            await RegistrationPage.phoneInput.setValue('+2348012345678')
            await expect(RegistrationPage.phoneInput).toHaveValue('+2348012345678')
            await RegistrationPage.phoneInput.clearValue()
        })

        it('REG-REG-024 | Submit button is clickable when form is complete', async () => {
            addFeature('Registration'); addSeverity('critical')
            await RegistrationPage.firstNameInput.setValue('Test')
            await RegistrationPage.lastNameInput.setValue('User')
            await RegistrationPage.emailInput.setValue('test@example.com')
            await RegistrationPage.phoneInput.setValue('+2348012345678')
            await expect(RegistrationPage.submitBtn).toBeEnabled()
        })
    })

    // ── Sidebar ───────────────────────────────────────────────────────────────

    describe('Sidebar', () => {

        it('REG-REG-025 | Sidebar logo is visible', async () => {
            addFeature('Registration'); addSeverity('normal')
            await expect(RegistrationPage.sidebarLogo).toBeDisplayed()
        })

        it('REG-REG-026 | Sidebar Activate your TIN button links to /ivm/link-tin', async () => {
            addFeature('Registration'); addSeverity('normal')
            await expect(RegistrationPage.sidebarActivateBtn).toBeDisplayed()
            const href = await RegistrationPage.sidebarActivateBtn.getAttribute('href')
            expect(href).toContain('link-tin')
        })

        it('REG-REG-027 | Help & Support section is visible', async () => {
            addFeature('Registration'); addSeverity('normal')
            await expect(RegistrationPage.helpSupportSection).toBeDisplayed()
        })

        it('REG-REG-028 | Support email is correct', async () => {
            addFeature('Registration'); addSeverity('normal')
            await expect(RegistrationPage.supportEmail).toHaveText('support@invoicemanager.ng')
        })
    })

    // ── Footer ────────────────────────────────────────────────────────────────

    describe('Footer', () => {

        before(async () => {
            await RegistrationPage.footer.scrollIntoView()
        })

        it('REG-REG-029 | Footer displays InvoiceManager sitename', async () => {
            addFeature('Registration'); addSeverity('normal')
            await expect(RegistrationPage.footerSitename).toHaveText(/InvoiceManager/i)
        })

        it('REG-REG-030 | Footer copyright text is present', async () => {
            addFeature('Registration'); addSeverity('normal')
            await expect(RegistrationPage.footerCopyright).toHaveText(/InvoiceManager/i)
            await expect(RegistrationPage.footerCopyright).toHaveText(/All Rights Reserved/i)
        })
    })
})
