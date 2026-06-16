import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const fixture = (file) => path.resolve(__dirname, '../../fixtures', file)
const INSTANCE = process.env.INSTANCE_URL || 'https://benten.invoicemanager.ng'

class InvoicePage {
    // Wizard steps
    get wizardStep1()          { return $('[data-testid="wizard-step-1"]') }
    get wizardStep2()          { return $('[data-testid="wizard-step-2"]') }
    get wizardStep3()          { return $('[data-testid="wizard-step-3"]') }
    get wizardStep4()          { return $('[data-testid="wizard-step-4"]') }

    // Step 1 fields
    get clientDropdown()       { return $('[data-testid="client-select"]') }
    get vendorDropdown()       { return $('[data-testid="vendor-select"]') }
    get invoiceTypeSelect()    { return $('[data-testid="invoice-type"]') }
    get invoiceTitleInput()    { return $('[data-testid="invoice-title"]') }
    get invoiceDatePicker()    { return $('[data-testid="invoice-date"]') }
    get dueDatePicker()        { return $('[data-testid="due-date"]') }
    get quickAddClientBtn()    { return $('[data-testid="quick-add-client"]') }
    get directionToggle()      { return $('[data-testid="invoice-direction"]') }
    get helpSidebar()          { return $('[data-testid="help-sidebar"]') }

    // Step 2 — line items
    get addLineItemBtn()       { return $('[data-testid="add-line-item"]') }
    get vatAmountDisplay()     { return $('[data-testid="vat-amount"]') }

    // Step 4 — finalize
    get finalizeSubmitBtn()    { return $('[data-testid="finalize-submit"]') }
    get irnBadge()             { return $('[data-testid="irn-badge"]') }
    get csidStamp()            { return $('[data-testid="csid-stamp"]') }
    get qrCode()               { return $('[data-testid="qr-code"]') }
    get statusBadge()          { return $('[data-testid="invoice-status"]') }
    get validationErrorPanel() { return $('[data-testid="validation-errors"]') }
    get submitToFIRSButton()   { return $('[data-testid="submit-to-firs"]') }
    get emailSentConfirmation(){ return $('[data-testid="email-sent-confirm"]') }
    get importedDataPreview()  { return $('[data-testid="import-preview"]') }
    get confirmImportButton()  { return $('[data-testid="confirm-import"]') }
    get fileSizeError()        { return $('[data-testid="file-size-error"]') }
    get invoiceTable()         { return $('[data-testid="invoice-table"]') }
    get recurringToggle()      { return $('[data-testid="recurring-toggle"]') }
    get nextBillingDate()      { return $('[data-testid="next-billing-date"]') }
    get billingCycleSelect()   { return $('[data-testid="billing-cycle"]') }
    get nlpDescriptionField()  { return $('[data-testid="nlp-description"]') }

    async openWizard() {
        await browser.url(INSTANCE + '/invoice-manager/start-invoice-creation')
        await this.wizardStep1.waitForDisplayed()
    }

    async openInvoiceList() {
        await browser.url(INSTANCE + '/invoice-manager/invoices')
        await this.invoiceTable.waitForDisplayed()
    }

    async openImport() {
        await browser.url(INSTANCE + '/invoice-manager/invoices/import')
    }

    async goToStep(n) {
        await $(`[data-testid="wizard-nav-step-${n}"]`).click()
        await $(`[data-testid="wizard-step-${n}"]`).waitForDisplayed()
    }

    async getInvoiceTypeOptions() {
        const options = await this.invoiceTypeSelect.$$('option')
        return Promise.all(options.map(o => o.getText()))
    }

    async selectDirection(direction) {
        const btn = await $(`[data-testid="direction-${direction.toLowerCase()}"]`)
        await btn.click()
    }

    async clickQuickAddClient() {
        await this.quickAddClientBtn.click()
    }

    async fillNewClient({ name, tin }) {
        await $('[data-testid="new-client-name"]').setValue(name)
        await $('[data-testid="new-client-tin"]').setValue(tin)
    }

    async confirmQuickAdd() {
        await $('[data-testid="quick-add-confirm"]').click()
    }

    async addLineItem({ desc, qty, unitPrice, taxable = false }) {
        await this.addLineItemBtn.click()
        const rows = await $$('[data-testid="line-item-row"]')
        const last = rows[rows.length - 1]
        await last.$('[data-testid="item-desc"]').setValue(desc)
        await last.$('[data-testid="item-qty"]').setValue(qty)
        await last.$('[data-testid="item-price"]').setValue(unitPrice)
        if (taxable) await last.$('[data-testid="item-taxable"]').click()
    }

    async getLineTotal(index) {
        const rows = await $$('[data-testid="line-item-row"]')
        return rows[index].$('[data-testid="item-total"]').getText()
    }

    async getVATAmount() {
        return this.vatAmountDisplay.getText()
    }

    async saveAsDraft() {
        await $('[data-testid="save-draft"]').click()
    }

    async getLastDraftId() {
        const el = await $('[data-testid="draft-id"]')
        return el.getAttribute('data-id')
    }

