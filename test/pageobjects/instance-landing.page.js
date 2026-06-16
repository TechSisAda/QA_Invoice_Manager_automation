const INSTANCE_BASE = process.env.INSTANCE_URL || 'https://benten.invoicemanager.ng'

class InstanceLandingPage {

    // ── Header & Navigation ──────────────────────────────────────────────────
    get header()            { return $('#header') }
    get logo()              { return $('a.logo') }
    get navMenu()           { return $('#navmenu') }
    get mobileNavToggle()   { return $('.mobile-nav-toggle') }

    get navHome()           { return $('nav#navmenu a[href="/"]') }
    get navRegister()       { return $('nav#navmenu a[href*="plm/subscriptions"]') }
    get navHowItWorks()     { return $('nav#navmenu a[href*="how-it-works"]') }
    get navFIRS()           { return $('nav#navmenu a[href*="firs-e-invoicing"]') }
    get navLoginBtn()       { return $('.nav-login-btn a[href*="login"]') }

    // ── Hero Section ─────────────────────────────────────────────────────────
    get heroSection()       { return $('#hero') }
    get heroBusinessName()  { return $('#hero h1') }
    get heroLoginBtn()      { return $('#hero a[href*="login"]') }

    // ── Content Section ───────────────────────────────────────────────────────
    get transformHeading()  { return $('h3*=Ready to Transform Your Invoicing') }

    // ── Service Cards ─────────────────────────────────────────────────────────
    get serviceItems()      { return $$('.service-item') }
    get smartInvoicingCard(){ return $('.service-item h3=Smart Invoicing') }
    get fasterPaymentsCard(){ return $('.service-item h3=Faster Payments') }
    get totalComplianceCard(){ return $('.service-item h3=Total Compliance') }

    // ── Sidebar ───────────────────────────────────────────────────────────────
    get sidebarLogo()       { return $('section.py-8 img') }
    get sidebarTagline()    { return $('p*=Smart Invoicing, Faster Payments') }
    get sidebarLoginBtn()   { return $('section.py-8 a[href*="login"]') }
    get quickLinksSection() { return $('.portfolio-info h3=Quick Links') }
    get quickLinkFIRS()     { return $('.portfolio-info a[href*="firs-e-invoicing"]') }
    get quickLinkHowItWorks(){ return $('.portfolio-info a[href*="how-it-works"]') }

    // ── Footer ────────────────────────────────────────────────────────────────
    get footer()            { return $('#footer') }
    get footerSitename()    { return $('#footer .sitename') }
    get footerPhone()       { return $('a[href="tel:02018891798"]') }
    get footerEmail()       { return $('a[href="mailto:info@invoicemanager.ng"]') }
    get footerFacebook()    { return $('#footer a[href*="facebook.com"]') }
    get footerInstagram()   { return $('#footer a[href*="instagram.com"]') }
    get footerLinkedIn()    { return $('#footer a[href*="linkedin.com"]') }
    get footerCopyright()   { return $('#footer .copyright') }
    get footerTerms()       { return $('a[href*="/terms"]') }

    async open() {
        await browser.url(INSTANCE_BASE + '/')
    }

    async clickNavLogin() {
        await this.navLoginBtn.click()
    }
}

export default new InstanceLandingPage()
