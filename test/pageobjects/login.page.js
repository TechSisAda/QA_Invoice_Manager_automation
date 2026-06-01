class LoginPage {
    get loginForm()    { return $('[data-testid="login-form"]') }
    get emailInput()   { return $('[data-testid="email-input"]') }
    get passwordInput(){ return $('[data-testid="password-input"]') }
    get submitButton() { return $('[data-testid="login-submit"]') }

    async open() {
        await browser.url('/login')
        await this.loginForm.waitForDisplayed()
    }

    async login(email, password) {
        await this.emailInput.setValue(email)
        await this.passwordInput.setValue(password)
        await this.submitButton.click()
    }

    async loginAs(email, password = process.env.TEST_PASS) {
        await this.open()
        await this.login(email, password)
    }

    async registerNewBusiness({ email, companyName, tin }) {
        await browser.url('/register')
        await $('[data-testid="reg-email"]').setValue(email)
        await $('[data-testid="reg-company"]').setValue(companyName)
        await $('[data-testid="reg-tin"]').setValue(tin)
        await $('[data-testid="reg-submit"]').click()
        await $('[data-testid="dashboard"]').waitForDisplayed({ timeout: 15000 })
    }
}

export default new LoginPage()
