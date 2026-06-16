const INSTANCE_BASE = process.env.INSTANCE_URL || 'https://benten.invoicemanager.ng'

class LoginPage {

    // ── Header & Navigation ──────────────────────────────────────────────────
    get header()            { return $('#header') }
    get navMenu()           { return $('#navmenu') }

    // ── Login Form ────────────────────────────────────────────────────────────
    get loginHeading()      { return $('h2*=LOG IN') }
    get form()              { return $('form[action*="login"]') }
    get emailInput()        { return $('#email') }
    get passwordInput()     { return $('#password') }
    get passwordToggleBtn() { return $('button[onclick="togglePassword()"]') }
    get eyeIcon()           { return $('#eyeIcon') }
    get orgIdHidden()       { return $('#organization_id') }
    get submitBtn()         { return $('button[style*="2E5497"]') }
    get forgotPasswordLink(){ return $('a[href*="password/reset"]') }

    // ── Footer ────────────────────────────────────────────────────────────────
    get footer()            { return $('#footer') }
    get footerSitename()    { return $('#footer .sitename') }
    get footerCopyright()   { return $('#footer .copyright') }

    // ── Actions ───────────────────────────────────────────────────────────────

    async open() {
        await browser.url(INSTANCE_BASE + '/login')
    }

    async login(email, password) {
        await this.emailInput.setValue(email)
        await this.passwordInput.setValue(password)
        await this.submitBtn.click()
    }

    async loginAs(email, password = process.env.TEST_PASS) {
        await this.open()
        await this.login(email, password)
    }

    async togglePasswordVisibility() {
        await this.passwordToggleBtn.click()
    }
}

export default new LoginPage()
