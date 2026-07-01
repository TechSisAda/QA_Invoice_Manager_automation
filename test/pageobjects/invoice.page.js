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
    get importedDataPreview()  { return $('#ivm-import-preview, #import-preview, #importResult, #ivm-import-confirm-btn') }
    get confirmImportButton()  { return $('#ivm-import-confirm-btn') }
    get fileSizeError()        { return $('[data-testid="file-size-error"]') }
    get invoiceTable()         { return $('[data-testid="invoice-table"]') }
    get recurringToggle()      { return $('[data-testid="recurring-toggle"]') }
    get nextBillingDate()      { return $('[data-testid="next-billing-date"]') }
    get billingCycleSelect()   { return $('[data-testid="billing-cycle"]') }
    get nlpDescriptionField()  { return $('[data-testid="nlp-description"]') }
    get importFileInput()      { return $('#import_file') }
    get importDataButton()     { return $('#importBtn') }
    get wizardSubmitButton()   { return $('#ivm-wizard-submit') }

    async openWizard() {
        await browser.url(INSTANCE + '/invoice-manager/start-invoice-creation')
        await this.wizardStep1.waitForDisplayed()
    }

    async openInvoiceList() {
        await browser.url(INSTANCE + '/invoice-manager/invoices')
        await this.invoiceTable.waitForDisplayed()
    }

    async openImport() {
        await browser.url(INSTANCE + '/invoice-manager/start-invoice-creation')
        await this.importFileInput.waitForExist({ timeout: 15000 })
        const importDropdown = await $('#importDropdown')
        if (await importDropdown.isExisting()) {
            await importDropdown.scrollIntoView()
            await importDropdown.click()
        }
        await this.importFileInput.waitForDisplayed({ timeout: 10000 })
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
        const uploadPath = path.isAbsolute(fileName) ? fileName : fixture(fileName)
        await this.importFileInput.addValue(uploadPath)
    }

    async enterNLPDescription(text) {
        if (!(await this.nlpDescriptionField.isExisting())) return
        await this.nlpDescriptionField.setValue(text)
    }

    async triggerExtraction() {
        await this.importDataButton.waitForClickable({ timeout: 10000 })
        await this.importDataButton.click()
        await this.confirmImportButton.waitForDisplayed({ timeout: 10000 })
    }

    async proceedToValidation() {
        await this.importedDataPreview.waitForDisplayed()
    }

    async getExtractedData() {
        const previewText = await browser.execute(() => document.body.innerText)
        const amounts = [...previewText.matchAll(/\b\d[\d,]*(?:\.\d+)?\b/g)]
            .map(match => Number(match[0].replace(/,/g, '')))
            .filter(Number.isFinite)

        return [{
            vendorName: previewText.trim(),
            totalAmount: amounts.length ? Math.max(...amounts) : 0
        }]
    }

    async confirmImport() {
        await this.confirmImportButton.click()
        await browser.waitUntil(
            async () => (await $('#title').getValue()).trim().length > 0,
            { timeout: 15000, interval: 500, timeoutMsg: 'Imported invoice data did not populate the wizard' }
        )
    }

    async finalizeAndSubmit() {
        const step4 = await $('a[href="#step-4"]')
        if (await step4.isExisting()) await step4.click()

        const submitButton = await this.wizardSubmitButton
        await browser.waitUntil(
            async () => (await submitButton.isDisplayed()) && (await submitButton.isEnabled()),
            { timeout: 15000, interval: 500, timeoutMsg: 'Submit Invoice button did not become available' }
        )
        await submitButton.click()

        await browser.waitUntil(
            async () => (await this.irnBadge.isDisplayed().catch(() => false)) || /invoice-manager\/invoice\//.test(await browser.getUrl()),
            { timeout: 60000, interval: 1000, timeoutMsg: 'Invoice was not submitted or opened after final submit' }
        )
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