    async openDraft(id) {
        await browser.url(INSTANCE + `/invoice-manager/invoice/${id}`)
    }

    async focusField(name) {
        await $(`[data-testid="field-${name}"]`).click()
    }

    async enableRecurring() {
        await this.recurringToggle.click()
    }

    async selectBillingCycle(cycle) {
        await this.billingCycleSelect.selectByVisibleText(cycle)
    }

    async uploadFile(fileName) {
        const input = await $('[data-testid="file-upload-input"]')
        await input.addValue(fixture(fileName))
    }

    async enterNLPDescription(text) {
        await this.nlpDescriptionField.setValue(text)
    }

    async triggerExtraction() {
        await $('[data-testid="trigger-extraction"]').click()
        await browser.waitUntil(
            async () => (await $('[data-testid="extraction-status"]').getText()) === 'done',
            { timeout: 30000, interval: 1000 }
        )
    }

    async proceedToValidation() {
        await $('[data-testid="proceed-to-validation"]').click()
        await this.importedDataPreview.waitForDisplayed()
    }

    async getExtractedData() {
        const rows = await $$('[data-testid="extracted-row"]')
        return Promise.all(rows.map(async row => ({
            vendorName:   await row.$('[data-testid="ext-vendor"]').getText(),
            invoiceDate:  await row.$('[data-testid="ext-date"]').getText(),
            vatAmount:    parseFloat(await row.$('[data-testid="ext-vat"]').getText()),
            totalAmount:  parseFloat(await row.$('[data-testid="ext-total"]').getText()),
            lineItems:    await row.$$('[data-testid="ext-line-item"]'),
            vatLine:      (await row.$('[data-testid="ext-type"]').getText()) === 'VAT'
        })))
    }

    async confirmImport() {
        await this.confirmImportButton.click()
    }

    async finalizeAndSubmit() {
        await this.finalizeSubmitBtn.waitForClickable()
        await this.finalizeSubmitBtn.click()
        await this.irnBadge.waitForDisplayed({ timeout: 30000 })
    }

    async sendToEmail(email) {
        await $('[data-testid="send-to-email-btn"]').click()
        await $('[data-testid="email-recipient"]').setValue(email)
        await $('[data-testid="email-confirm-send"]').click()
        await this.emailSentConfirmation.waitForDisplayed()
    }

    async exportAs(format) {
        const downloadDir = process.cwd() + '/test/downloads'
        await browser.cdp('Page', 'setDownloadBehavior', {
            behavior: 'allow',
            downloadPath: downloadDir
        })
        await $(`[data-testid="export-${format.toLowerCase()}"]`).click()

        const { readdirSync, existsSync, mkdirSync } = await import('fs')
        const { join } = await import('path')
        if (!existsSync(downloadDir)) mkdirSync(downloadDir, { recursive: true })

        let filename
        await browser.waitUntil(() => {
            const files = readdirSync(downloadDir).filter(f => !f.endsWith('.crdownload'))
            if (files.length > 0) { filename = files[files.length - 1]; return true }
            return false
        }, { timeout: 10000, interval: 500 })

        return { filename, filepath: join(downloadDir, filename) }
    }

    async getStatusSteps() {
        const steps = await $$('[data-testid="status-step"]')
        return Promise.all(steps.map(s => s.getText()))
    }

    async getValidatedInvoice() {
        await browser.url(INSTANCE + '/invoice-manager/invoices?status=validated')
        return this
    }

    async getSignedInvoice() {
        await browser.url(INSTANCE + '/invoice-manager/invoices?status=signed')
        return this
    }

    async submitInvalidInvoice() {
        await this.openWizard()
        await this.finalizeAndSubmit()
    }

    async createAndSubmit(data) {
        await this.openWizard()
        await this.fillStep1(data)
        await this.fillStep2(data)
        await this.fillStep3()
        await this.finalizeAndSubmit()
        return this
    }

    async fillStep1({ client, vendor, type }) {
        await this.wizardStep1.waitForDisplayed()
        if (client) await this.clientDropdown.selectByVisibleText(client)
        if (vendor) await this.vendorDropdown.selectByVisibleText(vendor)
        if (type)   await this.invoiceTypeSelect.selectByVisibleText(type)
        await $('[data-testid="wizard-next"]').click()
    }

    async fillStep2({ product, qty, unitPrice, taxable }) {
        await this.wizardStep2.waitForDisplayed()
        await this.addLineItem({ desc: product, qty, unitPrice, taxable })
        await $('[data-testid="wizard-next"]').click()
    }

    async fillStep3() {
        await this.wizardStep3.waitForDisplayed()
        await $('[data-testid="wizard-skip"]').click()
    }

    async getLastInvoiceEntry() {
        const rows = await $$('[data-testid="invoice-row"]')
        const last = rows[rows.length - 1]
        return {
            entityType: last.$('[data-testid="entry-entity-type"]')
        }
    }

    async submitWithoutNIN() {
        await $('[data-testid="tin-submit"]').click()
    }
}

export default new InvoicePage()
