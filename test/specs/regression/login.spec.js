import { addFeature, addSeverity } from '../../helpers/allureHelper.js'
import LoginPage from '../../pageobjects/login.page.js'

describe('REGRESSION — Instance Login Page (benten.invoicemanager.ng/login)', () => {

    before(async () => {
        await LoginPage.open()
    })

    // ── Page Load ─────────────────────────────────────────────────────────────

    describe('Page Load', () => {

        it('REG-LGN-001 | Login page loads with InvoiceManager title', async () => {
            addFeature('Login'); addSeverity('blocker')
            await expect(browser).toHaveTitle(/InvoiceManager/i)
        })

        it('REG-LGN-002 | Header and navigation are visible', async () => {
            addFeature('Login'); addSeverity('critical')
            await expect(LoginPage.header).toBeDisplayed()
            await expect(LoginPage.navMenu).toBeDisplayed()
        })

        it('REG-LGN-003 | "LOG IN" heading is displayed', async () => {
            addFeature('Login'); addSeverity('blocker')
            await expect(LoginPage.loginHeading).toBeDisplayed()
            await expect(LoginPage.loginHeading).toHaveText(/LOG IN/i)
        })
    })

    // ── Form Structure ────────────────────────────────────────────────────────

    describe('Form Structure', () => {

        it('REG-LGN-004 | Login form POSTs to benten.invoicemanager.ng/login', async () => {
            addFeature('Login'); addSeverity('critical')
            const action = await LoginPage.form.getAttribute('action')
            expect(action).toContain('benten.invoicemanager.ng/login')
        })

        it('REG-LGN-005 | Email Address input is present, required, type="email"', async () => {
            addFeature('Login'); addSeverity('blocker')
            await expect(LoginPage.emailInput).toBeDisplayed()
            const type     = await LoginPage.emailInput.getAttribute('type')
            const required = await LoginPage.emailInput.getAttribute('required')
            expect(type).toBe('email')
            expect(required).not.toBeNull()
        })

        it('REG-LGN-006 | Email input placeholder is "user@email.com"', async () => {
            addFeature('Login'); addSeverity('normal')
            const ph = await LoginPage.emailInput.getAttribute('placeholder')
            expect(ph).toBe('user@email.com')
        })

        it('REG-LGN-007 | Password input is present, required, type="password" by default', async () => {
            addFeature('Login'); addSeverity('blocker')
            await expect(LoginPage.passwordInput).toBeDisplayed()
            const type     = await LoginPage.passwordInput.getAttribute('type')
            const required = await LoginPage.passwordInput.getAttribute('required')
            expect(type).toBe('password')
            expect(required).not.toBeNull()
        })

        it('REG-LGN-008 | Password toggle button is present', async () => {
            addFeature('Login'); addSeverity('normal')
            await expect(LoginPage.passwordToggleBtn).toExist()
        })

        it('REG-LGN-009 | Eye icon starts in "visible" (fa-eye) state', async () => {
            addFeature('Login'); addSeverity('normal')
            await expect(LoginPage.eyeIcon).toExist()
            const cls = await LoginPage.eyeIcon.getAttribute('class')
            expect(cls).toContain('fa-eye')
        })

        it('REG-LGN-010 | Hidden organization_id carries the benten instance UUID', async () => {
            addFeature('Login'); addSeverity('critical')
            const val = await LoginPage.orgIdHidden.getAttribute('value')
            expect(val).toBe('0d82d0e9-2e87-4ec9-8cb0-51d8849669a4')
        })

        it('REG-LGN-011 | "Log In" submit button is displayed', async () => {
            addFeature('Login'); addSeverity('blocker')
            await expect(LoginPage.submitBtn).toBeDisplayed()
            await expect(LoginPage.submitBtn).toHaveText(/Log In/i)
        })

        it('REG-LGN-012 | "Forgot Your Password?" reset link is visible', async () => {
            addFeature('Login'); addSeverity('normal')
            await expect(LoginPage.forgotPasswordLink).toBeDisplayed()
            const href = await LoginPage.forgotPasswordLink.getAttribute('href')
            expect(href).toContain('benten.invoicemanager.ng/password/reset')
        })
    })

    // ── Form Interaction ──────────────────────────────────────────────────────

    describe('Form Interaction', () => {

        it('REG-LGN-013 | User can type into Email field', async () => {
            addFeature('Login'); addSeverity('critical')
            await LoginPage.emailInput.setValue('test@example.com')
            await expect(LoginPage.emailInput).toHaveValue('test@example.com')
            await LoginPage.emailInput.clearValue()
        })

        it('REG-LGN-014 | User can type into Password field', async () => {
            addFeature('Login'); addSeverity('critical')
            await LoginPage.passwordInput.setValue('secret123')
            await expect(LoginPage.passwordInput).toHaveValue('secret123')
        })

        it('REG-LGN-015 | Password toggle reveals password text (type changes to "text")', async () => {
            addFeature('Login'); addSeverity('normal')
            await LoginPage.togglePasswordVisibility()
            const type = await LoginPage.passwordInput.getAttribute('type')
            expect(type).toBe('text')
        })

        it('REG-LGN-016 | Eye icon switches to fa-eye-slash after toggle', async () => {
            addFeature('Login'); addSeverity('normal')
            const cls = await LoginPage.eyeIcon.getAttribute('class')
            expect(cls).toContain('fa-eye-slash')
        })

        it('REG-LGN-017 | Second toggle hides password again (type returns to "password")', async () => {
            addFeature('Login'); addSeverity('normal')
            await LoginPage.togglePasswordVisibility()
            const type = await LoginPage.passwordInput.getAttribute('type')
            expect(type).toBe('password')
        })

        it('REG-LGN-018 | Eye icon returns to fa-eye after second toggle', async () => {
            addFeature('Login'); addSeverity('normal')
            const cls = await LoginPage.eyeIcon.getAttribute('class')
            expect(cls).toContain('fa-eye')
            // clean up
            await LoginPage.passwordInput.clearValue()
        })

        it('REG-LGN-019 | Submit button is enabled when both fields are filled', async () => {
            addFeature('Login'); addSeverity('critical')
            await LoginPage.emailInput.setValue('test@example.com')
            await LoginPage.passwordInput.setValue('password')
            await expect(LoginPage.submitBtn).toBeEnabled()
        })
    })

    // ── Invalid Login ─────────────────────────────────────────────────────────

    describe('Invalid Login', () => {

        before(async () => {
            await LoginPage.open()
        })

        it('REG-LGN-020 | Submitting with wrong credentials does not redirect to dashboard', async () => {
            addFeature('Login'); addSeverity('critical')
            await LoginPage.login('invalid@example.com', 'wrongpassword')
            await browser.pause(2000)
            const url = await browser.getUrl()
            // Should stay on login or show error — not land on dashboard
            expect(url).not.toContain('/dashboard')
            expect(url).not.toContain('/ivm/')
        })

        it('REG-LGN-021 | After failed login, login form is still visible', async () => {
            addFeature('Login'); addSeverity('critical')
            await expect(LoginPage.emailInput).toBeDisplayed()
            await expect(LoginPage.submitBtn).toBeDisplayed()
        })
    })

    // ── Footer ────────────────────────────────────────────────────────────────

    describe('Footer', () => {

        before(async () => {
            await LoginPage.open()
            await LoginPage.footer.scrollIntoView()
        })

        it('REG-LGN-022 | Footer displays InvoiceManager sitename', async () => {
            addFeature('Login'); addSeverity('normal')
            await expect(LoginPage.footerSitename).toHaveText(/InvoiceManager/i)
        })

        it('REG-LGN-023 | Footer copyright text is present', async () => {
            addFeature('Login'); addSeverity('normal')
            await expect(LoginPage.footerCopyright).toHaveText(/InvoiceManager/i)
            await expect(LoginPage.footerCopyright).toHaveText(/All Rights Reserved/i)
        })
    })
})
