import { addFeature, addSeverity } from '../../helpers/allureHelper.js'
import LoginPage from '../../pageobjects/login.page.js'
import InvoicePage from '../../pageobjects/invoice.page.js'
import path from 'path'

const fixture = (file) => path.resolve('./test/fixtures', file)

describe('REGRESSION — AI-Powered Invoice Import', () => {

    before(async () => {
        await LoginPage.open()
        await LoginPage.login(process.env.TEST_EMAIL, process.env.TEST_PASS)
    })

    beforeEach(async () => {
        await InvoicePage.openImport()
    })

    it('REG-AI-001 | CSV upload extracts vendor names and invoice dates', async () => {
        addFeature('AI Import'); addSeverity('critical')
        await InvoicePage.uploadFile(fixture('sample-invoices.csv'))
        const extracted = await InvoicePage.getExtractedData()
        expect(extracted[0].vendorName).toBeTruthy()
        expect(extracted[0].invoiceDate).toMatch(/\d{4}-\d{2}-\d{2}/)
    })

    it('REG-AI-002 | PDF upload extracts line items and VAT amounts', async () => {
        addFeature('AI Import'); addSeverity('critical')
        await InvoicePage.uploadFile(fixture('sample-invoice.pdf'))
        const extracted = await InvoicePage.getExtractedData()
        expect(extracted[0].vatAmount).toBeGreaterThan(0)
        expect(extracted[0].lineItems.length).toBeGreaterThan(0)
    })

    it('REG-AI-003 | Files over 10MB are rejected with a size validation message', async () => {
        addFeature('AI Import'); addSeverity('normal')
        await InvoicePage.uploadFile(fixture('large-file-over-10mb.pdf'))
        await expect(InvoicePage.fileSizeError).toHaveTextContaining(/10MB/i)
    })

    it('REG-AI-004 | Validation mapping step shows imported data before committing', async () => {
        addFeature('AI Import'); addSeverity('critical')
        await InvoicePage.uploadFile(fixture('sample-invoice.pdf'))
        await InvoicePage.proceedToValidation()
        await expect(InvoicePage.importedDataPreview).toBeDisplayed()
        await expect(InvoicePage.confirmImportButton).toBeDisplayed()
    })

    it('REG-AI-005 | NLP description field guides AI extraction intent', async () => {
        addFeature('AI Import'); addSeverity('minor')
        await InvoicePage.uploadFile(fixture('sample-invoice.pdf'))
        await InvoicePage.enterNLPDescription('Extract only the VAT lines')
        await InvoicePage.triggerExtraction()
        const extracted = await InvoicePage.getExtractedData()
        expect(extracted.every(e => e.vatLine === true)).toBe(true)
    })
})
