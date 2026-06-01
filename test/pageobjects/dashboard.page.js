class DashboardPage {
    get welcomeBanner()       { return $('[data-testid="dashboard-welcome"]') }
    get totalInvoicesTile()   { return $('[data-testid="tile-total-invoices"]') }
    get unpaidInvoicesTile()  { return $('[data-testid="tile-unpaid-invoices"]') }
    get totalReceivablesTile(){ return $('[data-testid="tile-total-receivables"]') }
    get paidInvoicesTile()    { return $('[data-testid="tile-paid-invoices"]') }
    get createInvoiceBtn()    { return $('[data-testid="cta-create-invoice"]') }
    get revenueExpenseChart() { return $('[data-testid="chart-revenue-expense"]') }
    get vatClientsLine()      { return $('[data-testid="chart-vat-clients"]') }
    get vatVendorsLine()      { return $('[data-testid="chart-vat-vendors"]') }
    get periodFilter()        { return $('[data-testid="period-filter"]') }
    get logoutBtn()           { return $('[data-testid="logout"]') }

    async open() {
        await browser.url('/dashboard')
        await this.welcomeBanner.waitForDisplayed()
    }

    async clickCreateInvoice() {
        await this.createInvoiceBtn.click()
    }

    async logout() {
        await this.logoutBtn.click()
    }

    async selectPeriod(period) {
        await this.periodFilter.selectByVisibleText(period)
    }

    async getVATVendorsValue() {
        const text = await this.vatVendorsLine.getText()
        return parseFloat(text.replace(/[^0-9.]/g, ''))
    }
}

export default new DashboardPage()
