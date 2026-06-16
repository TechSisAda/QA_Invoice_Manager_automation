const SME_STARTER_UUID = '67a91caf-a7d2-4530-97ef-b6bf8327f4bb'

class RegistrationPage {

    // ── Header & Navigation ──────────────────────────────────────────────────
    get header()            { return $('#header') }
    get navMenu()           { return $('#navmenu') }

    // ── Page Heading ─────────────────────────────────────────────────────────
    get pageHeading()       { return $('h2*=Complete Your Subscription') }

    // ── Plan Summary Card ─────────────────────────────────────────────────────
    get planSummaryCard()   { return $('[data-aos="fade-up"] h3=SME Starter') }
    get planPeriod()        { return $('p.text-gray-500=yearly') }
    get planPrice()         { return $('.text-green-600=FREE') }

    // ── Registration Form ─────────────────────────────────────────────────────
    get form()              { return $('form[action*="plm/subscriptions"]') }
    get yourInfoHeading()   { return $('h3=Your Information') }
    get firstNameInput()    { return $('#first_name') }
    get lastNameInput()     { return $('#last_name') }
    get emailInput()        { return $('#email') }
    get phoneInput()        { return $('#telephone') }
    get subscriptionIdHidden() { return $('input[name="subscription_id"]') }
    get submitBtn()         { return $('button[type="submit"]') }

    // ── Sidebar ───────────────────────────────────────────────────────────────
    get sidebarLogo()       { return $('section.py-8 img') }
    get sidebarActivateBtn(){ return $('section.py-8 a[href*="link-tin"]') }
    get helpSupportSection(){ return $('h3=Help & Support') }
    get supportEmail()      { return $('p=support@invoicemanager.ng') }

    // ── Footer ────────────────────────────────────────────────────────────────
    get footer()            { return $('#footer') }
    get footerSitename()    { return $('#footer .sitename') }
    get footerCopyright()   { return $('#footer .copyright') }

    // ── Actions ───────────────────────────────────────────────────────────────

    async open() {
        await browser.url(`/plm/subscriptions/${SME_STARTER_UUID}`)
    }

    async fillForm({ firstName, lastName, email, phone }) {
        await this.firstNameInput.setValue(firstName)
        await this.lastNameInput.setValue(lastName)
        await this.emailInput.setValue(email)
        await this.phoneInput.setValue(phone)
    }

    async submit() {
        await this.submitBtn.click()
    }

    async fillAndSubmit(data) {
        await this.fillForm(data)
        await this.submit()
    }
}

export default new RegistrationPage()
