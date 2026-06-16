class SubscriptionsPage {

    // ── Header & Navigation (shared structure with landing page) ─────────────
    get header()            { return $('#header') }
    get logo()              { return $('a.logo') }
    get navMenu()           { return $('#navmenu') }
    get mobileNavToggle()   { return $('.mobile-nav-toggle') }
    get navActivateTIN()    { return $('nav#navmenu a[href*="link-tin"]') }

    // ── Page Section ──────────────────────────────────────────────────────────
    get portfolioDetails()  { return $('#portfolio-details') }
    get availableOptionsHeading() { return $('h2*=Available Options') }

    // ── Plan Cards (all 3) ────────────────────────────────────────────────────
    get allPlanCards()      { return $$('div[data-aos="fade-up"][data-aos-delay]') }

    // ── SME Starter Plan ─────────────────────────────────────────────────────
    get smeStarterName()    { return $('h3=SME Starter') }
    get smeStarterPrice()   { return $('.text-4xl.font-bold.text-green-600') }
    get smeStarterCTA()     { return $('a[href*="67a91caf-a7d2-4530-97ef-b6bf8327f4bb"]') }
    get smeStarterFeatures(){ return $$('a[href*="67a91caf-a7d2-4530-97ef-b6bf8327f4bb"]') }

    // ── Business Pro Plan ─────────────────────────────────────────────────────
    get businessProName()   { return $('h3=Business Pro') }
    get businessProCTA()    { return $('a[href*="062b6808-7f1e-4618-94ad-72a2424c2b29"]') }

    // ── Business Enterprise Plan ──────────────────────────────────────────────
    get enterpriseName()    { return $('h3=Business Enterprise') }
    get enterpriseCTA()     { return $('a[href*="6e98ca7b-d13f-4cd8-bea0-a5aff156e768"]') }

    // ── Discount Badges ───────────────────────────────────────────────────────
    get discountBadges()    { return $$('.text-red-600.bg-red-100') }

    // ── Most Popular Badges ───────────────────────────────────────────────────
    get mostPopularBadges() { return $$('span*=Most Popular') }

    // ── Sidebar ───────────────────────────────────────────────────────────────
    get sidebarLogo()       { return $('section.py-8 img') }
    get sidebarTagline()    { return $('p*=Smart Invoicing, Faster Payments') }
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
    get footerCopyright()   { return $('#footer .copyright') }
    get footerTerms()       { return $('a[href*="/terms"]') }

    async open() {
        await browser.url('/plm/subscriptions')
    }
}

export default new SubscriptionsPage()
