const INSTANCE = process.env.INSTANCE_URL || 'https://benten.invoicemanager.ng'

class DashboardPage {

    // ── Top Header ────────────────────────────────────────────────────────────
    get topHeader()             { return $('header.top-header') }
    get mobileToggle()          { return $('.mobile-toggle-icon') }
    get assignmentsDropdown()   { return $('.bx-task') }
    get notificationsBell()     { return $('.bi-bell-fill') }
    get userDropdown()          { return $('.dropdown-user-setting') }
    get userNameDisplay()       { return $('.dropdown-user-name') }
    get profileLink()           { return $('a[href*="fc/profile"]') }
    get logoutLink()            { return $('a[onclick*="logout-form"]') }
    get logoutForm()            { return $('#logout-form') }
    get hiddenUserEmail()       { return $('#placeholder-user-email') }

    // ── Sidebar ───────────────────────────────────────────────────────────────
    get sidebar()               { return $('aside.sidebar-wrapper') }
    get sidebarLogoText()       { return $('.sidebar-header .logo-text') }
    get sidebarMenu()           { return $('ul#menu') }

    // Sidebar nav links
    get navDashboard()          { return $('a[href*="/dashboard"]#hamburgerBtn') }
    get navCreateInvoice()      { return $('#mnu_invoice_manager_vendor_new_invoice a') }
    get navPOS()                { return $('#mnu_invoice_manager_pos_invoice a') }
    get navInvoicesMenu()       { return $('#mnu_invoice_manager_invoices > a.has-arrow') }
    get navSalesInvoices()      { return $('#lnk_mnu_invoice_manager_invoices_receivables') }
    get navAllInvoices()        { return $('#lnk_mnu_invoice_manager_invoices_all') }
    get navInvoicesNew()        { return $('#lnk_mnu_invoice_manager_invoices_new') }
    get navInvoicesSigned()     { return $('#lnk_mnu_invoice_manager_invoices_signed') }
    get navInvoicesSent()       { return $('#lnk_mnu_invoice_manager_invoices_sent') }
    get navInvoicesReceived()   { return $('#lnk_mnu_invoice_manager_invoices_received') }
    get navAdminMenu()          { return $('#mnu_invoice_manager_admin > a.has-arrow') }
    get navProducts()           { return $('#lnk_mnu_invoice_manager_inventory_settings') }
    get navSettings()           { return $('#lnk_mnu_invoice_manager_settings_index') }
    get navInvoiceDesign()      { return $('#lnk_mnu_invoice_manager_design_settings') }
    get navClients()            { return $('#lnk_mnu_invoice_manager_clients') }
    get navVendors()            { return $('#lnk_mnu_invoice_manager_vendors') }
    get navUsers()              { return $('#lnk_mnu_invoice_manager_users_index') }
    get navFiscalYears()        { return $('#lnk_mnu_invoice_manager_fiscalyears') }

    // ── Breadcrumb ─────────────────────────────────────────────────────────────
    get breadcrumbTitle()       { return $('.breadcrumb-title') }
    get breadcrumbUser()        { return $('.text-danger.d-md-flex') }

    // ── Welcome Banner ────────────────────────────────────────────────────────
    get welcomeBanner()         { return $('.card.border-top.border-primary') }
    get welcomeHeading()        { return $('.card.border-top.border-primary h5') }
    get welcomeMessage()        { return $('.card.border-top.border-primary p') }

    // ── KPI Summary Cards ─────────────────────────────────────────────────────
    get summaryCardsSection()   { return $('#ivm-summary-cards') }
    get totalSalesValue()       { return $('#summary-total') }
    get outstandingValue()      { return $('#summary-unpaid') }
    get collectedValue()        { return $('#summary-paid') }

    // ── Charts ────────────────────────────────────────────────────────────────
    get financialOverviewChart(){ return $('#ivm-chart-revenue') }
    get salesActivityChart()    { return $('#ivm-chart-sales') }
    get monthSelector()         { return $('#monthSelector') }
    get viewSelector()          { return $('#viewSelector') }

    // ── Invoice Status Donut ──────────────────────────────────────────────────
    get statusDonutChart()      { return $('#ivm-status-donut') }
    get newInvoiceBtn()         { return $('a[href*="start-invoice-creation"].btn-primary') }
    get allInvoicesBtn()        { return $('a[href*="/invoice-manager/invoices"].btn-outline-secondary') }

    // ── Recent Invoices ───────────────────────────────────────────────────────
    get recentInvoicesList()    { return $('.list-group.list-group-flush') }
    get recentInvoiceItems()    { return $$('.list-group-item.ivm-li-row') }
    get recentInvoicesSeeAll()  { return $('a.small.text-primary[href*="/invoice-manager/invoices"]') }

    // ── Actions ───────────────────────────────────────────────────────────────

    async open() {
        await browser.url(INSTANCE + '/dashboard')
        await this.welcomeBanner.waitForDisplayed({ timeout: 15000 })
    }

    async logout() {
        await this.logoutLink.click()
    }

    async clickCreateInvoice() {
        await this.newInvoiceBtn.click()
    }

    async selectSalesMonth(value) {
        await this.monthSelector.selectByAttribute('value', value)
    }

    async selectSalesView(value) {
        await this.viewSelector.selectByAttribute('value', value)
    }

    async getRecentInvoiceCount() {
        return (await this.recentInvoiceItems).length
    }
}

export default new DashboardPage()
