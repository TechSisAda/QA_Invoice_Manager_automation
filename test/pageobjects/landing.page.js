class LandingPage {

    // ── Header & Navigation ──────────────────────────────────────────────────
    get header()            { return $('#header') }
    get logo()              { return $('a.logo') }
    get navMenu()           { return $('#navmenu') }
    get mobileNavToggle()   { return $('.mobile-nav-toggle') }

    get navHome()           { return $('nav#navmenu a[href="/"]') }
    get navRegister()       { return $('nav#navmenu a[href*="plm/subscriptions"]') }
    get navHowItWorks()     { return $('nav#navmenu a[href*="how-it-works"]') }
    get navFIRS()           { return $('nav#navmenu a[href*="firs-e-invoicing"]') }
    get navFAQ()            { return $('nav#navmenu a[href*="tawk.help"]') }
    get navCompliance()     { return $('nav#navmenu a[href*="compliance.invoicemanager"]') }
    get navActivateTIN()    { return $('nav#navmenu a[href*="link-tin"]') }

    // ── Hero Section ─────────────────────────────────────────────────────────
    get heroSection()       { return $('#hero') }
    get heroHeading()       { return $('#hero h1') }
    get heroSubtext()       { return $('#hero p') }
    get heroActivateCTA()   { return $('#hero a[href*="link-tin"]') }

    // ── Main CTAs ────────────────────────────────────────────────────────────
    get registerForTINBtn() { return $('a[href*="compliance.invoicemanager.ng/apply"]') }
    get getStartedBtn()     { return $('a[href*="ivm/link-tin"]:not(nav *)') }

    // ── Service Cards ─────────────────────────────────────────────────────────
    get serviceItems()      { return $$('.service-item') }
    get smartInvoicingCard(){ return $('.service-item h3=Smart Invoicing') }
    get fasterPaymentsCard(){ return $('.service-item h3=Faster Payments') }
    get totalComplianceCard(){ return $('.service-item h3=Total Compliance') }

    // ── Sidebar ───────────────────────────────────────────────────────────────
    get sidebarLogo()       { return $('section.py-8 img') }
    get sidebarActivateBtn(){ return $('section.py-8 a[href*="link-tin"]') }
    get quickLinksSection() { return $('.portfolio-info h3=Quick Links') }

    // ── Help & Support ────────────────────────────────────────────────────────
    get helpSupportSection(){ return $('h3=Help & Support') }
    get supportEmail()      { return $('p=support@invoicemanager.ng') }
    get whatsappLink()      { return $('a[href*="wa.me/2348071324704"]') }

    // ── Footer ────────────────────────────────────────────────────────────────
    get footer()            { return $('#footer') }
    get footerSitename()    { return $('#footer .sitename') }
    get footerPhone()       { return $('a[href="tel:02013309579"]') }
    get footerEmail()       { return $('a[href="mailto:info@invoicemanager.ng"]') }
    get footerFacebook()    { return $('#footer a[href*="facebook.com"]') }
    get footerInstagram()   { return $('#footer a[href*="instagram.com"]') }
    get footerLinkedIn()    { return $('#footer a[href*="linkedin.com"]') }
    get footerWhatsApp()    { return $('#footer a[href*="wa.me"]') }
    get footerCopyright()   { return $('#footer .copyright') }
    get footerTerms()       { return $('a[href*="/terms"]') }

    async open() {
        await browser.url('/')
    }
}

export default new LandingPage()
